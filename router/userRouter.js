const express = require('express');
const userControl = require('../controllers/userController');

userRouter = express.Router();
const middleWare = require('../middleWare/middleware');

userRouter.post('/create', middleWare.tokenControl, middleWare.createControl, userControl.createUser)

userRouter.get('/all', middleWare.tokenControl, userControl.allUser)

userRouter.get('/find', middleWare.tokenControl, userControl.findUser)

userRouter.get('/find_byname', [], userControl.findUserByName)

userRouter.delete('/delete', middleWare.typeCheckMail, userControl.deleteUser)

userRouter.put('/status', middleWare.tokenControl, middleWare.typeCheckID, userControl.statusUpdate)

userRouter.put('/update', middleWare.typeCheckData, middleWare.tokenControl, userControl.editUser)



module.exports = userRouter;