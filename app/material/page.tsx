'use client'

import { useEffect, useState } from "react";
import MaterialList from "../components/Material/MaterialList";
import { MaterialType } from "@/types/MaterialType";
import MaterialAdd from "../components/Material/MaterialAdd";
import { UnitType } from "@/types/UnitType";
import UnitAdd from "../components/Unit/UnitAdd";

export default function MaterialPage() {
  const [materials, setMaterials] = useState<MaterialType[]>([]);
  const [units, setUnits] = useState<UnitType[]>([]);

  async function fetchMaterial() {
    try {
      const res = await fetch("/api/materials");
      const data = await res.json();
      if (data.success) {
        setMaterials(data.data);
      } else {
        alert(data.message);
      }
    } catch {
      alert("Ошибка при получении материалов");
    }
  }
  async function fetchUnits() {
    try {
      const res = await fetch("/api/units");
      const data = await res.json();
      if (data.success) {
        setUnits(data.data);
      } else {
        alert(data.message);
      }
    } catch {
      alert("Ошибка при получении единиц измерения");
    }
  }

  useEffect(() => { 
    fetchMaterial()
    fetchUnits()
  }, []);


  return (
    <div className="container">
      <div className="flex flex-wrap gap-5 justify-center items-baseline my-8">
        <MaterialAdd onUpdate={fetchMaterial} units={units}/>
        <UnitAdd onUpdate={fetchUnits}/>
        <MaterialList materials={materials} onUpdate={fetchMaterial}/>
      </div>
    </div>
  )
}