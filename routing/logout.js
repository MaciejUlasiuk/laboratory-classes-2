const express = require('express');
const path = require('path');

const logoutRouter = express.Router();

logoutRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/logout.html'));
});

module.exports = logoutRouter;
