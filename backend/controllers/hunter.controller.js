import mysqlPool from "../db/mySQL.config.js";

const addHunter = async (req, res) => {
  try {
    const {
      h_city,
      h_zip_code,
      h_street,
      h_country,
      h_working_role,
      skills,
      projects,
    } = req.body;
    const userName = req.user.username;
    const user_name = req.params.username;

    if (userName !== user_name) {
      return res.status(304).json({
        success: "failure",
        error: "Access Denied",
      });
    }

    // check existing job hunter user

    const data = await mysqlPool.query(
      `SELECT h_username FROM JobHunter WHERE h_username=?`,
      [user_name]
    );

    const checkedUserName = data[0][0];
    if (!checkedUserName) {
      // add new job hunter
      const connection = await mysqlPool.getConnection();
      try {
        await connection.beginTransaction();
        await connection.query(
          `INSERT INTO JobHunter (h_username, h_city, h_street, h_zip_code, h_country, h_working_role) VALUES (?,?,?,?,?,?)`,
          [user_name, h_city, h_street, h_zip_code, h_country, h_working_role]
        );

        skills.map(async (skill) => {
          await connection.query(
            `INSERT INTO H_Skill (h_username, skill_name, years_exp) VALUES (?,?,?)`,
            [user_name, skill.skill_name, skill.years_exp]
          );
        });

        projects.map(async (project) => {
          await connection.query(
            `INSERT INTO H_Project (h_username, title, p_link, p_desc, technology) VALUES (?,?,?, ?,?)`,
            [
              user_name,
              project.title,
              project.p_link,
              project.p_desc,
              project.technology,
            ]
          );
        });

        await connection.commit();
        res.status(200).json({
          status: "success",
          message: "JobHunter user information added",
        });
      } catch (error) {
        await connection.rollback();
        mysqlPool.releaseConnection();
        console.log(
          `Error in addHunter controller -> data update`,
          error.message
        );
        res
          .status(500)
          .json({ status: "failure", error: "Internal Server Error" });
      }
    } else {
      return res
        .status(400)
        .json({ status: "failure", error: "Job Hunter already exists" });
    }
  } catch (error) {
    console.log("Error in addHunter controller", error.message);
    res.status(500).json({ status: "failure", error: "Internal Server Error" });
  }
};

const getAllHunter = async (req, res) => {
  try {
    const allHunter = await mysqlPool.query(
      `SELECT j.h_username, u.bio, u.email, u.phone_no, u.time_stamp, u.first_name, u.last_name, u.dob, u.gender, u.profile_pic, h_city, h_street, h_zip_code, h_country, h_working_role FROM JobHunter j JOIN User u on u.username=j.h_username`
    );

    const allHunterProfile = allHunter[0];

    const hunterProfile = allHunterProfile.map(async (profile) => {
      const skillData = await mysqlPool.query(
        `SELECT skill_name, years_exp FROM H_Skill WHERE h_username=?`,
        [profile.h_username]
      );
      const skills = skillData[0];

      const projectData = await mysqlPool.query(
        `SELECT title, p_link, p_desc, technology FROM H_Project WHERE h_username=?`,
        [profile.h_username]
      );

      const projects = projectData[0];
      return { ...profile, skills, projects };
    });

    let jobHunters = [];
    for (let i = 0; i < hunterProfile.length; i++) {
      await hunterProfile[i].then((data) => jobHunters.push(data));
    }

    res.status(200).json({
      status: "success",
      message: "parse all job hunter successfully",
      data: jobHunters,
    });
  } catch (error) {
    console.log("Error in getAllHunter controller", error.message);
    res.status(500).json({ status: "failure", error: "Internal Server Error" });
  }
};

