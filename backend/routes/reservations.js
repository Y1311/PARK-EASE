const express = require('express');
const router = express.Router();
const db = require('../db');

// Get User Reservations
router.get('/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    const sql = 'SELECT * FROM reservations WHERE user_id = ?';
    db.query(sql, [user_id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

// Add Reservation
router.post('/add', (req, res) => {
    const { user_id, slot_id, booking_date } = req.body;
    const sql = 'INSERT INTO reservations (user_id, slot_id, booking_date) VALUES (?, ?, ?)';
    db.query(sql, [user_id, slot_id, booking_date], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Reservation added successfully' });
    });
});

module.exports = router;
