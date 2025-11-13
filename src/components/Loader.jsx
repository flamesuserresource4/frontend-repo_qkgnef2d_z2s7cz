export default function Loader({ rows = 3 }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-10 w-full rounded-md bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
      ))}
    </div>
  )
}
