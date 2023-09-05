const pool = require('./dbConfig');

exports.createCompadmin = async (name, surname, mail, pass, admin_id, comp_id) => {

    try {
        await pool.query(
            `INSERT INTO compadmin(name, surname, password, mail, admin_id, company_id) VALUES($1, $2, $3, $4, $5, $6)`,
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
        console.log("error => ",error);
        let response = {
            "code": 5000,
            "payload": {
                msg: error
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

exports.showCompadmin = async (index, search_param) => {

    try {

        const list = []
        const queryResult = await pool.query(
            `SELECT id as id,
                 name as name,
                 surname as surname,
                 password as password,
                 mail as mail,
                 status as status,
                 admin_id as admin_id,
                 company_id as company_id
                 FROM compadmin
                 WHERE ${search_param} = $1`,
            [index]
        );

        queryResult.rows.forEach((row) => {
            list.push({
                id: row.id,
                name: row.name,
                surname: row.surname,
                pass: row.password,
                mail: row.mail,
                status: row.status,
                admin_id: row.admin_id,
                comp_id: row.company_id_id
            });
        });

        let response = {
            code: 200,
            payload: {
                msg: "Compadmins fetched sucsessfully",
                list: list
            }
        }

        return response;
    } catch (error) {
        let response = {
            code: 5000,
            payload: {
                msg: 'Server error',
                err: error
            }
        }
        console.log("============>>>>> ",error);
        return response;
    }

}