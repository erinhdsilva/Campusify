import mongoose from "mongoose";

const LostFoundSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ["lost", "found"], required: true },
  reportedBy: { type: String }, // email or user id
  date: { type: Date, default: Date.now },
});

export default mongoose.models.LostFound || mongoose.model("LostFound", LostFoundSchema);
