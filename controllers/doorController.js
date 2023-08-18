const sql = require('../model/dataDoors');
global.config = require('../helpers/tokenConfig');
const tokenS = require('../helpers/tokenControl');
const company = require('./companyController');
const log = require('../model/dataLog');

exports.addDoor = async (req, res) => {
    const comp = await company.findCompanyByName(req.body.comp)
    const door = await sql.readByNameDoors(req.body.name)
    console.log("company => " + comp.id)
    console.log("doorcode==> ", door.code);
    console.log("door name ==> ", req.body.name);
    if (door.code==4044) {
        
        if (comp.code==200) {

            const admin_id = await tokenS.tokenRead(req.headers['x-access-token']);
            console.log("admin= " + admin_id)
            const response = await sql.addDoor(req.body.name, admin_id, comp.id);
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
    }else{
        return res.status(404).send({
            code: 4044,
            msg: "Door with same name exist"
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
    const response = await sql.openDoor(req.body.mail, req.body.door);
    if (response.code==200) {
       log.createLog(response.user_id,response.id)
        return res.status(200).send(response)
    }else if (response.code==4046) {
        
        return res.status(406).send(response)        
    }else{
        
        return res.status(404).send(response)
    }

}; 