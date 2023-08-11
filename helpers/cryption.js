const bcrypt = require("bcrypt")
const crypto = require('crypto');
exports.hashPassword = async (plaintextPassword) => {
    const hash = await bcrypt.hash(plaintextPassword, 10);
}

exports.comparePassword = async (plaintextPassword, hash) => {
    const result = await bcrypt.compare(plaintextPassword, hash);
    console.log("pass compare = " + result);
    return result;
}



exports.generateRandomPassword = () => {
    const length = 10;
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const randomBytes = crypto.randomBytes(length);
    const password = Array.from(randomBytes)
        .map(byte => chars[byte % chars.length])
        .join('');

    return password;
}




