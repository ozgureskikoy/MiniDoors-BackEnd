const sql = require('../model/dataLogin');
global.config = require('../helpers/tokenConfig');
const bcrypt = require("bcrypt");
const tokenS = require('../helpers/tokenControl');
const cryption = require('../helpers/cryption')
const redis = require('../config/redisConfig');

exports.checkLogin = async (req, res) => {
    try {
      const response = await sql.logControlUser(req.body.mail, req.body.password);
  
      if (response.code == 200) {
        pass = cryption.generateRandomPassword(10);
        const hash = await bcrypt.hash(pass, 10);
  
        let userdata = {
          mail: req.body.mail,
          role: response.payload.role,
          id: response.payload.id,
          status: response.payload.status,
          pass: response.payload.pass,
          hash: hash,
          comp: response.payload.comp,
          code: 200
        };
        console.log("userdata ==> ", userdata);
        const userdataString = JSON.stringify(userdata);
  
        const key = cryption.generateRandomPassword(5);
  
  
        redis.redisSet(key, userdataString, 300);
  
        const urlWithParams = new URL("http://localhost:3000/login/control");
  
        urlWithParams.searchParams.append("key", key);
  
        let result = {
          password: pass,
          link: urlWithParams
        }
  
        return res.status(200).send(result);
  
      } else {
        res.status(401).json({
          code: 4041,
          message: 'Password not correct'
        });
      }
    } catch (error) {
      return error;
    }
  
  }
  
  
  exports.loginUser = async (req, res) => {
  
    try {
  
      const key = req.query.key;
      console.log("key ==> ", key);
      const userdataString = await redis.redisGet(key);
      const userdata = JSON.parse(userdataString);
  
      console.log("data string => ", userdata);
      console.log("data admin role => ", userdata.role);
  
      if (await cryption.comparePassword(req.body.password, userdata.hash)) {
  
        if (userdata.status == 1) {
  
          let token = tokenS.tokenCreate(userdata, '7d');
          res.status(200).json({
            code: 200,
            payload: {
              message: userdata,
              jwtoken: token
            }
          });
          redis.redisDel(key);
        } else {
          res.status(200).json({
            message: {
              code: 200,
              name: userdata.name,
              mail: userdata.mail
  
            },
            jwtoken: ""
          });
  
        }
  
      } else {
        res.status(401).json({
          code: 4041,
          message: 'Passwor Not Correct'
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
        msg: response.payload.msg
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