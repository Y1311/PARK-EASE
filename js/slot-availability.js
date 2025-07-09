// 🔐 User Check
const user = localStorage.getItem('loggedInUser');
if (!user) {
    alert("Please login first.");
    window.location.href = "login.html";
}

// 📦 Load Slots
let slots = JSON.parse(localStorage.getItem('slots')) || [];

const slotContainer = document.getElementById('slotList');

renderSlots();

// 🗒️ Render Slots
function renderSlots() {
    if (slots.length === 0) {
        slotContainer.innerHTML = `<p>No slots available.</p>`;
        return;
    }

    let html = `<table>
        <tr>
            <th>Slot ID</th>
            <th>Location</th>
            <th>Status</th>
            <th>Action</th>
        </tr>`;

    slots.forEach(slot => {
        html += `
            <tr>
                <td>${slot.id}</td>
                <td>${slot.location}</td>
                <td>${slot.status}</td>
                <td>
                    ${slot.status === 'available' ? 
                    `<button onclick="bookSlot(${slot.id})" style="background-color:#00c3ff;">Book</button>` : 
                    (slot.user === user ? 
                    `<button onclick="cancelSlot(${slot.id})" style="background-color:#ff5050;">Cancel</button>` : 
                    `Booked`)}
                </td>
            </tr>
        `;
    });

    html += `</table>`;
    slotContainer.innerHTML = html;
}

// ✅ Book Slot
function bookSlot(id) {
    const index = slots.findIndex(slot => slot.id === id);
    if (index !== -1) {
        slots[index].status = 'booked';
        slots[index].user = user;
        localStorage.setItem('slots', JSON.stringify(slots));
        alert('Slot booked successfully!');
        renderSlots();
    }
}

// ❌ Cancel Slot
function cancelSlot(id) {
    const index = slots.findIndex(slot => slot.id === id);
    if (index !== -1 && slots[index].user === user) {
        slots[index].status = 'available';
        slots[index].user = null;
        localStorage.setItem('slots', JSON.stringify(slots));
        alert('Slot cancelled successfully!');
        renderSlots();
    } else {
        alert('You cannot cancel this slot.');
    }
}
