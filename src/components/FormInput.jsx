export default function FormInput({ label, error, ...props }) {
  return (
    <label className="block text-sm w-full">
      <span className="mb-1 block text-zinc-600">{label}</span>
      <input {...props} className={`w-full px-3 py-2 border rounded-md bg-transparent ${error ? 'border-red-500' : ''}`} />
      {error ? <span className="text-xs text-red-600 mt-1 block">{error}</span> : null}
    </label>
  )
}
