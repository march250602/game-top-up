// src/app/api/users/route.ts
import { NextResponse } from "next/server";
import { registerUser, getUser } from "../../lib/firestore";

export async function POST(req: Request) {
  const {  phone, password, email } = await req.json();

  try {
    await registerUser(email, phone, password)
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to create user" });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const uid = searchParams.get("uid");

  if (!uid) {
    return NextResponse.json({ success: false, error: "Missing uid" });
  }

  const user = await getUser(uid);
  return NextResponse.json({ success: true, data: user });
}
