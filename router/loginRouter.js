const express = require('express');
const loginControl = require('../controllers/loginController');

loginRouter = express.Router();
const middleWare = require('../middleWare/middleware');

loginRouter.put('/forgot_pass', [], loginControl.forgotPass)

loginRouter.put('/chance_pass', [], loginControl.changePass)

loginRouter.post('/', [], loginControl.checkLogin)

loginRouter.post('/control', [], loginControl.loginUser)


module.exports = loginRouter;