import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Note from "@/models/Note";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  await dbConnect();
  const notes = await Note.find().sort({ createdAt: -1 });
  return NextResponse.json(notes);
}

export async function POST(req) {
  await dbConnect();
  const formData = await req.formData();

  const subject = formData.get("subject");
  const uploadedBy = formData.get("uploadedBy");
  const file = formData.get("file");

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${uuidv4()}-${file.name}`;
  const filePath = path.join(process.cwd(), "public", "uploads", fileName);

  await writeFile(filePath, buffer);

  const fileUrl = `/uploads/${fileName}`;

  const note = new Note({ subject, uploadedBy, fileUrl });
  await note.save();

  return NextResponse.json({ message: "Note uploaded" });
}
