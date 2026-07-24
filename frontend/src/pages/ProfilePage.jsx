import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import Button from '../components/Button'
import SectionTitle from '../components/SectionTitle'
import FormField from '../components/FormField'

export default function ProfilePage() {
  const { currentUser, updateProfile } = useAuth()
  const [name, setName] = useState(currentUser?.name || '')
  const [email] = useState(currentUser?.email || '')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  if (!currentUser) {
    return null
  }

  const favoritesCount = currentUser.favoriteCountries?.length ?? 0
  const wishlistCount = currentUser.wishlist?.length ?? 0
  const visitedCount = currentUser.visitedCountries?.length ?? 0

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (!name.trim()) {
      setError('Enter a display name.')
      return
    }

    setLoading(true)
    try {
      await updateProfile({ name: name.trim() })
      setSuccess('Profile updated successfully.')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle eyebrow="Your profile" title="Account details" description="Update your profile and review travel activity at a glance." />

      <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_0.7fr]">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Profile information</h2>
          <p className="mt-3 text-sm text-slate-600">These fields help personalize your dashboard.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <FormField label="Name" id="profile-name" value={name} onChange={setName} placeholder="Your display name" />
            <FormField label="Email" id="profile-email" value={email} onChange={() => {}} disabled />
            {error ? <p className="text-sm text-rose-600">{error}</p> : null}
            {success ? <p className="text-sm text-sky-600">{success}</p> : null}
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save profile'}
            </Button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Your travel metrics</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { label: 'Visited countries', value: visitedCount },
                { label: 'Favorites saved', value: favoritesCount },
                { label: 'Wishlist items', value: wishlistCount },
                { label: 'Recent activity', value: currentUser.activity?.slice(0, 1).length ?? 0 },
              ].map((item) => (
                <div key={item.label} className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Profile summary</h3>
            <div className="mt-6 space-y-4 text-sm text-slate-600">
              <p><span className="font-semibold text-slate-900">Name:</span> {currentUser.name}</p>
              <p><span className="font-semibold text-slate-900">Email:</span> {currentUser.email}</p>
              <p><span className="font-semibold text-slate-900">Member since:</span> {new Date(currentUser.activity?.[currentUser.activity.length - 1]?.timestamp || Date.now()).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
