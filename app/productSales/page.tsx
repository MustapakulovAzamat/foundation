"use client"
import { SaleType } from "@/types/Sales";
import ProductSales from "../components/Production/ProductSales"
import ProductionSalesHistory from "../components/Production/ProductSalesHistory"
import { useEffect, useState } from "react";

export default function ProductSalesPage(){
  const [sales, setSales] = useState<SaleType[]>([]);

  const loadHistory = async () => {
    const res = await fetch("/api/productSales/history");
    const data = await res.json();
    if (data.success) setSales(data.data);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div className="container">
      <div className="flex flex-wrap gap-5 justify-center items-start my-8">
        <ProductSales onUpdate={loadHistory} />
        <ProductionSalesHistory sales={sales}/>
      </div>
    </div>
  )
}