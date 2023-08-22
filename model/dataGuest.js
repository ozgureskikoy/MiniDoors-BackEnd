const bcrypt = require("bcrypt")
const cryption = require('../helpers/cryption');
const log = require('../helpers/logger');

const pool = require('./dbConfig.js');
pool.connect(function (err) {
  if (err) {
    throw err;
  }
})

exports.createGuest = async (name, surname, mail, admin_id, comp_id, admin_role) => {
    try {
      pass = cryption.generateRandomPassword(10);
      const hash = await bcrypt.hash(pass, 10);
      await pool.query(
        `INSERT INTO guests(name, surname, password, mail, ${admin_role}, company_id) VALUES($1, $2, $3, $4, $5, $6)`,
        [name, surname, hash, mail, admin_id, comp_id]
      );
      let response = {
        code: 200,
        payload: {
          msg: `Guest created successfully.`,
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

  exports.deleteGuest = async (index) => {
    try {
      const queryResult = await pool.query(
        `DELETE FROM guests WHERE mail = $1`,
        [index]
      );
  
      if (queryResult.rowCount > 0) {
        let response = {
          code: 200,
          payload: {
            msg: `Guest with index= ${index} deleted successfully.`
          }
        }
        return response;
      } else {
        let response = {
          code: 4044,
          payload: {
            msg: `Guest with index= ${index} not found.`
          }
        }
        return response;
      }
    } catch (error) {
      throw error;
    }
  };

  exports.readByMailGuest = async (index) => {

    try {
      const queryResult = await pool.query(
        `SELECT   id as id,
                  name as name,
                  password as password,
                  mail as mail,
                  admin_id as admin_id,
                  company_id as company_id
           FROM guests
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