const express = require('express');
const { getProcessLog } = require('../utils/logger');

const killRouter = express.Router();

killRouter.get('/', (req, res) => {
    getProcessLog('Serwer zostaje zatrzymany.');
    res.send('Serwer zostaje zamknięty.');
    process.exit(0);
});

module.exports = killRouter;
