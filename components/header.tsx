"use client"
import Link from "next/link"
import React from "react"
import { useRouter } from "next/navigation"

import { Home, Users, PanelLeft, User, LogOut } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { usePathname } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const pathSegments = pathname.split("/").filter(Boolean)

  const handleLogout = async () => {
    // Simulação de chamada API de logout
    // await fetch('/api/auth/logout', { method: 'POST' });
    toast({ title: "Logout", description: "Você foi desconectado." })
    router.push("/login")
  }

  const getBreadcrumbPageName = (segment: string) => {
    if (segment === "dashboard") return "Visão Geral"
    if (segment === "clientes") return "Clientes"
    if (segment.match(/^[0-9a-fA-F-]{36}$/)) return "Detalhes do Cliente" // Assume UUID
    const decodedSegment = decodeURIComponent(segment)
    return decodedSegment.charAt(0).toUpperCase() + decodedSegment.slice(1)
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Abrir Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/admin/dashboard"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <span className="text-xl">4T</span>
              <span className="sr-only">4 Temperamentos</span>
            </Link>
            <Link
              href="/admin/dashboard"
              className={`flex items-center gap-4 px-2.5 ${pathname === "/admin/dashboard" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/admin/clientes"
              className={`flex items-center gap-4 px-2.5 ${pathname.startsWith("/admin/clientes") ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Users className="h-5 w-5" />
              Clientes
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/admin/dashboard">Admin</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {pathSegments.slice(1).map((segment, index) => (
            <React.Fragment key={segment}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {index === pathSegments.length - 2 ? (
                  <BreadcrumbPage className="capitalize">{getBreadcrumbPageName(segment)}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={`/${pathSegments.slice(0, index + 2).join("/")}`} className="capitalize">
                      {getBreadcrumbPageName(segment)}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="relative ml-auto flex-1 md:grow-0">{/* Search can be implemented later */}</div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/*<DropdownMenuItem disabled>Configurações</DropdownMenuItem>
          <DropdownMenuItem disabled>Suporte</DropdownMenuItem>*/}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
