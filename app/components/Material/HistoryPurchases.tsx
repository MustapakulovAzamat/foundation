"use client"
import { HistoryPurchaseType } from "@/types/History";
import { useEffect, useState } from "react";
import Title from "../text/Title";

export default function HistoryPurchases() {
  const [history, setHistory] = useState<HistoryPurchaseType[]>([]);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch("/api/purchases/history");
        const data = await res.json();
        if (data.success) {
          setHistory(data.data);
        }else {
          alert(data.message);
        }
      } catch {
        alert("Ошибка при загрузке истории закупок");
      }
    }
    fetchHistory();
  }, [])

  return (
    <div className="bg-white rounded-lg p-4 shadow-lg overflow-y-auto">
      <Title>История закупок</Title>
      <div className="grid grid-cols-[3fr_2fr_3fr_2fr_2fr] gap-4 font-bold items-center p-4 bg-gray-100 mt-4">
        <p>Название материала</p>
        <p>Количество</p>
        <p>Купил</p>
        <p>Сумма</p>
        <p>Дата закупки</p>
      </div>
      {history.length > 0 ? (
        history.map(h => (
          <div key={h.PurchaseId} className="grid grid-cols-[3fr_2fr_3fr_2fr_2fr] gap-4 p-4 items-center hover:bg-gray-50">
            <p>{h.MaterialName}</p>
            <p>{h.Quantity.toFixed(2)}</p>
            <p>{h.FullName}</p>
            <p>{h.TotalSum.toFixed(2)} сом</p>
            <p>{new Date(h.PurchaseDate).toLocaleDateString("ru-RU")}</p>
          </div>
        ))
      ) : (
        <p className="p-4 text-center text-gray-500">Закупок пока не было</p>
      )}
    </div>
  )
}