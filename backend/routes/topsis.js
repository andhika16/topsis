const express = require("express");
const router = express.Router();
const { topsis } = require("../controllers/Topsis/topsis");
const { testTopsis } = require("../controllers/Topsis/topsistest");
const { testTopsisDua } = require("../controllers/Topsis/topsisTestDua");

// route asosiasi alternatif
router.get("/topsis", topsis);
router.get("/topsistest", testTopsis);
router.get("/topsisdua", testTopsisDua);
// router.get("/matriks-normalisasi", matriksNormalisasi);

// route asosisasi Kriteria

module.exports = router;
