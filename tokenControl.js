let jwt = require('jsonwebtoken');
global.config = require('./config');



exports.compareRole = (token) => {
    return new Promise((resolve, reject) => {
   jwt.verify(token, global.config.secretKey, (err, decoded) => {
        if (err) {
          console.error('JWT Verification Error:', err.message);
          reject(err);
        } else {
          console.log('\nDecoded Token (Payload):', decoded);
          resolve(decoded);
        
        }
      });
    });
  };

exports.tokenCreate =  (userdata)=>{
    let token = jwt.sign(userdata, global.config.secretKey, {
        algorithm: global.config.algorithm,
        expiresIn: '7d'
      });

      return token;
}

