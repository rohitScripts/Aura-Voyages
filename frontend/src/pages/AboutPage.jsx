import { ArrowRight, Compass, Landmark, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-[40px] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white shadow-[0_30px_90px_-35px_rgba(15,23,42,0.65)]">
        <div className="grid gap-8 px-8 py-16 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-16 lg:py-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">About Aura Voyages</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">A calm, modern way to discover the world.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Aura Voyages is a Phase 1 travel experience focused on helping curious travelers browse countries, understand what makes them special, and discover standout attractions.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/countries" className="bg-white text-slate-900 hover:bg-slate-100 "style={{ backgroundColor: 'black' }}>Browse countries</Button>
              <Button to="/" variant="secondary" className="border border-white/20 bg-white/10 text-white hover:bg-white/20">Back home</Button>
            </div>
          </div>
          <div className="rounded-[32px] border border-white/10 bg-white/10 p-8 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-sky-600 p-2 text-white"><Compass className="h-5 w-5" /></div>
              <div>
                <p className="text-lg font-semibold">What’s next</p>
                <p className="text-sm text-slate-300">Built for future travel experiences</p>
              </div>
            </div>
            <ul className="mt-8 space-y-4 text-sm leading-7 text-slate-300">
              <li className="flex gap-3"><Sparkles className="mt-1 h-4 w-4 text-sky-300" /> AI trip planning and personalized itineraries</li>
              <li className="flex gap-3"><Landmark className="mt-1 h-4 w-4 text-sky-300" /> Hotel and flight discovery experiences</li>
              <li className="flex gap-3"><ArrowRight className="mt-1 h-4 w-4 text-sky-300" /> Favorites, reviews, and account-based planning</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-8 md:grid-cols-2">
        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Why this exists</h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            This first phase focuses on meaningful country discovery with rich content, visual storytelling, and a seamless browsing experience. The goal is to create a polished foundation for a larger platform.
          </p>
        </div>
        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Roadmap ahead</h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Future iterations will add authentication, live destination data, booking flows, itineraries, and personalized recommendations while keeping the experience elegant and fast.
          </p>
        </div>
      </section>
    </div>
  )
}
