import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    const pool = await connectDB();

    const result = await pool.request()
      .execute("GetSalesHistory");

    return NextResponse.json({
      success: true,
      data: result.recordset
    });

  } catch {
    return NextResponse.json({
      success: false,
      message: "Ошибка при загрузке истории продаж"
    });
  }
}