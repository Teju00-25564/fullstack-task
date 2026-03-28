const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

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

app.post("/submit-feedback", (req, res) => {

    const { name, email, rating, comments } = req.body;

    if (!name || !email || !rating || !comments) {
        return res.json({ success: false, message: "All fields required" });
    }

    const sql = `
        INSERT INTO feedback (name, email, rating, comments)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [name, email, rating, comments], (err) => {
        if (err) {
            return res.json({ success: false, message: "Database Error" });
        }

        res.json({ success: true });
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
