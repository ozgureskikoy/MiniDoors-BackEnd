const sql = require('../model/dataUser');
global.config = require('../helpers/tokenConfig');
const bcrypt = require("bcrypt");
const tokenS = require('../helpers/tokenControl');
const company = require('./companyControls')

exports.loginUser = async (req, res) => {

  try {
    const a = await sql.logControlUser(req.body.mail, req.body.password);

    if (a.code==200) {

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
        res.status(406).json({
          message: {
            code: 4046,
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
  if (a.code == 200) {

    return res.status(200).send(a)

  } else {

    return res.status(404).send(a)

  }

};

exports.findDoorByNamewIndex = async (name) => {

  const a = await sql.readByNameUser(name);
  if (a) {

    return a;
  } else {

    return;
  }

};





exports.createUser = async (req, res) => {
  const comp_id = await company.findCompanyByName(req.body.comp);
  if (comp_id) {

    const admin_id = await tokenS.tokenRead(req.headers['x-access-token']);
    console.log('Comp id = ' + comp_id)
    const a = await sql.createUser(req.body.name, req.body.mail, admin_id, comp_id);
    if (a.code == 200) {

      return res.status(200).send(a)


    } else {
      return res.status(406).send(a)

    }
  } else {
    return res.status(404).send({
      code: 4044,
      msg: "Company not found"
    })
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
const mail = require('../helpers/mailService')

exports.forgotPass = async (req, res) => {

  const a = await sql.forgotPass(req.body.mail);
  if (a.code == 200) {
    let response = {
      code: a.code,
      msg: a.msg
    }
    var newPassword = a.pass;
    const sendMail = a.mail;
    const fs = require('fs');
    const htmlFilePath = './mail.html';
    fs.readFile(htmlFilePath, 'utf8', (err, htmlContent) => {
      if (err) {
        console.error('Error reading HTML file:', err);
        return;
      }
      htmlContent = htmlContent.replace('{newPassword}', newPassword);
      mail.sendEmailUsingNodemailer(sendMail, "Yeni Şifre", htmlContent, function (error, response) {
        if (error) {
          console.log('Error:', error);
        } else {
          console.log('Response:', response);
        }
      });
    });
    return res.status(200).send(response)

  } else {
    let response = {
      code: a.code,
      msg: a.msg
    }
    return res.status(404).send(response)
  }
}



exports.changePass = async (req, res) => {
  const a = await sql.chancePass(req.body.mail, req.body.pass, req.body.newpass);
  if (a.code == 200) {

    return res.status(200).send(a)

  } else {
    return res.status(404).send(a)
  }
}




