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

exports.createSAdmin = async (name, pass, mail) => {
    try {
      await pool.query(
        `INSERT INTO super_admin(name, password, mail) VALUES($1, $2, $3)`,
        [name, pass, mail]
      );
  
      return "Data inserted successfully.";
    } catch (error) {
      throw error;
    }
  };


exports.readAllSAdmin = async () => {
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
        FROM super_admin
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
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
};

exports.readSAdmin = async (index) => {
    try {
      const queryResult = await pool.query(
        `SELECT id as id,
                name as name,
                password as password,
                mail as mail
         FROM super_admin
         WHERE id = $1`,
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

exports.readByNameSAdmin = async (index) => {
    console.log(`index=${index}`);
    try {
      const queryResult = await pool.query(
        `SELECT id as id,
                name as name,
                password as password,
                mail as mail
         FROM super_admin
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
  

exports.logControlSAdmin = async (mail, password) => {
    console.log(`1mail=${mail} pass=${password}`);
  
    try {
      const queryResult = await pool.query(
        `SELECT *
         FROM super_admin
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
            "status": row.status
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


exports.deleteSAdmin = async (index) => {
    try {
      const queryResult = await pool.query(
        `DELETE FROM super_admin WHERE id = $1`,
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

  exports.updateSAdmin = async (index, newData) => {
    try {
      const queryResult = await pool.query(
        `UPDATE super_admin
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



  exports.statusUpdateSAdmin = async (index, newData) => {
    try {
      const queryResult = await pool.query(
        `UPDATE super_admin
         SET status = $1
         WHERE id = $2`,
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


