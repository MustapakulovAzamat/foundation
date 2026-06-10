import { connectDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { productName } = await req.json();
    const pool = await connectDB();

    await pool.request()
      .input("ProductName", productName)
      .execute("AddProduct");

    return NextResponse.json({ success: true, message: "Продукт успешно добавлен" });
  } catch {
    return NextResponse.json({ success: false, message: "Ошибка при добавлении" });
  }
}