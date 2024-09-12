import bcryptjs from "bcryptjs";
import mysqlPool from "../db/mySQL.config.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signUp = async (req, res) => {
  try {
    // get all fields from req.body
    const {
      username,
      password,
      confirmPassword,
      bio,
      email,
      phoneNo,
      firstName,
      lastName,
      dob,
      gender,
    } = req.body;

    const formatTime = (isoTime) => {
      const date = new Date(isoTime);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };
    const time_stamp = formatTime(new Date());

    // check if any fields is null or undefined
    if (
      !username ||
      !password ||
      !confirmPassword ||
      !bio ||
      !email ||
      !phoneNo ||
      !firstName ||
      !lastName ||
      !dob ||
      !gender
    ) {
      return res.status(400).json({ error: "Doesn't provide all fields" });
    }

    // check if password and confirmPassword is same
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    // check the existence of username
    try {
      const [result, fields] = await mysqlPool.query(
        `SELECT username FROM User WHERE username=?`,
        [username]
      );
      if (result.length !== 0)
        return res.status(400).json({ error: "User already exists" });
    } catch (error) {
      mysqlPool.releaseConnection();
      console.log("Error in signup controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }

    // HASH PASSWORD HERE
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // create new user in sql
    const connection = await mysqlPool.getConnection();
    try {
      await connection.beginTransaction();
      const [result, fields] = await connection.query(
        `INSERT INTO User (username, password, bio, email, phone_no, time_stamp, first_name, last_name, dob, gender)
   VALUES (?,?,?,?,?,?,?,?,?,?)`,
        [
          username,
          hashedPassword,
          bio,
          email,
          phoneNo,
          time_stamp,
          firstName,
          lastName,
          formatTime(dob),
          gender,
        ]
      );
      await connection.commit();

      if (result) {
        //generate JWT here
        generateTokenAndSetCookie(username, res);
      }

      res.status(201).json({
        username: username,
        fullName: firstName + " " + lastName,
      });
    } catch (error) {
      await connection.rollback();
      mysqlPool.releaseConnection();
      console.log(`Error in data insertion`, error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error) {
    console.log(`Error in signup controller`, error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {};
export const logout = (req, res) => {};
