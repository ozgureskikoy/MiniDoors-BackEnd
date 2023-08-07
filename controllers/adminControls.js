const sql = require('../model/dataAdmin');
const tokenS = require('../helpers/tokenControl');
const bcrypt = require("bcrypt");
async function tokenC(token) {
    try {
      const accessToken = token;
      console.log("access token = " + accessToken);
      
      const decodedToken = await tokenS.compareRole(accessToken);
      console.log("access token role =", decodedToken);
      
      return decodedToken.role;
  
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
exports.createAdmin = async (req, res) => {
    if (await tokenC(req.headers['x-access-token'])== "admin") {
        const hash = await bcrypt.hash(req.body.pass, 10);
        const a = await sql.createAdmin(req.body.name, hash, req.body.mail,req.body.role);
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
      }else{
        let response = {
            "code": 4044,
            "meta": "Unautorized Prosscess"
          }
          return res.status(404).send(response)
      }
    
  
  };
  
  exports.deleteAdmin = async (req, res) => {
    if (await tokenC(req.headers['x-access-token'])== "admin") {
        const a = await sql.delete(req.body.id)
      
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

    }else{
        let response = {
            "code": 4044,
            "meta": "Unautorized Prosscess"
          }
          return res.status(404).send(response)
      }
  
  };
  exports.editAdmin = async (req, res) => {
    if (await tokenC(req.headers['x-access-token'])== "admin") {
        const b = await sql.read(req.body.id);
        
        if (b) {
          const a = await sql.update(req.body.id, req.body.name);
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

    }else{
        let response = {
            "code": 4044,
            "meta": "Unautorized Prosscess"
          }
          return res.status(404).send(response)
      }
  
  };
  
  exports.statusUpdateAdmin = async (req, res) => {
    if (await tokenC(req.headers['x-access-token'])== "admin") {
        const b = await sql.read(req.body.id);
        if (b) {
          const a = await sql.statusUpdate(req.body.id, req.body.status);
          let response = {
            "code": 200,
            "meta": "ok",
            "msg":"User status chanced",
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

    }else{
        let response = {
            "code": 4044,
            "meta": "Unautorized Prosscess"
          }
          return res.status(404).send(response)
      }
  }