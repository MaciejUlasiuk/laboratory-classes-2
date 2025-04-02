// 🏗 Structo the Builder
// Do wysłania pliku możesz wykorzystać, response.sendFile(path.join(__dirname, "../views", "home.html"));

const express = require('express');
const path = require('path');

const homeRouting = express.Router();

homeRouting.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/home.html'));
});

module.exports = homeRouting;
