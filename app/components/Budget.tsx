'use client'

import { useEffect, useState } from "react"

export default function Budget({className}: {className?: string}) {
  const [budget, setBudget] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<null | string>(null)

  async function fetchBudget() {
    setLoading(true)
    setErr(null)
    try {
      const res = await fetch("/api/budget")
      const data = await res.json()
      if(!data.success) throw new Error

      setBudget(data.amount)
    }catch {
      setErr("Ошибка в бюджете")
    }finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBudget()
  }, [])

  return (
    <>
      {loading && (
        <p className="">
          loading...
        </p>
      )}
      {err && (
        <p className="">
          {err}
        </p>
      )}
      <span className={`${className ?? null}
        
      `}>
        {budget?.toFixed(2)} сом
      </span>
    </>
  )
}