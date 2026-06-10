import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const pool = await connectDB();
  
  const result = await pool.request().query(`
    SELECT 
      (SELECT SUM(TotalSum) FROM ProductSales) AS totalProfit,
      (SELECT SUM(TotalSum) FROM RawMaterials) AS totalCosts
  `);

  return NextResponse.json({ success: true, data: result.recordset[0] });
}