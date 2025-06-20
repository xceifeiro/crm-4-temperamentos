"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import type { Cliente } from "@/lib/types"

export default function TemperamentChart({ cliente }: { cliente: Cliente }) {
  const chartData = [
    { name: "Melancólico", value: cliente.melancolico, fill: "hsl(var(--chart-1))" },
    { name: "Sanguíneo", value: cliente.sanguineo, fill: "hsl(var(--chart-2))" },
    { name: "Fleumático", value: cliente.fleumatico, fill: "hsl(var(--chart-3))" },
    { name: "Colérico", value: cliente.colerico, fill: "hsl(var(--chart-4))" },
  ]

  const chartConfig = {
    value: {
      label: "Percentual",
    },
    melancolico: {
      label: "Melancólico",
      color: "hsl(var(--chart-1))",
    },
    sanguineo: {
      label: "Sanguíneo",
      color: "hsl(var(--chart-2))",
    },
    fleumatico: {
      label: "Fleumático",
      color: "hsl(var(--chart-3))",
    },
    colerico: {
      label: "Colérico",
      color: "hsl(var(--chart-4))",
    },
  } satisfies Record<string, any>

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          accessibilityLayer
          data={chartData}
          layout="vertical"
          margin={{ left: 10, right: 10, top: 5, bottom: 20 }} // Ajuste de margem para legenda
        >
          <CartesianGrid horizontal={false} />
          <YAxis
            dataKey="name"
            type="category"
            tickLine={false}
            tickMargin={5}
            axisLine={false}
            tickFormatter={(value) => chartConfig[value.toLowerCase()]?.label || value}
            className="text-xs"
            width={80} // Ajuste a largura do eixo Y se os nomes forem longos
          />
          <XAxis dataKey="value" type="number" hide />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                indicator="line"
                labelKey="name"
                nameKey="value"
                formatter={(value) => `${value}%`}
              />
            }
          />
          <ChartLegend content={<ChartLegendContent nameKey="name" className="text-xs" />} />
          <Bar dataKey="value" layout="vertical" radius={4}>
            {chartData.map((entry) => (
              <Cell key={`cell-${entry.name}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
