// 🔒 Admin Check
const user = localStorage.getItem('loggedInUser');
if (user !== 'admin@gmail.com') {
    alert("Access denied. Admins only.");
    window.location.href = "login.html";
}

// 🚗 Load Slots Data
let slots = JSON.parse(localStorage.getItem('slots')) || [];

const reservationContainer = document.getElementById('reservationList');

renderReservations();

function renderReservations() {
    const bookedSlots = slots.filter(slot => slot.status === 'booked');

    if (bookedSlots.length === 0) {
        reservationContainer.innerHTML = `<p>No active reservations.</p>`;
        return;
    }

    let html = `<table>
        <tr>
            <th>Slot ID</th>
            <th>Location</th>
            <th>Booked By</th>
            <th>Status</th>
            <th>Action</th>
        </tr>`;

    bookedSlots.forEach(slot => {
        html += `
            <tr>
                <td>${slot.id}</td>
                <td>${slot.location}</td>
                <td>${slot.user}</td>
                <td>${slot.status}</td>
                <td>
                    <button onclick="releaseSlot(${slot.id})" style="background-color:#ff5050;">Cancel</button>
                </td>
            </tr>
        `;
    });

    html += `</table>`;
    reservationContainer.innerHTML = html;
}

// 🔧 Cancel/Release Booking
function releaseSlot(id) {
    const confirmRelease = confirm('Are you sure you want to cancel this reservation?');
    if (!confirmRelease) return;

    const index = slots.findIndex(slot => slot.id === id);
    if (index !== -1) {
        slots[index].status = 'available';
        slots[index].user = null;
        localStorage.setItem('slots', JSON.stringify(slots));
        alert('Reservation cancelled successfully!');
        renderReservations();
    }
}
