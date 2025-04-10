import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import MessMenu from "@/models/MessMenu";

// GET all menu entries
export async function GET() {
  await dbConnect();
  const menu = await MessMenu.find();
  return NextResponse.json(menu);
}

// POST a new entry
export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  const created = await MessMenu.create(body);
  return NextResponse.json(created);
}
