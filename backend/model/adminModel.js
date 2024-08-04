const { DataTypes } = require("sequelize");
const db = require("../config/Database"); // Pastikan Anda sudah mengkonfigurasi database Anda

const Admin = db.define("Admin", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
(async () => {
  await db.sync();
})();

module.exports = Admin;
