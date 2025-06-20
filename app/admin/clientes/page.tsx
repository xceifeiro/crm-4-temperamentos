"use client"

import { useState, useMemo, useEffect } from "react"
import { Input } from "@/components/ui/input"
import ClientCard from "@/components/client-card"
import type { Cliente } from "@/lib/types"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function ClientesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [allClients, setAllClients] = useState<Cliente[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchClients() {
      setIsLoading(true)
      try {
        const response = await fetch("/api/clientes")
        if (!response.ok) {
          let errorMessage = `Falha ao buscar clientes. Status: ${response.status}`
          try {
            // Tenta parsear a resposta de erro como JSON
            const errorData = await response.json()
            errorMessage = errorData.message || errorMessage
          } catch (jsonError) {
            // Se não for JSON, o corpo da resposta pode ser texto ou HTML
            console.warn("A resposta de erro da API não era JSON:", jsonError)
            // Opcionalmente, você poderia tentar ler como texto:
            // const errorText = await response.text();
            // console.error("Texto do erro da API:", errorText);
          }
          throw new Error(errorMessage)
        }
        const data = await response.json()
        setAllClients(data)
      } catch (error) {
        console.error("Erro ao buscar clientes:", error)
        toast({
          title: "Erro ao Carregar Clientes",
          description: error instanceof Error ? error.message : "Não foi possível carregar os dados dos clientes.",
          variant: "destructive",
        })
        setAllClients([]) // Limpa os clientes em caso de erro para não mostrar dados antigos
      } finally {
        setIsLoading(false)
      }
    }
    fetchClients()
  }, [toast])

  const filteredClients = useMemo(() => {
    if (!searchTerm) return allClients
    return allClients.filter(
      (client) =>
        client.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (client.email && client.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        client.telefone.includes(searchTerm),
    )
  }, [searchTerm, allClients])

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">Clientes</h1>
          <div className="flex w-full sm:w-auto gap-2">
            <Input
              placeholder="Buscar por nome, e-mail ou telefone..."
              className="bg-background flex-grow sm:max-w-xs"
              disabled
            />
            <Button variant="outline" disabled>
              <PlusCircle className="h-4 w-4 mr-2" />
              Novo Cliente
            </Button>
          </div>
        </div>
        <div className="text-center py-10 text-muted-foreground">Carregando clientes...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Clientes</h1>
        <div className="flex w-full sm:w-auto gap-2">
          <Input
            placeholder="Buscar por nome, e-mail ou telefone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-background flex-grow sm:max-w-xs"
          />
          <Link href="/admin/clientes/novo">
            <Button variant="outline">
              <PlusCircle className="h-4 w-4 mr-2" />
              Novo Cliente
            </Button>
          </Link>
        </div>
      </div>
      {filteredClients.length > 0 ? (
        <div className="grid gap-4 md:gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredClients.map((client: Cliente) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-muted-foreground">
          {allClients.length === 0 && !searchTerm
            ? "Nenhum cliente cadastrado ainda."
            : "Nenhum cliente encontrado com os termos da busca."}
        </div>
      )}
    </div>
  )
}
