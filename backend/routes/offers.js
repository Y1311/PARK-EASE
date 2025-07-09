const express = require('express');
const router = express.Router();
const db = require('../db');

// Get All Offers
router.get('/', (req, res) => {
    db.query('SELECT * FROM offers', (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

module.exports = router;
