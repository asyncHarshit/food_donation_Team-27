import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },

    phone: { type: String, required: true },

    role: {
        type: String,
        enum: ["DONOR", "VOLUNTEER", "NGO", "ADMIN"],
        default: "DONOR"
    },

    verifiedNGO: { type: Boolean, default: false }, // Admin will approve NGOs

}, { timestamps: true });

export default mongoose.model("User", userSchema);
