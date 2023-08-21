const { write, read } = require('fs');
const bcrypt = require("bcrypt")
const cryption = require('../helpers/cryption');
const log = require('../helpers/logger');
const mail = require('../helpers/mailService')
const tokenS = require('../helpers/tokenControl')
var jwt = require('jsonwebtoken');


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
  } finally {
    if (client) {
      client.release();
    }
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


async function findUserTypeByEmail(email) {
  const query = `
    SELECT 'user' AS user_type
    FROM users
    WHERE mail = $1
    UNION
    SELECT 'admin' AS user_type
    FROM admin
    WHERE mail = $1
    UNION
    SELECT 'subadmin' AS user_type
    FROM subadmin
    WHERE mail = $1
    
  `;

  try {
    const result = await pool.query(query, [email]);
    const resTable = result.rows.map(row => row.user_type);
    return resTable;
  } catch (error) {
    let response = {
      code: 5000,
      err: error
    }
    return response;
  }
}



exports.logControlUser = async (mail, password) => {

  console.log("in find type");
  const userType = await findUserTypeByEmail(mail);
  console.log("mail in ==>> ", userType[0]);
  if (userType == "user") {

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
            payload: {
              "id": row.id,
              "name": row.name,
              "mail": row.mail,
              "status": row.status,
              "role": userType[0]
            }
          };
        } else {
          return {
            code: 4044,
            payload: {
              msg: "Şifre hatalı",
            }
          };
        }
      } else {
        return { code: 404 };
      }
    } catch (error) {
      let response = {
        code: 500,
        payload: {
          err: error
        }
      }
      return response;
    }
  } else if (userType == "admin") {
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
            payload: {
              "id": row.id,
              "name": row.name,
              "mail": row.mail,
              "status": row.status,
              "role": userType[0]
            }
          };
        } else {
          return {
            code: 4044,
            payload: {
              msg: "Şifre hatalı"
            }
          };
        }
      } else {
        return { code: 404 };
      }
    } catch (error) {
      return error;
    }
  } else if (userType == "subadmin") {
    try {
      const queryResult = await pool.query(
        `SELECT *
           FROM subadmin
           WHERE mail = $1`,
        [mail]
      );


      const row = queryResult.rows[0];
      if (row) {

        const passwordMatch = await cryption.comparePassword(password, row.password);

        if (passwordMatch) {
          return {
            "code": 200,
            payload: {
              "id": row.id,
              "name": row.name,
              "mail": row.mail,
              "status": row.status,
              comp: row.comp_id,
              "role": userType[0]
            }
          };
        } else {
          return {
            code: 4044,
            payload: {
              msg: "Şifre hatalı"
            }
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


exports.chancePass = async (mail, token, newpass, newpassA) => {
  try {
    const decoded = await tokenS.compareRole(token);
    console.log("decoded exp ==> " + decoded);
    const expirationDate = new Date(decoded.exp * 1000);
    console.log('JWT expires at:', expirationDate);
    console.log('AAA ' + decoded.code);
    const currentDate = new Date();
    if (currentDate < expirationDate) {
      if (newpass == newpassA) {
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
            payload: {
              msg: "Password updated."
            }
          }
          log.passLog(`user = ${mail} pass= ${newpass}`);
          return response;
        } else {
          let response = {
            code: 4044,
            payload: {
              msg: "User information is incorrect."
            }
          }
          return response;
        }
      } else {
        let response = {
          code: 4044,
          payload: {
            msg: "Passwords not matched"
          }
        }
        return response;
      }

    } else {
      console.log('JWT has expired');
      return {
        code: 4043,
        payload: {
          message: 'Forbidden Access Token Expired',
        }
      };
    }



  } catch (error) {
    return {
      code: 500,
      error: error,
      msg: 'An error occurredd.'
    };
  }

};



exports.forgotPass = async (mail) => {

  const result = await this.readByMailUser(mail);
  if (result.code == 200) {

    let userdata = {
      mail: mail
    };
    let token = tokenS.tokenCreate(userdata, '10m');
    const myUrlWithParams = new URL("http://localhost:3000/user/chance_pass");

    myUrlWithParams.searchParams.append("token", token);
    myUrlWithParams.searchParams.append("mail", mail);

    console.log(myUrlWithParams.href);

    let response = {
      code: 200,
      payload: {
        msg: myUrlWithParams
      }
    }
    return response;

  } else {
    let response = {
      code: 4044,
      payload: {
        msg: "mail incorrect"
      }
    }
    return response;

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


