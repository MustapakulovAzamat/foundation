'use client'

import { useState } from "react";
import Input from "../components/Input";
import { useRouter } from "next/navigation";
import Button from "../components/Button";

export default function LoginPage() {
  const [login, setLogin] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")
  const router = useRouter()

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const res = await fetch("/api/auth/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({login,password})
      })
      const data = await res.json()

      if(data.success) {
        localStorage.setItem("user", JSON.stringify(data.user))
        router.refresh()
        router.push("/")
      } else {
        setError(data.message || "Неверный логин или пароль")
      } 
    } catch {
      setError("Ошибка подключению к серверу")
    }
  }

  return (
    <div className="
      container min-h-screen flex flex-col justify-center items-center gap-4
    ">
      <h1>Авторизация</h1>
      {error && (
        <div>
          {error}
        </div>
      )}
      <form 
        onSubmit={handleSubmit}
        className="
          flex flex-col justify-center items-center gap-2
        "
      >
        <Input 
          type="text"
          value={login}
          placeholder="Логин"
          onChange={(e) => setLogin(e.target.value)}
        />
        <Input 
          type="password"
          value={password}
          placeholder="Пароль"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">
          Авторизоваться
        </Button>
      </form>
    </div>
  )
}