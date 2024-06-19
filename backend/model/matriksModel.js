const { DataTypes } = require("sequelize");

const db = require("../config/Database");
const Kategori = require("./kategoriModel");
const Opsi = require("./opsiModel");
const Alternatif = require("./alternatifModel");
// TODO:melalukan perhitungan database mulai dari satu (garap keri ae)


const Matriks = db.define(
  "Matriks",
  {
    id_penilaian: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    id_nilai: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: "Opsi", // Ganti dengan nama model yang sesuai jika diperlukan
        key: "id",
      },
    },
    id_alternatif: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: "Alternatif", // Ganti dengan nama model yang sesuai jika diperlukan
        key: "id",
      },
    },
    nilai: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    normalisasi: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    terbobot: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    nilai_akhir: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    rank: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
  },
  {
    tableName: "matriks",
    timestamps: false,
  }
);

Alternatif.hasMany(Matriks, {
  foreignKey: "id_alternatif",
  onDelete: "CASCADE",
});

Matriks.belongsTo(Opsi, { as: "Opsi", foreignKey: "id_nilai" });
// Matriks.belongsTo(Alternatif, { as: "Alternatif", foreignKey: "id_alternatif" });
Matriks.belongsTo(Alternatif, {
  foreignKey: "id_alternatif",
  onDelete: "CASCADE", // Cascade delete
});




module.exports = Matriks;
