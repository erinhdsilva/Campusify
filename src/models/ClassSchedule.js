import mongoose from "mongoose";

const classScheduleSchema = new mongoose.Schema({
  year: String,
  branch: String,
  day: String,
  time: String,
  subject: String,
  faculty: String,
}, { timestamps: true });

export default mongoose.models.ClassSchedule || mongoose.model("ClassSchedule", classScheduleSchema);
