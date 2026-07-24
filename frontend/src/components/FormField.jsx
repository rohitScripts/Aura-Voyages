export default function FormField({ label, id, type = 'text', value, onChange, placeholder, error, children, ...props }) {
  return (
    <label htmlFor={id} className="space-y-2 text-sm font-medium text-slate-700">
      <span>{label}</span>
      {children ? (
        children
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          {...props}
        />
      )}
      {error ? <p className="text-xs text-rose-600">{error}</p> : null}
    </label>
  )
}
