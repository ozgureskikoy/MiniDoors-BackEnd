const express = require('express');
const compadminControl = require('../controllers/admin/compadminControllers');

cadminRouter = express.Router();
const middleWare = require('../middleWare/middleware');

cadminRouter.post('/create', middleWare.tokenControl, middleWare.createControl, compadminControl.createCompadmin)

cadminRouter.delete('/delete', middleWare.typeCheckMail, middleWare.tokenControl, compadminControl.deleteCompadmin)

cadminRouter.post('/show', middleWare.tokenControl, compadminControl.showCompadmin)

module.exports = cadminRouter;