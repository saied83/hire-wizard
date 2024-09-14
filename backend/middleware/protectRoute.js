import jwt from "jsonwebtoken";
import mysqlPool from "../db/mySQL.config.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }
    const data = await mysqlPool.query(
      `SELECT username, email, phone_no, first_name, last_name, dob, gender, profile_pic FROM User WHERE username=?`,
      [decoded.username]
    );

    if (data[0].length <= 0) {
      console.log("validation error in protectRoute");
      return res.status(404).json({ error: "User not found" });
    }
    const user = data[0][0];

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
