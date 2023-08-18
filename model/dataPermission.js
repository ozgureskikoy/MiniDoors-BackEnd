const { log } = require('console');
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
      payload: {
        msg: `Permission created successfully.`
      }
    }
    return response;
  } catch (error) {
    let response = {
      code: 4046,
      payload: {
        err: error
      }
    }
    console.log(error)
    return response;

  }
};


exports.findPermission = async (user_id, door_id) => {
  
  try {
    const queryResult = await pool.query(
      `SELECT id as id,
                  user_id as user_id,
                  door_id as door_id,
                  allowed_days as allowed_days,
                  allowed_hours_start as allowed_hours_start,
                  allowed_hours_end as allowed_hours_end
           FROM permission
           WHERE user_id = $1 AND door_id = $2`,
      [user_id, door_id]
    );

    const row = queryResult.rows[0];
    if (row) {
      return {
        code: 200,
        meta: "This user have a permission on this door",
        allowed_days: row.allowed_days,
        allowed_hours_start: row.allowed_hours_start,
        allowed_hours_end: row.allowed_hours_end
      };
    } else {
      console.log("This user dont have a permission on this door");
      return {
        code: 4046,
        payload:{
          meta: "This user dont have a permission on this door"
        }

      };
    }
  } catch (error) {
    return error;
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
      payload: {
        msg: "Permission deleted successfully."
      }
    };
  } catch (error) {
    console.log(error);
    return {
      code: 500,
      payload: {
        msg: "Error deleting permission.",
        err: error
      }
    };
  }
};




