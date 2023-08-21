const perm = require('./dataPermission');
const user = require('../controllers/userController')
const door = require('../controllers/doorController')
const pool = require('./dbConfig.js');
pool.connect(function (err) {
  if (err) {
    throw err;
  }
})

exports.addDoor = async (name, admin_id, comp_id, admin_role) => {
  try {
    await pool.query(
      `INSERT INTO doors(name, ${admin_role}, company_id) VALUES($1, $2, $3)`,
      [name, admin_id, comp_id]
    );
    let response = {
      code: 200,
      payload: {
        msg: `Door added successfully.`
      }
    }
    return response;
  } catch (error) {
    let response = {
      code: 4046,
      payload: {
        msg: "cannot add " + error.detail,
        err: error
      }
    }
    console.log(error);
    return response;

  }
};


exports.readByNameDoors = async (index) => {

  try {
    const queryResult = await pool.query(
      `SELECT     id as id,
                  name as name,
                  company_id as comp_id  
           FROM doors
           WHERE name = $1`,
      [index]
    );

    const row = queryResult.rows[0];
    if (row) {

      return {
        code: 200,
        payload: {
          id: row.id,
          comp_id: row.comp_id,
          name: row.name,
          msg: "Door found"
        }
      };

    } else {
      return {
        code: 4044,
        payload: {
          msg: "Door not found"
        }
      };
    }
  } catch (error) {
    return {
      code: 5000,
      payload: {
        msg: error
      }
    };
  }
};


exports.openDoor = async (user_name, door_name) => {

  const doors = await door.findDoorByName(door_name);
  const users = await user.findUserByMail(user_name);
  
  const sqlResponse = await perm.findPermission(users.id, doors.payload.id);
  if (sqlResponse.code == 200) {

    const fetchedDay = sqlResponse.allowed_days;

    const startHour = sqlResponse.allowed_hours_start;
    const endHour = sqlResponse.allowed_hours_end;
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();
    const fullDate = `${date}.${month}.${year}`;
    const utcHours = today.getHours();
    const utcMinutes = today.getMinutes();
    const utcSeconds = today.getSeconds();

    const currentHour = `${String(utcHours).padStart(2, '0')}:${String(utcMinutes).padStart(2, '0')}:${String(utcSeconds).padStart(2, '0')}`;

    if (fetchedDay.includes(today.getDay()) && (currentHour >= startHour && currentHour <= endHour)) {

      let response = {
        code: 200,
        payload: {
          msg: "Door open",
          user: users.name,
          door: doors.payload.name,
          user_id: users.id,
          door_id: doors.payload.id,
          time: currentHour,
          date: fullDate
        }
      };
      return response;

    } else {

      let response = {
        code: 4046,
        payload: {
          msg: "User dont have permission at this moment"
        }
      };
      return response;
    }
  } else {
    let response = {
      code: 4044,
      payload: {
        msg: "User dont have permission"
      }
    };
    return response;
  }
};








