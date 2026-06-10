"use client";
import Title from "../text/Title";
import { SaleType } from "@/types/Sales";

export default function ProductionSalesHistory({sales} : {sales: SaleType[]}) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-lg">
      <Title>История продаж</Title>
      <div className="mt-4 overflow-y-auto">
        <div className="grid grid-cols-[3fr_2fr_2fr_3fr_2fr] gap-4 font-bold items-center p-4 bg-gray-100 ">
          <p>Название товара</p>
          <p>Количество</p>
          <p>Сумма</p>
          <p>Продал</p>
          <p>Дата продажи</p>
        </div>
        {sales.length > 0 ? (
          sales.map((sale) => (
            <div key={sale.SaleID} className="grid grid-cols-[3fr_2fr_2fr_3fr_2fr] gap-4 p-4 items-center hover:bg-gray-50">
              <p>{sale.ProductName}</p>
              <p>{sale.Quantity}</p>
              <p>{sale.TotalSum.toLocaleString()} с.</p>
              <p>{sale.FullName}</p>
              <p className="text-sm text-gray-500">
                {new Date(sale.SaleDate).toLocaleDateString("ru-RU")}
              </p>
            </div>
          ))
        ) : (
          <p className="p-4 text-center text-gray-500">Продаж пока не было</p>
        )}
      </div>
    </div>
  );
}