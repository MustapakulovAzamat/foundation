"use client";
import { useEffect, useState } from "react";
import Production from "../components/Production/Production";
import { ProductType } from "@/types/ProductType";
import Title from "../components/text/Title";
import Ingredients from "../components/Ingredients";
import ProductAdd from "../components/Production/ProductionAdd";
import { IngredientType } from "@/types/IngredientType";

export default function ProductionPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [ingredients, setIngredients] = useState<IngredientType[]>([]);

  async function fetchData() {
    try {
      const [prodRes, ingRes] = await Promise.all([
        fetch("/api/production", {
          cache: "no-store"
        }),
        fetch("/api/ingredients", {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache"
          }
        })
      ]);
      
      const prodData = await prodRes.json();
      const ingData = await ingRes.json();

      if (prodData.success) setProducts(prodData.data);
      if (ingData.success) setIngredients(ingData.data);
    } catch {
      alert("Ошибка при загрузке данных");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div className="container">
      <div className="my-8">
        
        <Title className="mb-4">Добавить новый товар</Title>
        <ProductAdd onProductAdded={fetchData} />

        <Title className="mb-4 mt-6">Производство</Title>
        <Production products={products} ingredients={ingredients} />

        <Title className="mb-4 mt-6">Ингредиенты</Title>
        <Ingredients ingredients={ingredients} />

      </div>
    </div>
  );
}