export default function DashboardCard({ title, value, subtitle, icon: Icon, trend }) {
  return (
    <div className="group rounded-xl border bg-white dark:bg-zinc-900 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-zinc-500">{subtitle}</p>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        {Icon ? <Icon className="h-5 w-5 text-emerald-600" /> : null}
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <div className="text-3xl font-bold">{value}</div>
        {trend && (
          <span className={`text-xs ${trend > 0 ? 'text-emerald-600' : 'text-red-600'}`}>{trend > 0 ? '+' : ''}{trend}%</span>
        )}
      </div>
    </div>
  )
}
