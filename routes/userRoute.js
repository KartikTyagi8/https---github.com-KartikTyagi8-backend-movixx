import express from "express";
import User from "../models/User.js";
import {
  getMyProfile,
  newUser,
  // updateUser,
  // deleteUser,
  loginUser,
  logoutUser,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/Auth.js";

const router = express.Router();

router.get("/me", isAuthenticated, getMyProfile);

router.post("/new", newUser);

router.post("/login", loginUser);
router.get("/logout", logoutUser);

// router.route("/:id").put(updateUser).delete(deleteUser);

export default router;
