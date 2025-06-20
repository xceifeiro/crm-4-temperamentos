import { sql } from "@/lib/db"
import { NextResponse } from "next/server"

// GET /api/clientes/[id] - Busca um cliente específico
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const result = await sql`SELECT * FROM clientes WHERE id = ${id}`

    if (result.length === 0) {
      return NextResponse.json({ message: "Cliente não encontrado" }, { status: 404 })
    }

    const cliente = result[0]

    const clienteSerializado = {
      ...cliente,
      data_teste: cliente.data_teste ? cliente.data_teste.toISOString() : null,
      criado_em: cliente.criado_em ? cliente.criado_em.toISOString() : null,
    }

    return NextResponse.json(clienteSerializado)
  } catch (error) {
    console.error("Erro ao buscar cliente:", error)
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 })
  }
}

// PATCH /api/clientes/[id] - Atualiza um cliente existente
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()

    const clienteExistente = await sql`SELECT id FROM clientes WHERE id = ${id}`
    if (clienteExistente.length === 0) {
      return NextResponse.json({ message: "Cliente não encontrado" }, { status: 404 })
    }

    const fields = Object.keys(body)
    if (fields.length === 0) {
      return NextResponse.json({ message: "Nenhum campo para atualizar" }, { status: 400 })
    }

    const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(", ")
    const values = [id, ...Object.values(body)]

    const query = `UPDATE clientes SET ${setClause} WHERE id = $1 RETURNING *`
    const result = await sql.unsafe(query, values)

    const clienteAtualizado = result[0]
    const clienteSerializado = {
      ...clienteAtualizado,
      data_teste: clienteAtualizado.data_teste ? clienteAtualizado.data_teste.toISOString() : null,
      criado_em: clienteAtualizado.criado_em ? clienteAtualizado.criado_em.toISOString() : null,
    }

    return NextResponse.json(clienteSerializado)
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error)
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 })
  }
}
