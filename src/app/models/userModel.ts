import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a valid Username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide a valid email"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String, // stores Google profile picture URL or custom one
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  data: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
}, { timestamps: true });

export const User =
  mongoose.models.Users || mongoose.model("Users", userSchema);
