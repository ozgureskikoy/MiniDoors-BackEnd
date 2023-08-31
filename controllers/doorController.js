const sql = require('../model/dataDoors');
global.config = require('../helpers/tokenConfig');
const tokenS = require('../helpers/tokenControl');
const company = require('./companyController');
const log = require('../model/dataLog');
const setupSocket = require('../helpers/socket/client');


exports.addDoor = async (req, res) => {
    const admin = await tokenS.tokenRead(req.headers['x-access-token']);
    const admin_id = admin.id
    const admin_rolee = admin.role
    const admin_role = admin_rolee + "_id"
    let comp_id
    let comp_check
    if (admin_rolee == "admin") {
        const comp = await company.findCompanyByName(req.body.comp);
        comp_id = comp.payload.id
        comp_check = comp.code
    } else {
        comp_id = admin.comp
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
exports.showDoors = async (req, res) => {

    const response = await sql.showDoors(req.body.comp_id);
    if (response.code == 200) {

        return res.status(200).send(response)

    } else {

        return res.status(404).send(response)

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
    const reqtoken = await tokenS.tokenRead(req.headers['x-access-token']);
    console.log("==> ", reqtoken);
    const requester = reqtoken.role
    const compID = reqtoken.comp
    console.log("compID ==> ", compID);
    const opener_role = requester + "_id"


    const response = await sql.openDoor(req.body.mail, req.body.door);
    if (response.code == 200) {
        const socket = setupSocket(compID);
        const message = JSON.stringify([compID, ` ${req.body.door} ${response.payload.msg} by ${reqtoken.mail}`]);
        socket.emit('message', message);
        log.createLog(response.payload.user_id, response.payload.door_id, opener_role)
        return res.status(200).send(response)
    } else if (response.code == 4046) {

        return res.status(406).send(response)
    } else {

        return res.status(404).send(response)
    }

};