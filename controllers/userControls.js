const sql = require('../model/dataUser');
global.config = require('../helpers/tokenConfig');
const bcrypt = require("bcrypt");
const tokenS = require('../tokenControl');



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


exports.loginUser = async (req, res) => {

  try {
    const a = await sql.logControlUser(req.body.mail, req.body.password);

    if (a) {
      console.log("user" + a.status);
      if (a.status == 1) {
        let userdata = {
          username: req.body.username,
          password: req.body.password,
          role: a.role
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






