CREATE DATABASE smart_parking;
USE smart_parking;

-- Users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100)
);

-- Slots
CREATE TABLE slots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    location VARCHAR(100),
    status VARCHAR(20) DEFAULT 'available',
    user_id INT
);

-- Payments
CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    reservation_id INT,
    amount DECIMAL(10,2),
    payment_method VARCHAR(50),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Feedback
CREATE TABLE feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    rating INT,
    comments TEXT
);
