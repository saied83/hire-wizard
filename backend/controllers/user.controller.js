import mysqlPool from "../db/mySQL.config.js";
import { formatTime } from "./auth.controller.js";
import bcryptjs from "bcryptjs";

const getAllUsers = async (req, res) => {
  try {
    const data = await mysqlPool.query(
      `SELECT username, password, bio, email, phone_no, time_stamp, first_name, last_name, dob, profile_pic, gender FROM User`
    );

    const users = data[0];

    if (!users) {
      return res.status(404).json({ error: "Users not Found" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.log("Error in getAllUsers Controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const user_name = req.params.username;
    const data = await mysqlPool.query(
      `SELECT username, password, bio, email, phone_no, time_stamp, first_name, last_name, dob, profile_pic, gender FROM User WHERE username=?`,
      [user_name]
    );

    const users = data[0][0];

    if (!users) {
      return res.status(404).json({ error: "Users not Found" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.log("Error in getAllUsers Controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const editUser = async (req, res) => {
  try {
    const user_name = req.params.username;
    const {
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

    // check if password and confirmPassword is same
    if (password !== confirm_password) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    // gender
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${user_name}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${user_name}`;
    const profile_pic = gender === "male" ? boyProfilePic : girlProfilePic;

    // HASH PASSWORD HERE
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // update user data
    const connection = await mysqlPool.getConnection();
    try {
      await connection.beginTransaction();
      const [result, fields] = await connection.query(
        `Update User SET   password=?, bio=?, email=?, phone_no=?, first_name=?, last_name=?, dob=?, gender=?, profile_pic=? WHERE username=?`,
        [
          hashedPassword,
          bio,
          email,
          phone_no,
          first_name,
          last_name,
          formatTime(dob),
          gender,
          profile_pic,
          user_name,
        ]
      );
      await connection.commit();
      res.status(200).json({
        message: "User Information Updated",
      });
    } catch (error) {
      await connection.rollback();
      mysqlPool.releaseConnection();
      console.log(`Error in editUser controller -> data update`, error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error) {
    console.log("Error in editUser Controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteUser = async (req, res) => {
  try {
    const user_name = req.params.user_name;
    //delete user
    const connection = await mysqlPool.getConnection();
    try {
      await connection.beginTransaction();
      const [result, fields] = await connection.query(
        `DELETE FROM User WHERE username = ?`,
        [user_name]
      );
      await connection.commit();
      res.cookie("jwt", "", { maxAge: 0 });
      res.status(200).json({
        message: "User Deleted Successfully",
      });
    } catch (error) {
      await connection.rollback();
      mysqlPool.releaseConnection();
      console.log(
        `Error in deleteUser controller -> data delete`,
        error.message
      );
      res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error) {
    console.log("Error in deleteUser Controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getAllUsers, getSingleUser, editUser, deleteUser };
