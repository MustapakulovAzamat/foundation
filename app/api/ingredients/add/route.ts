import { connectDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { productId, materialId, quantity } = await req.json();
    const pool = await connectDB();

    await pool.request()
      .input("ProductID", productId)
      .input("MaterialID", materialId)
      .input("Quantity", quantity)
      .execute("ReceiptAdd");

    return NextResponse.json({ 
      success: true, message: "Ингредиент добавлен в рецепт" 
    });
  } catch {
    return NextResponse.json({ 
      success: false, message: "Ошибка добавления" 
    });
  }
}