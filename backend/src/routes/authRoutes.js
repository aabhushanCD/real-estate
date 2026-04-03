import express from "express";
import {
  authMe,
  login,
  logout,
  signUp,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", verifyToken, authMe);

export default router;
