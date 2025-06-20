import { sql } from "@/lib/db"
import { NextResponse } from "next/server"

// GET /api/clientes - Busca todos os clientes
export async function GET() {
  try {
    const result = await sql`SELECT * FROM clientes ORDER BY nome ASC`

    // Se result já é um array (comum em libs como postgres.js), usamos direto
    const clientesSerializaveis = result.map(cliente => {
      return {
        ...cliente,
        data_teste: cliente.data_teste ? cliente.data_teste.toISOString() : null,
        // Adicione outros campos Date aqui, se necessário
        // created_at: cliente.created_at ? cliente.created_at.toISOString() : null,
        // updated_at: cliente.updated_at ? cliente.updated_at.toISOString() : null,
      }
    })

    return NextResponse.json(clientesSerializaveis)
  } catch (error: any) {
    console.error("---------------------------------------------")
    console.error("ERRO DETALHADO AO BUSCAR CLIENTES NA API (GET /api/clientes):")
    if (error.message) console.error("Mensagem:", error.message)
    if (error.stack) console.error("Stack Trace:", error.stack)
    if (error.name) console.error("Nome do Erro:", error.name)
    if (error.code) console.error("Código do Erro (DB):", error.code)
    console.error("Objeto de Erro Completo:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2))
    console.error("---------------------------------------------")
    return NextResponse.json(
      { message: "Erro interno do servidor ao buscar clientes. Verifique os logs do servidor para detalhes." },
      { status: 500 },
    )
  }
}

// POST /api/clientes - Cria um novo cliente
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      nome,
      email,
      telefone,
      data_teste,
      melancolico,
      sanguineo,
      fleumatico,
      colerico,
      status_pagamento,
      status_cliente,
      valor_pago,
    } = body

    if (!nome || !telefone) {
      return NextResponse.json({ message: "Nome e telefone são obrigatórios" }, { status: 400 })
    }

    const result = await sql`
      INSERT INTO clientes (
        nome, email, telefone, data_teste, 
        melancolico, sanguineo, fleumatico, colerico, 
        status_pagamento, status_cliente, valor_pago
      ) VALUES (
        ${nome}, ${email}, ${telefone}, ${data_teste || null}, 
        ${melancolico || 0}, ${sanguineo || 0}, ${fleumatico || 0}, ${colerico || 0}, 
        ${status_pagamento || "pendente"}, ${status_cliente || "novo"}, ${valor_pago || 0}
      ) RETURNING *;
    `

    // Aqui também removemos .rows se result já é array
    return NextResponse.json(result[0], { status: 201 })
  } catch (error: any) {
    console.error("---------------------------------------------")
    console.error("ERRO DETALHADO AO CRIAR CLIENTE NA API (POST /api/clientes):")
    if (error.message) console.error("Mensagem:", error.message)
    if (error.stack) console.error("Stack Trace:", error.stack)
    if (error.name) console.error("Nome do Erro:", error.name)
    if (error.code) console.error("Código do Erro (DB):", error.code)
    console.error("Objeto de Erro Completo:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2))
    console.error("---------------------------------------------")

    // @ts-ignore - Acesso ao código de erro específico do PG
    if (error.code === "23505") {
      // @ts-ignore
      return NextResponse.json({ message: `Erro de duplicidade: ${error.detail}` }, { status: 409 })
    }

    return NextResponse.json(
      { message: "Erro interno do servidor ao criar cliente. Verifique os logs." },
      { status: 500 },
    )
  }
}
