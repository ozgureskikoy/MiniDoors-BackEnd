
const pool = require('./dbConfig.js');
pool.connect(function (err) {
  if (err) {
    throw err;
  }
})

exports.addDoor = async (name, admin_id, comp_id) => {
  try {
    await pool.query(
      `INSERT INTO doors(name, admin_id, company_id) VALUES($1, $2, $3)`,
      [name, admin_id, comp_id]
    );
    let response = {
      code: 200,
      msg: `Door added successfully.`
    }
    return response;
  } catch (error) {
    let response = {
      code: 4046,
      msg: "cannot add " + error.detail
    }
    console.log(error);
    return response;

  }
};


exports.readByNameDoors = async (index) => {

  try {
    const queryResult = await pool.query(
      `SELECT door_id as id,
                  name as name,
                  company_id as comp_id  
           FROM doors
           WHERE name = $1`,
      [index]
    );

    const row = queryResult.rows[0];
    if (row) {

      return {
        id: row.id,
        comp_id: row.comp_id
      };

    } else {
      return;
    }
  } catch (error) {
    throw error;
  }
};