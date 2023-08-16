const sql = require('../model/dataUser');
global.config = require('../helpers/tokenConfig');
const bcrypt = require("bcrypt");
const tokenS = require('../helpers/tokenControl');
const company = require('./companyController')

exports.loginUser = async (req, res) => {

  try {
    const response = await sql.logControlUser(req.body.mail, req.body.password);

    if (response.code == 200) {

      if (response.status == 1) {

        let userdata = {
          username: req.body.username,
          password: req.body.password,
          role: response.role,
          id: response.id,
          code: 200
        };
        let token = tokenS.tokenCreate(userdata, '7d');
        res.status(200).json({
          code: 200,
          message: response,
          jwtoken: token
        });

      } else {
        res.status(406).json({
          message: {
            code: 4046,
            name: response.name,
            mail: response.mail

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

exports.forgotPass = async (req, res) => {

  const response = await sql.forgotPass(req.body.mail);
  if (response.code == 200) {
    let result = {
      code: response.code,
      msg: response.msg
    }

    // var newPassword = response.pass;
    // const sendMail = response.mail;
    // const fs = require('fs');
    // const htmlFilePath = './mail.html';
    // fs.readFile(htmlFilePath, 'utf8', (err, htmlContent) => {
    //   if (err) {
    //     console.error('Error reading HTML file:', err);
    //     return;
    //   }
    //   htmlContent = htmlContent.replace('{newPassword}', newPassword);
    //   mail.sendEmailUsingNodemailer(sendMail, "Yeni Şifre", htmlContent, function (error, response) {
    //     if (error) {
    //       console.log('Error:', error);
    //     } else {
    //       console.log('Response:', response);
    //     }
    //   });
    // });
    return res.status(200).send(result)

  } else {

    let result = {
      code: response.code,
      msg: response.msg
    }
    return res.status(404).send(result)
  }
}



exports.changePass = async (req, res) => {

  const mail = req.query.mail;
  const token = req.query.token;
  const response = await sql.chancePass(mail, token, req.body.newpass, req.body.newpassA);
  if (response.code == 200) {

    return res.status(200).send(response)

  } else {
    return res.status(404).send(response)
  }
}


exports.allUser = async (req, res) => {
  const response = await sql.readAllUser();

  let result = {
    "code": 200,
    "meta": "ok",
    "payload": response
  }



  return res.status(200).send(result)
};

exports.findUser = async (req, res) => {

  const response = await sql.readUser(req.body.id);
  if (response) {

    let result = {
      "code": 200,
      "meta": "ok",
      "payload": response
    }
    return res.status(200).send(result)
  } else {

    let result = {
      "code": 4044,
      "meta": "User not found"
    }
    return res.status(404).send(result)
  }

};
exports.findUserByName = async (req, res) => {

  const response = await sql.readByNameUser(req.body.username);
  if (response.code == 200) {

    return res.status(200).send(response)

  } else {

    return res.status(404).send(response)

  }

};

exports.findUserByMail = async (mail) => {

  const response = await sql.readByMailUser(mail);
  if (response) {

    return response;
  } else {

    return;
  }

};





exports.createUser = async (req, res) => {
  const comp_id = await company.findCompanyByName(req.body.comp);
  if (comp_id) {

    const admin_id = await tokenS.tokenRead(req.headers['x-access-token']);
    const response = await sql.createUser(req.body.name, req.body.mail, admin_id, comp_id);
    if (response.code == 200) {
      var newPassword = response.pass;
      const sendMail = response.mail;
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
      return res.status(406).send(response)

    }
  } else {
    return res.status(404).send({
      code: 4044,
      msg: "Company not found"
    })
  }

};

exports.deleteUser = async (req, res) => {

  const a = await sql.deleteUser(req.body.mail)

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






