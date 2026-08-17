import { Menu, X, Compass } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'

const links = [
  { to: '/', label: 'Home' },
  { to: '/countries', label: 'Countries' },
  { to: '/about', label: 'About' },
  { to: '/feedback', label: 'Feedback' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { currentUser, isAuthenticated, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="rounded-2xl bg-sky-600 p-2 text-white shadow-lg shadow-sky-600/20">
            <Compass className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-900">Aura Voyages</p>
            <p className="text-sm text-slate-500">Discover the world</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `text-sm font-medium transition ${isActive ? 'text-sky-600' : 'text-slate-600 hover:text-slate-900'}`}
            >
              {link.label}
            </NavLink>
          ))}
          {isAuthenticated ? (
            <>
              <NavLink to="/dashboard" className={({ isActive }) => `text-sm font-medium transition ${isActive ? 'text-sky-600' : 'text-slate-600 hover:text-slate-900'}`}>
                Dashboard
              </NavLink>
              <button type="button" onClick={logout} className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200">
              Login
            </Link>
          )}
        </nav>

        <button type="button" className="rounded-full border border-slate-200 p-2 md:hidden" onClick={() => setOpen((current) => !current)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) => `rounded-2xl px-3 py-2 text-sm font-medium ${isActive ? 'bg-sky-50 text-sky-600' : 'text-slate-600'}`}
              >
                {link.label}
              </NavLink>
            ))}
            {isAuthenticated ? (
              <>
                <NavLink
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => `rounded-2xl px-3 py-2 text-sm font-medium ${isActive ? 'bg-sky-50 text-sky-600' : 'text-slate-600'}`}
                >
                  Dashboard
                </NavLink>
                <button type="button" onClick={() => { logout(); setOpen(false) }} className="rounded-2xl px-3 py-2 text-left text-sm font-medium text-slate-600 hover:bg-slate-100">
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setOpen(false)}
                className={({ isActive }) => `rounded-2xl px-3 py-2 text-sm font-medium ${isActive ? 'bg-sky-50 text-sky-600' : 'text-slate-600'}`}
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}
