import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ allow }) {
  const { user, loading } = useAuth()

  if (loading) return null
  if (!allow?.includes(user?.role)) return <Navigate to="/auth/login" replace />
  return <Outlet />
}
