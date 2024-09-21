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

router.post("/add/:username", protectRoute, addHunter);

router.get("/all", protectRoute, getAllHunter);

router.get("/single/:username", protectRoute, getSingleHunter);

router.put("/profile/edit/:username", protectRoute, updateHunterProfile);

router.delete("/profile/delete/:username", protectRoute, deleteHunter);

export default router;
