const sql = require('../model/dataPermission');
global.config = require('../helpers/tokenConfig');
const user = require('./userController')
const door = require('./doorController')



exports.createPermission = async (req, res) => {

    const door_id = await door.findDoorByName(req.body.door);
    const user_id = await user.findUserByMail(req.body.mail);

    console.log("door==> "+door_id.code);
    console.log("user==> "+user_id.comp_id);
    if (door_id && user_id) {

        if (door_id.comp_id == user_id.comp_id) {
            const q = await this.findPermission(user_id.id, door_id.id);

            if (q.code == 4046) {

                const response = await sql.createPermission(user_id.id, door_id.id, req.body.days, req.body.start, req.body.end)

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
                msg: "User and door not in same company"
            }
            return res.status(406).send(result);
        }

    } else {
        return res.status(404).send({
            code: 4044,
            msg: "Door or user not found"
        })
    }

};

exports.findPermission = async (user_id, door_id) => {
    const response = await sql.findPermission(user_id, door_id);
    return response;
};



exports.deletePermission = async (req, res) => {
    const door_id = await door.findDoorByName(req.body.door);
    const user_id = await user.findDoorByNamewIndex(req.body.user);

    if (door_id && user_id) {
        if (door_id.comp_id == user_id.comp_id) {
            const q = await this.findPermission(user_id.id, door_id.id);

            if (q.code == 4044) {
                try {
                    await sql.deletePermission(user_id.id, door_id.id);
                    return res.status(200).send({
                        code: 200,
                        msg: "Permission deleted successfully."
                    });
                } catch (error) {
                    console.log(error);
                    return res.status(500).send({
                        code: 500,
                        msg: "Error deleting permission."
                    });
                }
            } else {
                return res.status(404).send({
                    msg: "Permission not found."
                });
            }
        } else {
            const result = {
                code: 4044,
                msg: "There is no permission between them"
            }
            return res.status(404).send(result);
        }
    } else {
        return res.status(406).send({
            code: 4046,
            msg: "Must send door and user"
        });
    }
};