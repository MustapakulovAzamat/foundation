"use client";
import { useState } from "react";
import Budget from "../components/Budget";
import Button from "../components/Button";
import Input from "../components/Input";

export default function BudgetPage() {
  const [amount, setAmount] = useState("");

  const updateBudget = async (type: "deposit" | "withdraw") => {
    const numAmount = parseFloat(amount);
    if (!amount || numAmount <= 0) {
      alert("Введите корректную сумму");
      return;
    }

    const finalAmount = type === "withdraw" ? -numAmount : numAmount;

    try {
      const res = await fetch("/api/budget/deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalAmount }),
      });

      if (res.ok) {
        alert(type === "deposit" ? "Бюджет пополнен!" : "Средства выведены!");
        setAmount("");
        window.location.reload(); 
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  return (
    <div className="container mx-auto p-8 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Управление бюджетом</h1>
      
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="mb-6">
          <p className="text-gray-400">Текущий бюджет:</p>
          <div className="text-4xl font-mono text-green-400">
            <Budget />
          </div>
        </div>

        <div className="flex gap-4 items-end">
          <div className="w-64">
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Введите сумму..."
            />
          </div>
          
          <Button onClick={() => updateBudget("deposit")}>
            Пополнить
          </Button>
          
          <Button onClick={() => updateBudget("withdraw")}>
            Вывод
          </Button>
        </div>
      </div>
    </div>
  );
}