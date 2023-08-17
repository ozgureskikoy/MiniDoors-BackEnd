const sql = require('../model/dataCompany');
const bcrypt = require("bcrypt");
const tokenS = require("../helpers/tokenControl");
const { access } = require('fs');

exports.createCompany = async (req, res) => {
  const check = await sql.readByNameCompany(req.body.name)
  if (!check.code == 200) {
    const admin_id = await tokenS.tokenRead(req.headers['x-access-token']);

    const response = await sql.createCompany(req.body.name, admin_id);
    if (response.code == 200) {
  
      return res.status(200).send(response)
  
  
    } else {
      return res.status(406).send(response)
  
    }
  
  }else{
    let response={
      code:4046,
      msg:"There is another company with same name"
    }
    return res.status(406).send(response)
  }
  
};

exports.findCompanyByName = async (name) => {

  const response = await sql.readByNameCompany(name);
  if (response.code==200) {

    return response;
  } else {

    return {
      code:4044,
      msg:"Company not found"
    };
  }

};