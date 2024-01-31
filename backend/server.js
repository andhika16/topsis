const express = require("express");
const semuaRoutes = require("./routes/semuaRoutes");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
PORT = 4000;
app.use(express.json());
app.use(cors());
dotenv.config();

app.use("/", semuaRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