const getSingleHunter = async (req, res) => {
  try {
    const user_name = req.params.username;

    const profileData = await mysqlPool.query(
      `
            SELECT j.h_username, u.bio, u.email, u.phone_no, u.time_stamp, u.first_name, u.last_name, u.dob, u.gender, u.profile_pic, h_city, h_street, h_zip_code, h_country, h_working_role FROM JobHunter j JOIN User u on u.username=j.h_username WHERE h_username=?`,
      [user_name]
    );
    const data = await mysqlPool.query(
      `SELECT username, password, bio, email, phone_no, time_stamp, first_name, last_name, dob, profile_pic, gender FROM User WHERE username=?`,
      [user_name]
    );

    const user = data[0][0];

    const userProfileData = profileData[0];
    if (userProfileData.length <= 0) {
      return res.status(200).json({
        status: "success",
        error: "No hunter record found",
        data: user,
      });
    }

    const skillData = await mysqlPool.query(
      `
        SELECT skill_name, years_exp FROM H_Skill WHERE h_username=?`,
      [user_name]
    );

    const userSkillData = skillData[0];

    const projectData = await mysqlPool.query(
      `SELECT title, p_link, p_desc, technology FROM H_Project WHERE h_username=?`,
      [user_name]
    );

    const userProjectData = projectData[0];

    res.status(200).json({
      status: "success",
      message: "parse hunter data successfully",
      data: {
        ...userProfileData[0],
        skills: userSkillData,
        project: userProjectData,
      },
    });
  } catch (error) {
    console.log("Error in getSingleHunter controller", error.message);
    res
      .status(500)
      .json({ status: "failure", message: "Internal Server Error" });
  }
};

const updateHunterProfile = async (req, res) => {
  try {
    const user_name = req.params.username;
    const {
      h_city,
      h_zip_code,
      h_street,
      h_country,
      h_working_role,
      skills,
      projects,
    } = req.body;

    // check existing job hunter user

    const data = await mysqlPool.query(
      `SELECT h_username FROM JobHunter WHERE h_username=?`,
      [user_name]
    );

    const checkedUserName = data[0][0];
    if (checkedUserName) {
      // add new job hunter
      const connection = await mysqlPool.getConnection();
      try {
        await connection.beginTransaction();
        await connection.query(
          `UPDATE JobHunter SET h_city=?, h_street=?, h_zip_code=?, h_country=?, h_working_role=? WHERE h_username=?`,
          [h_city, h_street, h_zip_code, h_country, h_working_role, user_name]
        );

        await connection.query(`DELETE FROM H_Skill WHERE h_username=?`, [
          user_name,
        ]);

        skills.map(async (skill) => {
          await connection.query(
            `INSERT INTO H_Skill (h_username, skill_name, years_exp) VALUES (?,?,?)`,
            [user_name, skill.skill_name, skill.years_exp]
          );
        });

        await connection.query(`DELETE FROM H_Project WHERE h_username=?`, [
          user_name,
        ]);

        projects.map(async (project) => {
          await connection.query(
            `INSERT INTO H_Project (h_username, title, p_link, p_desc, technology) VALUES (?,?,?, ?,?)`,
            [
              user_name,
              project.title,
              project.p_link,
              project.p_desc,
              project.technology,
            ]
          );
        });

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
        .json({ status: "failure", error: "Add job hunter information first" });
    }
  } catch (error) {
    console.log("Error in addHunterProfile controller", error.message);
    res.status(500).json({ status: "failure", error: "Internal Server Error" });
  }
};

const deleteHunter = async (req, res) => {
  try {
    const user_name = req.params.username;

    const data = await mysqlPool.query(
      `SELECT h_username FROM JobHunter WHERE h_username = ?`,
      [user_name]
    );
    const user = data[0][0];

    if (!user)
      return res
        .status(400)
        .json({ status: "failure", error: "Hunter User not Exist" });

    //delete job hunter profile
    const connection = await mysqlPool.getConnection();
    try {
      await connection.beginTransaction();
      await connection.query(`DELETE FROM JobHunter WHERE h_username=? `, [
        user_name,
      ]);
      await connection.commit();
      return res.status(200).json({
        status: "success",
        message: "Hunter User delete successfully",
      });
    } catch (error) {
      await connection.rollback();
      mysqlPool.releaseConnection();
      console.log(
        "Error in deleteHunter controller -> delete data",
        error.message
      );
      res.status(500).json({ status: "failure", message: "db error" });
    }
  } catch (error) {
    console.log("Error in deleteHunter controller", error.message);
    res.status(500).json({ status: "failure", error: "Internal Server Error" });
  }
};

export {
  addHunter,
  getAllHunter,
  getSingleHunter,
  updateHunterProfile,
  deleteHunter,
};
