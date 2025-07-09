// 🔒 Session Check
const user = localStorage.getItem('loggedInUser');
if (!user) {
    alert("Please login first!");
    window.location.href = "login.html";
}

// 🚗 Sample Slot Data (if not already created)
let slots = JSON.parse(localStorage.getItem('slots')) || [
    { id: 1, location: 'Surat City Center', status: 'available', user: null },
    { id: 2, location: 'Surat Railway', status: 'available', user: null },
    { id: 3, location: 'Vesu Area', status: 'available', user: null },
    { id: 4, location: 'Adajan', status: 'available', user: null },
    { id: 5, location: 'Katargam', status: 'available', user: null },
];

localStorage.setItem('slots', JSON.stringify(slots));

const container = document.getElementById('slotsContainer');
renderSlots();

function renderSlots() {
    container.innerHTML = '';
    slots.forEach(slot => {
        const div = document.createElement('div');
        div.classList.add('slot');

        div.innerHTML = `
            <h3>Slot ${slot.id}</h3>
            <p>Location: ${slot.location}</p>
            <p>Status: <b>${slot.status}</b></p>
            ${slot.status === 'available' ? `
                <button onclick="bookSlot(${slot.id})">Book</button>
            ` : slot.user === user ? `
                <button class="cancel" onclick="cancelSlot(${slot.id})">Cancel</button>
            ` : `<p><i>Booked</i></p>`}
        `;

        container.appendChild(div);
    });
}

function bookSlot(id) {
    const index = slots.findIndex(s => s.id === id);
    if (slots[index].status === 'available') {
        slots[index].status = 'booked';
        slots[index].user = user;
        localStorage.setItem('slots', JSON.stringify(slots));
        alert('Slot Booked Successfully!');
        renderSlots();
    }
}

function cancelSlot(id) {
    const index = slots.findIndex(s => s.id === id);
    if (slots[index].user === user) {
        slots[index].status = 'available';
        slots[index].user = null;
        localStorage.setItem('slots', JSON.stringify(slots));
        alert('Slot Cancelled Successfully!');
        renderSlots();
    } else {
        alert('You can only cancel your own bookings.');
    }
}
