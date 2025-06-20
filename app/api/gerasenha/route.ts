import { NextRequest, NextResponse } from "next/server"
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  const { senha } = await req.json()

  if (!senha) {
    return NextResponse.json({ error: "Senha não fornecida" }, { status: 400 })
  }

  const hash = bcrypt.hashSync(senha, 10)
  return NextResponse.json({ hash })
}
