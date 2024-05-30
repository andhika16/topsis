const Alternatif = require("../../model/alternatifModel"); // Pastikan Anda telah mengganti path sesuai dengan struktur proyek A.nda
const Kriteria = require("../../model/kriteriaModel");
const Matriks = require("../../model/matriksModel");
const nilaiAlternatif = async (req, res) => {
  try {
    const response = await Alternatif.findAll({
      attributes: ["id", "nama_alternatif"],
      include: [
        {
          model: Kriteria,
          as: "Kriteria",
          attributes: ["nama_kriteria", "bobot", "id", "alternatifId"],
        }, // Hanya ambil nama alternatif
        {
          model: Matriks,
          as: "Matriks",
          attributes: ["nilai", "id", "alternatifId", "kriteriaId"],
        }, // Hanya ambil nama kriteria
      ],
    });
    res.status(201).json({ success: true, data: response });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Gagal mengambil data matriks." });
  }
};

// Fungsi untuk menambahkan data matriks

const nilaiSemuaAlternatif = async (req, res) => {
  try {
    const response = await Matriks.findAll({
      include: [
        { model: Kriteria, as: "kriteria" }, // Menggabungkan model Kriteria
      ],
    });
    res.status(201).json({ success: true, data: response });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Gagal mengambil data matriks." });
  }
};

const matriksNormalisasi = async (req, res) => {
  try {
    const response = await Kriteria.findAll({
      attributes: [
        "id",
        "nama_kriteria",
        "bobot",
        "poin1",
        "poin2",
        "poin3",
        "poin4",
        "poin5",
      ],
    });

    if (!response || response.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Data tidak ditemukan." });
    }

    res.status(201).json({ success: true, data: response });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Gagal mengambil data matriks." });
  }
};

module.exports = { matriksNormalisasi, nilaiAlternatif, nilaiSemuaAlternatif };
