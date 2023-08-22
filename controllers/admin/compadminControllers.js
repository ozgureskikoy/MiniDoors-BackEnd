const sql = require('../../model/dataCompadmin');
const company = require('../companyController')
const tokenS = require('../../helpers/tokenControl');
const bcrypt = require("bcrypt");



exports.createCompadmin = async (req, res) => {
    const comp = await company.findCompanyByName(req.body.comp);
    const comp_id = comp.payload.id
    console.log('comp_id ==> ', comp_id);
    const admin = await tokenS.tokenRead(req.headers['x-access-token']);
    const admin_id = admin.id
    console.log("admin_id ==> ", admin_id);

    const hash = await bcrypt.hash(req.body.pass, 10);
    const response = await sql.createCompadmin(req.body.name, req.body.surname, req.body.mail, hash, admin_id, comp_id)
    if (response.code == 200) {

        return res.status(200).send(response)


    } else {
        return res.status(406).send(response)

    }
}

exports.deleteCompadmin = async (req,res) => {
   
    const response = await sql.deleteCompadmin(req.body.mail)

    if (response.code == 200) {
  
      return res.status(200).send(response)
  
  
    } else {
      return res.status(404).send(response)
  
    }
    

}

