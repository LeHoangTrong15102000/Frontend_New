'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

type ProductAI = {
  botId: string
  apiKey: string
  name: string
} | null

type ProductAIContextType = {
  productAI: ProductAI
  setProductAI: (ai: ProductAI) => void
}

const ProductAIContext = createContext<ProductAIContextType | undefined>(undefined)

export function ProductAIProvider({ children }: { children: ReactNode }) {
  const [productAI, setProductAI] = useState<ProductAI>(null)

  return <ProductAIContext.Provider value={{ productAI, setProductAI }}>{children}</ProductAIContext.Provider>
}

export function useProductAI() {
  const context = useContext(ProductAIContext)
  if (context === undefined) {
    throw new Error('useProductAI must be used within a ProductAIProvider')
  }
  return context
}
