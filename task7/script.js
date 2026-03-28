document.getElementById("submitBtn").addEventListener("dblclick", function () {
    alert("Double Click Detected");

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let rating = document.getElementById("rating").value;
    let comments = document.getElementById("comments").value.trim();

    if (!name || !email || !rating || !comments) {
        alert("All fields required!");
        return;
    }

    fetch("http://localhost:3000/submit-feedback", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, rating, comments })
    })
    .then(response => response.json())
    .then(data => {
        alert("Response: " + JSON.stringify(data));
    })
    .catch(error => {
        console.error(error);
        alert("Server error. Is Node running?");
    });
});
