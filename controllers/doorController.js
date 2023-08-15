const sql = require('../model/dataDoors');
global.config = require('../helpers/tokenConfig');
const tokenS = require('../helpers/tokenControl');
const company = require('./companyController');
const log = require('../model/dataLog');

exports.addDoor = async (req, res) => {
    const comp_id = await company.findCompanyByName(req.body.comp);
    console.log("company = " + comp_id)
    if (comp_id) {

        const admin_id = await tokenS.tokenRead(req.headers['x-access-token']);
        console.log("admin= " + admin_id)
        const response = await sql.addDoor(req.body.name, admin_id, comp_id);
        if (response.code == 200) {

            return res.status(200).send(response)

        } else {
            return res.status(406).send(response)
        }
    } else {
        return res.status(404).send({
            code: 4044,
            msg: "Company not found"
        })
    }

};

exports.findDoorByName = async (name) => {

    const response = await sql.readByNameDoors(name);
    if (response) {

        return response;
    } else {

        return;
    }

};


exports.openDoor = async (req, res) => {
    const response = await sql.openDoor(req.body.user, req.body.door);
    if (response.code==200) {
       log.createLog(response.user_id,response.door_id)
        return res.status(200).send(response)
    }else if (response.code==4046) {
        
        return res.status(406).send(response)        
    }else{
        
        return res.status(404).send(response)
    }

}; 