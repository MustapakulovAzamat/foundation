import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const pool = await connectDB()
    const res = await pool.request().query(`
      SELECT Amount
      FROM Budget  
    `)

    const totalBudget = res.recordset[0].Amount || 0

    return NextResponse.json({
      success: true,
      amount: totalBudget
    })
  } catch {
    return NextResponse.json(
      {success: false, message: "Ошибка в базе данных бюджет"}
    )
  }
}