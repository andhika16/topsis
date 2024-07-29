const express = require("express");
const semuaRoutes = require("./routes/crudRoutes");
const relationRoutes = require("./routes/relationRoutes");
const bcrypt = require("bcryptjs");
const admin = require("./routes/admin");
const topsis = require("./routes/topsis");
const massData = require("./routes/massData");
const db = require("./config/Database");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
PORT = 4000;
app.use(express.json());
app.use(cors());
dotenv.config();

app.use("/", semuaRoutes);
app.use("/", relationRoutes);
app.use("/", topsis);
app.use("/alternatif/", massData);
app.use("/admin", admin);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

(async () => {
  await db.sync();
})();
