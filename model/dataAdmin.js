const { write, read } = require('fs');

const sqlite3 = require('sqlite3').verbose();
const cryption = require('../cryption');

const pool = require('./dbConfig');

pool.connect(function (err) {
    if (err) {
        throw err;
    }
    console.log('connnected');
})

exports.createAdmin = async (name, pass, mail, super_admin_id) => {
    try {
      await pool.query(
        `INSERT INTO admin(name, password, mail, super_admin_id) VALUES($1, $2, $3, $4)`,
        [name, pass, mail, super_admin_id]
      );
  
      return "Data inserted successfully.";
    } catch (error) {
      throw error;
    }
  };


exports.readAllAdmin = async () => {
    let client;
    try {
        client = await pool.connect();
        const list = [];
        const queryResult = await client.query(`
        SELECT admin_id as id,
               name as name,
               password as password,
               mail as mail,
               status as status,
               super_admin_id as super_admin_id
        FROM admin
      `);

        queryResult.rows.forEach((row) => {
            list.push({
                id: row.admin_id,
                name: row.name,
                pass: row.password,
                mail: row.mail,
                status: row.status,
                super_admin_id:row.super_admin_id
            });
        });

        console.log(list);
        return list;
    } catch (error) {
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
};

exports.readAdmin = async (index) => {
    try {
      const queryResult = await pool.query(
        `SELECT admin_id as id,
                name as name,
                password as password,
                mail as mail
         FROM admin
         WHERE key = $1`,
        [index]
      );
  
      const row = queryResult.rows[0];
      if (row) {
        console.log(`${row.id} ${row.name}`);
        return [{
          "id": row.id,
          "name": row.name,
          "pass": row.password,
          "mail": row.mail
        }];
      } else {
        return [];
      }
    } catch (error) {
      throw error;
    }
  };

exports.readByNameAdmin = async (index) => {
    console.log(`index=${index}`);
    try {
      const queryResult = await pool.query(
        `SELECT admin_id as id,
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
        return [{
          "id": row.id,
          "name": row.name,
          "pass": row.password,
          "mail": row.mail
        }];
      } else {
        return [];
      }
    } catch (error) {
      throw error;
    }
  };
  

exports.logControlAdmin = async (mail, password) => {
    console.log(`1mail=${mail} pass=${password}`);
  
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
            "id": row.id,
            "name": row.name,
            "pass": row.password,
            "mail": row.mail,
            "status": row.status,
            "super_admin_id":row.super_admin_id
          };
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  };


exports.deleteAdmin = async (index) => {
    try {
      const queryResult = await pool.query(
        `DELETE FROM admin WHERE key = $1`,
        [index]
      );
  
      if (queryResult.rowCount > 0) {
        return `User with index=${index} deleted successfully.`;
      } else {
        return `User with index=${index} not found.`;
      }
    } catch (error) {
      throw error;
    }
  };

  exports.updateAdmin = async (index, newData) => {
    try {
      const queryResult = await pool.query(
        `UPDATE admin
         SET name = $1
         WHERE key = $2`,
        [newData, index]
      );
  
      if (queryResult.rowCount > 0) {
        return "Data updated successfully.";
      } else {
        return "User with the specified index not found.";
      }
    } catch (error) {
      throw error;
    }
  };



  exports.statusUpdateAdmin = async (index, newData) => {
    try {
      const queryResult = await pool.query(
        `UPDATE admin
         SET status = $1
         WHERE key = $2`,
        [newData, index]
      );
  
      if (queryResult.rowCount > 0) {
        return "Status updated successfully.";
      } else {
        return "User with the specified index not found.";
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


