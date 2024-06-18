const Alternatif = require("../../model/alternatifModel");
const Matriks = require("../../model/matriksModel");
const { Op } = require("sequelize");
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
const tambahAlternatif = async (req, res) => {
  try {
    const {
      nama_alternatif,
      no_kk,
      jenis_kelamin,
      no_nik,
      pekerjaan,
      tempat_tgl_lahir,
      RT,
      RW,
      jalan,
    } = req.body;

    // Validasi minimal untuk memastikan data yang dibutuhkan tersedia
    if (
      (!nama_alternatif ||
        !no_kk ||
        !jenis_kelamin ||
        !no_nik ||
        !pekerjaan ||
        !tempat_tgl_lahir,
      !RT || !RW || !jalan)
    ) {
      return res
        .status(400)
        .json({ success: false, error: "Semua field harus diisi" });
    }

    // Validasi tambahan jika diperlukan
    // Misalnya, validasi panjang karakter untuk no_kk dan no_nik
    if (no_kk.length !== 16 || no_nik.length !== 16) {
      return res.status(400).json({
        success: false,
        error: "Nomor KK dan NIK harus memiliki panjang 16 karakter",
      });
    }

    // Cek apakah data dengan nomor KK atau NIK yang sama sudah ada
    const existingAlternatif = await Alternatif.findOne({
      where: {
        [Op.or]: [{ no_kk: no_kk }, { no_nik: no_nik }],
      },
    });

    if (existingAlternatif) {
      return res.status(400).json({
        success: false,
        error: "Data dengan Nomor KK atau NIK yang sama sudah ada",
      });
    }

    // Tambahkan data ke database menggunakan Sequelize
    const alternatifBaru = await Alternatif.create({
      nama_alternatif,
      no_kk,
      jenis_kelamin,
      no_nik,
      pekerjaan,
      tempat_tgl_lahir,
      RT,
      RW,
      jalan,
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
  const {
    nama_alternatif,
    no_kk,
    jenis_kelamin,
    no_nik,
    pekerjaan,
    tempat_tgl_lahir,
    RT,
    RW,
    jalan,
  } = req.body;

  // Validasi minimal untuk memastikan ID alternatif tersedia
  if (
    (!nama_alternatif ||
      !no_kk ||
      !jenis_kelamin ||
      !no_nik ||
      !pekerjaan ||
      !tempat_tgl_lahir,
    !RT || !RW || !jalan)
  ) {
    return res
      .status(400)
      .json({ success: false, error: "Semua field harus diisi" });
  }

  try {
    // Cek apakah ada alternatif dengan nomor KK atau NIK yang sama, kecuali untuk data saat ini
    const existingAlternatif = await Alternatif.findOne({
      where: {
        [Op.and]: [
          { id: { [Op.ne]: id } }, // Memastikan tidak membandingkan dengan dirinya sendiri
          {
            [Op.or]: [{ no_kk: no_kk }, { no_nik: no_nik }],
          },
        ],
      },
    });

    if (existingAlternatif) {
      return res.status(400).json({
        success: false,
        error: "Data dengan Nomor KK atau NIK yang sama sudah ada",
      });
    }

    const alternatif = await Alternatif.findOne({
      where: { id },
    });

    if (!alternatif) {
      return res
        .status(404)
        .json({ success: false, error: "Data Alternatif tidak ditemukan" });
    }

    // Validasi tambahan jika diperlukan
    // Misalnya, validasi panjang karakter untuk no_kk dan no_nik
    if (no_kk.length !== 16 || no_nik.length !== 16) {
      return res.status(400).json({
        success: false,
        error: "Nomor KK dan NIK harus memiliki panjang 16 karakter",
      });
    }

    // Update data alternatif
    alternatif.nama_alternatif = nama_alternatif;
    alternatif.no_kk = no_kk;
    alternatif.no_nik = no_nik;
    alternatif.jenis_kelamin = jenis_kelamin;
    alternatif.pekerjaan = pekerjaan;
    alternatif.tempat_tgl_lahir = tempat_tgl_lahir;
    alternatif.RT = RT;
    alternatif.RW = RW;
    alternatif.jalan = jalan;
    await alternatif.save();

    res.status(201).json({ success: true, data: alternatif });
  } catch (error) {
    console.error("Gagal mengubah data Alternatif:", error);
    res
      .status(500)
      .json({ success: false, error: "Gagal mengubah data Alternatif" });
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

    await Matriks.destroy({ where: { id_alternatif: id } });

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
