// 🔒 Session Check
const user = localStorage.getItem('loggedInUser');
if (!user) {
    alert("Please login first!");
    window.location.href = "login.html";
}

// 🎁 Sample Offers Data
const offers = [
    {
        id: 1,
        title: "First Booking Discount",
        description: "Get 20% off on your first parking slot booking.",
        code: "FIRST20",
        expiry: "31-Dec-2025"
    },
    {
        id: 2,
        title: "Weekend Offer",
        description: "Flat ₹50 off on bookings on Saturday and Sunday.",
        code: "WEEKEND50",
        expiry: "31-Dec-2025"
    },
    {
        id: 3,
        title: "Pay with UPI",
        description: "Get ₹30 cashback when you pay using UPI.",
        code: "UPI30",
        expiry: "31-Dec-2025"
    },
    {
        id: 4,
        title: "Long Duration Parking",
        description: "10% off if parking duration is more than 6 hours.",
        code: "LONG10",
        expiry: "31-Dec-2025"
    }
];

// 📑 Display Offers
const container = document.getElementById('offersContainer');

container.innerHTML = offers.map(offer => `
    <div class="offer-card">
        <h3>${offer.title}</h3>
        <p>${offer.description}</p>
        <div class="offer-code">Code: ${offer.code}</div>
        <p><strong>Valid Till:</strong> ${offer.expiry}</p>
    </div>
`).join('');
