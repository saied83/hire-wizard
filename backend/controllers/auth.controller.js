import bcryptjs from "bcryptjs";
import mysqlPool from "../db/mySQL.config.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const formatTime = (isoTime) => {
  const date = new Date(isoTime);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const signUp = async (req, res) => {
  try {
    // get all fields from req.body
    const {
      username,
      password,
      confirm_password,
      bio,
      email,
      phone_no,
      first_name,
      last_name,
      dob,
      gender,
    } = req.body;

    const time_stamp = formatTime(new Date());

    // check if any fields is null or undefined
    if (
      !username ||
      !password ||
      !confirm_password ||
      !bio ||
      !email ||
      !phone_no ||
      !first_name ||
      !last_name ||
      !dob ||
      !gender
    ) {
      return res.status(400).json({ error: "Doesn't provide all fields" });
    }

    // check if password and confirmPassword is same
    if (password !== confirm_password) {
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

    // generate profile picture

    // https://avatar-placeholder.iran.liara.run/

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const profile_pic = gender === "male" ? boyProfilePic : girlProfilePic;

    // create new user in sql
    const connection = await mysqlPool.getConnection();
    try {
      await connection.beginTransaction();
      const [result, fields] = await connection.query(
        `INSERT INTO User ( username, password, bio, email, phone_no, time_stamp, first_name, last_name, dob, gender, profile_pic)
   VALUES (?,?,?,?,?,?,?,?,?,?, ?)`,
        [
          username,
          hashedPassword,
          bio,
          email,
          phone_no,
          time_stamp,
          first_name,
          last_name,
          formatTime(dob),
          gender,
          profile_pic,
        ]
      );

      if (result) {
        //generate JWT here
        generateTokenAndSetCookie(username, res);
      }
      await connection.commit();

      res.status(201).json({
        username,
        first_name,
        last_name,
        gender,
        email,
        phone_no,
        profile_pic,
      });
    } catch (error) {
      await connection.rollback();
      mysqlPool.releaseConnection();
      console.log(
        `Error in signup controller -> data insertion`,
        error.message
      );
      res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error) {
    console.log(`Error in signup controller`, error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if ((!username, !password)) {
    }
    const data = await mysqlPool.query(
      `SELECT username, password, first_name, last_name, email, phone_no, profile_pic, gender from User where username=?`,
      [username]
    );

    if (data[0].length <= 0) {
      return res.status(400).json({ error: "Invalid User" });
    }
    const user = data[0][0];
    const isPassCorrect = await bcryptjs.compare(
      password,
      user?.password || ""
    );

    if (!isPassCorrect) {
      return res.status(400).json({
        error: "Invalid Password",
      });
    }

    generateTokenAndSetCookie(user.username, res);

    res.status(200).json({
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      gender: user.gender,
      email: user.email,
      phone_no: user.phone_no,
      profile_pic: user.profile_pic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logout successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
