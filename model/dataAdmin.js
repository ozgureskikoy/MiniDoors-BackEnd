const cryption = require('../helpers/cryption');
const pool = require('./dbConfig');

pool.connect(function (err) {
  if (err) {
    throw err;
  }
})

exports.createAdmin = async (name, surname, pass, mail) => {
  try {
    await pool.query(
      `INSERT INTO admin(name, surname, password, mail) VALUES($1, $2, $3, $4)`,
      [name, surname, pass, mail]
    );
    let result = {
      code: 200,
      payload: {
        msg: `Admin created successfully.`
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
};


exports.readAllAdmin = async () => {
  let client;
  try {
    client = await pool.connect();
    const list = [];
    const queryResult = await client.query(`
        SELECT id as id,
               name as name,
               password as password,
               mail as mail,
               status as status
        FROM admin
      `);

    queryResult.rows.forEach((row) => {
      list.push({
        id: row.id,
        name: row.name,
        pass: row.password,
        mail: row.mail,
        status: row.status

      });
    });

    console.log(list);
    return list;
  } catch (error) {
    let response = {
      "code": 5000,
      "payload": {
        msg: error
      }
    }
    return response
  } finally {
    if (client) {
      client.release();
    }
  }
};

exports.readAdmin = async (index) => {
  try {
    const queryResult = await pool.query(
      `SELECT id as id,
                name as name,
                password as password,
                mail as mail
         FROM admin
         WHERE id = $1`,
      [index]
    );

    const row = queryResult.rows[0];
    if (row) {
      let response = {
        "code": 200,
        "payload": {
          "id": row.id,
          "name": row.name,
          "pass": row.password,
          "mail": row.mail,
        }
      }
      return response
    } else {
      let response = {
        "code": 4044,
        "payload": {
          msg: "Not Found"
        }
      }
      return response
    }
  } catch (error) {
    let response = {
      "code": 5000,
      "payload": {
        msg: error
      }
    }
    return response
  }
};

exports.readByNameAdmin = async (index) => {
  console.log(`index=${index}`);
  try {
    const queryResult = await pool.query(
      `SELECT id as id,
                name as name,
                password as password,
                mail as mail
         FROM admin
         WHERE name = $1`,
      [index]
    );

    const row = queryResult.rows[0];
    if (row) {
      console.log(`${row.id} ${row.name}`);
      let response = {
        "code": 200,
        "payload": {
          "id": row.id,
          "name": row.name,
          "pass": row.password,
          "mail": row.mail
        }
      }
      return response
    } else {
      let response = {
        "code": 4044,
        "payload": {
          msg: "Not Found"
        }
      }
      return response
    }
  } catch (error) {
    let response = {
      "code": 5000,
      "payload": {
        msg: error
      }
    }
    return response
  }
};

exports.deleteAdmin = async (index) => {
  try {
    const queryResult = await pool.query(
      `DELETE FROM admin WHERE mail = $1`,
      [index]
    );

    if (queryResult.rowCount > 0) {
      let result = {
        code: 200,
        payload: {
          msg: `Admin with index=${index} deleted successfully.`
        }
      }
      return result;
    } else {
      let result = {
        code: 4044,
        payload: {
          msg: `Admin with index=${index} not found.`
        }
      }
      return result;
    }
  } catch (error) {
    let response = {
      "code": 5000,
      "payload": {
        msg: error
      }
    }
    return response
  }
};

exports.updateAdmin = async (index, newData) => {
  try {
    const queryResult = await pool.query(
      `UPDATE admin
         SET name = $1
         WHERE mail = $2`,
      [newData, index]
    );

    if (queryResult.rowCount > 0) {
      let result = {
        code: 200,
        payload: {
          msg: "Data updated successfully."
        }
      }
      return result;
    } else {
      let result = {
        code: 4044,
        payload: {
          msg: "Admin with the specified mail not found."
        }
      }
      return result;

    }
  } catch (error) {
    let response = {
      "code": 5000,
      "payload": {
        msg: error
      }
    }
    return response

  }
};



exports.statusUpdateAdmin = async (index, newData) => {
  try {
    const queryResult = await pool.query(
      `UPDATE admin
         SET status = $1
         WHERE mail = $2`,
      [newData, index]
    );

    if (queryResult.rowCount > 0) {
      let result = {
        code: 200,
        msg: "Status updated successfully."
      }
      return result;
    } else {
      let result = {
        code: 4044,
        msg: "Admin with the specified index not found."
      }
      return result;
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


