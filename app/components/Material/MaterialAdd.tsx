"use client";

import { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import { UnitType } from "@/types/UnitType";
import Text from "../text/Text";
import Title from "../text/Title";

export default function MaterialAdd({onUpdate, units} : {
  onUpdate: () => void
  units: UnitType[]
}) {
  const [materialName, setMaterialName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState(1);
  const [unitPrice, setUnitPrice] = useState("");

  async function materialAdd() {
    try {
      const res = await fetch(
        "/api/materials/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            materialName,
            unitId: unit,
            quantity: Number(quantity),
            unitPrice: Number(unitPrice),
          }),
        }
      );
      const data = await res.json();
      if (data.success) {
        alert("Добавлено");

        onUpdate()
        setMaterialName("");
        setQuantity("");
        setUnitPrice("");
      } else {
        alert(data.message);
      }
    } catch {
      alert("Ошибка при добавлении материала");
    }
  }

  return (
    <div className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow-lg">
      <Title>Добавить материал</Title>
      <Input
        type="text"
        placeholder="Название сырья"
        value={materialName}
        onChange={(e) =>
          setMaterialName(
            e.target.value
          )
        }
      />
      <Input
        type="number"
        placeholder="Количество"
        value={quantity}
        onChange={(e) =>
          setQuantity(
            e.target.value
          )
        }
      />
      <div>
        <Text className="text-[12px] md:text-[16px]">Единица измерения: </Text>
        <select
          value={unit}
          onChange={(e) =>
            setUnit(
              parseInt(e.target.value)
            )
          }
        >
          {units.map(u => (
            <option key={u.UnitId} value={u.UnitId}>{u.UnitName}</option>
          ))}
        </select>
      </div>
      <Input
        type="number"
        placeholder={"Цена за единицу"}
        value={unitPrice}
        onChange={(e) =>
          setUnitPrice(
            e.target.value
          )
        }
      />
      <Button onClick={materialAdd}>
        Добавить
      </Button>
    </div>
  );
}