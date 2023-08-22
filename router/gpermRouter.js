const express = require('express');
gpermRouter = express.Router();
const middleWare = require('../middleWare/middleware');
const gpermissionControls = require('../controllers/guest/gpermissionController')

gpermRouter.post('/create', middleWare.tokenControl, middleWare.typeCheckMail, gpermissionControls.createPermission)

//gpermRouter.delete('/delete', middleWare.tokenControl, permissionControls.deletePermission)


module.exports = gpermRouter;