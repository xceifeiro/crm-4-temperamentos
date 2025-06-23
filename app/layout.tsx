import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CRM 4 Temperamentos | Juliana Barbosa',
  description: 'Sistema inteligente de CRM desenvolvido para mapear e gerenciar clientes com base nos 4 temperamentos. Ideal para coaches, terapeutas e profissionais da área comportamental.',
  generator: 'AutoNex - Soluções em Automação e Tecnologia',
  keywords: ['CRM', '4 temperamentos', 'Juliana Barbosa', 'psicologia comportamental', 'sistema de clientes', 'AutoNex'],
  authors: [{ name: 'Juliana Barbosa' }, { name: 'AutoNex', url: 'https://autonextech.com.br' }],
  creator: 'AutoNex',
  applicationName: 'CRM 4 Temperamentos',
  robots: 'index, follow',
  openGraph: {
    title: 'CRM 4 Temperamentos | Juliana Barbosa',
    description: 'Gerencie seus clientes de forma eficiente com o CRM baseado nos 4 temperamentos.',
    url: 'https://4temperamentos.com.br', // Substitua pelo domínio real
    siteName: 'CRM 4 Temperamentos',
    type: 'website',
    locale: 'pt_BR',
    
  },
  icons: {
    icon: '/images/favicon.png', // ou .png, .svg etc
    shortcut: '/images/favicon.png',
    apple: '/images/favicon.png',
  },
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
