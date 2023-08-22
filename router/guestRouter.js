const express = require('express');
const guestControl = require('../controllers/guest/guestController');

guestRouter = express.Router();
const middleWare = require('../middleWare/middleware');

guestRouter.post('/create', middleWare.tokenControl, guestControl.createGuest)


guestRouter.delete('/delete', middleWare.typeCheckMail,guestControl.deleteGuest)




module.exports = guestRouter;