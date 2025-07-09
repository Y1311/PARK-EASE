const express = require('express');
const router = express.Router();
const db = require('../db');

// Get All Slots
router.get('/', (req, res) => {
    db.query('SELECT * FROM slots', (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

// Book Slot
router.post('/book', (req, res) => {
    const { slot_id, user_id } = req.body;
    const sql = 'UPDATE slots SET status = "booked", user_id = ? WHERE id = ? AND status = "available"';
    db.query(sql, [user_id, slot_id], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.affectedRows === 0) {
            return res.status(400).json({ message: 'Slot already booked or does not exist' });
        }
        res.json({ message: 'Slot booked successfully' });
    });
});

// Cancel Slot
router.post('/cancel', (req, res) => {
    const { slot_id } = req.body;
    const sql = 'UPDATE slots SET status = "available", user_id = NULL WHERE id = ?';
    db.query(sql, [slot_id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Slot cancelled successfully' });
    });
});

module.exports = router;
