import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import route from "./routes/index.js";

const PORT = process.env.PORT || 8080;
const app = express();
const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log("MONGO DB CONNECTED");
  })
  .catch((error) => {
    console.log("Error on DB", error.message);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

app.use(route);
app.listen(PORT, () => {
  console.log(`Server Running on https://localhost:${PORT}`);
});

