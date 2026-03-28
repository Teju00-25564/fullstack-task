const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());

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


// Order History (JOIN + ORDER BY)
app.get("/orders", (req, res) => {
    const sql = `
        SELECT c.name, p.product_name, o.quantity,
        (p.price * o.quantity) AS total_amount,
        o.order_date
        FROM orders o
        JOIN customers c ON o.customer_id = c.customer_id
        JOIN products p ON o.product_id = p.product_id
        ORDER BY o.order_date DESC
    `;

    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});


// Highest Value Order (Subquery)
app.get("/highest-order", (req, res) => {
    const sql = `
        SELECT c.name, (p.price * o.quantity) AS total_amount
        FROM orders o
        JOIN customers c ON o.customer_id = c.customer_id
        JOIN products p ON o.product_id = p.product_id
        WHERE (p.price * o.quantity) = (
            SELECT MAX(p2.price * o2.quantity)
            FROM orders o2
            JOIN products p2 ON o2.product_id = p2.product_id
        )
    `;

    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
});


// Most Active Customer
app.get("/most-active", (req, res) => {
    const sql = `
        SELECT c.name, COUNT(o.order_id) AS total_orders
        FROM orders o
        JOIN customers c ON o.customer_id = c.customer_id
        GROUP BY c.customer_id
        ORDER BY total_orders DESC
        LIMIT 1
    `;

    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
