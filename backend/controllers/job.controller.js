import mysqlPool from "../db/mySQL.config.js";
import { formatTime } from "./auth.controller.js";

const getSingleJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const jobRes = await mysqlPool.query(
      `SELECT * FROM JobPost WHERE job_id=?`,
      [jobId]
    );

    const job = jobRes[0][0];

    const skillRes = await mysqlPool.query(
      `SELECT skill_name FROM Jp_Skill_Required WHERE job_id=?`,
      [jobId]
    );

    const skills = skillRes[0].map((skill) => skill.skill_name);

    const applicantData = await mysqlPool.query(
      `SELECT h_username, is_decline, is_accepted, name, email, cv FROM Apply WHERE job_id=?`,
      [jobId]
    );

    const singleJob = {
      ...job,
      skills,
      applicant: applicantData[0],
    };

    res.status(200).json({
      status: "success",
      message: "parse job successfully",
      data: singleJob,
    });
  } catch (error) {
    console.log("Error in getSingleJob controller", error.message);
    res.status(500).json({ status: "failure", error: "Internal Server Error" });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const jobRes = await mysqlPool.query(`SELECT * FROM JobPost`);

    const jobs = jobRes[0];

    const allJobsPromises = jobs.map(async (job) => {
      const skillData = await mysqlPool.query(
        `SELECT skill_name FROM Jp_Skill_Required WHERE job_id=?`,
        [job.job_id]
      );
      const skills = skillData[0].map((skill) => skill.skill_name);

      const applicantData = await mysqlPool.query(
        `SELECT h_username, is_decline, is_accepted, name, email, cv FROM Apply WHERE job_id=?`,
        [job.job_id]
      );

      return { ...job, skills: skills, applicant: applicantData[0] };
    });

    let allJobs = [];
    for (let i = 0; i < allJobsPromises.length; i++) {
      await allJobsPromises[i].then((data) => allJobs.push(data));
    }

    res.status(200).json({
      status: "success",
      message: "parse all jobs successfully",
      data: allJobs,
    });
  } catch (error) {
    console.log("Error in getAllJobs controller", error.message);
    res.status(500).json({ status: "failure", error: "Internal Server Error" });
  }
};

const createJob = async (req, res) => {
  try {
    const {
      description,
      job_title,
      location,
      salary,
      year_exp,
      apply_limit,
      deadline,
      skills,
    } = req.body;
    const username = req.user.username;

    const time_stamp = formatTime(new Date());
    const deadlineTime = formatTime(deadline);

    const [result, fields] = await mysqlPool.query(
      `INSERT INTO JobPost (description, job_title, location, salary, year_exp, apply_limit, r_username, deadline, time_stamp)
VALUES (?,?,?,?,?,?,?,?,?)`,
      [
        description,
        job_title,
        location,
        salary,
        year_exp,
        apply_limit,
        username,
        deadlineTime,
        time_stamp,
      ]
    );
    const jobId = result["insertId"];
    skills.map(async (skill) => {
      await mysqlPool.query(
        `INSERT INTO Jp_Skill_Required (job_id, skill_name) VALUES (?,?)`,
        [jobId, skill]
      );
    });

    res
      .status(201)
      .json({ status: "success", message: "Job Created Successfully" });
  } catch (error) {
    console.log("Error in createJob controller", error.message);
    res.status(500).json({ status: "failure", error: "Internal Server Error" });
  }
};

const applyIntoJobs = async (req, res) => {
  try {
    const { name, email, cv } = req.body;
    const h_username = req.user.username;
    const jobId = parseInt(req.params.id);

    const jobIdRes = await mysqlPool.query(
      "SELECT job_id FROM JobPost WHERE job_id=?",
      [jobId]
    );
    if (jobIdRes[0].length < 0)
      return res
        .status(404)
        .json({ status: "failure", error: "Job doesn't exist." });

    await mysqlPool.query(
      `INSERT INTO Apply (job_id, h_username, name, email, CV) VALUES (?,?,?,?,?)`,
      [jobId, h_username, name, email, cv]
    );

    res
      .status(201)
      .json({ status: "success", message: "Apply job successfully" });
  } catch (error) {
    console.log("Error in applyIntoJobs controller", error.message);
    res.status(500).json({ status: "failure", error: "Internal Server Error" });
  }
};

