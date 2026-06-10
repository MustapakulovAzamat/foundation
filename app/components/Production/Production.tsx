"use client"
import { useEffect, useState } from "react";
import Title from "../text/Title"
import { Product } from "@/types/Product";
import Input from "../Input";
import Button from "../Button";
import { Ingredient } from "@/types/Ingredient";

export default function Production({ products, ingredients }: { 
  products: Product[],
  ingredients: Ingredient[] 
}) {
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");

  async function handleProduce() {
    if(!selectedProduct) return alert("Выберите продукт");
    if(!quantity || isNaN(Number(quantity)) || Number(quantity) <= 0) {
      return alert("Введите корректное количество");
    }
    if(ingredients.length === 0) {
      return alert("Невозможно произвести продукт без ингредиентов");
    }
    try {
      const res = await fetch("/api/production/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productId: selectedProduct,
          quantity: Number(quantity)
        })
      })
      const data = await res.json();
      if(!data.success) {
        alert(data.message);
        return;
      }
      alert("Продукция успешно произведена");
    } catch {
      alert("Ошибка при создании производства");
    } finally {
      setSelectedProduct("");
      setQuantity("");
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <select value={selectedProduct} 
            onChange={(e) => setSelectedProduct(e.target.value)}
          >
            <option>---Выберите продукт</option>
            {products.map(p => (
              <option key={p.ProductID} value={p.ProductID}>
                {p.ProductName}
              </option>
            ))}
          </select>

          <Input
            type="number"
            placeholder="Количество"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <Button onClick={handleProduce}>Создать производство</Button>
      </div>
    </div>
  )
}