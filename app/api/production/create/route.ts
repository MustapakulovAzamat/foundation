import { connectDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { productId, quantity } = await request.json();

    const pool = await connectDB();

    await pool.request()
      .input("ProductId", productId)
      .input("Quantity", quantity)
      .execute("ProduceProduct");

    return NextResponse.json({
      success: true,
      message: "Продукция успешно произведена"
    });

  } catch(error) {
    return NextResponse.json({
      success: false,
      message: error.message || "Ошибка при создании производства"
    });
  }
}