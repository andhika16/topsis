const Alternatif = require("../../model/alternatifModel");
const Kategori = require("../../model/kategoriModel");
const Matriks = require("../../model/matriksModel");
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

const updateKategori = async (req, res) => {
  const kategoriData = req.body; // Assuming req.body is an array of objects as provided

  try {
    // Iterate through each category data to update or create
    const updatedCategories = await Promise.all(
      kategoriData.map(async (data) => {
        const { id, nama, bobot } = data;

        // Validate bobot (assuming it's always provided as a string and needs conversion)
        const validatedBobot = parseInt(bobot, 10); // Convert bobot string to number

        // Validate request
        if (!nama || typeof nama !== "string") {
          return res.status(400).json({
            success: false,
            error: "Nama kategori diperlukan dan harus berupa string",
          });
        }
        if (isNaN(validatedBobot) || validatedBobot < 1 || validatedBobot > 5) {
          return res.status(400).json({
            success: false,
            error: "Bobot diperlukan dan harus berupa angka antara 1 dan 5",
          });
        }

        try {
          let kategori = await Kategori.findByPk(id);

          if (!kategori) {
            // If category doesn't exist, create new record (optional)
            kategori = await Kategori.create({
              id,
              nama,
              bobot: validatedBobot,
            });
          } else {
            // Update existing category
            kategori.nama = nama;
            kategori.bobot = validatedBobot;
            await kategori.save();
          }

          return {
            id: kategori.id,
            nama: kategori.nama,
            bobot: kategori.bobot,
          };
        } catch (error) {
          console.error(`Gagal mengupdate/kategori dengan id ${id}:`, error);
          return {
            success: false,
            error: `Gagal mengupdate/kategori dengan id ${id}`,
          };
        }
      })
    );

    res.json({ success: true, data: updatedCategories });
  } catch (error) {
    console.error("Gagal mengupdate kategori:", error);
    res
      .status(500)
      .json({ success: false, error: "Gagal mengupdate kategori" });
  }
};

module.exports = {
  ambilSemuaKategori,
  ambilKategoriOpsi,
  ambilOpsi,
  updateKategori,
};
