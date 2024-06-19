const express = require("express");
const router = express.Router();
const Admin = require("../model/adminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Endpoint Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Cari admin berdasarkan username
    const admin = await Admin.findOne({ where: { username } });

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    // Bandingkan password yang dimasukkan dengan password di database
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful", admin });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
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
