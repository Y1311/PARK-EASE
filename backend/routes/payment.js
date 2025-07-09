const express = require('express');
const router = express.Router();
const db = require('../db');

// Handle payment processing
router.post('/pay', (req, res) => {
    const { user_id, amount, method } = req.body;

    if (!user_id || !amount || !method) {
        return res.status(400).json({ message: 'All fields required' });
    }

    const sql = 'INSERT INTO payments (user_id, amount, method) VALUES (?, ?, ?)';
    db.query(sql, [user_id, amount, method], (err, result) => {
        if (err) {
            console.error('Payment Error:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.json({ message: 'Payment Successful' });
    });
});

module.exports = router;
