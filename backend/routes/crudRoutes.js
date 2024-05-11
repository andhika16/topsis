const express = require("express");
const router = express.Router();
const {
  tambahKriteria,
  hapusKriteria,
  ambilKriteria,
  ambilSatuKriteria,
} = require("../controllers/CRUD/KriteriaController");
const {
  ambilSemuaAlternatif,
  tambahAlternatif,
  hapusAlternatif,
  ambilSatuAlternatif,
  ubahAlternatif,
} = require("../controllers/CRUD/AlternatifController");
const {
  tambahMatriks,
  ambilSemuaMatriks,
  hapusMatriks,
  ambilMatriks,
} = require("../controllers/MatriksController");
const {nilaiAlternatif,nilaiSemuaAlternatif} = require("../controllers/nilaiController");

// Rute untuk Kriteria
router.get("/kriteria", ambilKriteria);
router.get("/kriteria/:id", ambilSatuKriteria);
router.post("/kriteria", tambahKriteria);
router.delete("/kriteria/:id", hapusKriteria);

// Rute untuk Alternatif
router.get("/alternatif", ambilSemuaAlternatif);
router.get("/alternatif/:id", ambilSatuAlternatif);
router.patch("/alternatif/:id", ubahAlternatif);
router.post("/alternatif", tambahAlternatif);
router.delete("/alternatif/:id", hapusAlternatif);

// Rute untuk Matriks
router.get("/matriks", ambilSemuaMatriks);
router.get("/matriks/:id", ambilSatuMatriks);
router.post("/matriks", tambahMatriks);
router.delete("/matriks/:id_matrik", hapusMatriks);
// rute untuk nilai normalisasi
router.get("/nilai/:id", nilaiSemuaAlternatif);
router.get("/nilai", nilaiAlternatif);
module.exports = router;
