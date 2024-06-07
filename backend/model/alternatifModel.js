const { DataTypes } = require("sequelize");
const db = require("../config/Database");

const Alternatif = db.define(
  "Alternatif",
  {
    nama_alternatif: {
      type: DataTypes.STRING(35),
      allowNull: false,
    },
    no_kk: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    jenis_kelamin: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    alamat: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    no_telp: {
      type: DataTypes.STRING(13),
      allowNull: false,
    },
    pekerjaan: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
  },
  {
    tableName: "alternatif", // Nama tabel yang akan digunakan di database
    timestamps: false, // Optional: Nonaktifkan kolom timestamp (createdAt, updatedAt)
    freezeTableName: true,
  }
);

(async () => {
  await db.sync();
})();
// Jika diperlukan, Anda dapat menambahkan hubungan (associations) dengan tabel lain di sini
Alternatif.hasMany(db.define("Matriks"), { foreignKey: "id_alternatif" });

module.exports = Alternatif;
