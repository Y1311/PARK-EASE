// 🔒 Admin Check (Simple Example)
// Replace this check with real admin authentication in future
const user = localStorage.getItem('loggedInUser');
if (user !== 'admin@gmail.com') {
    alert("Access denied. Admins only.");
    window.location.href = "login.html";
}

// 🔧 Slot Management
let slots = JSON.parse(localStorage.getItem('slots')) || [];

const slotContainer = document.getElementById('slotList');
const addSlotForm = document.getElementById('addSlotForm');

renderSlots();

// Add New Slot
addSlotForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const location = document.getElementById('location').value.trim();

    if (!location) {
        alert('Please enter a location.');
        return;
    }

    const newSlot = {
        id: Date.now(),
        location,
        status: 'available',
        user: null
    };

    slots.push(newSlot);
    localStorage.setItem('slots', JSON.stringify(slots));

    alert('Slot added successfully!');
    document.getElementById('addSlotForm').reset();
    renderSlots();
});

// Display Slots
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
                    <button onclick="deleteSlot(${slot.id})" style="background-color:#ff5050;">Delete</button>
                </td>
            </tr>
        `;
    });

    html += `</table>`;
    slotContainer.innerHTML = html;
}

// Delete Slot
function deleteSlot(id) {
    const confirmDelete = confirm('Are you sure you want to delete this slot?');
    if (!confirmDelete) return;

    slots = slots.filter(slot => slot.id !== id);
    localStorage.setItem('slots', JSON.stringify(slots));
    alert('Slot deleted successfully!');
    renderSlots();
}
