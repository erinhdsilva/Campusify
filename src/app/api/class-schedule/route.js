import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import ClassSchedule from "@/models/ClassSchedule";

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const year = searchParams.get("year");
  const branch = searchParams.get("branch");

  const data = await ClassSchedule.find({ year, branch }).sort({ day: 1, time: 1 });
  return NextResponse.json(data);
}

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  const created = await ClassSchedule.create(body);
  return NextResponse.json(created);
}

export async function DELETE(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  await ClassSchedule.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
