const express = require('express');
adminRouter = express.Router();
const middleWare = require('../middleWare/middleware');
const adminControls = require('../controllers/admin/adminController');
const { compare } = require('bcrypt');

adminRouter.post('/create', middleWare.typeCheckData, middleWare.tokenControl, adminControls.createAdmin)

adminRouter.delete('/delete', middleWare.typeCheckMail, middleWare.tokenControl, adminControls.deleteAdmin)

adminRouter.put('/update', middleWare.typeCheckData, middleWare.typeCheckMail, middleWare.tokenControl, adminControls.editAdmin)

adminRouter.put('/status', middleWare.tokenControl, middleWare.typeCheckMail, adminControls.statusUpdateAdmin)

module.exports = adminRouter;
