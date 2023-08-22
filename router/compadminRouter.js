const express = require('express');
const compadminControl = require('../controllers/admin/compadminControllers');

cadminRouter = express.Router();
const middleWare = require('../middleWare/middleware');

cadminRouter.post('/create', middleWare.tokenControl, compadminControl.createCompadmin)

cadminRouter.delete('/delete', middleWare.typeCheckMail, compadminControl.deleteCompadmin)

module.exports = cadminRouter;