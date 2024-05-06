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

const testMatriksNormalisai = () => {
  // Fungsi untuk menghitung akar kuadrat dari jumlah kuadrat elemen dalam suatu kolom
  function calculateRootSumOfSquares(column) {
    let sum = 0;
    for (let i = 0; i < column.length; i++) {
      sum += Math.pow(column[i], 2);
    }
    let rootSumOfSquares = Math.sqrt(sum);
    return { rootSumOfSquares, divisor: sum };
  }

  // Fungsi untuk normalisasi matriks keputusan
  function normalizeDecisionMatrix(decisionMatrix) {
    // Matriks untuk menyimpan hasil normalisasi
    let normalizedMatrix = [];

    // Menghitung jumlah kolom
    const numColumns = decisionMatrix[0].length;

    // Normalisasi setiap kolom
    for (let j = 0; j < numColumns; j++) {
      // Mendapatkan kolom ke-j
      let column = decisionMatrix.map((row) => row[j]);

      // Menghitung akar kuadrat dari jumlah kuadrat elemen dalam kolom
      let { rootSumOfSquares, divisor } = calculateRootSumOfSquares(column);

      // Normalisasi setiap elemen dalam kolom
      let normalizedColumn = column.map((value) => value / rootSumOfSquares);

      // Menambahkan kolom yang telah dinormalisasi ke dalam matriks hasil
      normalizedMatrix.push(normalizedColumn);

      console.log(`Jumlah pembagi untuk kolom ke-${j + 1}: ${divisor}`);
    }

    return normalizedMatrix;
  }

  // Contoh matriks keputusan
  const decisionMatrix = [
    [5, 4, 3],
    [4, 3, 3],
    [3, 4, 2],
    [4, 4, 4],
    [5, 3, 4],
  ];

  // Normalisasi matriks keputusan
  const normalizedMatrix = normalizeDecisionMatrix(decisionMatrix);

  // Menampilkan matriks keputusan yang telah dinormalisasi
  console.log("\nMatriks Keputusan yang Telah Dinormalisasi:");
  normalizedMatrix.forEach((row) => console.log(row.join("\t")));
};

module.exports = {
  alternatifKriteria,
  alternatifMatriks,
  alternatifKriteriaMatriks,
  testMatriksNormalisai,
};
