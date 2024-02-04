const express = require("express");
const semuaRoutes = require("./routes/crudRoutes");
const relationRoutes = require("./routes/relationRoutes");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
PORT = 4000;
app.use(express.json());
app.use(cors());
dotenv.config();

app.use("/", semuaRoutes);
app.use("/", relationRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
