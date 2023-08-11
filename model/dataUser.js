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

exports.createUser = async (name, mail, admin_id, comp_id) => {
  try {
    pass = cryption.generateRandomPassword();
    const hash = await bcrypt.hash(pass, 10);
    await pool.query(
      `INSERT INTO users(name, password, mail, admin_id, company_id) VALUES($1, $2, $3, $4, $5)`,
      [name, hash, mail, admin_id, comp_id]
    );
    let response = {
      code: 200,
      msg: `User created successfully.`
    }
    log.passLog(`user = ${mail} pass= ${pass}`);
    return response;
  } catch (error) {
    let response = {
      code: 4046,
      msg: error
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
        SELECT key as id,
               name as name,
               password as password,
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
        pass: row.password,
        mail: row.mail,
        status: row.status,
        admin_id: row.admin_id,
        comp_id: row.company_id_id
      });
    });


    return list;
  } catch (error) {
    throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
};

exports.readUser = async (index) => {
  try {
    const queryResult = await pool.query(
      `SELECT key as id,
               name as name,
               password as password,
               mail as mail,
               status as status,
               admin_id as admin_id,
               company_id as company_id
         FROM users
         WHERE key = $1`,
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
      `SELECT key as id,
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


async function findUserTypeByEmail(email) {
  const query = `
    SELECT 'user' AS user_type
    FROM users
    WHERE mail = $1
    UNION
    SELECT 'admin' AS user_type
    FROM admin
    WHERE mail = $1
    
  `;

  try {
    const result = await pool.query(query, [email]);
    const resTable = result.rows.map(row => row.user_type);
    return resTable;
  } catch (error) {
    throw error;
  }
}


exports.logControlUser = async (mail, password) => {


  const b = await findUserTypeByEmail(mail);

  if (b == "user") {

    try {
      const queryResult = await pool.query(
        `SELECT *
           FROM users
           WHERE mail = $1`,
        [mail]
      );

      const row = queryResult.rows[0];
      if (row) {
        const passwordMatch = await cryption.comparePassword(password, row.password);

        if (passwordMatch) {

          return {
            "code": 200,
            "id": row.admin_id,
            "name": row.name,
            "pass": row.password,
            "mail": row.mail,
            "status": row.status,
            "role": b[0]
          };
        } else {
          return { code: 404 };
        }
      } else {
        return { code: 404 };
      }
    } catch (error) {
      return error;
    }
  } else if (b == "admin") {
    try {
      const queryResult = await pool.query(
        `SELECT *
           FROM admin
           WHERE mail = $1`,
        [mail]
      );


      const row = queryResult.rows[0];
      if (row) {

        const passwordMatch = await cryption.comparePassword(password, row.password);
        
        if (passwordMatch) {
          return {
            "code": 200,
            "id": row.admin_id,
            "name": row.name,
            "pass": row.password,
            "mail": row.mail,
            "status": row.status,
            "admin_id": row.admin_id,
            "role": b[0]
          };
        } else {
          return { 
            msg: "Şifre hatalı",
            code: 404 
          };
        }
      } else {
        return { code: 404 };
      }
    } catch (error) {
      return error;
    }
  }


  else {
    return { code: 404 };
  }

};


exports.deleteUser = async (index) => {
  try {
    const queryResult = await pool.query(
      `DELETE FROM users WHERE key = $1`,
      [index]
    );

    if (queryResult.rowCount > 0) {
      let response = {
        code: 200,
        msg: `User with index=${index} deleted successfully.`
      }
      return response;
    } else {
      let response = {
        code: 4044,
        msg: `User with index=${index} not found.`
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
         WHERE key = $2`,
      [newData, index]
    );

    if (queryResult.rowCount > 0) {
      let response = {
        code: 200,
        msg: "Data updated successfully."
      }
      return response;
    } else {
      let response = {
        code: 4044,
        msg: "User with the specified index not found."
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
         WHERE key = $2`,
      [newData, index]
    );

    if (queryResult.rowCount > 0) {
      let response = {
        code: 200,
        msg: "Status updated successfully."
      }
      return response;
    } else {
      let response = {
        code: 4044,
        msg: "User with the specified index not found."
      }
      return response;
    }
  } catch (error) {
    throw error;
  }
};


exports.chancePass = async (mail, pass, newpass) => {
  try {
    const a = await this.logControlUser(mail, pass);
    if (a.code == 200) {
      const hash = await bcrypt.hash(newpass, 10);

      const queryResult = await pool.query(
        `UPDATE users
           SET password = $1
           WHERE mail = $2`,
        [hash, mail]
      );

      if (queryResult.rowCount > 0) {
        let response = {
          code: 200,
          msg: "Password updated."
        }
        log.passLog(`user = ${mail} pass= ${newpass}`);
        return response;
      } else {
        let response = {
          code: 4044,
          msg: "User information is incorrect."
        }
        return response;
      }
    } else {
      let response = {
        code: 4044,
        msg: "mail or password incorrect"
      }
      return response;
    }


  } catch {
    return;
  }

};

const mail = require('../helpers/mailService')

exports.forgotPass = async (mail) => {
  try {
    pass = cryption.generateRandomPassword();
    const hash = await bcrypt.hash(pass, 10);

    const queryResult = await pool.query(
      `UPDATE users
       SET password = $1
       WHERE mail = $2`,
      [hash, mail]
    );

    if (queryResult.rowCount > 0) {
      let response = {
        code: 200,
        msg: "Password sended to mail.",
        pass: pass,
        mail: mail
      }
      log.passLog(`user = ${mail} pass= ${pass}`);
      return response;
    } else {
      let response = {
        code: 4044,
        msg: "User with the specified mail not found."
      }
      return response;
    }

  } catch {
    return error;
  }

}


function serverClose() {
  pool.end()
    .then(() => {
      console.log('Database connection closed.');
    })
    .catch((err) => {
      console.error('Error closing database connection:', err.message);
    });
}


