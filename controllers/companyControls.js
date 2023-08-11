const sql = require('../model/dataCompany');
const bcrypt = require("bcrypt");
const tokenS = require("../helpers/tokenControl");
const { access } = require('fs');

exports.createCompany = async (req, res) => {

    const admin_id = await tokenS.tokenRead(req.headers['x-access-token']);
  
    const response = await sql.createCompany(req.body.name, admin_id);
    if (response.code == 200) {
  
      return res.status(200).send(response)
  
  
    } else {
      return res.status(406).send(response)
  
    }
  
  };

  exports.findCompanyByName = async (name) => {

    const response = await sql.readByNameCompany(name);
    if (response) {
  
      return response;
    } else {
  
      return;
    }
  
  };