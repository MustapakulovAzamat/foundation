"use client"
import Button from "@/app/components/Button"

export default function MaterialDelete({ id, onUpdate }: { id: number; onUpdate: () => void }) {
  async function materialDelete() {
    try {
      await fetch(`/api/materials/${id}/delete`, {
        method: "DELETE"
      });
      alert("Удалено");
      onUpdate();
    } catch {
      alert("Ошибка при удалении материала");
    }
  }
  return (
    <div>
      <Button 
        onClick={materialDelete}
        className="bg-red-500"
      >
        Удалить
      </Button>
    </div>
  )
}