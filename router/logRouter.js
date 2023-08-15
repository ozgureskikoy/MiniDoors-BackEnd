const express = require('express');
logRouter = express.Router();
const logControls = require('../controllers/logConstroller')

logRouter.get('/find', [], logControls.getLogs)




module.exports = logRouter;