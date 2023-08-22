const pool = require('./dbConfig');

exports.createCompadmin = async (name, surname, mail, pass, admin_id, comp_id) => {

    try {
        await pool.query(
            `INSERT INTO compadmin(name, surname, password, mail, admin_id, comp_id) VALUES($1, $2, $3, $4, $5, $6)`,
            [name, surname, pass, mail, admin_id, comp_id]
        );
        let result = {
            code: 200,
            payload: {
                msg: `Compadmin created successfully.`
            }
        }
        return result;
    } catch (error) {
        let response = {
            "code": 5000,
            "payload": {
                msg: error.detail
            }
        }
        return response

    }

}

exports.deleteCompadmin = async (index) => {
    try {
        const queryResult = await pool.query(
            `DELETE FROM compadmin WHERE mail = $1`,
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