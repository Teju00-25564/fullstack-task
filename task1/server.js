const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "fullstack"
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed");
    console.log(err);
  } else {
    console.log("Database connected");
  }
});


// INSERT Student API
app.post("/register", (req, res) => {

  const { name, age, email, gender, department, phone } = req.body;

  if (!name || !age || !email || !gender || !department || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = `
    INSERT INTO students (name, age, email, gender, department, phone)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, age, email, gender, department, phone], (err, result) => {

    if (err) {
      console.log("Insert error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json({ message: "Student registered successfully" });

  });
});


// Start server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});