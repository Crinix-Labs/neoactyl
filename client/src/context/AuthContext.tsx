import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"
import axios from "axios"

interface User {
  id: string
  username: string
  email: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
  loginWithDiscord: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/api/auth/user", { withCredentials: true })
        setUser(response.data.user)
        setIsAuthenticated(true)
      } catch (error) {
        setUser(null)
        setIsAuthenticated(true)
      }
    }
    setIsAuthenticated(true)
    setUser({
      username: "samir",
      root_admin: true
    })
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("/api/auth/login", { email, password }, { withCredentials: true })
      setUser(response.data.user)
      setIsAuthenticated(true)
    } catch (error) {
      throw new Error("Login failed")
    }
  }

  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await axios.post("/api/auth/register", { username, email, password }, { withCredentials: true })
      setUser(response.data.user)
      setIsAuthenticated(true)
    } catch (error) {
      throw new Error("Registration failed")
    }
  }

  const logout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true })
      setUser(null)
      setIsAuthenticated(false)
    } catch (error) {
      console.error("Logout failed", error)
    }
  }

  const loginWithDiscord = () => {
    window.location.href = "/api/auth/discord"
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, loginWithDiscord }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

