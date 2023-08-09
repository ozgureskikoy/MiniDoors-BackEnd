const sql = require('../model/dataDoors');
global.config = require('../helpers/tokenConfig');
const tokenS = require('../helpers/tokenControl');
const company =require('../controllers/companyControls')

exports.addDoor = async (req, res) => {
    const comp_id = await company.findCompanyByName(req.body.comp);
    console.log("company = " + comp_id)
    if (comp_id) {

        const admin_id = await tokenS.tokenRead(req.headers['x-access-token']);
        console.log("admin= " + admin_id)
        const a = await sql.addDoor(req.body.name, admin_id, comp_id);
        if (a.code == 200) {

            return res.status(200).send(a)

        } else {
            return res.status(406).send(a)
        }
    } else {
        return res.status(404).send({
            code: 4044,
            msg: "Company not found"
        })
    }

};

exports.findDoorByName = async (name) => {

    const a = await sql.readByNameDoors(name);
    if (a) {
  
      return a;
    } else {
  
      return;
    }
  
  };