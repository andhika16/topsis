const Alternatif = require("../../model/alternatifModel"); // Pastikan Anda telah mengganti path sesuai dengan struktur proyek A.nda
const Opsi = require("../../model/opsiModel"); // Pastikan Anda telah mengganti path sesuai dengan struktur proyek A.nda
const Kategori = require("../../model/kategoriModel"); // Pastikan Anda telah mengganti path sesuai dengan struktur proyek A.nda
const Matriks = require("../../model/matriksModel"); // Pastikan Anda telah mengganti path sesuai dengan struktur proyek A.nda
const nilaiAlternatif = async (req, res) => {
  try {
    const response = await Alternatif.findAll({
      attributes: ["id", "nama_alternatif"],
      include: [
        {
          model: Matriks,
          as: "Matriks",
          attributes: [
            "id_nilai",
            "nilai",
            "id_penilaian",
            "normalisasi",
            "terbobot",
            "nilai_akhir",
            "rank",
          ],
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

const tambahKategori = async (req, res) => {
  try {
    const data = req.body;

    // Validasi data
    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ message: "Data tidak valid" });
    }

    // Proses penyimpanan data ke tabel Matriks
    const matriksData = data.map((item) => ({
      id_nilai: item.id_nilai,
      id_alternatif: item.id_alternatif,
      nilai: item.nilai,
      normalisasi: item.normalisasi || 0,
      terbobot: item.terbobot || 0,
      nilai_akhir: item.nilai_akhir || 0,
      rank: item.rank || 0,
    }));

    const result = await Matriks.bulkCreate(matriksData);
    // console.log(matriksData);

    return res.status(201).json({
      message: "Data berhasil ditambahkan",
      data: result,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

// Fungsi untuk menambahkan data matriks

module.exports = { nilaiAlternatif, tambahKategori };
