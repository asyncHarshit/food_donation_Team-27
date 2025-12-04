import express from "express";
import {
	approveNGO,
	getAnalytics,
	getReports,
	resolveReport,
} from "../controllers/adminController.js";
import { auth, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// GET /api/admin/analytics
router.get("/analytics", auth, isAdmin, getAnalytics);

// GET /api/admin/reports
router.get("/reports", auth, isAdmin, getReports);

// PUT /api/admin/reports/:id/resolve
router.put("/reports/:id/resolve", auth, isAdmin, resolveReport);

// PUT /api/admin/approve-ngo/:id  
router.put("/approve-ngo/:id", auth, isAdmin, approveNGO);

export default router;
