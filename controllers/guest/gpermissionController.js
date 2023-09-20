const sql = require('../../model/dataGPermission');
global.config = require('../../helpers/tokenConfig');
const user = require('../userController')
const door = require('../doorController')
const guest = require('../guest/guestController')

exports.createPermission = async (req, res) => {

    const door_id = await door.findDoorByName(req.body.door);
    const user_id = await guest.findGuestByMail(req.body.mail);

    if (door_id && user_id) {
        console.log("door id ==> ", door_id.payload.comp_id);
        if (door_id.payload.comp_id == user_id.comp_id) {

            const q = await this.findPermission(user_id.id, door_id.payload.id);

            if (q.code == 4046) {

                const exp = req.body.exp_time
                const exp_time = new Date(exp)

                console.log("exp_time ==> ", exp_time);

                const response = await sql.createPermission(user_id.id, door_id.payload.id, req.body.days, req.body.start, req.body.end, exp_time)

                if (response.code == 200) {
                    return res.status(200).send(response)


                } else {
                    return res.status(406).send(response)

                }

            } else {
                return res.status(406).send({
                    msg: q
                })


            }
        } else {
            const result = {
                code: 4046,
                payload: {
                    msg: "User and door not in same company"
                }
            }
            return res.status(406).send(result);
        }

    } else {
        return res.status(404).send({
            code: 4044,
            payload: {
                msg: "Door or user not found"
            }
        })
    }

};


exports.findPermission = async (user_id, door_id) => {
    const response = await sql.findPermission(user_id, door_id);
    return response;
};

