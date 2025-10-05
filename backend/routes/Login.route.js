const express = require("express");
const router = express.Router();
const User = require("../models/User.model");  // ✅ user model import

// Login API
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validation
    if (!email || !password) {
      return res.status(400).json({ error: "Email and Password required" });
    }

    // 2. Check user exist karta hai ya nahi
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // 3. Password check karo (abhi plain text, later hash kar sakte hain)
    if (user.password !== password) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // 4. Success
    res.status(200).json({ message: "Login successful ✅", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
