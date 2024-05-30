const express = require("express");
const router = express.Router();
const { topsis } = require("../controllers/Topsis/topsis");
const { testTopsis } = require("../controllers/Topsis/topsistest");

// route asosiasi alternatif
router.get("/topsis", topsis);
router.get("/topsistest", testTopsis);
// router.get("/matriks-normalisasi", matriksNormalisasi);

// route asosisasi Kriteria

module.exports = router;
