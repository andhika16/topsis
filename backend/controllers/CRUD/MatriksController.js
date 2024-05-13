const Kriteria = require("../../model/kriteriaModel");
const Matriks = require("../../model/matriksModel");

const ambilSemuaMatriks = async (req, res) => {
  try {
    const response = await Matriks.findAll();
    res.status(201).json({ success: true, data: response });
  } catch (error) {
    console.error(error);
  }
};

const ambilSatuMatriks = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Matriks.findByPk(id);
    res.status(201).json({ success: true, data: response });
  } catch (error) {
    console.error(error);
  }
};
const tambahMatriks = async (req, res) => {
  try {
    const { nilai, AlternatifId, KriteriaId } = req.body;
    if (!nilai || !AlternatifId || !KriteriaId) {
      return res
        .status(400)
        .json({ success: false, error: "Semua field harus diisi" });
    }

    // Pengecekan apakah nilai sudah ada sebelumnya
    const existingMatriks = await Kriteria.findOne({
      where: { nilai, KriteriaId, AlternatifId },
    });
    if (existingMatriks) {
      return res.status(400).json({ 
        success: false,
        error: "Data dengan nilai yang sama sudah ada",
      });
    }

    const matriksBaru = await Matriks.create({
      nilai,
      KriteriaId,
      AlternatifId,
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
  ambilSemuaMatriks,
  ambilSatuMatriks,
};
