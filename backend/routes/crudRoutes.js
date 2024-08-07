const express = require("express");
const router = express.Router();
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
  ambilSatuMatriks,
  editMatriks,
} = require("../controllers/CRUD/MatriksController");
const {
  nilaiAlternatif,
  nilaiSemuaAlternatif,
  tambahKategori,
} = require("../controllers/Relations/nilaiController");

const {
  ambilSemuaKategori,
  ambilKategoriOpsi,
  ambilOpsi,
  updateKategori,
} = require("../controllers/CRUD/KategoriController");

// Rute untuk Alternatif
router.get("/alternatif", ambilSemuaAlternatif);
router.get("/alternatif/:id", ambilSatuAlternatif);
router.put("/alternatif/:id", ubahAlternatif);
router.post("/alternatif", tambahAlternatif);
router.delete("/alternatif/:id", hapusAlternatif);

// Rute untuk Matriks
router.get("/matriks", ambilSemuaMatriks);
router.get("/matriks/:id", ambilSatuMatriks);
router.post("/matriks", tambahMatriks);
router.put("/matriks/:id", editMatriks);
router.delete("/matriks/:id", hapusMatriks);
// rute untuk nilai normalisasi
router.get("/nilai", nilaiAlternatif);
router.post("/nilai", tambahKategori);
// rute untuk nilai normalisasi

router.get("/kategori", ambilSemuaKategori);
router.put("/kategori", updateKategori);
router.get("/kategori-opsi", ambilKategoriOpsi);
router.get("/opsi", ambilOpsi);

module.exports = router;
