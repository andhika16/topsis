const express = require("express");
const router = express.Router();
const {
  tambahKriteria,
  hapusKriteria,
  ambilKriteria,
  ambilHanyaKriteriaNilai,
} = require("../controllers/KriteriaController");
const {
  ambilSemuaAlternatif,
  tambahAlternatif,
  hapusAlternatif,
  ambilAlternatifDanKriteria,
} = require("../controllers/AlternatifController");
const {
  tambahMatriks,
  ambilSemuaMatriks,
  hapusMatriks,
  ambilMatriks,
} = require("../controllers/MatriksController");

// Rute untuk Kriteria
router.post("/kriteria", tambahKriteria);
router.get("/kriteria", ambilKriteria);
router.delete("/kriteria/:id", hapusKriteria);
router.get("/kriteriaMatriks/:id", ambilHanyaKriteriaNilai);

// Rute untuk Alternatif
router.post("/alternatif", tambahAlternatif);
router.get("/alternatif", ambilSemuaAlternatif);
router.delete("/alternatif/:id", hapusAlternatif);
router.get("/alternatifKriteria/:id", ambilAlternatifDanKriteria);

// Rute untuk Matriks
router.post("/matriks", tambahMatriks);
router.get("/matriks", ambilSemuaMatriks);
router.get("/matriks/:id", ambilMatriks);
router.delete("/matriks/:id_matrik", hapusMatriks);

module.exports = router;
