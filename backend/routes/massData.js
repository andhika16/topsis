const express = require('express');
const router = express.Router();
const Alternatif = require("../model/alternatifModel");


router.post("/data-banyak", async (req, res) => {
  const { 
    nama_alternatif, 
    no_kk, 
    jenis_kelamin, 
    no_nik, 
    pekerjaan, 
    tempat_tgl_lahir, 
    RT, 
    RW, 
    jalan 
  } = req.body;

  // console.log(req.body);  // Log untuk memeriksa data yang diterima

  // Cek apakah semua field ada
  // if (!nama_alternatif || !no_kk || !jenis_kelamin || !no_nik || !pekerjaan || !tempat_tgl_lahir || !RT || !RW || !jalan) {
  //   return res.status(400).json({ message: "Semua field harus diisi" });
  // }

  const namaAlternatifLines = nama_alternatif
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line);
  const noKkLines = no_kk
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line);
  const jenisKelaminLines = jenis_kelamin
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line);
  const noNikLines = no_nik
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line);
  const pekerjaanLines = pekerjaan
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line);
  const tempatTglLahirLines = tempat_tgl_lahir
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line);
  const rtLines = RT
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line);
  const rwLines = RW
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line);
  const jalanLines = jalan
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line);

  // Check if all arrays have the same length
  // const dataLength = namaAlternatifLines.length;
  // if (
  //   dataLength !== noKkLines.length ||
  //   dataLength !== jenisKelaminLines.length ||
  //   dataLength !== noNikLines.length ||
  //   dataLength !== pekerjaanLines.length ||
  //   dataLength !== tempatTglLahirLines.length ||
  //   dataLength !== rtLines.length ||
  //   dataLength !== rwLines.length ||
  //   dataLength !== jalanLines.length
  // ) {
  //   return res.status(400).json({ message: "Jumlah data tidak sesuai" });
  // }

  const records = namaAlternatifLines.map((_, i) => ({
    nama_alternatif: namaAlternatifLines[i],
    no_kk: noKkLines[i],
    jenis_kelamin: jenisKelaminLines[i],
    no_nik: noNikLines[i],
    pekerjaan: pekerjaanLines[i],
    tempat_tgl_lahir: tempatTglLahirLines[i],
    RT: rtLines[i],
    RW: rwLines[i],
    jalan: jalanLines[i],
  }));
  const alternatifBaru = await Alternatif.bulkCreate(records);
  res.status(200).json({ message: "Data processed successfully", alternatifBaru });
});

module.exports = router;
