const sql = require('../model/dataDoors');
global.config = require('../helpers/tokenConfig');
const tokenS = require('../helpers/tokenControl');
const company = require('./companyController');
const log = require('../model/dataLog');

exports.addDoor = async (req, res) => {
    const admin = await tokenS.tokenRead(req.headers['x-access-token']);
    const admin_id = admin.id
    const admin_rolee = admin.role
    const admin_role = admin_rolee + "_id"
    console.log("admin= " + admin_id)
    let comp_id
    let comp_check
    if (admin_rolee == "admin") {
        const comp = await company.findCompanyByName(req.body.comp);
        comp_id = comp.payload.id
        console.log('comp_id for admin ==> ', comp_id);
        comp_check = comp.code
    } else {
        comp_id = admin.comp
        console.log('comp_id for subadmin ==> ', comp_id);
        comp_check = 200
    }

    const door = await sql.readByNameDoors(req.body.name)


    if (door.code == 4044) {

        if (comp_check == 200) {


            const response = await sql.addDoor(req.body.name, admin_id, comp_id, admin_role);
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
    } else {
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
    if (response.code == 200) {
        console.log("user r==> ", response.payload.msg);
        console.log("user r==> ", response.payload.user_id);
        console.log("door r==> ", response.payload.door_id);
        log.createLog(response.payload.user_id, response.payload.door_id)
        return res.status(200).send(response)
    } else if (response.code == 4046) {

        return res.status(406).send(response)
    } else {

        return res.status(404).send(response)
    }

}; 