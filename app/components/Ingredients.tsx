"use client";

import { IngredientType } from "@/types/Ingredient";

export default function Ingredients({ ingredients }: { ingredients: IngredientType[] }) {
  const grouped = ingredients.reduce((acc, curr) => {
    if (!acc[curr.ProductName]) {
      acc[curr.ProductName] = [];
    }
    acc[curr.ProductName].push(curr);
    return acc;
  }, {} as Record<string, IngredientType[]>);

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([productName, items]) => (
        <div key={productName} className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="font-bold text-lg mb-3 border-b pb-2">{productName}</h3>
          
          <div className="space-y-1">
            {items.map(i => (
              <div key={i.IngredientID} className="flex justify-between">
                <span>{i.MaterialName}</span>
                <span className="text-gray-600">{i.Quantity} {i.UnitName}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}