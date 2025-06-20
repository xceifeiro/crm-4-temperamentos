"use client"
import Link from "next/link"
import { Home, Users } from "lucide-react"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { usePathname } from "next/navigation"

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/admin/dashboard"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8"
        >
          <span className="text-md">4T</span>
          <span className="sr-only">4 Temperamentos</span>
        </Link>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/dashboard"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${pathname === "/admin/dashboard" ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}
              >
                <Home className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/clientes"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${pathname.startsWith("/admin/clientes") ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}
              >
                <Users className="h-5 w-5" />
                <span className="sr-only">Clientes</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Clientes</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  )
}
