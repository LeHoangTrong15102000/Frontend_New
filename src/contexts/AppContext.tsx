'use client'
import { COOKIES_KEY } from '@/constants/cookies-key'
import { getCookie, setCookie } from '@/utils/helper'
import React, { createContext, useContext, useEffect, useState } from 'react'
import aiConfig from '../../ai-config.json'

type AppContextType = {
  currentAppId: string
  currentAppKey: string
  updateApp: (appId: string, appKey: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentAppId, setCurrentAppId] = useState(() => {
    if (typeof window !== 'undefined') {
      return getCookie(COOKIES_KEY.APP_ID) || aiConfig.chatgpt.appId
    }
    return aiConfig.chatgpt.appId
  })

  const [currentAppKey, setCurrentAppKey] = useState(() => {
    if (typeof window !== 'undefined') {
      return getCookie(COOKIES_KEY.APP_KEY) || aiConfig.chatgpt.appKey
    }
    return aiConfig.chatgpt.appKey
  })

  useEffect(() => {
    setCookie(COOKIES_KEY.APP_ID, currentAppId)
    setCookie(COOKIES_KEY.APP_KEY, currentAppKey)
  }, [currentAppId, currentAppKey])

  const updateApp = (appId: string, appKey: string) => {
    setCurrentAppId(appId)
    setCurrentAppKey(appKey)
  }

  return <AppContext.Provider value={{ currentAppId, currentAppKey, updateApp }}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
