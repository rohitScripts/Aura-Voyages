import { Search } from 'lucide-react'

export default function SearchBar({ value, onChange, placeholder = 'Search countries' }) {
  return (
    <label className="flex w-full items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 shadow-sm ring-0 transition focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-100">
      <Search className="h-5 w-5 text-slate-400" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full border-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
      />
    </label>
  )
}
