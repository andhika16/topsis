const Kategori = require("../../model/kategoriModel");
const Opsi = require("../../model/opsiModel");

const ambilSemuaKategori = async (req, res) => {
  try {
    const kategori = await Kategori.findAll();
    res.json({ success: true, data: kategori });
  } catch (error) {
    console.error("Gagal mendapatkan data Kategori:", error);
    res
      .status(500)
      .json({ success: false, error: "Gagal mendapatkan data Kategori" });
  }
};
const ambilOpsi = async (req, res) => {
  try {
    const opsi = await Opsi.findAll();
    res.json({ success: true, data: opsi });
  } catch (error) {
    console.error("Gagal mendapatkan data Kategori:", error);
    res
      .status(500)
      .json({ success: false, error: "Gagal mendapatkan data Kategori" });
  }
};
const ambilKategoriOpsi = async (req, res) => {
  try {
    const response = await Kategori.findAll({
      attributes: ["nama"],
      include: [
        {
          model: Opsi,
          as: "opsi",
          attributes: ["id","label", "value", "kategori_id"],
        }, // Hanya ambil nama kriteria
      ],
    });
    res.json({ success: true, data: response });
  } catch (error) {
    console.error("Gagal mendapatkan data Kategori:", error);
    res
      .status(500)
      .json({ success: false, error: "Gagal mendapatkan data Kategori" });
  }
};

module.exports = { ambilSemuaKategori, ambilKategoriOpsi,ambilOpsi };
