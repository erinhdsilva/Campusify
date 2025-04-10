import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import MessMenu from "@/models/MessMenu";

export async function DELETE(_, { params }) {
  await dbConnect();
  const { id } = params;
  await MessMenu.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}
