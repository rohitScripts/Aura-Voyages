import { Home } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">This page has wandered off.</h1>
      <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">The route you requested doesn’t exist, but there are plenty of destinations still waiting for discovery.</p>
      <Link to="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white">
        <Home className="h-4 w-4" />
        Return home
      </Link>
    </div>
  )
}
