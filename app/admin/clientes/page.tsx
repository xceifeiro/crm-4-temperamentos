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
  const [clientesPorPagina, setClientesPorPagina] = useState(5)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchClients() {
      setIsLoading(true)
      try {
        const response = await fetch("/api/clientes")
        if (!response.ok) {
          let errorMessage = `Falha ao buscar clientes. Status: ${response.status}`
          try {
            const errorData = await response.json()
            errorMessage = errorData.message || errorMessage
          } catch {}
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
        setAllClients([])
      } finally {
        setIsLoading(false)
      }
    }
    fetchClients()
  }, [toast])

  // Verifica se cliente fez o teste
  function clienteFezTeste(c: Cliente) {
    return (c.melancolico ?? 0) > 0 || (c.sanguineo ?? 0) > 0 || (c.fleumatico ?? 0) > 0 || (c.colerico ?? 0) > 0
  }

  // Filtra clientes conforme termo de busca
  const filteredClients = useMemo(() => {
    if (!searchTerm) return allClients
    return allClients.filter(
      (client) =>
        client.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (client.email && client.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        client.telefone.includes(searchTerm),
    )
  }, [searchTerm, allClients])

  // Separa e ordena por criado_em decrescente
  const clientesQueFizeram = filteredClients
    .filter(clienteFezTeste)
    .sort((a, b) => new Date(b.criado_em).getTime() - new Date(a.criado_em).getTime())
    .slice(0, clientesPorPagina)

  const clientesNaoFizeram = filteredClients
    .filter((c) => !clienteFezTeste(c))
    .sort((a, b) => new Date(b.criado_em).getTime() - new Date(a.criado_em).getTime())
    .slice(0, clientesPorPagina)

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">Clientes</h1>
          <div className="flex w-full sm:w-auto gap-2">
            <Input placeholder="Buscar por nome, e-mail ou telefone..." className="bg-background flex-grow sm:max-w-xs" disabled />
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

      {/* Clientes que fizeram o teste */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Clientes que fizeram o teste</h2>
        {clientesQueFizeram.length > 0 ? (
          <div className="grid gap-4 md:gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {clientesQueFizeram.map((client) => (
              <ClientCard key={client.id} client={client} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">Nenhum cliente encontrado que tenha feito o teste.</p>
        )}
        {clientesQueFizeram.length >= clientesPorPagina && (
          <div className="flex justify-center mt-4">
            <Button onClick={() => setClientesPorPagina(clientesPorPagina + 5)}>Mostrar mais</Button>
          </div>
        )}
      </section>

      {/* Clientes que não fizeram o teste */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Clientes que não fizeram o teste</h2>
        {clientesNaoFizeram.length > 0 ? (
          <div className="grid gap-4 md:gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {clientesNaoFizeram.map((client) => (
              <ClientCard key={client.id} client={client} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">Nenhum cliente encontrado que não tenha feito o teste.</p>
        )}
        {clientesNaoFizeram.length >= clientesPorPagina && (
          <div className="flex justify-center mt-4">
            <Button onClick={() => setClientesPorPagina(clientesPorPagina + 5)}>Mostrar mais</Button>
          </div>
        )}
      </section>
    </div>
  )
}
