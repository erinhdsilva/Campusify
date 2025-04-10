// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // only if using credentials provider
  role: { type: String, enum: ["admin", "student"], default: "student" },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
