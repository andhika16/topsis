// Import Sequelize dan DataTypes dari Sequelize
const { DataTypes } = require("sequelize");
// Import objek db untuk mengakses koneksi database
const db = require("../config/Database");

// Definisikan model "Kriteria"
const Kriteria = db.define(
  "Kriteria", // Nama model (akan menjadi nama tabel dalam database)
  {
    id: {
      type: DataTypes.INTEGER, // Tipe data INTEGER (int)
      allowNull: false, // Tidak boleh null
      autoIncrement: true, // Auto-increment
      primaryKey: true, // Primary key
    },
    AlternatifId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    nama_kriteria: {
      type: DataTypes.STRING(35), // Tipe data STRING dengan panjang maksimal 35 karakter
      allowNull: false, // Tidak boleh null
    },
    bobot: {
      type: DataTypes.DOUBLE, // Tipe data DOUBLE (untuk angka desimal)
      allowNull: false, // Tidak boleh null
    },
    poin1: {
      type: DataTypes.DOUBLE, // Tipe data DOUBLE
      allowNull: true, // Boleh null
    },
    poin2: {
      type: DataTypes.DOUBLE, // Tipe data DOUBLE
      allowNull: true, // Boleh null
    },
    poin3: {
      type: DataTypes.DOUBLE, // Tipe data DOUBLE
      allowNull: true, // Boleh null
    },
    poin4: {
      type: DataTypes.DOUBLE, // Tipe data DOUBLE
      allowNull: true, // Boleh null
    },
    poin5: {
      type: DataTypes.DOUBLE, // Tipe data DOUBLE
      allowNull: true, // Boleh null
    },
    sifat: {
      type: DataTypes.STRING(12), // Tipe data STRING dengan panjang maksimal 12 karakter
      allowNull: true, // Boleh null
    },
  },
  {
    tableName: "kriteria", // Nama tabel dalam database
    timestamps: false, // Tidak menyertakan kolom createdAt dan updatedAt
  }
);

(async () => {
  await db.sync();
})();
// Export model Kriteria untuk digunakan di file lain
module.exports = Kriteria;
