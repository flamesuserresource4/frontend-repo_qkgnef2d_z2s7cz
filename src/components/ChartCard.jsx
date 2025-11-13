import { useEffect, useRef } from 'react'

export default function ChartCard({ title, children }) {
  // Placeholder container; ready for Recharts/Chart.js later
  const ref = useRef(null)
  useEffect(() => {
    // Could mount charts here
  }, [])

  return (
    <div className="rounded-xl border bg-white dark:bg-zinc-900 p-4 shadow-sm">
      <div className="mb-2 text-sm font-medium text-zinc-600">{title}</div>
      <div ref={ref} className="h-48 grid place-items-center text-zinc-400 text-sm">
        {children || 'Chart goes here'}
      </div>
    </div>
  )
}
