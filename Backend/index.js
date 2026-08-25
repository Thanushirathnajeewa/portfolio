const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "portfolio_db"
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error("❌ MySQL connection failed:", err.message);
        return;
    }

    console.log("✅ Connected to MySQL database");
});

// Test route
app.get("/", (req, res) => {
    res.send("Portfolio backend is running!");
});

// Contact form API
app.post("/api/contact", (req, res) => {

    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "Name, email and message are required."
        });
    }

    const sql = `
        INSERT INTO contact_messages
        (name, email, subject, message)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [name, email, subject || "", message],
        (err, result) => {

            if (err) {
                console.error("❌ Database error:", err.message);

                return res.status(500).json({
                    success: false,
                    message: "Failed to save message."
                });
            }

            res.status(201).json({
                success: true,
                message: "Your message has been sent successfully!"
            });
        }
    );
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
