const Matriks = require("../model/matriksModel"); // Pastikan Anda telah mengganti path sesuai dengan struktur proyek Anda
const Alternatif = require("../model/alternatifModel");
const Kriteria = require("../model/kriteriaModel");
const db = require("../config/Database");

// Fungsi untuk menambahkan data matriks

// const hubunganMatriksAlternatif = async () => {
//   // Mengambil satu alternatif (menggantinya dengan alternatif yang sesuai)
//   const alternatifId = 1;
//   const alternatif = await Alternatif.findByPk(alternatifId);

//   if (alternatif) {
//     // Mengakses nilai matriks melalui asosiasi
//     const nilaiMatriks = await alternatif.getMatriks();
//     console.log(nilaiMatriks);
//     // Menampilkan nilai matriks
//     console.log(
//       "Nilai Matriks untuk Alternatif",
//       alternatifId,
//       ":",
//       nilaiMatriks
//     );
//   } else {
//     console.log("Alternatif tidak ditemukan.");
//   }
// };

const tambahMatriks = async (req, res) => {
  try {
    const { nilai, id_alternatif, id_kriteria } = req.body;

    if (!nilai || !id_alternatif || !id_kriteria) {
      return res
        .status(400)
        .json({ success: false, error: "Semua field harus diisi" });
    }
    const matriksBaru = await Matriks.create({
      nilai,
      id_alternatif,
      id_kriteria,
    });

    res.status(201).json({ success: true, data: matriksBaru });
  } catch (error) {
    console.error("Gagal menambahkan data Matriks:", error);
    res
      .status(500)
      .json({ success: false, error: "Gagal menambahkan data Matriks" });
  }
};

// Fungsi untuk menghapus data matriks
const hapusMatriks = async (req, res) => {
  try {
    const { id_matrik } = req.params;

    // Validasi minimal untuk memastikan ID matriks tersedia
    if (!id_matrik) {
      return res
        .status(400)
        .json({ success: false, error: "ID Matriks harus disertakan" });
    }

    // Hapus data dari database menggunakan Sequelize
    const result = await Matriks.destroy({
      where: {
        id_matrik,
      },
    });

    if (result) {
      res.json({ success: true, message: "Data Matriks berhasil dihapus" });
    } else {
      res
        .status(404)
        .json({ success: false, error: "Data Matriks tidak ditemukan" });
    }
  } catch (error) {
    console.error("Gagal menghapus data Matriks:", error);
    res
      .status(500)
      .json({ success: false, error: "Gagal menghapus data Matriks" });
  }
};

module.exports = {
  tambahMatriks,
  hapusMatriks,
};
