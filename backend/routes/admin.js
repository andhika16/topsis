const express = require("express");
const router = express.Router();
const Admin = require("../model/adminModel");
const bcrypt = require("bcryptjs");

// Endpoint Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Cari admin berdasarkan username
    const admin = await Admin.findOne({ where: { username } });

    if (!username || !password) {
      return res
        .status(404)
        .json({ error: "harap masukkan username dan password" });
    }

    if (!admin) {
      return res
        .status(404)
        .json({ error: "Username tidak ditemukan." });
    }

    // Bandingkan password yang dimasukkan dengan password di database
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ error: "Password Salah." });
    }

    res.status(200).json({ message: "Login successful", admin });
  } catch (error) {
    console.error("Failed to login", error);
    res.status(500).json({ error: "Failed to login. Please try again later." });
  }
});

// Endpoint Registrasi
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan admin baru ke dalam database
    const newAdmin = await Admin.create({
      username,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: "Admin registered successfully", admin: newAdmin });
  } catch (error) {
    res.status(500).json({ error: "Failed to register admin" });
  }
});

module.exports = router;
