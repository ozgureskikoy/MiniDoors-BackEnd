const express = require('express');
doorRouter = express.Router();
const middleWare = require('../middleWare/middleware');
const doorControls = require('../controllers/doorController');

doorRouter.post('/create', middleWare.tokenControl, doorControls.addDoor)

doorRouter.post('/open', middleWare.tokenControlDoor, doorControls.openDoor)

doorRouter.get('/', middleWare.tokenControlDoor, middleWare.controlDoor, doorControls.showDoors)


module.exports = doorRouter;