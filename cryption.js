const bcrypt = require("bcrypt")

exports.hashPassword = async (plaintextPassword) => {
    const hash = await bcrypt.hash(plaintextPassword, 10);
}

exports.comparePassword = async (plaintextPassword, hash) => {
    const result = await bcrypt.compare(plaintextPassword, hash);
    console.log("aaaa" + " " + result);
    return result;
}

