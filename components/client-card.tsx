import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { Cliente } from "@/lib/types"
import { Phone } from "lucide-react"

export default function ClientCard({ client }: { client: Cliente }) {
  return (
    <Card className="rounded-2xl shadow-md flex flex-col">
      <CardHeader>
        <CardTitle className="truncate">{client.nome}</CardTitle>
        
        <CardDescription>
          {client.email || "E-mail não informado"}
        </CardDescription>
        
        <CardDescription className="flex items-center gap-2">
          {client.telefone || "Telefone não informado"}
          {client.telefone && (
            <Link
              href={`https://wa.me/55${client.telefone.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Conversar no WhatsApp"
            >
              <Phone className="h-5 w-5 text-green-500 hover:text-green-600" />
            </Link>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow">
        <Separator className="my-2" />
        <div className="text-sm text-muted-foreground space-y-1">
          <p>Melancólico: {client.melancolico ?? 0}%</p>
          <p>Sanguíneo: {client.sanguineo ?? 0}%</p>
          <p>Fleumático: {client.fleumatico ?? 0}%</p>
          <p>Colérico: {client.colerico ?? 0}%</p>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/admin/clientes/${client.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            Ver Detalhes
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
