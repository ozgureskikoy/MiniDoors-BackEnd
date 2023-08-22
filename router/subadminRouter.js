const express = require('express');
const subadminControl = require('../controllers/admin/subadminController');

sadminRouter = express.Router();
const middleWare = require('../middleWare/middleware');

sadminRouter.post('/create', middleWare.tokenControl, subadminControl.createSubadmin)

sadminRouter.delete('/delete', middleWare.typeCheckMail, subadminControl.deleteSubadmin)

module.exports = sadminRouter;