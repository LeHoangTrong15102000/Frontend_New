import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'
import NextTopLoader from 'nextjs-toploader'
import { ProductAIProvider } from '@/contexts/ProductAIContext'
import Providers from './provider'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})
export const metadata: Metadata = {
  title: 'Test Frontend',
  description: 'The best restaurant in the world'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <NextTopLoader showSpinner={false} color='hsl(var(--foreground))' />
        <Providers>
          <ProductAIProvider>
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
              {children}
              <Toaster />
            </ThemeProvider>
          </ProductAIProvider>
        </Providers>
      </body>
    </html>
  )
}
