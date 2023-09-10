// Simulated user data for demonstration
const users = [
    { username: "business1", password: "password1" },
    { username: "business2", password: "password2" },
    { username: "GreasyGrove", password: "g"}
    // Add more user data as needed
];

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Redirect to the menu items page for the authenticated user
        window.location.href = `menu-items.html?username=${user.username}`;
    } else {
        alert("Invalid username or password. Please try again.");
    }
});
