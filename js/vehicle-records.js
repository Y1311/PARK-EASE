// 🔒 Admin Check
const user = localStorage.getItem('loggedInUser');
if (user !== 'admin@gmail.com') {
    alert("Access denied. Admins only.");
    window.location.href = "login.html";
}

// 🚗 Load Vehicle Data
let vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];

const vehicleContainer = document.getElementById('vehicleList');

renderVehicles();

// 🗒️ Render Vehicle Records
function renderVehicles() {
    if (vehicles.length === 0) {
        vehicleContainer.innerHTML = `<p>No vehicle records found.</p>`;
        return;
    }

    let html = `<table>
        <tr>
            <th>Record ID</th>
            <th>Owner Name</th>
            <th>Vehicle Number</th>
            <th>Entry Date</th>
            <th>Exit Date</th>
            <th>Parking Duration</th>
            <th>Action</th>
        </tr>`;

    vehicles.forEach(vehicle => {
        html += `
            <tr>
                <td>${vehicle.id}</td>
                <td>${vehicle.ownerName}</td>
                <td>${vehicle.vehicleNumber}</td>
                <td>${vehicle.entryDate}</td>
                <td>${vehicle.exitDate}</td>
                <td>${vehicle.parkingDuration}</td>
                <td>
                    <button onclick="deleteVehicle(${vehicle.id})" style="background-color:#ff5050;">Delete</button>
                </td>
            </tr>
        `;
    });

    html += `</table>`;
    vehicleContainer.innerHTML = html;
}

// ❌ Delete Vehicle Record
function deleteVehicle(id) {
    const confirmDelete = confirm('Are you sure you want to delete this vehicle record?');
    if (!confirmDelete) return;

    vehicles = vehicles.filter(v => v.id !== id);
    localStorage.setItem('vehicles', JSON.stringify(vehicles));

    alert('Vehicle record deleted successfully!');
    renderVehicles();
}
