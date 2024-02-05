const { DataTypes } = require("sequelize");
const db = require("../config/Database");

const Kriteria = db.define(
  "Kriteria",
  {
    nama_kriteria: {
      type: DataTypes.STRING(35),
      allowNull: false,
    },
    AlternatifId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    bobot: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    poin1: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    poin2: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    poin3: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    poin4: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    poin5: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    sifat: {
      type: DataTypes.STRING(12),
      allowNull: true,
    },
  },
  {
    tableName: "kriteria",
    timestamps: false,
    freezeTableName: true,
  }
);
(async () => {
  await db.sync();
})();
// Jika diperlukan, Anda dapat menambahkan hubungan (associations) dengan tabel lain di sini
Kriteria.hasMany(db.define("Matriks"), { foreignKey: "KriteriaId" });
Kriteria.belongsTo(db.define("Alternatif"), { foreignKey: "AlternatifId" });

module.exports = Kriteria;
