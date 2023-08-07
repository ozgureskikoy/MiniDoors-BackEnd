const express = require('express');
const userControl = require('../controllers/userControls');
userRouter = express.Router();
const middleWare = require('../middleWare/middleware');
const adminControls = require('../controllers/adminControls')

userRouter.get('/', (req, res) => {
    res.json({ message: 'Kullanıcı listesi için /user/' })
});

userRouter.post('/login', [], userControl.loginUser)

userRouter.get('/user', middleWare.tokenControl, userControl.allUser)

userRouter.get('/find_user', middleWare.tokenControl, userControl.findUser)

userRouter.get('/find_username', middleWare.tokenControl, userControl.findUserByName)

userRouter.post('/user/create', middleWare.typeCheckData, adminControls.createUser)

userRouter.delete('/delete_user', middleWare.typeCheckID, middleWare.tokenControl, adminControls.deleteUser)

userRouter.put('/update_user', middleWare.typeCheckData, middleWare.tokenControl, adminControls.editUser)

userRouter.put('/user_status', [], adminControls.statusUpdate)

module.exports = userRouter;
