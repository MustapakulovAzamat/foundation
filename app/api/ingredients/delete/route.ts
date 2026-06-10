import { connectDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const {ingredientId} = await req.json()

    const pool = await connectDB()
    const result = await pool.request()
    .input("IngredientID", ingredientId)
    .execute("DeleteIngredient")

    if(result.rowsAffected[0] === 0) {
      return NextResponse.json({
        success: false,
        message: "Ингредиент по ID не найден"
      });
    }
    return NextResponse.json({ success: true });
  } catch(error) {
    return NextResponse.json({
      success: false, message: error.message 
    });
  }
}