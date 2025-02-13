import type React from "react"
import { createContext, useState, useContext } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  login: (apiKey: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  const login = async (apiKey: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    if (apiKey === "valid_api_key") {
      setIsAuthenticated(true)
      console.log("User authenticated:", isAuthenticated)
    } else {
      throw new Error("Invalid API key")
    }
  }

  const logout = () => {
    // Simulate API call
    setTimeout(() => {
      setIsAuthenticated(false)
    }, 500)
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

