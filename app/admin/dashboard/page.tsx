import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, UserCheck, UserX, TrendingUp } from "lucide-react"
import type { DashboardStats } from "@/lib/types"

// No futuro, esta função buscará dados da API
async function getDashboardStats(): Promise<DashboardStats> {
  // Em um ambiente real, a URL base viria de uma variável de ambiente
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  try {
    const response = await fetch(`${baseUrl}/api/dashboard-stats`, {
      cache: "no-store", // Garante que os dados mais recentes sejam buscados
    })

    if (!response.ok) {
      // Tenta ler a mensagem de erro da API
      let errorMessage = `Falha ao buscar estatísticas do dashboard. Status: ${response.status}`
      try {
        const errorData = await response.json()
        errorMessage = errorData.message || errorMessage
      } catch (e) {
        // Ignora se não conseguir parsear o JSON do erro
      }
      throw new Error(errorMessage)
    }
    return response.json()
  } catch (error) {
    console.error("Erro ao buscar estatísticas do dashboard:", error)
    // Retorna estatísticas zeradas em caso de erro para a página não quebrar
    return {
      lucroDiario: 0,
      lucroSemanal: 0,
      lucroMensal: 0,
      clientesDoMes: 0,
      clientesFechados: 0,
      clientesAPagar: 0,
      totalClientes: 0,
    }
  }
}

export default async function DashboardPage() {
  const statsData = await getDashboardStats()

  const statsDisplay = [
    { title: "Lucro Diário", value: `R$ ${statsData.lucroDiario.toFixed(2)}`, icon: DollarSign },
    { title: "Lucro Semanal", value: `R$ ${statsData.lucroSemanal.toFixed(2)}`, icon: DollarSign },
    { title: "Lucro Mensal", value: `R$ ${statsData.lucroMensal.toFixed(2)}`, icon: DollarSign },
    { title: "Clientes do Mês", value: statsData.clientesDoMes, icon: TrendingUp },
    { title: "Clientes Fechados", value: statsData.clientesFechados, icon: UserCheck },
    { title: "Clientes a Pagar", value: statsData.clientesAPagar, icon: UserX },
    { title: "Total de Clientes", value: statsData.totalClientes, icon: Users },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Visão Geral</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsDisplay.map((stat, index) => (
          <Card key={index} className="rounded-2xl shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
