import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '4 Temperamentos - CRM',
  description: 'CRM para 4 Temperamentos por Juliana Barbosa',
  generator: 'AutoNex',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
