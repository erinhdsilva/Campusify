import mongoose from "mongoose";

const MessMenuSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
    unique: true, // one entry per day
  },
  breakfast: String,
  lunch: String,
  dinner: String,
});

export default mongoose.models.MessMenu || mongoose.model("MessMenu", MessMenuSchema);
