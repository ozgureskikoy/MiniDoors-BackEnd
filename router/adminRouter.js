const express = require('express');
adminRouter = express.Router();
const middleWare = require('../middleWare/middleware');
const adminControls = require('../controllers/adminControls')

adminRouter.post('/create', middleWare.typeCheckData, middleWare.tokenControl, adminControls.createAdmin)

adminRouter.delete('/delete', middleWare.typeCheckID, middleWare.tokenControl,  adminControls.deleteAdmin)

adminRouter.put('/update', middleWare.typeCheckData, middleWare.tokenControl,  adminControls.editAdmin)

adminRouter.put('/status', middleWare.tokenControl, middleWare.typeCheckID , adminControls.statusUpdateAdmin)

module.exports = adminRouter;