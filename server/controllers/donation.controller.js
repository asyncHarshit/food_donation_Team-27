import Donation from "../models/donation.model.js";
import { generateOTP } from "../utils/generateOtp.js";

// ===============================
// CREATE DONATION (Donor)
// ===============================
export const createDonation = async (req, res) => {
  try {
    const {
      donorId,
      foodType,
      quantity,
      bestBefore,
      imageUrl,
      location, // { type: "Point", coordinates: [lng, lat], address }
    } = req.body;

    // generate OTP for handover
    const otp = generateOTP();

    const donation = await Donation.create({
      donorId,
      foodType,
      quantity,
      bestBefore,
      imageUrl,
      location,
      otp,
      status: "pending",
    });

    res.json({
      success: true,
      message: "Donation created successfully",
      donation,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ===============================
// CLAIM DONATION (NGO Volunteers)
// ===============================
export const claimDonation = async (req, res) => {
  try {
    const { donationId } = req.params;
    const { ngoId } = req.body;

    const donation = await Donation.findById(donationId);

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    if (donation.status !== "pending") {
      return res.status(400).json({ message: "Already claimed by someone else" });
    }

    // lock donation
    donation.claimedBy = ngoId;
    donation.status = "claimed";
    await donation.save();

    res.json({
      success: true,
      message: "Donation claimed successfully",
      donation,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ===============================
// VERIFY OTP (Handover Step)
// ===============================
export const verifyOtp = async (req, res) => {
  try {
    const { donationId } = req.params;
    const { enteredOtp } = req.body;

    const donation = await Donation.findById(donationId);

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    if (donation.status !== "claimed") {
      return res.status(400).json({ message: "Donation is not yet claimed" });
    }

    // compare submitted OTP with stored one
    if (donation.otp !== enteredOtp) {
      return res.status(400).json({ success: false, message: "Incorrect OTP" });
    }

    // OTP matched -> food handed over
    donation.status = "picked"; // volunteer picked up food
    await donation.save();

    res.json({
      success: true,
      message: "OTP verified successfully! Food handed over.",
      donation,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ===============================
// MARK AS DISTRIBUTED (NGO final step)
// ===============================
export const markDistributed = async (req, res) => {
  try {
    const { donationId } = req.params;
    const { proofImage } = req.body;

    const donation = await Donation.findById(donationId);

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    donation.status = "distributed";
    donation.distributedProofImage = proofImage;
    await donation.save();

    res.json({
      success: true,
      message: "Donation marked as distributed",
      donation,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
