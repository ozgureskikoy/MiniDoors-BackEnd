const express = require('express');
doorRouter = express.Router();
const middleWare = require('../middleWare/middleware');
const doorControls = require('../controllers/doorControls');

doorRouter.post('/create', middleWare.tokenControl, doorControls.addDoor)

module.exports = doorRouter;