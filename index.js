import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./Routes/Auth.js";

dotenv.config();

const app = express();

const port = process.env.PORT_URI || 8000;
mongoose.set("strictQuery", false);

async function ConnectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected successfully");
  } catch (err) {
    console.log("DB connection failed: " + err.message);
  }
}

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);

ConnectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  })
  .catch((err) => {
    console.log("error found: " + err.message);
  });
