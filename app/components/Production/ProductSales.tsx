"use client";
import { useEffect, useState } from "react";
import Title from "../text/Title";
import Input from "../Input";
import Button from "../Button";
import { Product } from "@/types/Product";

export default function ProductSales({onUpdate}:{onUpdate:() => void}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState("");
  const [markup, setMarkup] = useState("")

  async function fetchSale() {
    try{
      const res = await fetch("/api/production")
      const data = await res.json()
      if(!data.data) {
        return alert(data.message)
      }
      setProducts(data.data)
    } catch {
      alert("Ошибка получении продаж")
    }
  }
  useEffect(() => {
    fetchSale()
  }, []);


  async function handleSale() {
    if (!selectedProduct) return alert("Выберите товар");
    if (Number(quantity) <= 0) return alert("Введите корректное количество");
    if (Number(markup) < 0) return alert("Наценка не может быть отрицательной");
    try {
      const res = await fetch("/api/productSales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: selectedProduct.ProductID,
          quantity: Number(quantity),
          markup: Number(markup)
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Продажа прошла успешно!");
        setQuantity("");
        setMarkup("")
        setSelectedProduct(null);
        await fetchSale(); 
        onUpdate(); 
      } else {
        alert(data.message);
      }
    } catch {
      alert("Ошибка при оформлении продажи");
    }
  }

  const price = selectedProduct && selectedProduct.Quantity > 0 
  ? selectedProduct.TotalSum / selectedProduct.Quantity 
  : 0;

  return (
    <div className="bg-white rounded-lg p-4 shadow-lg">
      <Title>Оформление продажи</Title>

      <div className="flex flex-col justify-between mt-4">
        <div className="space-y-5">
          <select
            className="w-full border p-2 mb-4 rounded"
            value={selectedProduct?.ProductID || ""}
            onChange={(e) => {
              const p = products.find((x) => x.ProductID === Number(e.target.value));
              setSelectedProduct(p || null);
            }}
          >
            <option value="">---Выберите товар</option>
            {products.map((p) => (
              <option key={p.ProductID} value={p.ProductID}>
                {p.ProductName} (Остаток: {p.Quantity})
              </option>
            ))}
          </select>

          <p>Цена за единицу:    
            {price ? price?.toFixed(2) : "0.00"}
            сом
          </p>

          <Input
            type="number"
            placeholder="Количество"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Наценка (%)"
            value={markup}
            onChange={(e) => setMarkup(e.target.value)}
          />
        </div>
        <Button onClick={handleSale} className="mt-4">
          Оформить продажу
        </Button>
      </div>
    </div>
  );
}