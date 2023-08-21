let jwt = require('jsonwebtoken');
global.config = require('./tokenConfig');
const controlToken = require('../controllers/userController.js');


exports.compareRole = async (token) => {
  try {
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, global.config.secretKey, (err, decoded) => {
        if (err) {
          console.log("control==> "+err);
          reject(err).code(404);
          
        } else {
          resolve(decoded).code(200);
        }
      });
    });
    return decoded;
  } catch (error) {
    return error;
  }
};

exports.tokenCreate = (userdata,expiresIn) => {
  let token = jwt.sign(userdata, global.config.secretKey, {
    algorithm: global.config.algorithm,
    expiresIn: expiresIn
  });

  return token;
}
exports.tokenRead = async (token) => {
  try {
    const accessToken = token;
 
    const decodedToken = await this.compareRole(accessToken);
  
    return await decodedToken;

  } catch (error) {
    console.error('Error:', error);
  }
}
