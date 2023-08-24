const pool = require('../model/dbConfig');

async function checkTime() {
    console.log(">>>>>>Function<<<<<<<<");
    try {
        await pool.connect();
        const sql = 'SELECT check_and_delete_records();';
        await pool.query(sql);
        console.log('İşlev çalıştırıldı.');
    } catch (err) {
        console.error('İşlev çağrılırken hata oluştu:', err);
    }
}

module.exports = checkTime;
