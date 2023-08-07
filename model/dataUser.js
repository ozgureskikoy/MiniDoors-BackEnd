const { write, read } = require('fs');

const cryption = require('../helpers/cryption');



const pool = require('./dbConfig.js');
pool.connect(function (err) {
  if (err) {
    throw err;
  }
  console.log('connnected');
})

exports.createUser = async (name, pass, mail, admin_id) => {
  try {
    await pool.query(
      `INSERT INTO users(name, password, mail, admin_id) VALUES($1, $2, $3, $4)`,
      [name, pass, mail, admin_id]
    );

    return "Data inserted successfully.";
  } catch (error) {
    throw error;
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
               status as status
        FROM users
      `);

    queryResult.rows.forEach((row) => {
      list.push({
        id: row.id,
        name: row.name,
        pass: row.password,
        mail: row.mail,
        status: row.status,
        admin_id: row.admin_id
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
                admin_id as admin_id
         FROM users
         WHERE key = $1`,
      [index]
    );

    const row = queryResult.rows[0];
    if (row) {
    
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

exports.readByNameUser = async (index) => {
 
  try {
    const queryResult = await pool.query(
      `SELECT key as id,
                name as name,
                password as password,
                mail as mail
         FROM users
         WHERE name = $1`,
      [index]
    );

    const row = queryResult.rows[0];
    if (row) {
   
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
    const resTable=result.rows.map(row => row.user_type);
    return resTable;
  } catch (error) {
    throw error;
  }
}


exports.logControlUser = async (mail, password) => {
  
  
  const b= await findUserTypeByEmail(mail);

  if (b=="user") {
  
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
            "id": row.admin_id,
            "name": row.name,
            "pass": row.password,
            "mail": row.mail,
            "status": row.status,
            "role": b[0]
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
  }else if (b=="admin") {
       console.log("CONTROL = "+b)
       console.log("CONTROL 2= "+b[0])

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
        console.log("YETER = "+ row.admin_id);
        if (passwordMatch) {
          return {
            "id": row.admin_id,
            "name": row.name,
            "pass": row.password,
            "mail": row.mail,
            "status": row.status,
            "admin_id":row.admin_id,
            "role": b[0]
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
  }
  
  
  else{
    return;
  }
  
};


exports.deleteUser = async (index) => {
  try {
    const queryResult = await pool.query(
      `DELETE FROM users WHERE key = $1`,
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

exports.updateUser = async (index, newData) => {
  try {
    const queryResult = await pool.query(
      `UPDATE users
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



exports.statusUpdateUser = async (index, newData) => {
  
  try {
    const queryResult = await pool.query(
      `UPDATE users
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


