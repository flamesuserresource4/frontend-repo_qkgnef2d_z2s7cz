import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import DashboardCard from './components/DashboardCard'
import ChartCard from './components/ChartCard'
import UserTable from './components/UserTable'
import Modal from './components/Modal'
import FormInput from './components/FormInput'
import Loader from './components/Loader'
import ProtectedRoute from './components/ProtectedRoute'
import { organizations, users, subscriptions, payments, tickets, announcements, analytics, orgOverview, patients as patientData, appointments as appts, mealTemplates, reminders, patientProgress } from './utils/dummyData'

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <main className="p-4 md:p-6 space-y-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

function Landing() {
  return (
    <div className="min-h-screen grid place-items-center p-8">
      <div className="max-w-2xl text-center space-y-4">
        <h1 className="text-4xl font-bold">Dietitian Management Platform</h1>
        <p className="text-zinc-600 dark:text-zinc-400">Multi-tenant, role-based dashboards for clinics, dietitians, and patients. Subdomain aware and ready for API integration.</p>
        <div className="flex justify-center gap-3">
          <a href="/auth/login" className="px-4 py-2 rounded-md bg-emerald-600 text-white">Login</a>
          <a href="/auth/register" className="px-4 py-2 rounded-md border">Register</a>
        </div>
      </div>
    </div>
  )
}

function Login() {
  const { login } = useAuth()
  const handle = async (role) => {
    await login({ email: `${role}@demo.com`, role, name: role.replace('-', ' ') })
    window.location.href = '/dashboard'
  }
  return (
    <div className="min-h-screen grid place-items-center p-6">
      <div className="w-full max-w-md rounded-xl border bg-white dark:bg-zinc-900 p-6">
        <h2 className="text-xl font-semibold mb-4">Choose a role to demo</h2>
        <div className="grid grid-cols-2 gap-3">
          {['super-admin','org-admin','dietitian','patient'].map(r => (
            <button key={r} onClick={()=>handle(r)} className="px-3 py-2 rounded-md border hover:bg-zinc-50 dark:hover:bg-zinc-800 capitalize">{r.replace('-', ' ')}</button>
          ))}
        </div>
      </div>
    </div>
  )
}

function DashboardRedirect() {
  const { user } = useAuth()
  if (!user) return null
  const role = user.role
  const map = {
    'super-admin': '/super-admin',
    'org-admin': '/organization',
    'dietitian': '/dietitian',
    'patient': '/patient',
  }
  return <Navigate to={map[role] || '/'} replace />
}

function SAOverview() {
  return (
    <Layout>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard title="Organizations" value={organizations.length} subtitle="Total Orgs" />
        <DashboardCard title="Users" value={users.length} subtitle="Total Users" />
        <DashboardCard title="Active Plans" value={subscriptions.filter(s=>s.status!=='canceled').length} subtitle="Subscriptions" />
        <DashboardCard title="Revenue" value={`$${payments.reduce((a,b)=>a+b.amount,0)}`} subtitle="Monthly" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Active Users">Recharts Coming Soon</ChartCard>
        <ChartCard title="Revenue Trends">Chart.js Coming Soon</ChartCard>
      </div>
      <UserTable
        data={organizations}
        columns={[{header:'Name', accessor:'name'},{header:'Domain', accessor:'domain'},{header:'Plan', accessor:'plan'},{header:'Users', accessor:'users'}]}
      />
    </Layout>
  )
}

function OrgOverview() {
  return (
    <Layout>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <DashboardCard title="Dietitians" value={orgOverview.dietitians} subtitle="Active" />
        <DashboardCard title="Patients" value={orgOverview.patients} subtitle="Total" />
        <DashboardCard title="Appointments" value={orgOverview.appointments} subtitle="This Week" />
      </div>
      <UserTable
        data={patientData}
        columns={[{header:'Name', accessor:'name'},{header:'Age', accessor:'age'},{header:'Assigned', accessor:'assignedTo'},{header:'Status', accessor:'status'}]}
      />
    </Layout>
  )
}

function DietitianDashboard() {
  return (
    <Layout>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard title="Upcoming" value={appts.length} subtitle="Appointments" />
        <DashboardCard title="Patients" value={patientData.length} subtitle="Assigned" />
        <DashboardCard title="Reminders" value={reminders.length} subtitle="Active" />
        <DashboardCard title="Meal Plans" value={mealTemplates.length} subtitle="Total" />
      </div>
      <UserTable data={appts} columns={[{header:'Patient', accessor:'patient'},{header:'Date', accessor:'date'},{header:'Dietitian', accessor:'dietitian'},{header:'Status', accessor:'status'}]} />
    </Layout>
  )
}

function PatientDashboard() {
  return (
    <Layout>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard title="Goals" value={'Weight Loss'} subtitle="Primary" />
        <DashboardCard title="BMI" value={patientProgress.bmi.at(-1)} subtitle="Current" />
        <DashboardCard title="Calories" value={`${patientProgress.calories.at(-1)} kcal`} subtitle="Daily" />
        <DashboardCard title="Water" value={`${patientProgress.water.at(-1)} L`} subtitle="Today" />
      </div>
      <UserTable data={mealTemplates} columns={[{header:'Template', accessor:'name'},{header:'Meals/Day', accessor:'mealsPerDay'}]} />
    </Layout>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Login />} />

          <Route path="/dashboard" element={<DashboardRedirect />} />

          <Route element={<ProtectedRoute allow={["super-admin"]} />}>
            <Route path="/super-admin" element={<SAOverview />} />
          </Route>
          <Route element={<ProtectedRoute allow={["org-admin"]} />}>
            <Route path="/organization" element={<OrgOverview />} />
          </Route>
          <Route element={<ProtectedRoute allow={["dietitian"]} />}>
            <Route path="/dietitian" element={<DietitianDashboard />} />
          </Route>
          <Route element={<ProtectedRoute allow={["patient"]} />}>
            <Route path="/patient" element={<PatientDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
