"use client"

import type React from "react"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NewClientPage() {
  const router = useRouter()
  const { toast } = useToast()
  // Inicializa o estado com valores definidos para evitar o erro de "uncontrolled input"
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    data_teste: "",
    melancolico: 0,
    sanguineo: 0,
    fleumatico: 0,
    colerico: 0,
    status_pagamento: "pendente",
    status_cliente: "novo",
    valor_pago: 0,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number.parseFloat(value) || 0 : value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`/api/clientes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Falha ao criar cliente.")
      }

      toast({
        title: "Sucesso!",
        description: "Novo cliente criado com sucesso.",
      })
      router.push(`/admin/clientes`)
      router.refresh() // Força a atualização da lista de clientes
    } catch (error) {
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Ocorreu um erro inesperado.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/admin/clientes"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para Lista de Clientes
      </Link>
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle>Novo Cliente</CardTitle>
          <CardDescription>Preencha os dados para cadastrar um novo cliente.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo</Label>
                <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  value={formData.telefone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="data_teste">Data do Teste</Label>
                <Input
                  id="data_teste"
                  name="data_teste"
                  type="date"
                  value={formData.data_teste}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="melancolico">Melancólico (%)</Label>
                <Input
                  id="melancolico"
                  name="melancolico"
                  type="number"
                  value={formData.melancolico}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sanguineo">Sanguíneo (%)</Label>
                <Input
                  id="sanguineo"
                  name="sanguineo"
                  type="number"
                  value={formData.sanguineo}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fleumatico">Fleumático (%)</Label>
                <Input
                  id="fleumatico"
                  name="fleumatico"
                  type="number"
                  value={formData.fleumatico}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="colerico">Colérico (%)</Label>
                <Input id="colerico" name="colerico" type="number" value={formData.colerico} onChange={handleChange} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="status_pagamento">Status do Pagamento</Label>
                <Select
                  name="status_pagamento"
                  value={formData.status_pagamento}
                  onValueChange={(value) => handleSelectChange("status_pagamento", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pago">Pago</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status_cliente">Status do Cliente</Label>
                <Select
                  name="status_cliente"
                  value={formData.status_cliente}
                  onValueChange={(value) => handleSelectChange("status_cliente", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="novo">Novo</SelectItem>
                    <SelectItem value="em andamento">Em Andamento</SelectItem>
                    <SelectItem value="fechado">Fechado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="valor_pago">Valor Pago (R$)</Label>
                <Input
                  id="valor_pago"
                  name="valor_pago"
                  type="number"
                  value={formData.valor_pago}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Salvando..." : "Salvar Cliente"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
