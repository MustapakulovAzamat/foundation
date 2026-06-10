import {connectDB} from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const pool = await connectDB();
    const result = await pool.request()
    .query(`
      SELECT fp.*, u.UnitName
      FROM FinishedProducts fp
      LEFT JOIN Units u
        ON fp.UnitId = u.UnitId
    `);
    return NextResponse.json({
      success: true,
      data: result.recordset
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message || "Ошибка при загрузке продуктов"
    });
  }
}