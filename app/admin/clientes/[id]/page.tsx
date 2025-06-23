import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import TemperamentChart from "@/components/temperament-chart"
import { notFound } from "next/navigation"
import { Edit, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { Cliente } from "@/lib/types"

interface Params {
  id: string
}

async function getCliente(id: string): Promise<Cliente | undefined> {
  // Ajuste: usar URL absoluta para evitar erro ERR_INVALID_URL
  const baseUrl = process.env.BASE_URL || "http://localhost:3000"
  const url = `${baseUrl}/api/clientes/${id}`

  const response = await fetch(url)

  if (!response.ok) {
    if (response.status === 404) return undefined
    throw new Error("Falha ao buscar cliente")
  }

  return response.json()
}

export default async function ClienteDetailPage({ params }: { params: Params }) {
  const cliente = await getCliente(params.id)

  if (!cliente) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/admin/clientes"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para lista de clientes
      </Link>
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <CardTitle className="text-3xl">{cliente.nome}</CardTitle>
              <CardDescription>
                Cadastrado em:{" "}
                {new Date(cliente.criado_em).toLocaleDateString("pt-BR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </CardDescription>
            </div>
            <div className="flex gap-2 self-start sm:self-center">
              <Link href={`/admin/clientes/${cliente.id}/editar`}>
                <Button variant="outline" size="icon" title="Editar">
                  <Edit className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="destructive" size="icon" title="Excluir" disabled>
                {/* Desabilitado por enquanto */}
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Informações de Contato</h3>
              <div className="text-sm space-y-2">
                <p>
                  <span className="font-medium">E-mail:</span> {cliente.email || "Não informado"}
                </p>
                <p>
                  <span className="font-medium">Telefone:</span> {cliente.telefone}
                </p>
              </div>
              <Separator />
              <h3 className="font-semibold text-lg">Status</h3>
              <div className="text-sm space-y-2">
                <p>
                  <span className="font-medium">Pagamento:</span>{" "}
                  <span className="capitalize">{cliente.status_pagamento}</span>
                </p>
                <p>
                  <span className="font-medium">Cliente:</span>{" "}
                  <span className="capitalize">{cliente.status_cliente}</span>
                </p>
                <p>
                  <span className="font-medium">Valor Pago:</span>{" "}
                  R$ {cliente.valor_pago != null ? cliente.valor_pago.toFixed(2) : "0.00"}
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Resultado do Teste</h3>
              <CardDescription className="mb-2">
                Teste realizado em:{" "}
                {cliente.data_teste
                  ? new Date(cliente.data_teste).toLocaleDateString("pt-BR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Não realizado"}
              </CardDescription>

              <div className="h-64 w-full p-4 border rounded-lg">
                <TemperamentChart cliente={cliente} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
