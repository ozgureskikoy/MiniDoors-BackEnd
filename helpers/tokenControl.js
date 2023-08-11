let jwt = require('jsonwebtoken');
global.config = require('./tokenConfig');
const controlToken = require('../controllers/userControls.js');
exports.compareRole = async (token) => {
  try {
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, global.config.secretKey, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });

    return decoded;
  } catch (error) {
    return error;
  }
};

exports.tokenCreate = (userdata) => {
  let token = jwt.sign(userdata, global.config.secretKey, {
    algorithm: global.config.algorithm,
    expiresIn: '7d'
  });

  return token;
}
exports.tokenRead = async (token) => {
  try {
    const accessToken = token;
 
    const decodedToken = await this.compareRole(accessToken);
  
    return await decodedToken.id;

  } catch (error) {
    console.error('Error:', error);
  }
}
