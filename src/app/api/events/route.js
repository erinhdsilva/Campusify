import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Event from "@/models/Event";

export async function GET() {
  await dbConnect();
  const events = await Event.find().sort({ date: 1 });
  return NextResponse.json(events);
}

export async function POST(req) {
  await dbConnect();
  const data = await req.json();
  const newEvent = new Event(data);
  const saved = await newEvent.save();
  return NextResponse.json(saved, { status: 201 });
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  await dbConnect();
  await Event.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" }, { status: 200 });
}
