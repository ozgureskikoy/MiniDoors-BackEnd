const sqlite3 = require('sqlite3').verbose();
const cryption = require('../helpers/cryption');

const pool = require('./dbConfig');
const { response } = require('express');


exports.createCompany = async (name, admin_id) => {
  try {
    await pool.query(
      `INSERT INTO company(name, admin_id) VALUES($1, $2)`,
      [name, admin_id]
    );
    let response = {
      code: 200,
      payload: {
        msg: `Company created successfully.`
      }

    }
    return response;
  } catch (error) {
    let response = {
      code: 4046,
      payload: {
        msg: error.detail
      }
    }
    return response;

  }
};

exports.readByNameCompany = async (index) => {

  try {
    const queryResult = await pool.query(
      `SELECT id as id,
                  name as name  
           FROM company
           WHERE name = $1`,
      [index]
    );

    const row = queryResult.rows[0];
    if (row) {
      let response = {
        code: 200,
        payload: {
          msg: "Company Found",
          id: row.id
        }
      }
      return response

    } else {
      let response = {
        code: 4044,
        payload: {
          msg: "Company Not Found",
        }
      }
      return response
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
};