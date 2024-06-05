const { DataTypes } = require("sequelize");
const db = require("../config/Database");

const Opsi = db.define(
  "Opsi",
  {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    kategori_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: "kategori",
        key: "id",
      },
    },
    label: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    value: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
  },
  {
    tableName: "opsi",
    timestamps: false,
  }
);

module.exports = Opsi;
