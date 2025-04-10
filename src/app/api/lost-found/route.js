import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import LostFound from "@/models/LostFound";

export async function GET() {
  await dbConnect();
  const items = await LostFound.find().sort({ date: -1 });
  return NextResponse.json(items);
}

export async function POST(req) {
  await dbConnect();
  const data = await req.json();

  const newItem = new LostFound({
    title: data.title,
    description: data.description,
    status: data.status,
    reportedBy: data.reportedBy,
  });

  await newItem.save();
  return NextResponse.json({ message: "Item reported successfully." });
}
export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "Missing ID" }, { status: 400 });
  }

  await dbConnect();
  await LostFound.findByIdAndDelete(id);

  return NextResponse.json({ message: "Deleted" }, { status: 200 });
}