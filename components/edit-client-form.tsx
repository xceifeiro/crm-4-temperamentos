"use client"

import { useState, type FormEvent, ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import type { Cliente } from "@/lib/types"

export default function EditClientForm({ cliente }: { cliente: Cliente }) {
  const router = useRouter()
  const { toast } = useToast()

  // Define valores padrão para evitar undefined ou null
  const [formData, setFormData] = useState({
    nome: cliente.nome ?? "",
    email: cliente.email ?? "",
    telefone: cliente.telefone ?? "",
    data_teste: cliente.data_teste ? new Date(cliente.data_teste).toISOString().substring(0, 10) : "",
    melancolico: cliente.melancolico ?? 0,
    sanguineo: cliente.sanguineo ?? 0,
    fleumatico: cliente.fleumatico ?? 0,
    colerico: cliente.colerico ?? 0,
    status_pagamento: cliente.status_pagamento ?? "pendente",
    status_cliente: cliente.status_cliente ?? "novo",
    valor_pago: cliente.valor_pago ?? 0,
  })

  const [isLoading, setIsLoading] = useState(false)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value, type } = e.target

    setFormData((prev) => {
      if (type === "number") {
        return {
          ...prev,
          [name]: value === "" ? "" : Number(value),
        }
      }
      return {
        ...prev,
        [name]: value ?? "",
      }
    })
  }

  function handleSelectChange(name: string, value: string) {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`/api/clientes/${cliente.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message ?? "Erro ao atualizar")
      }

      toast({
        title: "Sucesso!",
        description: "Cliente atualizado com sucesso.",
      })

      router.push(`/admin/clientes/${cliente.id}`)
      router.refresh()
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro inesperado",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="nome">Nome Completo</Label>
          <Input
            id="nome"
            name="nome"
            value={formData.nome ?? ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email ?? ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="telefone">Telefone</Label>
          <Input
            id="telefone"
            name="telefone"
            type="tel"
            value={formData.telefone ?? ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="data_teste">Data do Teste</Label>
          <Input
            id="data_teste"
            name="data_teste"
            type="date"
            value={formData.data_teste ?? ""}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {["melancolico", "sanguineo", "fleumatico", "colerico"].map((key) => (
          <div key={key}>
            <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)} (%)</Label>
            <Input
              id={key}
              name={key}
              type="number"
              value={formData[key] === "" ? "" : formData[key]}
              onChange={handleChange}
              min={0}
              max={100}
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Label htmlFor="status_pagamento">Status do Pagamento</Label>
          <Select
            name="status_pagamento"
            value={formData.status_pagamento ?? "pendente"}
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

        <div>
          <Label htmlFor="status_cliente">Status do Cliente</Label>
          <Select
            name="status_cliente"
            value={formData.status_cliente ?? "novo"}
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

        <div>
          <Label htmlFor="valor_pago">Valor Pago (R$)</Label>
          <Input
            id="valor_pago"
            name="valor_pago"
            type="number"
            min={0}
            step={0.01}
            value={formData.valor_pago === "" ? "" : formData.valor_pago}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </div>
    </form>
  )
}
