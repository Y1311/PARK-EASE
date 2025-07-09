// 🔒 Session Check
const user = localStorage.getItem('loggedInUser');
if (!user) {
    alert("Please login first!");
    window.location.href = "login.html";
}

// 💳 Payment Logic
document.getElementById('paymentForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const amount = document.getElementById('amount').value.trim();
    const paymentMethod = document.getElementById('paymentMethod').value;

    if (!amount || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    if (!paymentMethod) {
        alert('Please select a payment method.');
        return;
    }

    const payment = {
        id: Date.now(),
        userEmail: user,
        amount,
        paymentMethod,
        paymentStatus: 'Success',
        date: new Date().toLocaleString()
    };

    // Save Payment to localStorage (simulate DB)
    let payments = JSON.parse(localStorage.getItem('payments')) || [];
    payments.push(payment);
    localStorage.setItem('payments', JSON.stringify(payments));

    alert('Payment successful!');
    document.getElementById('paymentForm').reset();
});
