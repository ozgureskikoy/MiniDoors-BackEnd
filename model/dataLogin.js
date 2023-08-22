const log = require('../helpers/logger');
const mail = require('../helpers/mailService')
const tokenS = require('../helpers/tokenControl')
var jwt = require('jsonwebtoken');
const cryption = require('../helpers/cryption');
const bcrypt = require("bcrypt")
const userSql = require('./dataUser')

const pool = require('./dbConfig.js');
pool.connect(function (err) {
  if (err) {
    throw err;
  }
})


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
      SELECT 'compadmin' AS user_type
      FROM compadmin
      WHERE mail = $1
      UNION
      SELECT 'subadmin' AS user_type
      FROM subadmin
      WHERE mail = $1
      UNION
      SELECT 'guests' AS user_type
      FROM guests
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
async function loginA(mail, userType, password) {
  try {
    console.log("usertype==> ", userType[0]);
    console.log("mail ==> ", mail);
    const queryResult = await pool.query(
      `SELECT *
         FROM ${userType[0]}
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

}
exports.logControlUser = async (mail, password) => {

  console.log("in find type");
  const userType = await findUserTypeByEmail(mail);
  console.log("mail in ==>> ", userType[0]);
  console.log("===============>> ", await loginA(mail, userType));
  return await loginA(mail, userType, password)
  // if (userType == "user") {

  //   try {
  //     const queryResult = await pool.query(
  //       `SELECT *
  //            FROM users
  //            WHERE mail = $1`,
  //       [mail]
  //     );

  //     const row = queryResult.rows[0];
  //     if (row) {
  //       const passwordMatch = await cryption.comparePassword(password, row.password);

  //       if (passwordMatch) {

  //         return {
  //           "code": 200,
  //           payload: {
  //             "id": row.id,
  //             "name": row.name,
  //             "mail": row.mail,
  //             "status": row.status,
  //             "role": userType[0]
  //           }
  //         };
  //       } else {
  //         return {
  //           code: 4044,
  //           payload: {
  //             msg: "Şifre hatalı",
  //           }
  //         };
  //       }
  //     } else {
  //       return { code: 404 };
  //     }
  //   } catch (error) {
  //     let response = {
  //       code: 500,
  //       payload: {
  //         err: error
  //       }
  //     }
  //     return response;
  //   }
  // } else if (userType == "admin") {

  //   try {
  //     const queryResult = await pool.query(
  //       `SELECT *
  //            FROM admin
  //            WHERE mail = $1`,
  //       [mail]
  //     );


  //     const row = queryResult.rows[0];
  //     if (row) {

  //       const passwordMatch = await cryption.comparePassword(password, row.password);
  //       console.log("cont 3 ===>> ");
  //       console.log("cont 3 ===>> ", passwordMatch);
  //       if (passwordMatch) {
  //         return {
  //           "code": 200,
  //           payload: {
  //             "id": row.id,
  //             "name": row.name,
  //             "mail": row.mail,
  //             "status": row.status,
  //             "role": userType[0]
  //           }
  //         };
  //       } else {
  //         return {
  //           code: 4044,
  //           payload: {
  //             msg: "Şifre hatalı"
  //           }
  //         };
  //       }
  //     } else {
  //       return { code: 404 };
  //     }
  //   } catch (error) {
  //     return error;
  //   }
  // } else if (userType == "compadmin") {
  //   try {
  //     const queryResult = await pool.query(
  //       `SELECT *
  //            FROM compadmin
  //            WHERE mail = $1`,
  //       [mail]
  //     );


  //     const row = queryResult.rows[0];
  //     if (row) {

  //       const passwordMatch = await cryption.comparePassword(password, row.password);

  //       if (passwordMatch) {
  //         return {
  //           "code": 200,
  //           payload: {
  //             "id": row.id,
  //             "name": row.name,
  //             "mail": row.mail,
  //             "status": row.status,
  //             comp: row.comp_id,
  //             "role": userType[0]
  //           }
  //         };
  //       } else {
  //         return {
  //           code: 4044,
  //           payload: {
  //             msg: "Şifre hatalı"
  //           }
  //         };
  //       }
  //     } else {
  //       return { code: 404 };
  //     }
  //   } catch (error) {
  //     return error;
  //   }
  // }


  // else {
  //   return { code: 404 };
  // }

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

  const result = await userSql.readByMailUser(mail);
  if (result.code == 200) {

    let userdata = {
      mail: mail
    };
    let token = tokenS.tokenCreate(userdata, '10m');
    const myUrlWithParams = new URL("http://localhost:3000/login/chance_pass");

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