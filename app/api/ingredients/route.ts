import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const pool = await connectDB()
    await pool.connect()
    const result = await pool.request().execute("GetIngredients");
    return NextResponse.json({
      success: true,
      data: result.recordset
    })
  } catch {
    return NextResponse.json({
      success: false, 
      message:"Ошибка в базе данных Ingredients"
    })
  } 
}
