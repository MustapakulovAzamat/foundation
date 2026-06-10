import { useState } from "react"
import Input from "../Input"
import Button from "../Button"
import Title from "../text/Title"


export default function UnitAdd({onUpdate}: {onUpdate: () => void}) {
  const [unitName, setUnitName] = useState("")

  async function handleAdd() {
    if(!unitName) {
      alert("Заполните поле")
      return;
    }
    try {
      const res = await fetch("/api/units/add", {
        method: "POST",
        headers: {
           "Content-Type":"application/json"
        },
        body: JSON.stringify({
          unitName
        })
      })
      const data = await res.json()
      if(data.success) {
        alert("Успешно добавлено")
        setUnitName("")
        onUpdate()
      }else {
        alert(data.message)
      }
    } catch {
      alert("Ошибка при создании юнита")
    }
  }
  return (
    <div className="mt-6 flex gap-3 flex-col bg-white p-4 rounded-lg shadow-lg">
      <Title>Добавить юнит</Title>
      <Input 
        type="text"
        value={unitName}
        onChange={(e) => {
          setUnitName(e.target.value)
        }}
        placeholder="Название юнита"
      />
      <Button onClick={handleAdd}>Добавить</Button>
    </div>
  )
}