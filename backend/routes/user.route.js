import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  getAllUsers,
  getSingleUser,
  editUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/all", protectRoute, getAllUsers);

router.get("/:username", protectRoute, getSingleUser);

router.put("/edit/:username", protectRoute, editUser);

router.delete("/delete/:username", protectRoute, deleteUser);

export default router;
