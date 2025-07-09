const express = require('express');
const router = express.Router();
const db = require('../db');

// Submit Feedback
router.post('/submit', (req, res) => {
    const { user_id, rating, comments } = req.body;
    const sql = 'INSERT INTO feedback (user_id, rating, comments) VALUES (?, ?, ?)';
    db.query(sql, [user_id, rating, comments], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Feedback submitted successfully' });
    });
});

// Get All Feedback
router.get('/', (req, res) => {
    db.query('SELECT * FROM feedback', (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

module.exports = router;
