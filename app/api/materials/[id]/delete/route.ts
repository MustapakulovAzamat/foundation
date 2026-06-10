import {connectDB} from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function DELETE(req: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  if (!id) {
    return NextResponse.json({ 
      success: false, 
      message: "Материал по ID не найден" 
    });
  }
  try {
    const pool = await connectDB();
    const result = await pool.request()
      .input("MaterialId", parseInt(id))
      .execute("DeleteMaterial");

    if (result.rowsAffected[0] === 0) {
      return NextResponse.json({
        success: false,
        message: "Материал по ID не найден"
      });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({
      success: false, message: "Ошибка при удалении материала" 
    });
  }
}