// 🔒 Session Check
const user = localStorage.getItem('loggedInUser');
if (!user) {
    alert("Please login first!");
    window.location.href = "login.html";
}

// 🚗 Vehicle Registration Logic
document.getElementById('vehicleForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const ownerName = document.getElementById('ownerName').value.trim();
    const vehicleNumber = document.getElementById('vehicleNumber').value.trim();
    const entryTime = document.getElementById('entryTime').value;
    const exitTime = document.getElementById('exitTime').value;
    const duration = document.getElementById('duration').value.trim();

    if (!ownerName || !vehicleNumber || !entryTime || !exitTime || !duration) {
        alert("All fields are required.");
        return;
    }

    // ✅ Validate vehicle number (basic example)
    const vehicleRegex = /^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/;
    if (!vehicleRegex.test(vehicleNumber.toUpperCase())) {
        alert("Please enter a valid vehicle number (e.g., GJ05AB1234).");
        return;
    }

    const vehicleData = {
        ownerName,
        vehicleNumber,
        entryTime,
        exitTime,
        duration,
        userEmail: user
    };

    // Save to localStorage (simulate DB)
    let vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
    vehicles.push(vehicleData);
    localStorage.setItem('vehicles', JSON.stringify(vehicles));

    alert("Vehicle registered successfully!");
    document.getElementById('vehicleForm').reset();
});
