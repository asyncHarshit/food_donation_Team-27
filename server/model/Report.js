import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    donation: { type: mongoose.Schema.Types.ObjectId, ref: "Donation", required: true },
    reporter: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reason: { type: String, required: true }, // e.g., "spoiled food", "no-show"
    resolved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);
