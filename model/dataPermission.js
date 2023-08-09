const pool = require('./dbConfig.js');
pool.connect(function (err) {
  if (err) {
    throw err;
  }
})

exports.createPermission = async (user_id, door_id, allowed_days, allowed_hours_start, allowed_hours_end) => {
  try {
    await pool.query(
      `INSERT INTO permission(user_id, door_id, allowed_days, allowed_hours_start, allowed_hours_end) VALUES($1, $2, $3, $4, $5)`,
      [user_id, door_id, allowed_days, allowed_hours_start, allowed_hours_end]
    );
    let response = {
      code: 200,
      msg: `Permission created successfully.`
    }
    return response;
  } catch (error) {
    let response = {
      code: 4046,
      msg: " a " + error
    }
    console.log(error)
    return response;

  }
};


exports.findPermission = async (user_id, door_id) => {

  try {
    const queryResult = await pool.query(
      `SELECT permission_id as permission_id,
                  user_id as user_id,
                  door_id as door_id
           FROM permission
           WHERE user_id = $1 AND door_id = $2`,
      [user_id, door_id]
    );

    const row = queryResult.rows[0];
    if (row) {
      console.log("row = " + row.permission_id)
      return {
        "code": 4044,
        "meta": "This user have a permission on this door"
      };
    } else {

      return {
        "code": 200,

      };
    }
  } catch (error) {
    throw error;
  }
};

exports.deletePermission = async (user_id, door_id) => {
  try {
    await pool.query(
      `DELETE FROM permission WHERE user_id = $1 AND door_id = $2`,
      [user_id, door_id]
    );
    return {
      code: 200,
      msg: "Permission deleted successfully."
    };
  } catch (error) {
    console.log(error);
    return {
      code: 500,
      msg: "Error deleting permission."
    };
  }
};




