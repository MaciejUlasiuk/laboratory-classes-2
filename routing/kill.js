const express = require('express');
const { getProcessLog } = require('../utils/logger');

const killRoutes = express.Router();

killRoutes.get('/', (req, res) => {
    getProcessLog('Serwer zostaje zatrzymany.');
    res.send('Serwer zostaje zamknięty.');
    process.exit(0);
});

module.exports = killRoutes;
