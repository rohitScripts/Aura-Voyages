import { motion } from 'framer-motion'
import Badge from './Badge'

export default function CountryHero({ country }) {
  return (
    <section className="relative overflow-hidden rounded-[40px] bg-slate-900 text-white shadow-[0_30px_90px_-30px_rgba(15,23,42,0.7)]">
      <img src={country.coverImage} alt={country.name} className="absolute inset-0 h-full w-full object-cover opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-slate-900/40" />
      <div className="relative grid gap-10 px-6 py-16 sm:px-10 lg:grid-cols-[1.2fr_0.8fr] lg:px-16 lg:py-24">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
          <Badge className="bg-white/10 text-white backdrop-blur">{country.continent}</Badge>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">{country.name}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-200">{country.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Badge className="bg-white/15 text-white backdrop-blur">Capital: {country.capital}</Badge>
            <Badge className="bg-white/15 text-white backdrop-blur">Population: {country.population}</Badge>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} className="rounded-[28px] border border-white/20 bg-white/10 p-6 backdrop-blur-xl">
          <div className="flex items-center gap-3 text-4xl font-semibold">
            <span>{country.flag}</span>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Country</p>
              <p>{country.name}</p>
            </div>
          </div>
          <dl className="mt-8 space-y-4 text-sm text-slate-200">
            <div className="flex justify-between"><dt>Language</dt><dd className="font-medium text-white">{country.language}</dd></div>
            <div className="flex justify-between"><dt>Currency</dt><dd className="font-medium text-white">{country.currency}</dd></div>
            <div className="flex justify-between"><dt>Best Time</dt><dd className="font-medium text-white">{country.bestTime}</dd></div>
            <div className="flex justify-between"><dt>Safety</dt><dd className="font-medium text-white">{country.safety}</dd></div>
          </dl>
        </motion.div>
      </div>
    </section>
  )
}
