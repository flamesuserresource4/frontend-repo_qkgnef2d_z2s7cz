import { Bell, ChevronDown, Menu, Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Navbar({ onMenuToggle }) {
  const { user, logout, org } = useAuth()
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const cached = localStorage.getItem('theme') || 'light'
    setTheme(cached)
    document.documentElement.classList.toggle('dark', cached === 'dark')
  }, [])

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.classList.toggle('dark', next === 'dark')
  }

  return (
    <header className="sticky top-0 z-40 bg-white/70 dark:bg-zinc-900/70 backdrop-blur border-b">
      <div className="flex h-14 items-center gap-3 px-4">
        <button className="md:hidden p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800" onClick={onMenuToggle}>
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <div className="text-sm text-zinc-500">{org ? `${org}.myapp.com` : 'myapp.com'}</div>
          <div className="text-base font-medium">Dietitian Platform</div>
        </div>
        <button className="p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        <button className="p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-emerald-500 text-white grid place-items-center text-sm">
            {user?.name?.[0]?.toUpperCase() || 'G'}
          </div>
          <div className="text-sm leading-tight hidden sm:block">
            <div className="font-medium">{user?.name}</div>
            <div className="text-zinc-500">{user?.role}</div>
          </div>
          <button className="p-2" onClick={logout} title="Logout">
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  )
}
