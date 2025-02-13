import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"
import axios from "axios"

interface AuthContextType {
  isAuthenticated: boolean
  login: (apiKey: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/api/auth/check", { withCredentials: true })
        setIsAuthenticated(response.data.authenticated)
      } catch (error) {
        setIsAuthenticated(false)
      }
    }
    checkAuth()
  }, [])

  const login = async (apiKey: string) => {
    try {
      const response = await axios.post("/api/auth/login", { apiKey }, { withCredentials: true })
      setIsAuthenticated(true)
    } catch (error) {
      throw new Error("Login failed")
    }
  }

  const logout = () => {
    axios.post("/api/auth/logout", {}, { withCredentials: true })
    setIsAuthenticated(false)
  }

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

