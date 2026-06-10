"use client"

import { IngredientType } from "@/types/IngredientType"
import { ProductType } from "@/types/ProductType"
import { useState } from "react"
import Button from "../Button"
import Title from "../text/Title"

export default function ReceiptDelete({ingredient, product, onUpdate}: {
  ingredient: IngredientType[],
  product: ProductType[],
  onUpdate: () => void
}) {
  const [selectIngredientId, setSelectIngredientId] = useState("")
  const [selectProductId, setSelectProductId] = useState("")

  const filteredIngredients = ingredient.filter(i => 
    i.ProductID.toString() === selectProductId
  );

  async function handleDelete() {
    try {
      const res = await fetch(`/api/ingredients/delete`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          ingredientId: selectIngredientId
        })
      })
      const data = await res.json()
      if(data.success) {   
        setSelectIngredientId("")
        setSelectProductId("")
        onUpdate()
        alert("Успешно удалено")
      }else {
        alert(data.message)
      }
    } catch {
      alert("Ошибка при удалении материала");
    }
  }
  return (
    <div className="bg-white p-4 flex flex-col justify-between gap-10">
      <Title className="text-center">Удаление ингредиента</Title>
      <div className="flex flex-col gap-4">
          <select
            className="border p-2 rounded"
            value={selectProductId}
            onChange={e => {setSelectProductId(e.target.value)}}
          >
            <option>---Выберите продукт</option>
            {product.map(p => (
              <option key={p.ProductID} value={p.ProductID}>
                {p.ProductName}
              </option>
            ))}
          </select>

        <select
          className="border p-2 rounded"
          value={selectIngredientId}
          onChange={e => {setSelectIngredientId(e.target.value)}}
          disabled={!selectProductId}
        >
          <option>---Выберите ингредиент</option>
          {filteredIngredients.map(i => (
            <option key={i.IngredientID} value={i.IngredientID}>
              {i.MaterialName} - {i.Quantity} {i.UnitName}
            </option>
          ))}
        </select>
      </div>
      <Button 
        onClick={handleDelete}
        className="bg-red-500"
      >
        Удалить
      </Button>
    </div>
  )
}