import {connectDB} from "@/lib/db";
import {NextResponse} from "next/server";

export async function GET() {
  try {
    const pool = await connectDB();
    const result = await pool.request().
      query(`
        SELECT UnitId, UnitName
        FROM Units
      `)
    return NextResponse.json({
      success: true,
      data: result.recordset
    })
  } catch {
    return NextResponse.json({
      success: false,
      message: "Ошибка при получении единиц измерения"
    })
  }
}