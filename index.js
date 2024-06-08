import { config } from "dotenv";
import express from "express";
import connectDB from "./db/connect.js";
import cors from "cors";
import bodyParser from "body-parser";
import tanamanroute from "./routes/tanaman.js";
import tanamroute from "./routes/tanam.js";
import suhuTanamRoute from "./routes/suhu_tanam.js";
import KelembapanTanamRoute from "./routes/kelembapan_tanam.js";

config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => res.json({ message: "Welcome to Research API" }));
app.use("/api/tanaman", tanamanroute);
app.use("/api/tanam", tanamroute);
app.use("/api/suhu_tanam", suhuTanamRoute);
app.use("/api/kelembapan_tanam", KelembapanTanamRoute);

async function start() {
  try {
    await connectDB(process.env.DATABASE_URL);
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (e) {
    console.log(e.message);
  }
}

start();
