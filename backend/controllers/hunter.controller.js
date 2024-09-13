import mysqlPool from "../db/mySQL.config.js";

const addHunter = async (req, res) => {
  try {
    const { city, zip_code, street, country, working_role, skills, projects } =
      req.body;
    const user_name = req.user.username;

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
          [user_name, city, street, zip_code, country, working_role]
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
          message: "User Information Updated",
        });
      } catch (error) {
        await connection.rollback();
        mysqlPool.releaseConnection();
        console.log(
          `Error in editUser controller -> data update`,
          error.message
        );
        res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      return res.status(400).json({ error: "Job Hunter already exists" });
    }
  } catch (error) {
    console.log("Error in addHunter controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllHunter = async (req, res) => {
  try {
    const allHunter = await mysqlPool.query(`SELECT * FROM JobHunter`);
    const allHunterProfile = allHunter[0];

    const allHunters = allHunterProfile.map(async (profile) => {
      const skillData = await mysqlPool.query(`SELECT `);
      return {};
    });
  } catch (error) {
    console.log("Error in getAllHunter controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSingleHunter = async (req, res) => {
  try {
    const user_name = req.params.username;
    const jobHunter = {};

    const profileData = await mysqlPool.query(
      `
            SELECT * FROM JobHunter WHERE h_username=?`,
      [user_name]
    );

    const userProfileData = profileData[0][0];
    if (!userProfileData) {
      return res.status(404).json({ error: "No record found" });
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

    jobHunter.username = userProfileData.h_username;
    jobHunter.city = userProfileData.h_city;
    jobHunter.zip_code = userProfileData.h_zip_code;
    jobHunter.county = userProfileData.h_country;
    jobHunter.working_role = userProfileData.h_working_role;
    jobHunter.skills = userSkillData;
    jobHunter.projects = userProjectData;

    res.status(200).json(jobHunter);
  } catch (error) {
    console.log("Error in getSingleHunter controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateHunterProfile = async (req, res) => {};

const deleteHunter = async (req, res) => {
  try {
    const user_name = req.user.username;

    const data = await mysqlPool.query(
      `SELECT h_username FROM JobHunter WHERE h_username = ?`,
      [user_name]
    );
    const user = data[0][0];

    if (!user) return res.status(400).json({ error: "Hunter User not Exist" });

    //delete job hunter profile
    const connection = await mysqlPool.getConnection();
    try {
      await connection.beginTransaction();
      await connection.query(`DELETE FROM JobHunter WHERE h_username=? `, [
        user_name,
      ]);
      await connection.commit();
      return res
        .status(200)
        .json({ message: "Hunter User delete successfully" });
    } catch (error) {
      await connection.rollback();
      mysqlPool.releaseConnection();
      console.log("Error in deleteHunter controller -> delete data");
      res.status(500).json({ message: "db error" });
    }
  } catch (error) {
    console.log("Error in deleteHunter controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  addHunter,
  getAllHunter,
  getSingleHunter,
  updateHunterProfile,
  deleteHunter,
};
