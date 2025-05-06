import mongoose from "mongoose";
import { GENDER } from "../auth/constants.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  signedupAt: {
    type: Date,
    default: Date.now,
  },
  gender: {
    type: String,
    enum: [GENDER.MALE, GENDER.FEMALE],
    required: true,
  },
});

export const User = mongoose.model("user", userSchema);
