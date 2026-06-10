import { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import { MaterialType } from "@/types/MaterialType";
import { ProductType}from "@/types/ProductType";

export default function ReceiptAdd({ product, material, onUpdate }: { 
  product: ProductType[],
  material: MaterialType[],
  onUpdate: () => void
}) {
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedMaterialId, setSelectedMaterialId] = useState("");

  async function handleAdd() {
    if (!selectedProductId || !selectedMaterialId || !quantity) {
      alert("Заполните все поля!");
      return;
    }
    if(Number(quantity) < 0) {
      alert("Должно быть больше нуля");
      return;
    }

    try {
      const res = await fetch("/api/ingredients/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          productId: selectedProductId,
          materialId: selectedMaterialId,
          quantity 
        })
      });
      const data = await res.json();
      if (data.success) {
        alert("Успешно добавлено в рецептуру");
        setSelectedProductId("");
        setSelectedMaterialId("");
        setQuantity("");
        onUpdate()
      } else {
        alert(data.message || "Ошибка при добавлении");
      }
    } catch {
      alert("Ошибка сети");
    }
  }

  return (
    <div className="p-4 rounded-lg shadow-lg bg-white flex flex-col gap-4">
      <h3 className="font-bold mb-2">Добавить ингредиент в рецепт</h3>

      <select 
        value={selectedProductId}
        onChange={(e) => setSelectedProductId(e.target.value)}
        className="block w-full p-2 border mb-2 rounded"
      >
        <option value="">Выберите продукцию</option>
        {product.map((p) => (
          <option key={p.ProductID} value={p.ProductID}>
            {p.ProductName}
          </option>
        ))}
      </select>

      <select 
        value={selectedMaterialId}
        onChange={(e) => setSelectedMaterialId(e.target.value)}
        className="block w-full p-2 border mb-2 rounded"
      >
        <option value="">Выберите материал</option>
        {material.map((m) => (
          <option key={m.MaterialId} value={m.MaterialId}>
            {m.MaterialName}
          </option>
        ))}
      </select>

      <Input
        placeholder="Количество" 
        value={quantity} 
        onChange={(e) => setQuantity(e.target.value)} 
        type="number"
      />
      
      <Button onClick={handleAdd}>Сохранить ингредиент</Button>
    </div>
  );
}