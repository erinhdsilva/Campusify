import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  uploadedBy: { type: String, required: true },
  fileUrl: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Note || mongoose.model("Note", NoteSchema);
