import mongoose from "mongoose";

const blackListSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expiresIn: 24 * 60 ** 60 * 1000,
  },
});

const blacklistModelCaptain = mongoose.model(
  "blacklistModelCaptain",
  blackListSchema
);

export default blacklistModelCaptain;
