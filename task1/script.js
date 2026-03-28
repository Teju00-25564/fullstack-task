function validateForm() {

    let form = document.getElementById("studentForm");

    let name = form["name"].value.trim();
    let email = form["email"].value.trim();
    let age = form["age"].value;
    let phone = form["phone"].value.trim();
    let department = form["department"].value;
    let gender = document.querySelector('input[name="gender"]:checked');

    if (name.length < 3) {
        alert("Name must be at least 3 characters long.");
        return false;
    }

    if (age < 1 || age > 120) {
        alert("Please enter a valid age between 1 and 120.");
        return false;
    }

    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        alert("Please enter a valid email.");
        return false;
    }

    if (!gender) {
        alert("Please select gender.");
        return false;
    }

    if (department === "") {
        alert("Please select a department.");
        return false;
    }

    let phonePattern = /^[0-9]{10}$/;
    if (!phone.match(phonePattern)) {
        alert("Phone number must be exactly 10 digits.");
        return false;
    }

    // ✅ Send data to backend
    fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            age: age,
            email: email,
            gender: gender.value,
            department: department,
            phone: phone
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        form.reset();
    })
    .catch(error => {
        alert("Error connecting to server");
    });

    return false; // prevent default form submission
}
