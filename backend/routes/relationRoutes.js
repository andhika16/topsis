const express = require("express");
const router = express.Router();
const {
  alternatifKriteriaMatriks,
  alternatifKriteria,
  alternatifMatriks,
} = require("../controllers/Relations/alternatif.js");

// route asosiasi alternatif
router.get("/alternatifKriteria/:id", alternatifKriteria);
router.get("/alternatifMatriks/:id", alternatifMatriks);
router.get("/alternatifKriteriaMatriks/:id", alternatifKriteriaMatriks);

// route asosisasi Kriteria

module.exports = router;
