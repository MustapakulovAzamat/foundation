"use client"
import { useEffect, useState } from "react";
import Title from "../text/Title"
import { Product } from "@/types/Product";
import Image from "next/image";

export default function ProductCard() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/production", {
          cache: "no-store"
        });
        const data = await res.json();
        if(!data.success) {
          alert(data.message);
          return;
        }
        setProducts(data.data);
      } catch {
        alert("Ошибка при загрузке продуктов");
      }
    }
    fetchProducts();
  }, [])

  return (
    <>
      {products.map(p => (
        <div key={p.ProductID} className="w-64">
          <div className="relative h-64">
            <Image
              src={p.Image}
              alt={p.ProductName}
              fill
              className="object-cover"
            />
          </div>
          <Title>{p.ProductName}</Title>
          <p>Количество: {p.Quantity} {p.UnitName}</p>
          <p>Сумма: {p.TotalSum}</p>
        </div>
      ))}
    </>
  )
}