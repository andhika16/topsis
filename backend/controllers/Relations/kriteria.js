const Matriks = require("../../model/matriksModel");
const Kriteria = require("../../model/kriteriaModel");
const Alternatif = require("../../model/alternatifModel");

const KriteriaMatriks = async () => {
  const id = req.params.id;
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID parameter tidak valid" });
  } else {
    try {
      const kriteria = await Kriteria.findByPk(id, {
        include: [Matriks],
      });

      res.json({ success: true, data: kriteria });
    } catch (error) {
      console.error("Gagal mendapatkan data kriteria:", error);
      res
        .status(500)
        .json({ success: false, error: "Gagal mendapatkan data kriteria" });
    }
  }
};

const KriteriaAlternatif = async () => {
  const id = req.params.id;
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID parameter tidak valid" });
  } else {
    try {
        const kriteria = await Kriteria.findByPk(id, {
          include: [Alternatif],
        });

      res.json({ success: true, data: kriteria });
    } catch (error) {
      console.error("Gagal mendapatkan data kriteria:", error);
      res
        .status(500)
        .json({ success: false, error: "Gagal mendapatkan data kriteria" });
    }
  }
};

module.exports = {
  KriteriaAlternatif,
  KriteriaMatriks,
};
