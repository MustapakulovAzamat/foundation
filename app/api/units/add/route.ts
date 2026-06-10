import { connectDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {unitName} = body;

    const pool = await connectDB()
    await pool.request()
    .input("unitName", unitName)
    .execute("AddUnit")

    return NextResponse.json({
      success: true,
      message: "Успешно добавлено"
    })
  } catch(error) {
    return NextResponse.json({
      success: false,
      message: error.message
    })
  }
}