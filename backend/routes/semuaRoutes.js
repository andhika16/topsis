const express = require('express');
const router = express.Router();
const { tambahKriteria, hapusKriteria,ambilKriteria } = require('../controllers/KriteriaController');
const { ambilSemuaAlternatif,tambahAlternatif, hapusAlternatif } = require('../controllers/AlternatifController');
const { tambahMatriks, hapusMatriks } = require('../controllers/MatriksController');

// Rute untuk Kriteria
router.post('/kriteria', tambahKriteria);
router.get('/kriteria', ambilKriteria);
router.delete('/kriteria/:id', hapusKriteria);


// Rute untuk Alternatif
router.post('/alternatif', tambahAlternatif);
router.get('/alternatif', ambilSemuaAlternatif);
router.delete('/alternatif/:id', hapusAlternatif);

// Rute untuk Matriks
router.post('/matriks', tambahMatriks);
router.delete('/matriks/:id_matrik', hapusMatriks);

module.exports = router;
