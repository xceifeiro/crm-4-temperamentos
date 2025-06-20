"use client"
import { useRouter } from "next/navigation"
import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulação de chamada API de login
    // No futuro, chame sua API real aqui:
    // const response = await fetch('/api/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password }),
    // });
    // if (response.ok) {
    //   router.push('/admin/dashboard');
    // } else {
    //   const errorData = await response.json();
    //   toast({ title: "Erro de Login", description: errorData.message || "Credenciais inválidas.", variant: "destructive" });
    // }

    // Lógica de mock por enquanto:
    await new Promise((resolve) => setTimeout(resolve, 1000))
    if (email === "admin@example.com" && password === "password") {
      // Senha mockada
      router.push("/admin/dashboard")
    } else {
      toast({ title: "Erro de Login", description: "Credenciais inválidas.", variant: "destructive" })
    }
    setIsLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="mx-auto max-w-sm w-full rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl">Login do Administrador</CardTitle>
          <CardDescription>Entre com seu e-mail para acessar o painel</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Senha</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
