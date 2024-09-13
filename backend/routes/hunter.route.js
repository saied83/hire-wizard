import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  addHunter,
  getAllHunter,
  getSingleHunter,
  updateHunterProfile,
  deleteHunter,
} from "../controllers/hunter.controller.js";

const router = express.Router();

router.put("/add", protectRoute, addHunter);

router.get("/all", protectRoute, getAllHunter);

router.get("/:username", protectRoute, getSingleHunter);

router.put("/update/profile:username", protectRoute, updateHunterProfile);

router.delete("/delete/:username", protectRoute, deleteHunter);

export default router;
