// 🔒 Admin Check
const user = localStorage.getItem('loggedInUser');
if (user !== 'admin@gmail.com') {
    alert("Access denied. Admins only.");
    window.location.href = "login.html";
}

// 📦 Load Users
let users = JSON.parse(localStorage.getItem('users')) || [];

const userContainer = document.getElementById('userList');

renderUsers();

// 🗒️ Render Users
function renderUsers() {
    if (users.length === 0) {
        userContainer.innerHTML = `<p>No registered users found.</p>`;
        return;
    }

    let html = `<table>
        <tr>
            <th>User ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Action</th>
        </tr>`;

    users.forEach(user => {
        html += `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <button onclick="deleteUser(${user.id})" style="background-color:#ff5050;">Delete</button>
                </td>
            </tr>
        `;
    });

    html += `</table>`;
    userContainer.innerHTML = html;
}

// ❌ Delete User
function deleteUser(id) {
    const confirmDelete = confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    users = users.filter(u => u.id !== id);
    localStorage.setItem('users', JSON.stringify(users));

    alert('User deleted successfully!');
    renderUsers();
}
