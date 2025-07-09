const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Default password in XAMPP
    database: 'smart_parking'
});

db.connect(err => {
    if (err) {
        console.log('Database connection error:', err);
    } else {
        console.log('Database connected ✔');
    }
});

module.exports = db;
