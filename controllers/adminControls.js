const sql = require('../model/dataAdmin');
const tokenS = require('../helpers/tokenControl');
const bcrypt = require("bcrypt");

  
exports.createAdmin = async (req, res) => {
    
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
      
    
  
  };
  
  exports.deleteAdmin = async (req, res) => {
    
        const a = await sql.deleteAdmin(req.body.id)
      
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
  exports.editAdmin = async (req, res) => {
    
        const b = await sql.read(req.body.id);
        
        if (b) {
          const a = await sql.updateAdmin(req.body.id, req.body.name);
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
  
  exports.statusUpdateAdmin = async (req, res) => {
    
        const b = await sql.readAdmin(req.body.id);
        if (b) {
          const a = await sql.statusUpdateAdmin(req.body.id, req.body.status);
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

  }