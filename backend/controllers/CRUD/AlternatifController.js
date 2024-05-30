const Alternatif = require("../../model/alternatifModel");
const Kriteria = require("../../model/kriteriaModel");

const ambilSemuaAlternatif = async (req, res) => {
  try {
    const alternatif = await Alternatif.findAll();
    res.json({ success: true, data: alternatif });
  } catch (error) {
    console.error("Gagal mendapatkan data Alternatif:", error);
    res
      .status(500)
      .json({ success: false, error: "Gagal mendapatkan data Alternatif" });
  }
};

const ambilSatuAlternatif = async (req, res) => {
  const id = req.params.id;
  try {
    const alternatif = await Alternatif.findByPk(id);
    res.json({ success: true, data: alternatif });
  } catch (error) {
    console.error("Gagal mendapatkan data Alternatif:", error);
    res
      .status(500)
      .json({ success: false, error: "Gagal mendapatkan data Alternatif" });
  }
};

// Fungsi untuk menambahkan data alternatif
const tambahAlternatif = async (req, res) => {
  try {
    const {
      nama_alternatif,
      no_kk,
      jenis_kelamin,
      alamat,
      no_telp,
      pekerjaan,
    } = req.body;
    // Validasi minimal untuk memastikan data yang dibutuhkan tersedia
    if (
      !nama_alternatif ||
      !no_kk ||
      !jenis_kelamin ||
      !alamat ||
      !no_telp ||
      !pekerjaan
    ) {
      return res
        .status(400)
        .json({ success: false, error: "Semua field harus diisi" });
    }
    // Lakukan validasi atau manipulasi data sesuai kebutuhan
    // ...

    // Tambahkan data ke database menggunakan Sequelize
    const alternatifBaru = await Alternatif.create({
      nama_alternatif,
      no_kk,
      jenis_kelamin,
      alamat,
      no_telp,
      pekerjaan,
    });

    res.status(201).json({ success: true, msg: alternatifBaru });
  } catch (error) {
    console.error("Gagal menambahkan data Alternatif:", error);
    res
      .status(500)
      .json({ success: false, error: "Gagal menambahkan data Alternatif" });
  }
};

const ubahAlternatif = async (req, res) => {
  const { id } = req.params;
  const { nama_alternatif, no_kk, jenis_kelamin, alamat, no_telp, pekerjaan } =
    req.body;

  // Validasi minimal untuk memastikan ID alternatif tersedia
  if (
    !nama_alternatif ||
    !no_kk ||
    !jenis_kelamin ||
    !alamat ||
    !no_telp ||
    !pekerjaan
  ) {
    return res
      .status(400)
      .json({ success: false, error: "Semua field harus diisi" });
  } else {
    try {
      const alternatif = await Alternatif.findOne({
        where: {
          id,
        },
      });
      if (alternatif) {
        alternatif.nama_alternatif = nama_alternatif;
        alternatif.no_kk = no_kk;
        alternatif.jenis_kelamin = jenis_kelamin;
        alternatif.alamat = alamat;
        alternatif.no_telp = no_telp;
        alternatif.pekerjaan = pekerjaan;
        alternatif.save();
        return res.status(201).json({ success: true, data: alternatif });
      }
    } catch (error) {
      console.log(error);
    }
  }
};

// Fungsi untuk menghapus data alternatif
const hapusAlternatif = async (req, res) => {
  try {
    const { id } = req.params;

    // Validasi minimal untuk memastikan ID alternatif tersedia
    if (!id) {
      return res
        .status(400)
        .json({ success: false, error: "ID Alternatif harus disertakan" });
    }

    await Kriteria.destroy({ where: { AlternatifId: id } });

    // Hapus data dari database menggunakan Sequelize
    const result = await Alternatif.destroy({
      where: {
        id,
      },
    });

    if (result) {
      res.json({ success: true, message: "Data Alternatif berhasil dihapus" });
    } else {
      res
        .status(404)
        .json({ success: false, error: "Data Alternatif tidak ditemukan" });
    }
  } catch (error) {
    console.error("Gagal menghapus data Alternatif:", error);
    res
      .status(500)
      .json({ success: false, error: "Gagal menghapus data Alternatif" });
  }
};

module.exports = {
  tambahAlternatif,
  ubahAlternatif,
  hapusAlternatif,
  ambilSemuaAlternatif,
  ambilSatuAlternatif,
};
