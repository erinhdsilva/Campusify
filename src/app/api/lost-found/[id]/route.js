import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import LostFound from "@/models/LostFound";

// DELETE /api/lost-found/:id
export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await dbConnect();
    await LostFound.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}
