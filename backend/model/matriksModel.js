const { DataTypes } = require("sequelize");
const db = require("../config/Database");
const Kriteria = require("./kriteriaModel");
const Alternatif = require("./alternatifModel");

const Matriks = db.define(
  "Matriks",
  {
    nilai: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    KriteriaId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    AlternatifId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
  },
  {
    tableName: "matriks",
    timestamps: false,
    freezeTableName: true,
  }
);

Matriks.belongsTo(Alternatif, { as: "alternatif", foreignKey: "AlternatifId" });
Matriks.belongsTo(Kriteria, { as: "kriteria", foreignKey: "KriteriaId" });

(async () => {
  await db.sync();
})();
module.exports = Matriks;
