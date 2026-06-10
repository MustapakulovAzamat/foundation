import { connectDB } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { amount } = await request.json();
  if (!amount || typeof amount !== 'number' || amount <= 0) {
    return NextResponse.json({ error: "Некорректная сумма" });
  }
  try {
    const pool = await connectDB()
    await pool.request()
      .input('amount', amount)
      .query('UPDATE Budget SET Amount = Amount + @amount WHERE BudgetID = 1');
      
    return NextResponse.json({ message: "Успешно" });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}