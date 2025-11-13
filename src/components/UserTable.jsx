import { useMemo, useState } from 'react'

export default function UserTable({ data, columns }) {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  const filtered = useMemo(() => {
    if (!query) return data
    const q = query.toLowerCase()
    return data.filter(row => Object.values(row).some(v => String(v).toLowerCase().includes(q)))
  }, [query, data])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div className="rounded-xl border bg-white dark:bg-zinc-900 p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3 mb-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="w-full md:w-64 px-3 py-2 border rounded-md bg-transparent"
        />
        <select value={pageSize} onChange={(e)=>{setPageSize(Number(e.target.value)); setPage(1)}} className="px-2 py-2 border rounded-md bg-transparent">
          {[5,10,20].map(n => <option key={n} value={n}>{n}/page</option>)}
        </select>
      </div>
      <div className="overflow-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-zinc-500">
              {columns.map(col => <th key={col.accessor} className="py-2 pr-4">{col.header}</th>)}
            </tr>
          </thead>
          <tbody>
            {pageData.map((row, i) => (
              <tr key={row.id || i} className="border-t">
                {columns.map(col => <td key={col.accessor} className="py-2 pr-4">{row[col.accessor]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-3 text-sm">
        <div>Page {page} of {totalPages}</div>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded disabled:opacity-50" disabled={page===1} onClick={()=>setPage(p=>Math.max(1,p-1))}>Prev</button>
          <button className="px-3 py-1 border rounded disabled:opacity-50" disabled={page===totalPages} onClick={()=>setPage(p=>Math.min(totalPages,p+1))}>Next</button>
        </div>
      </div>
    </div>
  )
}
