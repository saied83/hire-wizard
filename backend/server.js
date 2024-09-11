import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import authRoute from "./routes/auth.route.js";

// config
dotenv.config();

const PORT = process.env.PORT || 5050;
const __dirname = path.resolve();

// rest object
const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// routes
app.use("/api/v1/auth", authRoute);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Success" });
});

app.listen(8000, () => {
  console.log(`Server running on Port: ${PORT}`.bgCyan.black);
});
