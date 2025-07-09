// 🔒 Session Check
const user = localStorage.getItem('loggedInUser');
if (!user) {
    alert("Please login first!");
    window.location.href = "login.html";
}

// 📑 Load Booking History
const slots = JSON.parse(localStorage.getItem('slots')) || [];
const userBookings = slots.filter(slot => slot.user === user);

const bookingContainer = document.getElementById('bookingHistory');

if (userBookings.length > 0) {
    let bookingHTML = `<table>
        <tr>
            <th>Slot ID</th>
            <th>Location</th>
            <th>Status</th>
        </tr>`;

    userBookings.forEach(slot => {
        bookingHTML += `
            <tr>
                <td>${slot.id}</td>
                <td>${slot.location}</td>
                <td>${slot.status}</td>
            </tr>`;
    });

    bookingHTML += `</table>`;
    bookingContainer.innerHTML = bookingHTML;
} else {
    bookingContainer.innerHTML = `<p>No booking history found.</p>`;
}

// 💳 Load Payment History
const payments = JSON.parse(localStorage.getItem('payments')) || [];
const userPayments = payments.filter(p => p.userEmail === user);

const paymentContainer = document.getElementById('paymentHistory');

if (userPayments.length > 0) {
    let paymentHTML = `<table>
        <tr>
            <th>Payment ID</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
            <th>Date</th>
        </tr>`;

    userPayments.forEach(payment => {
        paymentHTML += `
            <tr>
                <td>${payment.id}</td>
                <td>₹${payment.amount}</td>
                <td>${payment.paymentMethod}</td>
                <td>${payment.paymentStatus}</td>
                <td>${payment.date}</td>
            </tr>`;
    });

    paymentHTML += `</table>`;
    paymentContainer.innerHTML = paymentHTML;
} else {
    paymentContainer.innerHTML = `<p>No payment history found.</p>`;
}
