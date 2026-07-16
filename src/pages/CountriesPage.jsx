import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import CountryCard from '../components/CountryCard'
import SearchBar from '../components/SearchBar'
import SectionTitle from '../components/SectionTitle'
import countries from '../data/countries.json'

const continents = ['All', ...new Set(countries.map((country) => country.continent))]

export default function CountriesPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const initialQuery = new URLSearchParams(location.search).get('query') ?? ''
  const [query, setQuery] = useState(initialQuery)
  const [continent, setContinent] = useState('All')

  useEffect(() => {
    setQuery(new URLSearchParams(location.search).get('query') ?? '')
  }, [location.search])

  const handleQueryChange = (value) => {
    setQuery(value)
    const params = new URLSearchParams(location.search)

    if (value.trim()) {
      params.set('query', value)
    } else {
      params.delete('query')
    }

    const search = params.toString() ? `?${params.toString()}` : ''
    navigate({ search }, { replace: true })
  }

  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      const matchesQuery = country.name.toLowerCase().includes(query.toLowerCase()) || country.capital.toLowerCase().includes(query.toLowerCase())
      const matchesContinent = continent === 'All' || country.continent === continent
      return matchesQuery && matchesContinent
    })
  }, [query, continent])

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="rounded-[36px] border border-slate-200 bg-white p-8 shadow-sm">
        <SectionTitle eyebrow="Country directory" title="Browse destinations worldwide" description="Search, filter, and discover the countries that belong on your shortlist." />
        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full lg:max-w-xl">
            <SearchBar value={query} onChange={handleQueryChange} placeholder="Search by country or capital" />
          </div>
          <div className="flex flex-wrap gap-3">
            {continents.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setContinent(item)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${continent === item ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {filteredCountries.map((country, index) => (
          <motion.div key={country.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
            <CountryCard country={country} />
          </motion.div>
        ))}
      </section>
    </div>
  )
}
