function validateLogin() {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();
    let error = document.getElementById("errorMsg");

    error.innerHTML = "";

    // Check empty fields
    if (username === "" || password === "") {
        error.innerHTML = "All fields are required!";
        return;
    }

    // Password length validation
    if (password.length < 6) {
        error.innerHTML = "Password must be at least 6 characters!";
        return;
    }

    // Send data to backend
    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Login Successful!");
            // window.location.href = "dashboard.html";
        } else {
            error.innerHTML = data.message;
        }
    })
    .catch(error => {
        console.log("Error:", error);
        document.getElementById("errorMsg").innerHTML = 
            "Server error. Please try again later.";
    });
}
