const express = require("express");
const router = express.Router();
const { topsis } = require("../controllers/Topsis/topsis");
const { testTopsis } = require("../controllers/Topsis/topsistest");
const { testTopsisDua } = require("../controllers/Topsis/topsisTestDua");
const { topsis_inputdata } = require("../controllers/Topsis/topsis_inputdata");

// route asosiasi alternatif
router.get("/topsis", topsis);
router.get("/topsistest", testTopsis);
router.get("/topsisdua", testTopsisDua);
router.get("/topsis_data", topsis_inputdata);
// router.get("/matriks-normalisasi", matriksNormalisasi);

// route asosisasi Kriteria

module.exports = router;
