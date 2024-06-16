const Alternatif = require("../../model/alternatifModel");
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

// (async () => {
//   try {
//     // Mengambil semua data dari tabel matriks
//     const allRecords = await Matriks.findAll({
//       order: [["id_penilaian", "ASC"]],
//     });

//     // Hapus semua data dari tabel matriks
//     await Matriks.destroy({
//       where: {},
//       truncate: true,
//     });

//     // Reset AUTO_INCREMENT ke 1
//     await db.query("ALTER TABLE matriks AUTO_INCREMENT = 1");

//     // Memasukkan kembali data dengan ID yang dimulai dari 1
//     for (const record of allRecords) {
//       await Matriks.create({
//         id_nilai: record.id_nilai,
//         id_alternatif: record.id_alternatif,
//         nilai: record.nilai,
//         normalisasi: record.normalisasi,
//         terbobot: record.terbobot,
//         nilai_akhir: record.nilai_akhir,
//         rank: record.rank,
//       });
//     }

//     console.log("ID berhasil direset dan data dimasukkan kembali.");
//   } catch (error) {
//     console.error("Error resetting IDs:", error);
//   } finally {
//     await db.close();
//   }
// })();
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
    console.log(req.body);

    if (!nilai || !AlternatifId || !KriteriaId) {
      return res
        .status(400)
        .json({ success: false, error: "Semua field harus diisi" });
    }

    // Pengecekan apakah nilai sudah ada sebelumnya
    const existingMatriks = await Matriks.findOne({
      where: { KriteriaId, AlternatifId },
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

const editMatriks = async (req, res) => {
  const data = req.body.Matriks; // Assuming data is sent in the request body

  console.log(data);
  if (!Array.isArray(data) || data.length === 0) {
    return res.status(400).json({ message: "Invalid data format" });
  }

  // Validate each object in the array
  for (let item of data) {
    if (
      typeof item.nilai === "undefined" ||
      typeof item.id_nilai === "undefined" ||
      typeof item.id_penilaian === "undefined"
    ) {
      return res
        .status(400)
        .json({ message: "Invalid data format in one or more items" });
    }
  }

  const transaction = await Matriks.sequelize.transaction();
  try {
    // Upsert the records
    await Matriks.bulkCreate(data, {
      updateOnDuplicate: ["nilai"],
      transaction,
    });

    await transaction.commit();
    res.status(200).json({ message: "Data successfully updated" });
  } catch (error) {
    await transaction.rollback();
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// Fungsi untuk menghapus data matriks
const hapusMatriks = async (req, res) => {
  try {
    const { id: id_alternatif } = req.params;
    console.log(id_alternatif);
    // Validasi minimal untuk memastikan ID matriks tersedia
    if (!id_alternatif) {
      return res
        .status(400)
        .json({ success: false, error: "ID Matriks harus disertakan" });
    }

    // Hapus data dari database menggunakan Sequelize
    const result = await Matriks.destroy({
      where: {
        id_alternatif,
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
  editMatriks,
  ambilSatuMatriks,
};
