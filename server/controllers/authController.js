import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ---------------- REGISTER + AUTO LOGIN ----------------
export const register = async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;

        if (!name || !email || !password || !phone) {
            return res.status(400).json({ success: false, message: "All fields required" });
        }

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ success: false, message: "Email already registered" });

        const hashPass = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashPass, phone, role });

        // Create JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Store token in HttpOnly cookie (inline)
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            success: true,
            message: "Registration successful, logged in automatically",
            user: { name: user.name, email: user.email, role: user.role }
        });

    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

// ---------------- LOGIN ----------------
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ success: false, message: "Invalid password" });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Store token in HttpOnly cookie (inline)
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: { name: user.name, email: user.email, role: user.role }
        });

    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

// ---------------- LOGOUT ----------------
export const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    return res.json({ success: true, message: "Logged out successfully" });
};

// ---------------- APPROVE NGO (Admin only) ----------------
export const approveNGO = async (req, res) => {
    try {
        const id = req.params.id;

        const updated = await User.findByIdAndUpdate(
            id,
            { verifiedNGO: true },
            { new: true }
        );

        if (!updated) return res.status(404).json({ success: false, message: "User not found" });

        res.json({ success: true, message: "NGO Verified", user: updated });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
