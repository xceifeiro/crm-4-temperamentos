import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { Cliente } from "@/lib/types"
import { HelpCircle, MessageCirclePlus, Phone, CheckCircle, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ClientCard({ client }: { client: Cliente }) {
  const fezTeste =
    (client.melancolico ?? 0) > 0 ||
    (client.sanguineo ?? 0) > 0 ||
    (client.fleumatico ?? 0) > 0 ||
    (client.colerico ?? 0) > 0

  return (
    <Card
  className={cn(
    "rounded-xl shadow-sm border-2 flex flex-col text-sm",
    fezTeste ? "border-green-500" : "border-yellow-500"
  )}
>
  <CardHeader className="pb-2">
    <CardTitle className="truncate text-base">{client.nome}</CardTitle>
    <CardDescription>{client.email || "E-mail não informado"}</CardDescription>

    <CardDescription className="flex items-center gap-2">
      {client.telefone || "Telefone não informado"}
      {client.telefone && (
        <Link
          href={`https://wa.me/55${client.telefone.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Conversar no WhatsApp"
        >
          <MessageCirclePlus className="h-4 w-4 text-green-500 hover:text-green-600" />
        </Link>
      )}
    </CardDescription>

    <div className="flex flex-col gap-1 mt-2 text-xs">
      <div className="flex items-center gap-1">
        {fezTeste ? (
          <>
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-green-600 font-medium">Teste realizado</span>
          </>
        ) : (
          <>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <span className="text-yellow-600 font-medium">Teste pendente</span>
          </>
        )}
      </div>

      <div className="flex items-center gap-1">
        {client.status_pagamento === "pago" ? (
          <>
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-green-600 font-medium">Pagamento confirmado - R$ {client.valor_pago}</span>
          </>
        ) : client.status_pagamento === "pendente" ? (
          <>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <span className="text-yellow-600 font-medium">Pagamento pendente</span>
          </>
        ) : (
          <>
            <HelpCircle className="h-4 w-4 text-gray-400" />
            <span className="text-gray-500 font-medium">Sem pagamento</span>
          </>
        )}
      </div>
    </div>
  </CardHeader>

  {fezTeste && (
    <CardContent className="flex-grow py-1">
      <Separator className="my-2" />
      <div className="text-xs text-muted-foreground space-y-1">
        <p>Melancólico: {client.melancolico ?? 0}%</p>
        <p>Sanguíneo: {client.sanguineo ?? 0}%</p>
        <p>Fleumático: {client.fleumatico ?? 0}%</p>
        <p>Colérico: {client.colerico ?? 0}%</p>
      </div>
    </CardContent>
  )}

  <CardFooter className="pt-2">
    <Link href={`/admin/clientes/${client.id}`} className="w-full">
      <Button variant="outline" className="w-full text-xs py-1.5">
        Ver Detalhes
      </Button>
    </Link>
  </CardFooter>
</Card>
  )
}
