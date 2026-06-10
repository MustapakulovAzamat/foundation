import { connectDB } from "@/lib/db";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { productId, quantity, markup } = await request.json();

    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    const user = sessionCookie
        ? JSON.parse(sessionCookie)
        : null;

    const pool = await connectDB();

    await pool.request()
      .input("ProductId", productId)
      .input("Quantity", quantity)
      .input("EmployeeId", user.id)
      .input("Markup", markup)
      .execute("SellProduct");

    return NextResponse.json({
      success: true,
      message: "Продажа успешно проведена",
    });

  } catch(error) {
    return NextResponse.json({
      success: false,
      message: error.message
    });

  }
}