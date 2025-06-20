// app/api/clientes/buscar/route.ts

import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const telefone = searchParams.get("telefone")

    if (!telefone) {
      return NextResponse.json({ message: "Telefone é obrigatório" }, { status: 400 })
    }

    // Buscar cliente pelo telefone exato
    const clientes = await sql`SELECT * FROM clientes WHERE telefone = ${telefone}`

    if (clientes.length === 0) {
      return NextResponse.json(null)  // Nenhum cliente encontrado
    }

    // Retorna o primeiro cliente encontrado
    return NextResponse.json(clientes[0])
  } catch (error) {
    console.error("Erro na busca:", error)
    return NextResponse.json({ message: "Erro interno" }, { status: 500 })
  }
}
