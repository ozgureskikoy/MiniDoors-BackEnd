const sql = require('../model/dataCompany');
const bcrypt = require("bcrypt");
const tokenS = require("../helpers/tokenControl");
const { access } = require('fs');

exports.createCompany = async (req, res) => {

    const admin_id = await tokenS.tokenRead(req.headers['x-access-token']);
  
    const a = await sql.createCompany(req.body.name, admin_id);
    if (a.code == 200) {
  
      return res.status(200).send(a)
  
  
    } else {
      return res.status(406).send(a)
  
    }
  
  };

  exports.findCompanyByName = async (name) => {

    const a = await sql.readByNameCompany(name);
    if (a) {
  
      return a;
    } else {
  
      return;
    }
  
  };