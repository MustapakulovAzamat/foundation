import { connectDB } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ selectedProduct: string }> }
) {
  const resolvedParams = await params;
  const selectedProduct = resolvedParams.selectedProduct;

  if (!selectedProduct) {
    return NextResponse.json({
      success: false,
      message: "Не указан продукт"
    });
  }

  try {
    const pool = await connectDB();

    const result = await pool.request()
      .input("ProductId", parseInt(selectedProduct))
      .execute("GetProductIngredients");

    return NextResponse.json({
      success: true,
      data: result.recordset
    });

  } catch {
    return NextResponse.json({
      success: false,
      message: "Ошибка при загрузке ингредиентов"
    });
  }
}