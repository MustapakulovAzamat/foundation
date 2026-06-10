import { connectDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { materialName, unitId, quantity, unitPrice } = await req.json();

    if (
      !materialName ||
      !unitId ||
      !quantity ||
      !unitPrice
    ) {
      return NextResponse.json({
        success: false,
        message: "Заполните все поля"
      });
    }

    const pool = await connectDB();

    const result = await pool.request()
      .input("MaterialName", materialName)
      .input("UnitId", unitId)
      .input("Quantity", quantity)
      .input("UnitPrice", unitPrice)
      .execute("AddMaterial");

    return NextResponse.json({
      success: true,
      data: result
    });

  } catch(error) {
    return NextResponse.json({
      success: false,
      message: error.message
    });
  }
}