const express = require('express');
const compadminControl = require('../controllers/admin/compadminControllers');

cadminRouter = express.Router();
const middleWare = require('../middleWare/middleware');

cadminRouter.post('/create', middleWare.tokenControl, compadminControl.createCompadmin)

cadminRouter.delete('/delete', middleWare.typeCheckMail, compadminControl.deleteCompadmin)

cadminRouter.post('/show', middleWare.tokenControl, compadminControl.showCompadmin)

module.exports = cadminRouter;