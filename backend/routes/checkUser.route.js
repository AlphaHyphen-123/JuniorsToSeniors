const express = require("express");
const router = express.Router();
const db = require("./database"); // your MySQL connection file

router.post("/check-user", (req, res) => {
  const { name, email, userType } = req.body;

  const query = "SELECT * FROM users WHERE name=? AND email=? AND userType=?";
  db.query(query, [name, email, userType], (err, result) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    if (result.length > 0) {
      return res.json({ success: true });
    } else {
      return res.json({ success: false, message: "User not registered" });
    }
  });
});

module.exports = router;
