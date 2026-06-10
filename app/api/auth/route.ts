import sql from "mssql"
import { connectDB } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const {login, password} = await req.json()
    const pool = await connectDB()

    const result = await pool
      .request()
      .input("inputLogin", sql.NVarChar, login)
      .input("inputPassword", sql.NVarChar, password)
      .query(`
        SELECT e.EmployeeID, e.FullName, p.PositionName 
        FROM Employees e
        JOIN Positions p ON e.PositionID = p.PositionID
        WHERE e.Login = @inputLogin AND e.Password = @inputPassword
      `)

    if(result.recordset.length > 0) {
      const user = result.recordset[0]

      const responce = NextResponse.json({
        success: true,
        user: {
          id: user.EmployeeID,
          name: user.FullName,
          role: user.PositionName
        }
      })

      const userData = JSON.stringify({
        id: user.EmployeeID,
        name: user.FullName,
        role: user.PositionName
      })

      responce.cookies.set("session", userData, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24
      })

      return responce

    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'Неверный логин или пароль' 
      }
      );
    }
  }catch {
    return NextResponse.json({
      success: false, message: "Ошибка при подключении SQL"
    })
  }
}