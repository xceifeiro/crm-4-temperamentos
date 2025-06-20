import type { Cliente, DashboardStats } from "@/lib/types"

// ESTE ARQUIVO NÃO SERÁ MAIS A FONTE PRIMÁRIA DE DADOS APÓS A INTEGRAÇÃO COM O BANCO.
// Manter para referência ou fallback durante o desenvolvimento inicial das APIs.

export const dashboardStats: DashboardStats = {
  lucroDiario: 120.0,
  lucroSemanal: 1000.0,
  lucroMensal: 4500.0,
  clientesDoMes: 12,
  clientesFechados: 8,
  clientesAPagar: 4,
  totalClientes: 56,
}

export const clientes: Cliente[] = [
  {
    id: "1", // IDs serão gerados pelo banco
    nome: "Ana Clara Silva",
    email: "ana.silva@example.com",
    telefone: "11987654321",
    data_teste: "2024-06-15",
    melancolico: 60,
    sanguineo: 15,
    fleumatico: 15,
    colerico: 10,
    status_pagamento: "pago",
    status_cliente: "fechado",
    valor_pago: 150.0,
    criado_em: "2024-06-10T10:00:00Z",
  },
  {
    id: "2",
    nome: "Bruno Alves Costa",
    email: "bruno.costa@example.com",
    telefone: "21998877665",
    data_teste: "2024-06-12",
    melancolico: 20,
    sanguineo: 50,
    fleumatico: 20,
    colerico: 10,
    status_pagamento: "pendente",
    status_cliente: "em andamento",
    valor_pago: 0,
    criado_em: "2024-06-11T11:30:00Z",
  },
  // ... outros clientes mockados podem ser removidos ou mantidos para referência
]

export const temperamentosInfo = {
  melancolico: "Profundo, sensível e detalhista. Busca a perfeição e tem uma grande capacidade de análise.",
  sanguineo: "Extrovertido, otimista e sociável. Gosta de estar com pessoas e se adapta facilmente a novas situações.",
  fleumatico: "Calmo, paciente e diplomático. Evita conflitos e busca harmonia em seus relacionamentos.",
  colerico: "Determinado, prático e líder nato. Gosta de desafios e tem facilidade para tomar decisões.",
}
