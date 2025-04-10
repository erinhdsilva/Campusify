import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  createdBy: String,
});

export default mongoose.models.Event || mongoose.model("Event", eventSchema);
