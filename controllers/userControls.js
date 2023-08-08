const sql = require('../model/dataUser');
global.config = require('../helpers/tokenConfig');
const bcrypt = require("bcrypt");
const tokenS = require('../helpers/tokenControl');

async function tokenC(token) {
  try {
    const accessToken = token;
    console.log("access token = " + accessToken);

    const decodedToken = await tokenS.compareRole(accessToken);
    console.log("access token role =", decodedToken);

    return {
      role: decodedToken.role,
      id: decodedToken.id
    }


  } catch (error) {
    console.error('Error:', error);
  }
}


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
          message: a,
          jwtoken: token
        });

      } else {
        res.status(402).json({
          message: {
            name: a.name,
            mail: a.mail

          },
          jwtoken: ""
        });

      }

    } else {
      res.status(401).json({
        message: 'Login Failed'
      });
    }

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({
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
  const a = await sql.createUser(req.body.name, hash, req.body.mail, f.id);
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

exports.deleteUser = async (req, res) => {
  
    const a = await sql.deleteUser(req.body.id)

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
exports.editUser = async (req, res) => {
  
    const b = await sql.readUser(req.body.id);

    if (b) {
      const a = await sql.updateUser(req.body.id, req.body.name);
      let response = {
        "code": 200,
        "meta": "ok",
        "msg": "User updated successfully",
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

exports.statusUpdate = async (req, res) => {
  
    const b = await sql.readUser(req.body.id);
    if (b) {
      const a = await sql.statusUpdateUser(req.body.id, req.body.status);
      let response = {
        "code": 200,
        "meta": "ok",
        "msg": "User status chanced",
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

  
}





