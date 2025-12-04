import express from "express";
import {
  createDonation,
  claimDonation,
  verifyOtp,
  markDistributed,
} from "../controllers/donation.controller.js";

const router = express.Router();

// Create donation
router.post("/create", createDonation);

// Claim donation
router.post("/claim/:donationId", claimDonation);

// Verify OTP (handover)
router.post("/verify-otp/:donationId", verifyOtp);

// Mark as distributed
router.post("/distributed/:donationId", markDistributed);

export default router;
