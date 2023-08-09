const express = require('express');
permRouter = express.Router();
const middleWare = require('../middleWare/middleware');
const permissionControls = require('../controllers/permissionControls')

permRouter.post('/create', middleWare.tokenControl, permissionControls.createPermission)

permRouter.delete('/delete', middleWare.tokenControl,  permissionControls.deletePermission)


module.exports = permRouter;