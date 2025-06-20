export interface Cliente {
  id: string
  nome: string
  email: string | null
  telefone: string
  data_teste: string | null
  melancolico: number | null
  sanguineo: number | null
  fleumatico: number | null
  colerico: number | null
  status_pagamento: "pago" | "pendente" | null
  status_cliente: "novo" | "fechado" | "em andamento" | null
  valor_pago: number | null
  criado_em: string
}

export interface DashboardStats {
  lucroDiario: number
  lucroSemanal: number
  lucroMensal: number
  clientesDoMes: number
  clientesFechados: number
  clientesAPagar: number
  totalClientes: number
}

export interface Admin {
  id: string
  email: string
  // senha_hash não é exposta para o cliente
  criado_em: string
}

export interface AcessoPublico {
  id: string
  cliente_id: string | null // Pode ser null se o cliente for deletado e ON DELETE SET NULL
  telefone_consultado: string
  data_acesso: string
}
