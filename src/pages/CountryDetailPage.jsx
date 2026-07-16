import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Landmark, MapPin, Plane, Sparkles } from 'lucide-react'
import CountryHero from '../components/CountryHero'
import SectionTitle from '../components/SectionTitle'
import TouristPlaceCard from '../components/TouristPlaceCard'
import Gallery from '../components/Gallery'
import countries from '../data/countries.json'

export default function CountryDetailPage() {
  const { id } = useParams()
  const country = useMemo(() => countries.find((item) => item.id === id), [id])

  if (!country) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-slate-900">Country not found</h1>
        <p className="mt-3 max-w-md text-slate-600">The destination you are looking for is not available yet.</p>
        <Link to="/countries" className="mt-6 inline-flex rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white">Back to countries</Link>
      </div>
    )
  }

  return (
    <div className="pb-20">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Link to="/countries" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
          <ArrowLeft className="h-4 w-4" />
          Back to all countries
        </Link>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <CountryHero country={country} />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="About the country" title="Why this destination stands out" description={country.description} />
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">What makes it special</h3>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
              {country.positivePoints.map((point) => (
                <li key={point} className="flex gap-3"><Sparkles className="mt-1 h-4 w-4 text-sky-600" /> {point}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-sky-50 to-white p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Fast facts</h3>
            <dl className="mt-6 space-y-4 text-sm text-slate-600">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3"><dt className="flex items-center gap-2"><Landmark className="h-4 w-4 text-sky-600" /> Capital</dt><dd className="font-medium text-slate-900">{country.capital}</dd></div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-3"><dt className="flex items-center gap-2"><MapPin className="h-4 w-4 text-sky-600" /> Climate</dt><dd className="font-medium text-slate-900">{country.climate}</dd></div>
              <div className="flex items-center justify-between"><dt className="flex items-center gap-2"><Plane className="h-4 w-4 text-sky-600" /> Best time</dt><dd className="font-medium text-slate-900">{country.bestTime}</dd></div>
            </dl>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Popular attractions" title="Places to explore" description="The landmarks and experiences that make this country unforgettable." />
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {country.touristPlaces.map((place) => (
            <TouristPlaceCard key={place.name} place={place} />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Local flavor" title="Foods and cities" description="Taste and explore the highlights that define everyday travel here." />
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Famous foods</h3>
            <div className="mt-5 flex flex-wrap gap-3">
              {country.foods.map((food) => (
                <span key={food} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">{food}</span>
              ))}
            </div>
          </div>
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Famous cities</h3>
            <div className="mt-5 flex flex-wrap gap-3">
              {country.cities.map((city) => (
                <span key={city} className="rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700">{city}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Gallery" title="Moments worth saving" description="A glimpse into the landscapes, landmarks, and atmosphere of this destination." />
        <div className="mt-8">
          <Gallery images={country.gallery} />
        </div>
      </div>
    </div>
  )
}
