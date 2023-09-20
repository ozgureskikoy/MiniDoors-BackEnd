const sql = require('../model/dataUser');
global.config = require('../helpers/tokenConfig');
const tokenS = require('../helpers/tokenControl');
const company = require('./companyController')


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

  const response = await sql.readByNameUser(req.body.mail);
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
  const admin = await tokenS.tokenRead(req.headers['x-access-token']);
  const admin_id = admin.id
  console.log("admin_id ==> ",admin_id);
  
  const admin_rolee = admin.role
  const admin_role =admin_rolee+"_id"

  let comp_id
  
  if (admin_rolee == "admin") {
    const comp = await company.findCompanyByName(req.body.comp);
    comp_id = comp.payload.id
    console.log('comp_id for admin ==> ', comp_id);
  }else{
    comp_id = admin.comp
    console.log('comp_id for Compadmin ==> ', comp_id);
  }
  
  if (comp_id) {


    const response = await sql.createUser(req.body.name, req.body.surname, req.body.mail, admin_id, comp_id, admin_role);

    if (response.code == 200) {
      var newPassword = response.payload.pass;
      const sendMail = response.payload.mail;

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
      let result = {
        code: response.code,
        payload: {
          msg: response.payload.msg
        }
      }
      return res.status(200).send(result)


    } else {
      let result = {
        code: response.code,
        payload: {
          msg: response.payload.err
        }
      }

      return res.status(406).send(result)

    }
  } else {
    return res.status(404).send({
      code: 4044,
      msg: "Company not found"
    })
  }

};

exports.deleteUser = async (req, res) => {

  const response = await sql.deleteUser(req.body.mail)

  if (response.code == 200) {

    return res.status(200).send(response)


  } else {
    return res.status(404).send(response)

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






