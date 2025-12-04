import express from "express";
import { register, login, logout, approveNGO } from "../controllers/authController.js";
import { auth, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// ---------------- Public Routes ----------------
router.post("/register", register); // Auto login after registration
router.post("/login", login);
router.get("/logout", logout);

// ---------------- Admin Protected Routes ----------------
router.put("/approve-ngo/:id", auth, isAdmin, approveNGO);

export default router;
