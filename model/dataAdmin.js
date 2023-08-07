const { write, read } = require('fs');

const sqlite3 = require('sqlite3').verbose();
const cryption = require('../helpers/cryption');

const pool = require('./dbConfig');

pool.connect(function (err) {
    if (err) {
        throw err;
    }
    console.log('connnected');
})

exports.createAdmin = async (name, pass, mail) => {
    try {
      await pool.query(
        `INSERT INTO admin(name, password, mail) VALUES($1, $2, $3)`,
        [name, pass, mail]
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
               status as status
        FROM admin
      `);

        queryResult.rows.forEach((row) => {
            list.push({
                id: row.admin_id,
                name: row.name,
                pass: row.password,
                mail: row.mail,
                status: row.status
                
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


