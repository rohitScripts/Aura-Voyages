import { ArrowRight, Heart, ListChecks, MapPin } from 'lucide-react'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import SectionTitle from '../components/SectionTitle'

export default function DashboardPage() {
  const { currentUser } = useAuth()

  const favoritesCount = currentUser?.favoriteCountries?.length ?? 0
  const wishlistCount = currentUser?.wishlist?.length ?? 0
  const visitedCount = currentUser?.visitedCountries?.length ?? 0

  const activity = useMemo(() => {
    return currentUser?.activity?.slice(0, 4) ?? []
  }, [currentUser])

  if (!currentUser) {
    return null
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle eyebrow="Dashboard" title="Welcome back" description="Your travel profile, favorites, and wishlist in one place." />

      <div className="mt-10 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { label: 'Visited', value: visitedCount, icon: MapPin, color: 'bg-sky-600', to: '/visited' },
              { label: 'Favorites', value: favoritesCount, icon: Heart, color: 'bg-rose-500', to: '/favorites' },
              { label: 'Wishlist', value: wishlistCount, icon: ListChecks, color: 'bg-emerald-500', to: '/wishlist' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className="rounded-[32px] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className={`${item.color} inline-flex h-12 w-12 items-center justify-center rounded-3xl text-white`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{item.label}</p>
                      <p className="mt-2 text-3xl font-semibold text-slate-900">{item.value}</p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Recent activity</h2>
                <p className="mt-2 text-sm text-slate-600">A quick summary of what you’ve saved or updated recently.</p>
              </div>
              <Link to="/profile" className="text-sm font-semibold text-sky-600 hover:text-sky-700">View profile</Link>
            </div>

            <div className="mt-6 space-y-4">
              {activity.length ? (
                activity.map((item) => (
                  <div key={item.id} className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-800">{item.text}</p>
                    <p className="mt-1 text-xs text-slate-500">{new Date(item.timestamp).toLocaleString()}</p>
                  </div>
                ))
              ) : (
                <div className="rounded-3xl bg-slate-50 p-6 text-sm text-slate-600">No recent activity yet. Start by adding favorites or wishlist items.</div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-sky-600 to-slate-900 p-8 text-white shadow-sm">
            <div className="flex items-center gap-3 text-slate-100">
              <div className="rounded-3xl bg-white/10 p-3">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-200">Quick plan</p>
                <p className="mt-2 text-2xl font-semibold">Your next step</p>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-slate-100">
              <p>Pick a new country to add to your favorites or wishlist and start building a travel story.</p>
              <Link to="/countries" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-100">
                Discover countries <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Profile preview</h3>
            <div className="mt-6 space-y-3 text-sm text-slate-600">
              <p><span className="font-semibold text-slate-900">Name:</span> {currentUser.name}</p>
              <p><span className="font-semibold text-slate-900">Email:</span> {currentUser.email}</p>
              <p><span className="font-semibold text-slate-900">Wishlist ready:</span> {wishlistCount} items</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
