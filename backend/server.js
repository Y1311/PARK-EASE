const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');

// Middleware
app.use(cors());
app.use(express.json());

// Default Route
app.get('/', (req, res) => {
    res.send('Smart Parking Backend is Running 🚀');
});

// Import API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/slots', require('./routes/slots'));
app.use('/api/reservations', require('./routes/reservations'));
app.use('/api/payments', require('./routes/payment'));
app.use('/api/feedback', require('./routes/feedback'));
app.use('/api/offers', require('./routes/offers'));

// Start Server
app.listen(5000, () => {
    console.log('Server running at http://localhost:5000');
});
