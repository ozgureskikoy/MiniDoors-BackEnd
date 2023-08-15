const express = require('express');
companyRouter = express.Router();
const middleWare = require('../middleWare/middleware');
const companyControls = require('../controllers/companyController');

companyRouter.post('/create', middleWare.typeCheckData, middleWare.tokenControl,companyControls.createCompany )

module.exports = companyRouter;