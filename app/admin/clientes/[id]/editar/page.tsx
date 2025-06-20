import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import EditClientForm from "@/components/edit-client-form"
import type { Cliente } from "@/lib/types"

// Esta função agora busca os dados diretamente do banco através da nossa API
// ou poderia usar o 'sql' diretamente se fosse um Server Action.
// Usar fetch é bom para separar o frontend do backend.
async function getCliente(id: string): Promise<Cliente | null> {
  // Em um ambiente real, a URL base viria de uma variável de ambiente
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  try {
    const response = await fetch(`${baseUrl}/api/clientes/${id}`, {
      cache: "no-store", // Garante que os dados mais recentes sejam buscados
    })

    if (!response.ok) {
      if (response.status === 404) return null
      throw new Error("Falha ao buscar dados do cliente.")
    }
    return response.json()
  } catch (error) {
    console.error("Erro na função getCliente:", error)
    return null // Retorna null em caso de erro de fetch ou outro
  }
}

export default async function EditClientePage({ params }: { params: { id: string } }) {
  const cliente = await getCliente(params.id)

  if (!cliente) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href={`/admin/clientes/${cliente.id}`}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para Detalhes do Cliente
      </Link>
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle>Editar Cliente</CardTitle>
          <CardDescription>Altere as informações de {cliente.nome} abaixo.</CardDescription>
        </CardHeader>
        <CardContent>
          <EditClientForm cliente={cliente} />
        </CardContent>
      </Card>
    </div>
  )
}
