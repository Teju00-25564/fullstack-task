const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "fullstack"
});

db.connect(err => {
    if (err) throw err;
    console.log("Database Connected");
});

// Login API
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    
    db.query(sql, [username, password], (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: "Invalid Username or Password" });
        }
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
