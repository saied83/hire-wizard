import mysqlPool from "../db/mySQL.config.js";

const addRecruiter = async (req, res) => {
  try {
    const { c_city, c_zip, c_street, c_country, c_name, designation } =
      req.body;
    const user_name = req.user.username;

    // check existing job hunter user

    const data = await mysqlPool.query(
      `SELECT r_username FROM Recruiter WHERE r_username=?`,
      [user_name]
    );

    const checkedUserName = data[0][0];
    if (!checkedUserName) {
      // add new job hunter
      const connection = await mysqlPool.getConnection();
      try {
        await connection.beginTransaction();
        await connection.query(
          `INSERT INTO Recruiter (r_username, designation,  c_name, c_city, c_street, c_country, c_zip)
VALUES
 (?,?,?,?,?,?,?)`,
          [user_name, designation, c_name, c_city, c_street, c_country, c_zip]
        );

        await connection.commit();
        res.status(200).json({
          status: "success",
          message: "Recruiter user information added",
        });
      } catch (error) {
        await connection.rollback();
        mysqlPool.releaseConnection();
        console.log(
          `Error in addRecruiter controller -> data update`,
          error.message
        );
        res
          .status(500)
          .json({ status: "failure", error: "Internal Server Error" });
      }
    } else {
      return res
        .status(400)
        .json({ status: "failure", error: "Job Recruiter already exists" });
    }
  } catch (error) {
    console.log("Error in addRecruiter controller", error.message);
    res.status(500).json({ status: "failure", error: "Internal Server Error" });
  }
};

const getAllRecruiter = async (req, res) => {
  try {
    const user_name = req.user.username;
    const allRecruiter = await mysqlPool.query(
      `
            SELECT u.username, u.bio, u.email, u.phone_no, u.time_stamp, u.first_name, u.last_name, u.dob, u.gender, u.profile_pic, c_city, c_zip, c_street, c_country, c_name, designation FROM Recruiter r JOIN User u on u.username=r.r_username`,
      [user_name]
    );

    const hunterProfile = allRecruiter[0].map((recruiterData) => {
      return {
        r_username: recruiterData.username,
        bio: recruiterData.bio,
        email: recruiterData.email,
        phone_no: recruiterData.phone_no,
        time_stamp: recruiterData.time_stamp,
        first_name: recruiterData.first_name,
        last_name: recruiterData.last_name,
        dob: recruiterData.dob,
        gender: recruiterData.gender,
        profile_pic: recruiterData.profile_pic,
        company: {
          c_city: recruiterData.c_city,
          c_zip: recruiterData.c_zip,
          c_street: recruiterData.c_street,
          c_country: recruiterData.c_country,
          c_name: recruiterData.c_name,
          designation: recruiterData.designation,
        },
      };
    });

    res
      .status(200)
      .json({
        status: "success",
        message: "parse all recruiter information successfully",
        data: hunterProfile,
      });
  } catch (error) {
    console.log("Error in getAllRecruiter controller", error.message);
    res.status(500).json({ status: "failure", error: "Internal Server Error" });
  }
};

const getSingleRecruiter = async (req, res) => {
  try {
    const user_name = req.params.username;

    const profileData = await mysqlPool.query(
      `
            SELECT u.username, u.bio, u.email, u.phone_no, u.time_stamp, u.first_name, u.last_name, u.dob, u.gender, u.profile_pic, c_city, c_zip, c_street, c_country, c_name, designation FROM Recruiter r JOIN User u on u.username=r.r_username WHERE r_username=?`,
      [user_name]
    );

    const userProfileData = profileData[0];
    if (!userProfileData) {
      return res
        .status(404)
        .json({ status: "failure", error: "No record found" });
    }
    const recruiterData = userProfileData[0];

    const Recruiter = {
      r_username: recruiterData.username,
      bio: recruiterData.bio,
      email: recruiterData.email,
      phone_no: recruiterData.phone_no,
      time_stamp: recruiterData.time_stamp,
      first_name: recruiterData.first_name,
      last_name: recruiterData.last_name,
      dob: recruiterData.dob,
      gender: recruiterData.gender,
      profile_pic: recruiterData.profile_pic,
      company: {
        c_city: recruiterData.c_city,
        c_zip: recruiterData.c_zip,
        c_street: recruiterData.c_street,
        c_country: recruiterData.c_country,
        c_name: recruiterData.c_name,
        designation: recruiterData.designation,
      },
    };

    res
      .status(200)
      .json({
        status: "success",
        message: "parse recruiter info successfully",
        data: Recruiter,
      });
  } catch (error) {
    console.log("Error in getSingleHunter controller", error.message);
    res
      .status(500)
      .json({ status: "failure", message: "Internal Server Error" });
  }
};

const updateRecruiterProfile = async (req, res) => {
  try {
    const { c_city, c_zip, c_street, c_country, c_name, designation } =
      req.body;
    const user_name = req.user.username;

    // check existing job hunter user

    const data = await mysqlPool.query(
      `SELECT r_username FROM Recruiter WHERE r_username=?`,
      [user_name]
    );

    const checkedUserName = data[0][0];
    if (checkedUserName) {
      // add new job hunter
      const connection = await mysqlPool.getConnection();
      try {
        await connection.beginTransaction();
        await connection.query(
          `UPDATE Recruiter SET c_city=?, c_zip=?, c_street=?, c_country=?, c_name=?, designation=? WHERE r_username=?`,
          [c_city, c_zip, c_street, c_country, c_name, designation, user_name]
        );

        await connection.commit();
        res
          .status(200)
          .json({ status: "success", message: "User Information Updated" });
      } catch (error) {
        await connection.rollback();
        mysqlPool.releaseConnection();
        console.log(
          `Error in updateHunterProfile controller -> data update`,
          error.message
        );
        res
          .status(500)
          .json({ status: "failure", error: "Internal Server Error" });
      }
    } else {
      return res
        .status(400)
        .json({ status: "failure", error: "Add recruiter information first" });
    }
  } catch (error) {
    console.log("Error in addRecruiterProfile controller", error.message);
    res
      .status(500)
      .json({ status: "failure", message: "Internal Server Error" });
  }
};

const deleteRecruiter = async (req, res) => {
  try {
    const user_name = req.user.username;

    const data = await mysqlPool.query(
      `SELECT r_username FROM Recruiter WHERE r_username = ?`,
      [user_name]
    );
    const user = data[0][0];

    if (!user)
      return res
        .status(400)
        .json({ status: "failure", error: "Recruiter User not Exist" });

    //delete job hunter profile
    const connection = await mysqlPool.getConnection();
    try {
      await connection.beginTransaction();
      await connection.query(`DELETE FROM Recruiter WHERE r_username=? `, [
        user_name,
      ]);
      await connection.commit();
      return res.status(200).json({
        status: "success",
        message: "Recruiter User delete successfully",
      });
    } catch (error) {
      await connection.rollback();
      mysqlPool.releaseConnection();
      console.log(
        "Error in deleteRecruiter controller -> delete data",
        error.message
      );
      res.status(500).json({ status: "failure", message: "db error" });
    }
  } catch (error) {
    console.log("Error in deleteRecruiter controller", error.message);
    res.status(500).json({ status: "failure", error: "Internal Server Error" });
  }
};

export {
  addRecruiter,
  getAllRecruiter,
  getSingleRecruiter,
  updateRecruiterProfile,
  deleteRecruiter,
};
