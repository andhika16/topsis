const Alternatif = require("../model/alternatifModel"); // Pastikan Anda telah mengganti path sesuai dengan struktur proyek A.nda
const Kriteria = require("../model/kriteriaModel");
const Matriks = require("../model/matriksModel");

const ambilSemuaAlternatif = async (req, res) => {
  try {
    // Ambil semua data alternatif dari database
    const alternatif = await Alternatif.findAll();

    res.json({ success: true, data: alternatif });
  } catch (error) {
    console.error("Gagal mendapatkan data Alternatif:", error);
    res
      .status(500)
      .json({ success: false, error: "Gagal mendapatkan data Alternatif" });
  }
};

const ambilAlternatifDanKriteria = async (req, res) => {
  const id = req.params.id;
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID parameter tidak valid" });
  } else {
    try {
      // Ambil semua data alternatif dari database
      const alternatif = await Alternatif.findByPk(id, {
        include: [{ model: Kriteria, include: Matriks }],
      });

      res.json({ success: true, data: alternatif });
    } catch (error) {
      console.error("Gagal mendapatkan data Alternatif:", error);
      res
        .status(500)
        .json({ success: false, error: "Gagal mendapatkan data Alternatif" });
    }
  }
};

// Fungsi untuk menambahkan data alternatif
const tambahAlternatif = async (req, res) => {
  try {
    const {
      nama_alternatif,
      no_kk,
      jenis_kelamin,
      alamat,
      no_telp,
      pekerjaan,
    } = req.body;
    // Validasi minimal untuk memastikan data yang dibutuhkan tersedia
    if (
      !nama_alternatif ||
      !no_kk ||
      !jenis_kelamin ||
      !alamat ||
      !no_telp ||
      !pekerjaan
    ) {
      return res
        .status(400)
        .json({ success: false, error: "Semua field harus diisi" });
    }
    console.log(req.body);
    // Lakukan validasi atau manipulasi data sesuai kebutuhan
    // ...

    // Tambahkan data ke database menggunakan Sequelize
    const alternatifBaru = await Alternatif.create({
      nama_alternatif,
      no_kk,
      jenis_kelamin,
      alamat,
      no_telp,
      pekerjaan,
    });

    res.status(201).json({ success: true, msg: alternatifBaru });
  } catch (error) {
    console.error("Gagal menambahkan data Alternatif:", error);
    res
      .status(500)
      .json({ success: false, error: "Gagal menambahkan data Alternatif" });
  }
};

// Fungsi untuk menghapus data alternatif
const hapusAlternatif = async (req, res) => {
  try {
    const { id } = req.params;

    // Validasi minimal untuk memastikan ID alternatif tersedia
    if (!id) {
      return res
        .status(400)
        .json({ success: false, error: "ID Alternatif harus disertakan" });
    }

    // Hapus data dari database menggunakan Sequelize
    const result = await Alternatif.destroy({
      where: {
        id,
      },
    });

    if (result) {
      res.json({ success: true, message: "Data Alternatif berhasil dihapus" });
    } else {
      res
        .status(404)
        .json({ success: false, error: "Data Alternatif tidak ditemukan" });
    }
  } catch (error) {
    console.error("Gagal menghapus data Alternatif:", error);
    res
      .status(500)
      .json({ success: false, error: "Gagal menghapus data Alternatif" });
  }
};

module.exports = {
  tambahAlternatif,
  hapusAlternatif,
  ambilSemuaAlternatif,
  ambilAlternatifDanKriteria,
};
