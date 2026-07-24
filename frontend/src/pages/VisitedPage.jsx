import { useMemo } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import Button from '../components/Button'
import SectionTitle from '../components/SectionTitle'
import countries from '../data/countries.json'

export default function VisitedPage() {
  const { currentUser } = useAuth()

  const visitedCountries = useMemo(() => {
    return countries.filter((country) => currentUser?.visitedCountries?.includes(country.id))
  }, [currentUser])

  if (!currentUser) {
    return null
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle eyebrow="Visited" title="Countries you’ve been to" description="Review the destinations you’ve marked as visited during your travels." />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {visitedCountries.length ? (
          visitedCountries.map((country) => (
            <div key={country.id} className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
              <img src={country.coverImage} alt={country.name} className="h-44 w-full rounded-3xl object-cover" />
              <div className="mt-5 space-y-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-sky-600">{country.continent}</p>
                  <h3 className="text-xl font-semibold text-slate-900">{country.name}</h3>
                </div>
                <p className="text-sm leading-6 text-slate-600">{country.description}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-[32px] border border-slate-200 bg-white p-12 text-center shadow-sm">
            <p className="text-lg font-semibold text-slate-900">No visited countries yet</p>
            <p className="mt-3 text-sm text-slate-600">Mark destinations as visited from the country pages to see them here.</p>
            <Button to="/countries" className="mt-6">Browse countries</Button>
          </div>
        )}
      </div>
    </div>
  )
}
