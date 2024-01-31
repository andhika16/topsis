const { DataTypes } = require("sequelize");
const Alternatif = require("./alternatifModel");
const Kriteria = require("./kriteriaModel");
const db = require("../config/Database");

const Matriks = db.define(
  "Matriks",
  {
    nilai: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    id_alternatif: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
      references: {
        model: Alternatif,
        key: "id",
      },
    },
    id_kriteria: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
      references: {
        model: Kriteria,
        key: "id",
      },
    },
  },
  {
    tableName: "matriks",
    timestamps: false,
  }
);

(async () => {
  await db.sync();
})();

// Asosiasi dengan model Alternatif
Matriks.belongsTo(Alternatif, { foreignKey: "id_alternatif" });
Alternatif.hasMany(Matriks, { foreignKey: "id_alternatif" });

// Asosiasi dengan model Kriteria
Matriks.belongsTo(Kriteria, { foreignKey: "id_kriteria" });
Kriteria.hasMany(Matriks, { foreignKey: "id_kriteria" });

module.exports = Matriks;
