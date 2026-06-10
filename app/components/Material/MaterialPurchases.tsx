import { MaterialType } from "@/types/MaterialType";
import Button from "../Button";
import Input from "../Input";
import { useState } from "react";
import Title from "../text/Title";

export default function MaterialPurchases({materials}: { 
  materials: MaterialType[]
}) {
  const [materialId, setMaterialId] = useState();
  const [quantity, setQuantity] = useState("");

  const selectedMaterial = materials.find(m => m.MaterialId === materialId);
  const totalSum = Number(quantity || 0) * Number(selectedMaterial?.UnitPrice || 0);

  async function handlePurchase() {
    if(!quantity || isNaN(Number(quantity)) || Number(quantity) <= 0) {
      return alert("Введите корректное количество");
    }
    try {
      const res = await fetch("/api/purchases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          materialId,
          quantity: Number(quantity),
        })
      });
      const data = await res.json();
      if (data.success) {
        alert("Закупка выполнена");
        setQuantity("");
      } else {
        alert(data.message);
      }
    } catch {
      alert("Ошибка при выполнении закупки");
    }
  }

  return (
    <div className="flex flex-col gap-4 shadow-lg p-4 rounded-lg bg-white h-full">
      <Title>Купить сырье</Title>
      <div className="flex justify-between items-center">
        <h3>Сырье</h3>
        <select
          className="border border-gray-300 rounded-xl px-4 py-3"
          value={materialId}
          onChange={(e) => setMaterialId(Number(e.target.value))}
        >
          <option>
            ---Выберите сырье
          </option>
          {materials.map(m => (
            <option key={m.MaterialId} value={m.MaterialId}>
              {m.MaterialName}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-between items-center gap-6">
        <h3>Количество</h3>
        <Input type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Введите количество"
        />
      </div>

      <div className="flex justify-between">
        <h3>Цена за единицу</h3>
        {materials.find(m => m.MaterialId === materialId)?.UnitPrice} сом
      </div>
      <h3 className="text-lg font-semibold">
        Общая сумма:
      </h3>
      <h2 className="text-2xl font-bold">
        {`${Math.round(totalSum * 100) / 100} сом`}
      </h2>
      
      <Button 
        onClick={handlePurchase}
        className="w-[50%]"
      >Купить
      </Button>
      
    </div>
  )
}