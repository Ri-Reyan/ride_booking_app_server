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
    expires: 24 * 60 * 60 * 1000,
  },
});

const BlackListModel = mongoose.model("BlackListModel", blackListSchema);
export default BlackListModel;
