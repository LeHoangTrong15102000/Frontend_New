'use client'
import { AppProvider } from '@/contexts/AppContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { ProductAIProvider } from '@/contexts/ProductAIContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren, useEffect, useState } from 'react'

const Providers = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false
          }
        }
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppProvider>
          <ProductAIProvider>
            <main className='flex-1'>{children}</main>
          </ProductAIProvider>
        </AppProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default Providers
