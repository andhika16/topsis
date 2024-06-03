const { DataTypes } = require("sequelize");
const db = require("../config/Database");
const Kriteria = require("./kriteriaModel");
const Alternatif = require("./alternatifModel");

const Matriks = db.define(
  "Matriks",
  {
    id_penilaian: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    id_nilai: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "nilai", // Name of the table that this foreign key references
        key: "id_nilai",
      },
    },
    id_alternatif: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "alternatif", // Assuming there is an `alternatif` table, you need to replace it with the actual table name
        key: "id_alternatif",
      },
    },
    nilai: {
      type: DataTypes.INTEGER,
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
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "matriks",
    timestamps: false,
    freezeTableName: true,
  }
);

(async () => {
  await db.sync();
})();
Matriks.belongsTo(Alternatif, { as: "alternatif", foreignKey: "AlternatifId" });

module.exports = Matriks;
