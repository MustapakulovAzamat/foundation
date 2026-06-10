"use client";
import { useEffect, useState } from "react";
import MaterialPurchases from "../components/Material/MaterialPurchases";
import { MaterialType } from "@/types/MaterialType";
import HistoryPurchases from "../components/Material/HistoryPurchases";

export default function PurchasesPage() {
  const [materials, setMaterials] = useState<MaterialType[]>([]);

  useEffect(() => {
    async function fetchMaterials() {
      try {
        const res = await fetch("/api/materials");
        const data = await res.json();
        if (data.success) {
          setMaterials(data.data);
        }
      } catch {
        alert("Ошибка при загрузке материалов");
      }
    }
    fetchMaterials();
  }, []);

  return (
    <div className="container">
      <div className="flex justify-center items-start flex-wrap gap-5 my-8">
        <MaterialPurchases materials={materials} />
        <HistoryPurchases/>
      </div>
    </div>
  );
}