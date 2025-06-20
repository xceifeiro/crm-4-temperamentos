import { sql } from "@/lib/db"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ message: "E-mail e senha são obrigatórios." }, { status: 400 })
    }

    const result = await sql`SELECT id, email, senha_hash FROM admins WHERE email = ${email}`

    if (result.length === 0) {
      return NextResponse.json({ message: "Credenciais inválidas." }, { status: 401 })
    }

    const admin = result[0]
    const senhaHashSalva = admin.senha_hash

    const senhaCorresponde = await bcrypt.compare(password, senhaHashSalva)

    if (!senhaCorresponde) {
      return NextResponse.json({ message: "Credenciais inválidas." }, { status: 401 })
    }

    const adminData = {
      id: admin.id,
      email: admin.email,
    }

    return NextResponse.json({ message: "Login bem-sucedido!", admin: adminData })
  } catch (error) {
    console.error("Erro na API de login:", error)
    return NextResponse.json({ message: "Erro interno do servidor." }, { status: 500 })
  }
}
