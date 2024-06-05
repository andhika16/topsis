// Import Sequelize dan DataTypes dari Sequelize
const { DataTypes } = require("sequelize");
// Import objek db untuk mengakses koneksi database
const db = require("../config/Database");
const Kriteria = db.define(
  "Kriteria",
  {
    id_kriteria: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    nama_kriteria: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    jenis: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },      
    bobot: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    keterangan: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "kriteria", // Nama tabel yang akan digunakan di database
    timestamps: false, // Optional: Nonaktifkan kolom timestamp (createdAt, updatedAt)
    freezeTableName: true,
  }
);

(async () => {
  await db.sync();
})();
// Export model Kriteria untuk digunakan di file lain
module.exports = Kriteria;