const editJob = async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    const {
      description,
      job_title,
      location,
      salary,
      year_exp,
      apply_limit,
      deadline,
      skills,
    } = req.body;
    const username = req.user.username;

    const formateDeadline = formatTime(deadline);

    // add new job hunter
    const connection = await mysqlPool.getConnection();
    try {
      await connection.beginTransaction();
      await connection.query(
        `UPDATE JobPost SET description = ?, job_title = ?, location = ?, salary = ?, year_exp = ?, apply_limit = ?, deadline = ? WHERE job_id = ? AND r_username=?`,
        [
          description,
          job_title,
          location,
          salary,
          year_exp,
          apply_limit,
          formateDeadline,
          jobId,
          username,
        ]
      );

      await connection.query(`DELETE FROM Jp_Skill_Required WHERE job_id=?`, [
        jobId,
      ]);
      skills.map(async (skill) => {
        await connection.query(
          `INSERT INTO Jp_Skill_Required (job_id, skill_name) VALUES (?,?)`,
          [jobId, skill]
        );
      });

      await connection.commit();
      res
        .status(200)
        .json({ status: "success", message: "Job Information Updated" });
    } catch (error) {
      await connection.rollback();
      mysqlPool.releaseConnection();
      console.log(`Error in editJob controller -> data update`, error.message);
      res
        .status(500)
        .json({ status: "failure", error: "Internal Server Error" });
    }
  } catch (error) {
    console.log("Error in editJob controller", error.message);
    res.status(500).json({ status: "failure", error: "Internal Server Error" });
  }
};

const deleteJob = async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    const username = req.user.username;
    const data = await mysqlPool.query(
      `SELECT job_id FROM JobPost WHERE job_id = ? AND r_username=?`,
      [jobId, username]
    );
    const job = data[0][0];

    if (!job)
      return res
        .status(400)
        .json({ status: "failure", error: "Job not Exist" });

    //delete job
    const connection = await mysqlPool.getConnection();
    try {
      await connection.beginTransaction();
      await connection.query(
        `DELETE FROM JobPost WHERE job_id=? AND r_username=?`,
        [jobId, username]
      );
      await connection.commit();
      return res
        .status(200)
        .json({ status: "success", message: "Job delete successfully" });
    } catch (error) {
      await connection.rollback();
      mysqlPool.releaseConnection();
      console.log(
        "Error in deleteJob controller -> delete data",
        error.message
      );
      res
        .status(500)
        .json({ status: "failure", error: "Internal Server Error" });
    }
  } catch (error) {
    console.log("Error in deleteJob controller", error.message);
    res.status(500).json({ status: "failure", error: "Internal Server Error" });
  }
};

const declineJob = async (req, res) => {
  try {
    const { id, username } = req.params;
    await mysqlPool.query(
      `UPDATE Apply SET is_decline = TRUE WHERE job_id = ? AND h_username = ?`,
      [id, username]
    );
    res
      .status(200)
      .json({ status: "success", message: "Updated decline state" });
  } catch (error) {
    console.log("Error in declineJob controller", error.message);
    res.status(500).json({ status: "failure", error: "Internal Server Error" });
  }
};

const acceptedJob = async (req, res) => {
  try {
    const { id, username } = req.params;
    await mysqlPool.query(
      `UPDATE Apply SET is_accepted = TRUE WHERE job_id = ? AND h_username = ?`,
      [id, username]
    );
    res
      .status(200)
      .json({ status: "success", message: "Updated accepted state" });
  } catch (error) {
    console.log("Error in acceptedJob controller", error.message);
    res.status(500).json({ status: "failure", error: "Internal Server Error" });
  }
};

export {
  getSingleJob,
  getAllJobs,
  applyIntoJobs,
  createJob,
  editJob,
  deleteJob,
  declineJob,
  acceptedJob,
};
