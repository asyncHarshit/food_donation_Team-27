import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    foodType: {
      type: String,
      required: true,
    },

    quantity: {
      type: String,
      required: true,
    },

    bestBefore: {
      type: Date,
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true, // [lng, lat]
      },
      address: {
        type: String,
      },
    },

    status: {
      type: String,
      enum: ["pending", "claimed", "picked", "distributed", "expired"],
      default: "pending",
    },

    claimedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    otp: {
      type: String,
      required: true,
    },

    distributedProofImage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

donationSchema.index({ location: "2dsphere" });

export default mongoose.model("Donation", donationSchema);
