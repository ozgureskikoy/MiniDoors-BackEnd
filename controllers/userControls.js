const sql = require('../model/dataUser');
global.config = require('../helpers/tokenConfig');
const bcrypt = require("bcrypt");
const tokenS = require('../helpers/tokenControl');

exports.loginUser = async (req, res) => {

  try {
    const a = await sql.logControlUser(req.body.mail, req.body.password);

    if (a) {

      if (a.status == 1) {

        let userdata = {
          username: req.body.username,
          password: req.body.password,
          role: a.role,
          id: a.id
        };
        let token = tokenS.tokenCreate(userdata);
        res.status(200).json({
          code: 200,
          message: a,
          jwtoken: token
        });

      } else {
        res.status(402).json({
          message: {
            code: 4042,
            name: a.name,
            mail: a.mail

          },
          jwtoken: ""
        });

      }

    } else {
      res.status(401).json({
        code: 4041,
        message: 'Login Failed'
      });
    }

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({
      code: 500,
      message: 'Server Error'
    });
  }

};


exports.allUser = async (req, res) => {
  const a = await sql.readAllUser();

  let response = {
    "code": 200,
    "meta": "ok",
    "payload": a
  }



  return res.status(200).send(response)
};

exports.findUser = async (req, res) => {

  const a = await sql.readUser(req.body.id);
  if (a) {

    let response = {
      "code": 200,
      "meta": "ok",
      "payload": a
    }
    return res.status(200).send(response)
  } else {

    let response = {
      "code": 4044,
      "meta": "User not found"
    }
    return res.status(404).send(response)
  }

};
exports.findUserByName = async (req, res) => {

  const a = await sql.readByNameUser(req.body.username);
  if (a) {

    let response = {
      "code": 200,
      "meta": "ok",
      "payload": a
    }
    return res.status(200).send(response)
  } else {

    let response = {
      "code": 4044,
      "meta": "User not found"
    }
    return res.status(404).send(response)
  }

};




exports.createUser = async (req, res) => {

  const hash = await bcrypt.hash(req.body.pass, 10);
  const a = await sql.createUser(req.body.name, hash, req.body.mail, req.body.role);
  if (a.code == 200) {

    return res.status(200).send(a)


  } else {
    return res.status(406).send(a)

  }

};

exports.deleteUser = async (req, res) => {

  const a = await sql.deleteUser(req.body.id)

  if (a.code == 200) {

    return res.status(200).send(a)


  } else {
    return res.status(404).send(a)

  }



};
exports.editUser = async (req, res) => {

  const a = await sql.updateUser(req.body.id, req.body.name);


  if (a.code == 200) {

    return res.status(200).send(a)
  } else {

    return res.status(404).send(a)
  }

};



exports.statusUpdate = async (req, res) => {

  const a = await sql.statusUpdateUser(req.body.id, req.body.status);

  if (a.code == 200) {

    return res.status(200).send(a)

  } else {
    return res.status(404).send(a)
  }

}





