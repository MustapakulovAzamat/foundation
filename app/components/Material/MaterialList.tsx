'use client'
import { MaterialType } from "@/types/MaterialType"
import MaterialDelete from "./MaterialDelete"
import Title from "../text/Title";

export default function MaterialList({ materials, onUpdate }: { materials: MaterialType[]; onUpdate: () => void }) {
  return (
    <div className="space-y-6 bg-white p-4 rounded-lg">
      <Title>Список материалов</Title>
      <div className="grid grid-cols-[4fr_3fr_2fr_2fr] items-center font-bold bg-gray-100 p-4">
        <p>Название сырья</p>
        <p>Количество</p>
        <p>Сумма</p>
      </div>
      {materials.length === 0 ? (
        <p>Загрузка...</p>
      ) : (
        materials.map(m => (
          <div key={m.MaterialId} className="grid grid-cols-[4fr_3fr_2fr_2fr] items-center hover:bg-gray-50">
            <p>{m.MaterialName}</p>
            <div className="flex items-center gap-1">
              <p>{m.Quantity.toFixed(0)} </p>
              <p>{m.UnitName}</p>
            </div>
            <p className="p-right">{(m.TotalSum).toFixed(0)} сом</p>
            <MaterialDelete id={m.MaterialId} onUpdate={onUpdate} />
          </div>
        ))
      )}
    </div>
  )
}