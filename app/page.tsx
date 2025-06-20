"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, LogIn, BarChart3, Info } from "lucide-react"
import { temperamentosInfo } from "@/lib/data"
import type { Cliente } from "@/lib/types"
import TemperamentChart from "@/components/temperament-chart"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function PublicResultSearch() {
  const [telefone, setTelefone] = useState("")
  const [resultado, setResultado] = useState<Cliente | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setNotFound(false)
    setResultado(null)
    setApiError(null)

    try {
      const response = await fetch(`/api/clientes/buscar?telefone=${telefone.replace(/\D/g, "")}`)
      if (response.ok) {
        const data = await response.json()
        if (data) {
          setResultado(data)
        } else {
          setNotFound(true)
        }
      } else {
        let errorMessage = `Falha ao buscar cliente. Status: ${response.status}`
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorMessage
        } catch (jsonError) {
          console.warn("A resposta de erro da API não era JSON:", jsonError)
        }
        setApiError(errorMessage) // Define a mensagem de erro da API
        setNotFound(true) // Considera como "não encontrado" para a UI
      }
    } catch (error) {
      console.error("Erro ao buscar cliente:", error)
      setApiError(error instanceof Error ? error.message : "Ocorreu um erro desconhecido.")
      setNotFound(true)
    } finally {
      setIsLoading(false)
    }
  }

  const getTemperamentoPredominante = (cliente: Cliente | null) => {
    if (
      !cliente ||
      cliente.melancolico === null ||
      cliente.sanguineo === null ||
      cliente.fleumatico === null ||
      cliente.colerico === null
    ) {
      return null
    }
    const temperamentos = {
      melancolico: cliente.melancolico,
      sanguineo: cliente.sanguineo,
      fleumatico: cliente.fleumatico,
      colerico: cliente.colerico,
    }
    return Object.keys(temperamentos).reduce((a, b) =>
      (temperamentos[a as keyof typeof temperamentos] ?? 0) > (temperamentos[b as keyof typeof temperamentos] ?? 0)
        ? a
        : b,
    ) as keyof typeof temperamentosInfo
  }

  const predominante = resultado ? getTemperamentoPredominante(resultado) : null

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-sky-100 dark:from-slate-900 dark:to-sky-950 p-4 selection:bg-sky-200 selection:text-sky-900">
      <div className="absolute top-6 right-6 z-10">
        <Link href="/login">
          <Button
            variant="outline"
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-sm hover:bg-white dark:hover:bg-slate-800"
          >
            <LogIn className="mr-2 h-4 w-4" />
            Acesso Admin
          </Button>
        </Link>
      </div>

      <div className="w-full max-w-2xl space-y-8">
        <Card className="w-full rounded-2xl shadow-lg border border-slate-200/70 dark:border-slate-700/70 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md">
          <CardHeader className="text-center p-8">
            <div className="inline-block p-3 bg-sky-100 dark:bg-sky-900 rounded-full mx-auto mb-4">
              <BarChart3 className="h-10 w-10 text-sky-600 dark:text-sky-400" />
            </div>
            <CardTitle className="text-4xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
              4 Temperamentos
            </CardTitle>
            <CardDescription className="text-lg text-slate-600 dark:text-slate-400 pt-2">
              Descubra seu perfil comportamental. Insira seu telefone para ver o resultado.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSearch} className="flex w-full items-center space-x-3">
              <Input
                type="tel"
                placeholder="Seu número de telefone (ex: 11987654321)"
                className="flex-1 py-6 text-base border-slate-300 dark:border-slate-600 focus:border-sky-500 focus:ring-sky-500"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="lg"
                className="py-6 text-base bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Search className="mr-2 h-5 w-5" />
                    Buscar
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {isLoading && (
          <Card className="mt-6 rounded-2xl shadow-md bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/70 dark:border-slate-700/70">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center items-center space-x-2 text-slate-600 dark:text-slate-300">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-sky-600 dark:border-sky-400"></div>
                <p className="text-lg">Buscando seu resultado...</p>
              </div>
            </CardContent>
          </Card>
        )}

        {(notFound || apiError) && !isLoading && (
          <Alert
            variant="destructive"
            className="mt-6 rounded-2xl shadow-md bg-red-50/80 dark:bg-red-900/30 border-red-300 dark:border-red-700/70 backdrop-blur-md"
          >
            <Info className="h-5 w-5" />
            <AlertTitle>Resultado Não Encontrado</AlertTitle>
            <AlertDescription>
              {apiError ||
                "Não foi possível encontrar um resultado para o telefone informado. Verifique o número e tente novamente."}
            </AlertDescription>
          </Alert>
        )}

        {resultado && !isLoading && !apiError && (
          <Card className="mt-6 rounded-2xl shadow-lg border border-slate-200/70 dark:border-slate-700/70 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md">
            <CardHeader className="p-8">
              <CardTitle className="text-3xl font-semibold text-slate-800 dark:text-slate-100">
                {resultado.nome}
              </CardTitle>
              <CardDescription className="text-base text-slate-600 dark:text-slate-400">
                Resultado do teste realizado em{" "}
                {resultado.data_teste
                  ? new Date(resultado.data_teste).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })
                  : "Data não informada"}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8 grid gap-8">
              <div className="h-72 w-full p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-800/30">
                <TemperamentChart cliente={resultado} />
              </div>
              {predominante && (
                <Alert className="rounded-xl border-sky-200 dark:border-sky-800 bg-sky-50/50 dark:bg-sky-900/30">
                  <Info className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                  <AlertTitle className="font-semibold text-xl text-sky-700 dark:text-sky-300 capitalize">
                    Temperamento Predominante: {predominante}
                  </AlertTitle>
                  <AlertDescription className="text-slate-700 dark:text-slate-300 mt-1">
                    {temperamentosInfo[predominante as keyof typeof temperamentosInfo] || "Informação não disponível."}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="px-8 pb-8">
              <p className="text-xs text-slate-500 dark:text-slate-400 text-center w-full">
                Este é um resultado simplificado. Para uma análise completa, consulte um profissional.
              </p>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}
