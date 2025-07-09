// 🔒 Session Check
const user = localStorage.getItem('loggedInUser');
if (!user) {
    alert("Please login first!");
    window.location.href = "login.html";
}

// ⭐️ Feedback Form Submission
document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const feedbackText = document.getElementById('feedbackText').value.trim();
    const rating = document.getElementById('rating').value;

    if (!feedbackText || !rating) {
        alert('Please fill out feedback and rating.');
        return;
    }

    const feedback = {
        id: Date.now(),
        userEmail: user,
        feedbackText,
        rating,
        date: new Date().toLocaleString()
    };

    let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    feedbacks.push(feedback);
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

    alert('Thank you for your feedback!');
    document.getElementById('feedbackForm').reset();
    displayFeedbacks();
});

// 📑 Display Feedback
function displayFeedbacks() {
    const feedbackList = document.getElementById('feedbackList');
    let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];

    if (feedbacks.length === 0) {
        feedbackList.innerHTML = `<p>No feedback yet.</p>`;
        return;
    }

    feedbackList.innerHTML = feedbacks.map(fb => `
        <div class="feedback-item">
            <h4>${fb.userEmail}</h4>
            <p><strong>Rating:</strong> ${'⭐️'.repeat(fb.rating)}</p>
            <p>${fb.feedbackText}</p>
            <p><small>${fb.date}</small></p>
        </div>
    `).join('');
}

displayFeedbacks();
