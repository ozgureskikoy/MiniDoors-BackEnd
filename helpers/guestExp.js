const pool = require('../model/dbConfig');

async function checkTime() {
    console.log(">>>>>>Function<<<<<<<<");
    try {
    
        let db = await pool.connect();
        console.log("connection")
        const sql = 'SELECT check_and_delete_records();';
        const result = await db.query(sql);
        console.log('Function executed successfully');
        db.release()
    } catch (err) {
        console.error('İşlev çağrılırken hata oluştu:', err);
    }
}

module.exports = checkTime;
