import { motion } from 'framer-motion'
import { ArrowRight, Compass, Globe2, ShieldCheck, Sparkles, Trees } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import CountryCard from '../components/CountryCard'
import SearchBar from '../components/SearchBar'
import SectionTitle from '../components/SectionTitle'
import countries from '../data/countries.json'

const continents = ['Europe', 'Asia', 'North America', 'Australia']

export default function HomePage() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const featured = useMemo(() => countries.slice(0, 4), [])

  const handleSearch = () => {
    const trimmed = query.trim()
    navigate(`/countries${trimmed ? `?query=${encodeURIComponent(trimmed)}` : ''}`)
  }

  return (
    <div className="bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.08),_transparent_45%)]">
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col justify-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-2 text-sm font-medium text-sky-700">
            <Sparkles className="h-4 w-4" />
            Curated journeys for modern explorers
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Explore the world through beautifully crafted country stories.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Discover iconic destinations, local culture, and unforgettable attractions with World Explorer.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/countries">Start exploring <ArrowRight className="ml-2 h-4 w-4" /></Button>
            <Button to="/about" variant="secondary">Learn more</Button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} className="overflow-hidden rounded-[36px] border border-slate-200 bg-white p-3 shadow-[0_30px_90px_-35px_rgba(15,23,42,0.35)]">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCG1SSufeZn1-SsZd84DtIxsR6g7RkvMLxH2PIQzrSSAUWI5kf0-qjJ2Oy&s=10"
            alt="Mountain and ocean view"
            className="h-[480px] w-full rounded-[28px] object-cover"
          />
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Search</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Find your next destination</h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="w-full sm:min-w-[260px]">
                <SearchBar value={query} onChange={setQuery} placeholder="Search for a country" />
              </div>
              <Button onClick={handleSearch}>Search</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Popular picks" title="Countries travelers love" description="A handpicked collection of must-visit places around the globe." />
        <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {featured.map((country) => (
            <CountryCard key={country.id} country={country} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 rounded-[36px] border border-slate-200 bg-white p-8 shadow-sm lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
          <div>
            <SectionTitle eyebrow="Featured destinations" title="Travel inspiration by continent" description="Explore how each region offers a distinct rhythm of landscapes, culture, and adventure." />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {continents.map((continent) => (
              <div key={continent} className="rounded-[24px] border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-center gap-3 text-sky-600">
                  <Globe2 className="h-5 w-5" />
                  <h3 className="text-lg font-semibold text-slate-900">{continent}</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">A curated collection of unforgettable countries, viewpoints, and cultural staples.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Why travel with us" title="Thoughtful planning for remarkable travel" description="We blend elegant design with practical inspiration so the journey feels effortless from the first click." />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { icon: Compass, title: 'Curated discovery', text: 'Browse rich country guides and top attractions without clutter.' },
            { icon: ShieldCheck, title: 'Reliable insights', text: 'Get practical details like safety, climate, and best travel timing.' },
            { icon: Trees, title: 'Nature and culture', text: 'Explore scenic landscapes, historic cities, and local culinary highlights.' },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-[36px] bg-slate-900 px-8 py-12 text-white shadow-[0_30px_90px_-35px_rgba(15,23,42,0.75)] sm:px-10 lg:flex lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">Ready to begin?</p>
            <h2 className="mt-3 text-3xl font-semibold">Plan your next trip with World Explorer.</h2>
            <p className="mt-4 max-w-2xl text-slate-300">Browse the full country catalog and start designing your next escape.</p>
          </div>
          <div className="mt-6 lg:mt-0">
            <Button to="/countries" className="bg-white text-slate-900 hover:bg-slate-100"style={{ backgroundColor: 'black' }}>Explore countries</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
