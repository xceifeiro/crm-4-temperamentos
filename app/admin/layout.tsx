import type { ReactNode } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"
import { Toaster } from "@/components/ui/toaster" // Importar Toaster

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <AppSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 flex-1">
        <Header />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">{children}</main>
      </div>
      <Toaster /> {/* Adicionar Toaster ao layout */}
    </div>
  )
}
