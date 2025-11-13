import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getSubdomain } from '../utils/tenant'

const AuthContext = createContext(null)

const defaultUser = {
  id: 'guest',
  name: 'Guest User',
  email: 'guest@example.com',
  role: 'guest',
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(defaultUser)
  const [org, setOrg] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const sd = getSubdomain()
    setOrg(sd)
    const cached = localStorage.getItem('auth:user')
    if (cached) {
      try {
        const parsed = JSON.parse(cached)
        setUser(parsed)
      } catch {}
    }
    setLoading(false)
  }, [])

  const login = async ({ email, role, name }) => {
    // Mock login; in real app, call backend + next-auth
    const newUser = {
      id: 'u_mock',
      name: name || 'Demo User',
      email,
      role,
    }
    setUser(newUser)
    localStorage.setItem('auth:user', JSON.stringify(newUser))
    return newUser
  }

  const logout = () => {
    setUser(defaultUser)
    localStorage.removeItem('auth:user')
  }

  const value = useMemo(() => ({ user, org, loading, login, logout }), [user, org, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
