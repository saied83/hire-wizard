import express from "express";
import {
  getSingleJob,
  getAllJobs,
  applyIntoJobs,
  createJob,
  editJob,
  deleteJob,
  declineJob,
  acceptedJob,
} from "../controllers/job.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/all", protectRoute, getAllJobs);

router.get("/:id", protectRoute, getSingleJob);

router.post("/create", protectRoute, createJob);

router.post("/apply/:id", protectRoute, applyIntoJobs);

router.put("/edit/:id", protectRoute, editJob);

router.delete("/delete/:id", protectRoute, deleteJob);

router.put("/decline/:id/:username", protectRoute, declineJob);

router.put("/approve/:id/:username", protectRoute, acceptedJob);

export default router;
