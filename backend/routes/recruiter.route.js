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

router.post("/add/:username", protectRoute, addRecruiter);

router.get("/all", protectRoute, getAllRecruiter);

router.get("/single/:username", protectRoute, getSingleRecruiter);

router.put("/profile/edit/:username", protectRoute, updateRecruiterProfile);

router.delete("/profile/delete/:username", protectRoute, deleteRecruiter);

export default router;
