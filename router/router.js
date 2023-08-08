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

userRouter.post('/user/create', middleWare.tokenControl, userControl.createUser)

userRouter.post('/admin/create', middleWare.typeCheckData, middleWare.tokenControl, adminControls.createAdmin)

userRouter.delete('/delete_user', middleWare.typeCheckID, middleWare.tokenControl,  userControl.deleteUser)

userRouter.delete('/delete_admin', middleWare.typeCheckID, middleWare.tokenControl,  adminControls.deleteAdmin)

userRouter.put('/update_user', middleWare.typeCheckData, middleWare.tokenControl, userControl.editUser)

userRouter.put('/update_admin', middleWare.typeCheckData, middleWare.tokenControl,  adminControls.editAdmin)

userRouter.put('/user_status', middleWare.tokenControl, middleWare.tokenControl, userControl.statusUpdate)

userRouter.put('/admin_status', middleWare.tokenControl, middleWare.tokenControl, adminControls.statusUpdateAdmin)

module.exports = userRouter;
