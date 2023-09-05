const pool = require('./dbConfig.js');

exports.createLog = async (opener_id, door_id, opener_role) => {
  try {
    const currentDate = new Date();
    const timestamp = Math.floor(Date.parse(currentDate) / 1000);
    console.log("HERE");
    console.log("opener => ",opener_id);
    console.log("opener role => ",opener_role);
    console.log("door => ",door_id);
    await pool.query(
      `INSERT INTO logs (time, ${opener_role}, door_id) VALUES ($1, $2, $3)`,
      [timestamp, opener_id, door_id]
    );
    let response = {
      code: 200,
      payload: {
        msg: `Log created successfully.`,
      }
    }
    console.log(`Log created successfully.`);
    return response;
  } catch (error) {
    let response = {
      code: 4046,
      payload: {
        msg: "Log can not created",
        err: error
      }
    }
    return response;
  }
};

exports.getLogs = async (pageSize, page, sortColumn = 'time', sortOrder = 'desc') => {
  try {
    const offset = page * pageSize;
    const queryResult = await pool.query(
      `SELECT * FROM logs ORDER BY ${sortColumn} ${sortOrder} LIMIT ${pageSize} OFFSET ${offset}`
    );

    return {
      code: 200,
      msg: 'Logs fetched successfully.',
      logs: queryResult.rows
    };
  } catch (error) {
    console.log(error);
    return {
      code: 5000,
      payload: {
        msg: 'Internal server errorr.',
        err: error
      }
    };
  }
};
