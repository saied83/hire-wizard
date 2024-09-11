import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

// configs
dotenv.config();

const PORT = process.env.PORT;

// rest object
const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Success" });
});

app.listen(8000, () => {
  console.log(`Server running on Port: ${PORT}`.bgCyan.black);
});
