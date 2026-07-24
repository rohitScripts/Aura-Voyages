import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import Button from '../components/Button'
import FormField from '../components/FormField'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.')
      return
    }

    setLoading(true)
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Welcome back</h1>
        <p className="mt-3 text-sm text-slate-600">Log in to manage your travels, favorites, and wishlist.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <FormField label="Email" id="login-email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
          <FormField
            label="Password"
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={setPassword}
            placeholder="Enter your password"
            children={
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 pr-12 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            }
          />
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Button type="submit" className="w-full sm:w-auto" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
            <Link to="/forgot-password" className="text-sm font-medium text-sky-600 hover:text-sky-700">
              Forgot password?
            </Link>
          </div>
        </form>

        <div className="mt-8 border-t border-slate-200 pt-6 text-sm text-slate-600">
          New here? <Link to="/signup" className="font-semibold text-slate-900 hover:text-sky-600">Create an account</Link>
        </div>
      </div>
    </div>
  )
}
