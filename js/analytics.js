// 🔒 Admin Check
const user = localStorage.getItem('loggedInUser');
if (user !== 'admin@gmail.com') {
    alert("Access denied. Admins only.");
    window.location.href = "login.html";
}

// 📦 Load Data
const slots = JSON.parse(localStorage.getItem('slots')) || [];
const users = JSON.parse(localStorage.getItem('users')) || [];
const payments = JSON.parse(localStorage.getItem('payments')) || [];
const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];

// 📈 Compute Analytics
const totalSlots = slots.length;
const bookedSlots = slots.filter(slot => slot.status === 'booked').length;
const totalUsers = users.length;
const totalPayments = payments.reduce((sum, p) => sum + Number(p.amount), 0);
const totalFeedback = feedbacks.length;

// 📊 Display Analytics
document.getElementById('totalSlots').innerText = totalSlots;
document.getElementById('bookedSlots').innerText = bookedSlots;
document.getElementById('totalUsers').innerText = totalUsers;
document.getElementById('totalPayments').innerText = totalPayments;
document.getElementById('totalFeedback').innerText = totalFeedback;
