const Kriteria = require("../../model/kriteriaModel");
const Alternatif = require("../../model/alternatifModel");
const Matriks = require("../../model/matriksModel");

const alternatifKriteriaMatriks = async (req, res) => {
  const id = req.params.id;
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID parameter tidak valid" });
  } else {
    try {
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

const alternatifKriteria = async (req, res) => {
  const id = req.params.id;
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID parameter tidak valid" });
  } else {
    try {
      const alternatif = await Alternatif.findByPk(id, {
        include: [Kriteria],
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
