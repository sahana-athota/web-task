import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import mailRoutes from "./mails/route.js";
//import Mail from './mails/model.js';
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();
const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.DB;
app.use(cors("*"));
app.use(express.json());
const _dirname="C:\\Users\\sahan\\Downloads\\Coding Week Task\\Coding Week Task"
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });


app.use(express.static(path.join(_dirname, "frontend"))); 
app.use("/api/mail", mailRoutes);

app.get("/", async (req, res) => {
   res.sendFile(_dirname+"/frontend/index.html");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
