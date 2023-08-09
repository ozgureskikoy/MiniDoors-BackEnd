const express = require('express');
const userControl = require('../controllers/userControls');

userRouter = express.Router();
const middleWare = require('../middleWare/middleware');

userRouter.post('/create', middleWare.tokenControl, userControl.createUser)

userRouter.get('/all', middleWare.tokenControl, userControl.allUser)

userRouter.get('/find', middleWare.tokenControl, userControl.findUser)

userRouter.get('/find_byname', middleWare.tokenControl, userControl.findUserByName)

userRouter.delete('/delete', middleWare.typeCheckID, middleWare.tokenControl,  userControl.deleteUser)

userRouter.put('/status', middleWare.tokenControl,middleWare.typeCheckID , userControl.statusUpdate)

userRouter.put('/update', middleWare.typeCheckData, middleWare.tokenControl, userControl.editUser)

module.exports = userRouter;