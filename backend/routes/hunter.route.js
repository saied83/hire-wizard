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

router.post("/add", protectRoute, addHunter);

router.get("/all", protectRoute, getAllHunter);

router.get("/:username", protectRoute, getSingleHunter);

router.put("/profile/edit", protectRoute, updateHunterProfile);

router.delete("/profile/delete/", protectRoute, deleteHunter);

export default router;
