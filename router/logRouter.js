const express = require('express');
logRouter = express.Router();
const logControls = require('../controllers/logConstrols')

logRouter.get('/find', [], logControls.getLogs)




module.exports = logRouter;