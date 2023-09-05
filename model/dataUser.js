const { write, read } = require('fs');
const bcrypt = require("bcrypt")
const cryption = require('../helpers/cryption');
const log = require('../helpers/logger');


const pool = require('./dbConfig.js');
pool.connect(function (err) {
  if (err) {
    throw err;
  }
})

exports.createUser = async (name, surname, mail, admin_id, comp_id, admin_role) => {
  try {
    pass = cryption.generateRandomPassword(10);
    const hash = await bcrypt.hash(pass, 10);
    await pool.query(
      `INSERT INTO users(name, surname, password, mail, ${admin_role}, company_id) VALUES($1, $2, $3, $4, $5, $6)`,
      [name, surname, hash, mail, admin_id, comp_id]
    );
    let response = {
      code: 200,
      payload: {
        msg: `User created successfully.`,
        mail: mail,
        pass: pass
      }
    }
    log.passLog(`user = ${mail} pass= ${pass}`);
    return response;
  } catch (error) {
    console.log("err==>> ", error);
    let response = {
      code: 4046,
      payload: {
        err: error.detail
      }
    }
    return response;

  }
};


exports.readAllUser = async () => {
  let client;
  try {

    client = await pool.connect();
    const list = [];
    const queryResult = await client.query(`
        SELECT id as id,
               name as name,
               surname as surname,
               mail as mail,
               status as status,
               admin_id as admin_id,
               company_id as company_id
        FROM users
      `);

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
        msg: "Users fetched sucsessfully",
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
    return response;
  }
};

exports.readUser = async (index) => {
  try {
    const queryResult = await pool.query(
      `SELECT id as id,
               name as name,
               password as password,
               mail as mail,
               status as status,
               admin_id as admin_id,
               company_id as company_id
         FROM users
         WHERE id = $1`,
      [index]
    );

    const row = queryResult.rows[0];
    if (row) {

      return [{
        id: row.id,
        name: row.name,
        pass: row.password,
        mail: row.mail,
        status: row.status,
        admin_id: row.admin_id,
        comp_id: row.company_id_id
      }];
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
};

exports.readByNameUser = async (index) => {

  try {
    const queryResult = await pool.query(
      `SELECT id as id,
                name as name,
                password as password,
                mail as mail,
                status as status,
                admin_id as admin_id,
                company_id as company_id
         FROM users
         WHERE name = $1`,
      [index]
    );

    const row = queryResult.rows[0];
    if (row) {

      return {
        "code": 200,
        "id": row.id,
        "name": row.name,
        "pass": row.password,
        "mail": row.mail,
        "status": row.status,
        "admin_id": row.admin_id,
        "comp_id": row.company_id
      };
    } else {
      return {
        "code": 4044,
        "meta": "User not found"
      };
    }
  } catch (error) {
    throw error;
  }
};

exports.readByMailUser = async (index) => {

  try {
    const queryResult = await pool.query(
      `SELECT   id as id,
                name as name,
                password as password,
                mail as mail,
                status as status,
                admin_id as admin_id,
                company_id as company_id
         FROM users
         WHERE mail = $1`,
      [index]
    );

    const row = queryResult.rows[0];
    if (row) {
      return {
        "code": 200,
        "id": row.id,
        "name": row.name,
        "pass": row.password,
        "mail": row.mail,
        "status": row.status,
        "admin_id": row.admin_id,
        "comp_id": row.company_id
      };
    } else {
      return {
        "code": 4044,
        "meta": "User not found"
      };
    }
  } catch (error) {
    return error;
  }
};


exports.deleteUser = async (index) => {
  try {
    const queryResult = await pool.query(
      `DELETE FROM users WHERE mail = $1`,
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
    throw error;
  }
};

exports.updateUser = async (index, newData) => {
  try {
    const queryResult = await pool.query(
      `UPDATE users
         SET name = $1
         WHERE id = $2`,
      [newData, index]
    );

    if (queryResult.rowCount > 0) {
      let response = {
        code: 200,
        payload: {
          msg: "Data updated successfully."
        }
      }
      return response;
    } else {
      let response = {
        code: 4044,
        payload: {
          msg: "User with the specified index not found."
        }
      }
      return response;

    }
  } catch (error) {
    throw error;
  }
};



exports.statusUpdateUser = async (index, newData) => {

  try {
    const queryResult = await pool.query(
      `UPDATE users
         SET status = $1
         WHERE id = $2`,
      [newData, index]
    );

    if (queryResult.rowCount > 0) {
      let response = {
        code: 200,
        payload: {
          msg: "Status updated successfully."
        }
      }
      return response;
    } else {
      let response = {
        code: 4044,
        payload: {
          msg: "User with the specified index not found."
        }
      }
      return response;
    }
  } catch (error) {
    throw error;
  }
};





function serverClose() {
  pool.end()
    .then(() => {
      console.log('Database connection closed.');
    })
    .catch((err) => {
      console.error('Error closing database connection:', err.message);
    });
}


