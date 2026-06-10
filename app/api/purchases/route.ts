import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { materialId, quantity } = body;
    if(!materialId || !quantity) {
      return NextResponse.json({
        success: false,
        message: "Заполните все поля"
      })
    }

    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("session")?.value
    const user = sessionCookie ? JSON.parse(sessionCookie) : null;
    const employeeIdFromCookie = user?.id;
    
    const pool = await connectDB()

    const result = await pool.request()
    .input("materialId", materialId)
    .input("quantity", quantity)
    .input("employeeId", employeeIdFromCookie)
    .execute("BuyMaterial");

      return NextResponse.json({
        success: true,
        data: result,
        employeeIdFromCookie
      })
  } catch(error) {
    return NextResponse.json({
      success: false,
      message: error.message
    });
  }
}