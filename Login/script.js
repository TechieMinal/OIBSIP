const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const switchToRegister = document.getElementById("switch-to-register");
const switchToLogin = document.getElementById("switch-to-login");
const feedback = document.getElementById("feedback");

// Simulate password hashing
const hashPassword = (password) => {
    return btoa(password); // Use a proper hashing library in production (e.g., bcrypt).
};

// Display feedback in the UI
const displayFeedback = (message, type) => {
    feedback.textContent = message;
    feedback.className = type === "success" ? "success" : "error";
    feedback.classList.remove("hidden");
    setTimeout(() => feedback.classList.add("hidden"), 3000);
};

// Form switching logic
switchToRegister.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
    feedback.classList.add("hidden");
});

switchToLogin.addEventListener("click", (e) => {
    e.preventDefault();
    registerForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
    feedback.classList.add("hidden");
});

// Register user
registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    if (username.length < 5 || password.length < 6) {
        displayFeedback("Username must be at least 5 characters, and password at least 6.", "error");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[username]) {
        displayFeedback("Username already exists. Try a different one.", "error");
    } else {
        users[username] = hashPassword(password);
        localStorage.setItem("users", JSON.stringify(users));
        displayFeedback("Registration successful! Please log in.", "success");
        registerForm.reset();
        switchToLogin.click();
    }
});

// Login user
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[username] && users[username] === hashPassword(password)) {
        displayFeedback("Login successful! Redirecting...", "success");
        setTimeout(() => {
            window.location.href = "secured.html"; // Replace with your actual secured page URL.
        }, 2000);
    } else {
        displayFeedback("Invalid username or password.", "error");
    }
});
