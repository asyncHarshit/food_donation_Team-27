import User from "../models/User.js";
import Donation from "../models/Donation.js";
import Report from "../models/Report.js";

// ---------------- Approve NGO ----------------
export const approveNGO = async (req, res) => {
    try {
        const { id } = req.params;
        const ngo = await User.findByIdAndUpdate(
            id,
            { verifiedNGO: true },
            { new: true }
        );

        if (!ngo) return res.status(404).json({ success: false, message: "NGO not found" });

        res.json({ success: true, message: "NGO approved", ngo });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// ---------------- Analytics: total food distributed ----------------
export const getAnalytics = async (req, res) => {
    try {
        const donations = await Donation.find({ status: "distributed" });

        let totalKg = 0;
        donations.forEach(d => {
            totalKg += parseFloat(d.quantity) || 0; // quantity is string, convert to number
        });

        const totalMeals = totalKg * 4; // assume 1kg ~ 4 meals

        res.json({
            success: true,
            totalKg,
            totalMeals,
            totalDonations: donations.length,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// ---------------- View reports ----------------
export const getReports = async (req, res) => {
    try {
        const reports = await Report.find().populate("donation reporter");
        res.json({ success: true, reports });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// ---------------- Resolve report ----------------
export const resolveReport = async (req, res) => {
    try {
        const { id } = req.params;
        const report = await Report.findByIdAndUpdate(id, { resolved: true }, { new: true });

        if (!report) return res.status(404).json({ success: false, message: "Report not found" });

        res.json({ success: true, message: "Report resolved", report });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
