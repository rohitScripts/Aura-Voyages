import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import FormField from '../components/FormField'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setMessage('')

    if (!email.trim()) {
      setError('Enter your email address.')
      return
    }

    setLoading(true)
    try {
      const response = await forgotPassword(email)
      setMessage(response.message)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Forgot password</h1>
        <p className="mt-3 text-sm text-slate-600">Enter your email and we’ll send you reset instructions.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <FormField label="Email" id="forgot-email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          {message ? <p className="text-sm text-slate-600">{message}</p> : null}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Sending...' : 'Send reset link'}
          </Button>
        </form>

        <div className="mt-8 border-t border-slate-200 pt-6 text-sm text-slate-600">
          Remembered your password? <Link to="/login" className="font-semibold text-slate-900 hover:text-sky-600">Sign in</Link>
        </div>
      </div>
    </div>
  )
}
