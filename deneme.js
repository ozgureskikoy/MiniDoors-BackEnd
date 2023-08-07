const jwt = require('jsonwebtoken');

// Your secret key. It should be kept secret and never exposed to the client-side.
const secretKey = 'your-secret-key';

// Sample data to be encoded in the token payload
const userData = {
  id: 123,
  username: 'john_doe',
  role: 'admin',
};

// Create a new JWT token
const token = jwt.sign(userData, secretKey);

console.log('Generated Token:');
console.log(token);

// Verify and decode the JWT token
jwt.verify(token, secretKey, (err, decoded) => {
  if (err) {
    console.error('JWT Verification Error:', err.message);
  } else {
      console.log('\nDecoded Token (Payload):');
      console.log(secretKey);
      console.log(decoded.role);
      console.log(decoded);
  }
});
