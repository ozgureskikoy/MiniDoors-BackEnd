const sql = require('../../model/dataSubadmin');
const company = require('../companyController')
const tokenS = require('../../helpers/tokenControl');
const bcrypt = require("bcrypt");



exports.createSubadmin = async (req, res) => {
    const admin = await tokenS.tokenRead(req.headers['x-access-token']);
    const admin_id = admin.id
    console.log("admin_id ==> ", admin_id);
    const admin_rolee = admin.role
    const admin_role = admin_rolee + "_id"
    let comp_id
    if (admin_rolee == "admin") {
        const comp = await company.findCompanyByName(req.body.comp);
        comp_id = comp.payload.id
        console.log('comp_id for admin ==> ', comp_id);
    } else {
        comp_id = admin.comp
        console.log('comp_id for Compadmin ==> ', comp_id);
    }
    const hash = await bcrypt.hash(req.body.pass, 10);
    const response = await sql.createSubadmin(req.body.name, req.body.surname, req.body.mail, hash, admin_id, comp_id, admin_role)
    if (response.code == 200) {

        return res.status(200).send(response)

    } else {
        return res.status(406).send(response)

    }
}

exports.deleteSubadmin = async (req, res) => {

    const response = await sql.deleteSubadmin(req.body.mail)

    if (response.code == 200) {

        return res.status(200).send(response)


    } else {
        return res.status(404).send(response)

    }


}

exports.showSubadmin = async (req, res) => {

    const response = await sql.showSubadmin(req.body.index, req.body.search_param)
    
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
        "meta": "Compadmin not found"
      }
      return res.status(404).send(result)
    }
  
  }

