const pool = require('./dbConfig');

exports.createSubadmin = async (name, surname, mail, pass, admin_id, comp_id, admin_role) => {

    try {
        await pool.query(
            `INSERT INTO subadmin(name, surname, password, mail, ${admin_role}, company_id) VALUES($1, $2, $3, $4, $5, $6)`,
            [name, surname, pass, mail, admin_id, comp_id]
        );
        let result = {
            code: 200,
            payload: {
                msg: `subadmin created successfully.`
            }
        }
        return result;
    } catch (error) {
        console.log("sub create error ==> ", error);
        let response = {
            "code": 5000,
            "payload": {
                msg: error.detail
            }
        }
        return response

    }

}

exports.deleteSubadmin = async (index) => {
    try {
        const queryResult = await pool.query(
            `DELETE FROM subadmin WHERE mail = $1`,
            [index]
        );

        if (queryResult.rowCount > 0) {
            let response = {
                code: 200,
                payload: {
                    msg: `User with index=${index} deleted successfully.`
                }
            }
            return response;
        } else {
            let response = {
                code: 4044,
                payload: {
                    msg: `User with index=${index} not found.`
                }
            }
            return response;
        }
    } catch (error) {
        return {
            code: 5000,
            payload: {
                error: error,
                msg: "server error"

            }
        }

    }
};