const pool = require('./dbConfig.js');
pool.connect(function (err) {
  if (err) {
    throw err;
  }
})

exports.createPermission = async (user_id, door_id, allowed_days, allowed_hours_start, allowed_hours_end, exp_time) => {
  try {
    await pool.query(
      `INSERT INTO guest_permission(guest_id, door_id, allowed_days, allowed_hours_start, allowed_hours_end, exp_time) VALUES($1, $2, $3, $4, $5, $6)`,
      [user_id, door_id, allowed_days, allowed_hours_start, allowed_hours_end, exp_time]
    );
    let response = {
      code: 200,
      payload: {
        msg: `Guest Permission created successfully.`
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
                    guest_id as guest_id,
                    door_id as door_id,
                    allowed_days as allowed_days,
                    allowed_hours_start as allowed_hours_start,
                    allowed_hours_end as allowed_hours_end
             FROM guest_permission
             WHERE guest_id = $1 AND door_id = $2`,
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
        payload: {
          meta: "This user dont have a permission on this door"
        }

      };
    }
  } catch (error) {
    return error;
  }
};