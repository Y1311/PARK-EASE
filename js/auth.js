// Registration Validation
document.getElementById('registerForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!validateEmail(email)) {
        alert('Please enter a valid email.');
        return;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    const user = { name, email, password };
    localStorage.setItem(email, JSON.stringify(user));

    alert('Registration successful!');
    window.location.href = "login.html";
});

// Login Validation
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    const user = JSON.parse(localStorage.getItem(email));

    if (!user) {
        alert('User not found. Please register.');
        return;
    }

    if (user.password !== password) {
        alert('Incorrect password.');
        return;
    }

    fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.message === 'Login successful') {
        alert('Login successful!');
        localStorage.setItem('loggedInUser', email);
        window.location.href = "index.html";
      } else {
            alert('Login Failed: ' + data.message);
        }
    })
    .catch(err => console.error(err));
});

// Email Validation Function
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    return re.test(String(email).toLowerCase());
}
