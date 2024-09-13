import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import authRoute from "./routes/auth.route.js";
import mysqlPool from "./db/mySQL.config.js";
import userRoute from "./routes/user.route.js";

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
app.use("/api/v1/user", userRoute);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Success" });
});

mysqlPool
  .query("SELECT 1")
  .then(() => {
    // mysql
    console.log("MySQL DB connected".bgBlue.black);
    // listener
    app.listen(PORT, () => {
      console.log(`Running Server on Port ${process.env.PORT}`.bgMagenta.white);
    });
  })
  .catch((err) => {
    console.log(err);
  });
