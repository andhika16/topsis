const Alternatif = require("../../model/alternatifModel");
const Matriks = require("../../model/matriksModel");
const Kategori = require("../../model/kategoriModel");
const Opsi = require("../../model/opsiModel");
const alternatifKriteriaMatriks = async (req, res) => {
  const id = req.params.id;
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID parameter tidak valid" });
  } else {
    try {
      const alternatif = await Alternatif.findByPk(id, {
        attributes: ["nama_alternatif"],
        include: [{ model: Kategori, include: Matriks }],
      });

      res.json({
        success: true,
        data: alternatif,
        message: "berhasil mengambil data",
      });
    } catch (error) {
      console.error("Gagal mendapatkan data Alternatif:", error);
      res
        .status(500)
        .json({ success: false, error: "Gagal mendapatkan data Alternatif" });
    }
  }
};

const alternatifKriteria = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID parameter tidak valid" });
  } else {
    try {
      const alternatif = await Alternatif.findByPk(id, {
        attributes: ["nama_alternatif"],
        include: [
          {
            model: Matriks,
            as: "Matriks",
            attributes: ["id_nilai","nilai"],
            include: [
              {
                model: Opsi,
                as: "Opsi",
                attributes: ["label", "value"],
                include: [
                  { model: Kategori, as: "kategori", attributes: ["nama"] },
                ],
              },
            ],
          },
        ],
      });

      res.json({
        success: true,
        data: alternatif,
        message: "berhasil mengambil data",
      });
    } catch (error) {
      console.error("Gagal mendapatkan data Alternatif:", error);
      res
        .status(500)
        .json({ success: false, error: "Gagal mendapatkan data Alternatif" });
    }
  }
};
const alternatifMatriks = async (req, res) => {
  const id = req.params.id;
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID parameter tidak valid" });
  } else {
    try {
      const alternatif = await Alternatif.findByPk(id, {
        include: [Matriks],
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

module.exports = {
  alternatifKriteria,
  alternatifMatriks,
  alternatifKriteriaMatriks,
};
