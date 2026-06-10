"use client";
import { useState } from "react";
import Input from "../Input";
import Button from "../Button";

export default function ProductAdd({ onProductAdded }: { onProductAdded: () => void }) {
  const [productName, setProductName] = useState("");

  async function handleAdd() {
    if (!productName.trim()) return alert("Введите название продукции");

    try {
      const res = await fetch("/api/production/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Продукт успешно добавлен!");
        setProductName("");
        onProductAdded();
      }
    } catch {
      alert("Ошибка при добавлении продукции");
    }
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg flex justify-between">
      <Input
        type="text"
        placeholder="Название крема" 
        value={productName} 
        onChange={(e) => setProductName(e.target.value)}
      />
      <Button onClick={handleAdd}>Создать продукт</Button>
    </div>
  );
}