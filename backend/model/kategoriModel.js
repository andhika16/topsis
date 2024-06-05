const { DataTypes } = require("sequelize");
const db = require("../config/Database");
const Opsi = require("./opsiModel");

const Kategori = db.define(
  "Kategori",
  {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nama: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    bobot: {
      type: DataTypes.INTEGER(12),
      allowNull: false,
    },
  },
  {
    tableName: "kategori",
    timestamps: false,
  }
);

Kategori.hasMany(Opsi, { as: "opsi", foreignKey: "kategori_id" });
Opsi.belongsTo(Kategori, { as: "kategori", foreignKey: "kategori_id" });

(async () => {
  await db.sync();
})();

module.exports = Kategori;
