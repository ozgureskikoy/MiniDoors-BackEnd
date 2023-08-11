const sql = require('../model/dataPermission');
global.config = require('../helpers/tokenConfig');
const user = require('./userControls')
const door = require('./doorControls')



exports.createPermission = async (req, res) => {

    const door_id = await door.findDoorByName(req.body.door);
    const user_id = await user.findDoorByNamewIndex(req.body.user);

    if (door_id && user_id) {

        if (door_id.comp_id == user_id.comp_id) {

            const q = await this.findPermission(user_id.id, door_id.id);

            if (q.code == 4046) {

                const a = await sql.createPermission(user_id.id, door_id.id, req.body.days, req.body.start, req.body.end)

                if (a.code == 200) {
                    return res.status(200).send(a)


                } else {
                    return res.status(406).send(a)

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
    const a = await sql.findPermission(user_id, door_id);
    return a;
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