import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  addRecruiter,
  deleteRecruiter,
  getAllRecruiter,
  getSingleRecruiter,
  updateRecruiterProfile,
} from "../controllers/recruiter.controller.js";

const router = express.Router();

router.post("/add", protectRoute, addRecruiter);

router.get("/all", protectRoute, getAllRecruiter);

router.get("/:username", protectRoute, getSingleRecruiter);

router.put("/profile/edit", protectRoute, updateRecruiterProfile);

router.delete("/profile/delete/", protectRoute, deleteRecruiter);

export default router;
