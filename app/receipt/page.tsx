"use client"
import { MaterialType } from "@/types/MaterialType"
import { useEffect, useState } from "react"
import ReceiptAdd from "../components/Receipt/ReceiptAdd"
import { ProductType } from "@/types/ProductType"
import ReceiptDelete from "../components/Receipt/ReceiptDelete"
import { IngredientType } from "@/types/IngredientType"

export default function ReceiptPage() {
  const [product, setProduct] = useState<ProductType[]>([])
  const [material, setMaterial] = useState<MaterialType[]>([])
  const [ingredient, setIngredient] = useState<IngredientType[]>([])

  async function fetchData() {
    try {
      const [prodRes, matRes, ingRes] = await Promise.all([
        fetch("/api/production", { cache: "no-store" }),
        fetch("/api/materials", { cache: "no-store" }),
        fetch("/api/ingredients", { cache: "no-store" })
      ]);

      const prodData = await prodRes.json();
      const matData = await matRes.json();
      const ingData = await ingRes.json();

      if (prodData.data) setProduct(prodData.data);
      if (matData.data) setMaterial(matData.data);
      if (ingData.data) setIngredient(ingData.data);
    } catch {
      alert("Ошибка при обновлении данных");
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="container mt-8">
      <div className="flex flex-wrap gap-10 justify-center mt-10">
        <ReceiptAdd 
          product={product} 
          material={material} 
          onUpdate={fetchData}
        />
        
        <ReceiptDelete 
          ingredient={ingredient} 
          product={product} 
          onUpdate={fetchData}
        />
      </div>
    </div>
  )
}