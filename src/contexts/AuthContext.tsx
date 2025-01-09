'use client'
import { COOKIES_KEY } from '@/constants/cookies-key'
import { deleteCookie, getCookie } from '@/utils/helper'
import React, { createContext, useContext, useEffect, useState } from 'react'

type AuthContextType = {
  user: any
  isAuthenticated: boolean
  setUser: (user: any) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userCookie = getCookie(COOKIES_KEY.USER_INFO)
    setUser(userCookie ? JSON.parse(userCookie) : null)
  }, [])

  const logout = () => {
    setUser(null)
    deleteCookie(COOKIES_KEY.USER_INFO)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: !!user && user.user_info !== 'undefined',
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
