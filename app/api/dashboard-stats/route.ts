import { sql } from "@/lib/db"
import { NextResponse } from "next/server"
import type { DashboardStats } from "@/lib/types"

export async function GET() {
  try {
    const totalClientesQuery = sql`SELECT COUNT(*) AS count FROM clientes;`
    const clientesFechadosQuery = sql`SELECT COUNT(*) AS count FROM clientes WHERE status_cliente = 'fechado';`
    const clientesAPagarQuery = sql`SELECT COUNT(*) AS count FROM clientes WHERE status_pagamento = 'pendente';`

    const clientesDoMesQuery = sql`
      SELECT COUNT(*) AS count 
      FROM clientes 
      WHERE date_trunc('month', criado_em AT TIME ZONE 'UTC') = date_trunc('month', NOW() AT TIME ZONE 'UTC');
    `

    const lucroMensalQuery = sql`
      SELECT COALESCE(SUM(valor_pago), 0) AS sum 
      FROM clientes 
      WHERE status_pagamento = 'pago' 
      AND date_trunc('month', criado_em AT TIME ZONE 'UTC') = date_trunc('month', NOW() AT TIME ZONE 'UTC');
    `

    const lucroSemanalQuery = sql`
      SELECT COALESCE(SUM(valor_pago), 0) AS sum 
      FROM clientes 
      WHERE status_pagamento = 'pago' 
      AND date_trunc('week', criado_em AT TIME ZONE 'UTC') = date_trunc('week', NOW() AT TIME ZONE 'UTC');
    `

    const lucroDiarioQuery = sql`
      SELECT COALESCE(SUM(valor_pago), 0) AS sum 
      FROM clientes 
      WHERE status_pagamento = 'pago' 
      AND date_trunc('day', criado_em AT TIME ZONE 'UTC') = date_trunc('day', NOW() AT TIME ZONE 'UTC');
    `

    const [
      totalClientesResult,
      clientesFechadosResult,
      clientesAPagarResult,
      clientesDoMesResult,
      lucroMensalResult,
      lucroSemanalResult,
      lucroDiarioResult,
    ] = await Promise.all([
      totalClientesQuery,
      clientesFechadosQuery,
      clientesAPagarQuery,
      clientesDoMesQuery,
      lucroMensalQuery,
      lucroSemanalQuery,
      lucroDiarioQuery,
    ])

    const stats: DashboardStats = {
      totalClientes: Number(totalClientesResult?.[0]?.count ?? 0),
      clientesFechados: Number(clientesFechadosResult?.[0]?.count ?? 0),
      clientesAPagar: Number(clientesAPagarResult?.[0]?.count ?? 0),
      clientesDoMes: Number(clientesDoMesResult?.[0]?.count ?? 0),
      lucroMensal: Number(lucroMensalResult?.[0]?.sum ?? 0),
      lucroSemanal: Number(lucroSemanalResult?.[0]?.sum ?? 0),
      lucroDiario: Number(lucroDiarioResult?.[0]?.sum ?? 0),
    }

    return NextResponse.json(stats)
  } catch (error: any) {
    console.error("---------------------------------------------")
    console.error("ERRO DETALHADO AO BUSCAR ESTATÍSTICAS DO DASHBOARD (GET /api/dashboard-stats):")
    if (error.message) console.error("Mensagem:", error.message)
    if (error.stack) console.error("Stack Trace:", error.stack)
    if (error.name) console.error("Nome do Erro:", error.name)
    if (error.code) console.error("Código do Erro (DB):", error.code)
    console.error("Objeto de Erro Completo:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2))
    console.error("---------------------------------------------")
    return NextResponse.json(
      { message: "Erro interno do servidor ao buscar estatísticas do dashboard. Verifique os logs." },
      { status: 500 },
    )
  }
}
