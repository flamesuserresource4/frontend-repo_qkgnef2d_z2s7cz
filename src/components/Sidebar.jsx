import { Home, Users, Building2, CreditCard, BarChart3, Settings, Calendar, UserRound, ClipboardList, MessageCircle, Bell, FileText } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const NAV_ITEMS = {
  'super-admin': [
    { to: '/super-admin', label: 'Overview', icon: Home },
    { to: '/super-admin/organizations', label: 'Organizations', icon: Building2 },
    { to: '/super-admin/users', label: 'Users', icon: Users },
    { to: '/super-admin/subscriptions', label: 'Subscriptions', icon: CreditCard },
    { to: '/super-admin/billing', label: 'Billing', icon: CreditCard },
    { to: '/super-admin/tickets', label: 'Support', icon: MessageCircle },
    { to: '/super-admin/announcements', label: 'Announcements', icon: Bell },
    { to: '/super-admin/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/settings', label: 'Settings', icon: Settings },
  ],
  'org-admin': [
    { to: '/organization', label: 'Overview', icon: Home },
    { to: '/organization/staff', label: 'Staff', icon: Users },
    { to: '/organization/patients', label: 'Patients', icon: UserRound },
    { to: '/organization/appointments', label: 'Appointments', icon: Calendar },
    { to: '/organization/meal-templates', label: 'Meal Templates', icon: ClipboardList },
    { to: '/organization/payments', label: 'Payments', icon: CreditCard },
    { to: '/organization/reports', label: 'Reports', icon: FileText },
    { to: '/settings', label: 'Settings', icon: Settings },
  ],
  'dietitian': [
    { to: '/dietitian', label: 'Dashboard', icon: Home },
    { to: '/dietitian/patients', label: 'Patients', icon: Users },
    { to: '/dietitian/meal-plans', label: 'Meal Plans', icon: ClipboardList },
    { to: '/dietitian/progress', label: 'Progress', icon: BarChart3 },
    { to: '/dietitian/chat', label: 'Chat', icon: MessageCircle },
    { to: '/dietitian/reminders', label: 'Reminders', icon: Bell },
    { to: '/dietitian/reports', label: 'Reports', icon: FileText },
  ],
  'patient': [
    { to: '/patient', label: 'Dashboard', icon: Home },
    { to: '/patient/plan', label: 'My Diet Plan', icon: ClipboardList },
    { to: '/patient/progress', label: 'Progress', icon: BarChart3 },
    { to: '/patient/appointments', label: 'Appointments', icon: Calendar },
    { to: '/patient/chat', label: 'Chat', icon: MessageCircle },
    { to: '/patient/notifications', label: 'Notifications', icon: Bell },
    { to: '/patient/billing', label: 'Billing', icon: CreditCard },
    { to: '/patient/profile', label: 'Profile', icon: UserRound },
  ],
}

export default function Sidebar() {
  const { user } = useAuth()
  const items = NAV_ITEMS[user?.role] || []

  return (
    <aside className="h-screen sticky top-0 hidden md:flex md:flex-col w-64 border-r bg-white dark:bg-zinc-900">
      <div className="p-4 border-b">
        <h1 className="text-xl font-semibold">Dietitian Platform</h1>
        <p className="text-xs text-zinc-500">{user?.role || 'guest'}</p>
      </div>
      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-emerald-50 dark:hover:bg-zinc-800 ${isActive ? 'bg-emerald-100 dark:bg-zinc-800 text-emerald-700' : 'text-zinc-700 dark:text-zinc-200'}`}
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 text-xs text-zinc-500">v0.1.0</div>
    </aside>
  )
}
