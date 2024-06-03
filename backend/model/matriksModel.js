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
      references: {
        model: Kriteria,
        key: "id",
      },
      onDelete: "CASCADE",
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

(async () => {
  await db.sync();
})();
Matriks.belongsTo(Alternatif, { as: "alternatif", foreignKey: "AlternatifId" });

module.exports = Matriks;
