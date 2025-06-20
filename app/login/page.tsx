"use client"

import { useActionState } from "react"
import { useRouter } from "next/navigation"  // <--- Importa useRouter
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export default function LoginPage() {
  const { toast } = useToast()
  const router = useRouter()  // <--- inicializa router

  async function handleLogin(prevState: any, formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        toast({ title: "Erro de Login", description: data.message || "Credenciais inválidas.", variant: "destructive" })
        return { message: data.message }
      }

      // Sucesso: toast e redireciona via router.push
      toast({ title: "Sucesso!", description: "Login realizado com sucesso." })
      router.push("/admin/dashboard")  // <--- redireciona aqui
    } catch (error) {
      const errorMessage = "Não foi possível conectar ao servidor. Tente novamente mais tarde."
      toast({ title: "Erro de Rede", description: errorMessage, variant: "destructive" })
      return { message: errorMessage }
    }
  }

  const [state, formAction, isPending] = useActionState(handleLogin, null)

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-900">
      <Card className="mx-auto max-w-sm w-full rounded-2xl shadow-md dark:bg-slate-800 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-2xl">Login do Administrador</CardTitle>
          <CardDescription>Entre com seu e-mail para acessar o painel</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" name="email" type="email" placeholder="m@example.com" required disabled={isPending} />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Senha</Label>
              </div>
              <Input id="password" name="password" type="password" required disabled={isPending} />
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Entrando..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
