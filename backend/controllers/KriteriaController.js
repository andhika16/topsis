const Kriteria = require("../model/kriteriaModel");

const ambilKriteria = async (req, res) => {
  try {
    const kriteria = await Kriteria.findAll();
    res.json({ success: true, data: kriteria });
  } catch (error) {
    handleError(res, error, "Gagal mendapatkan data kriteria");
  }
};

const tambahKriteria = async (req, res) => {
  const { nama_kriteria, bobot, sifat } = req.body;
  try {
    const kriteriaBaru = await Kriteria.create({
      nama_kriteria,
      bobot,
      sifat,
    });
    res.status(201).json({ success: true, data: kriteriaBaru });
  } catch (error) {
    handleError(res, error, "Gagal menambahkan data Kriteria");
  }
};

const hapusKriteria = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Kriteria.destroy({ where: { id } });

    if (result) {
      res.json({ success: true, message: "Data Kriteria berhasil dihapus" });
    } else {
      res
        .status(404)
        .json({ success: false, error: "Data Kriteria tidak ditemukan" });
    }
  } catch (error) {
    handleError(res, error, "Gagal menghapus data Kriteria");
  }
};

const handleError = (res, error, errorMessage) => {
  console.error(errorMessage, error);
  res.status(500).json({ success: false, error: errorMessage });
};

module.exports = {
  tambahKriteria,
  hapusKriteria,
  ambilKriteria,
};
