import { Compass, Globe2, MapPin, Send } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-sky-600 p-2 text-white">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-semibold text-white">Aura Voyages</p>
              <p className="text-sm text-slate-400">Travel inspiration, reimagined.</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
            Discover countries, attractions, and thoughtful travel ideas in one elegant experience built for modern explorers.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-100">Explore</h3>
          <ul className="mt-5 space-y-3 text-sm text-slate-400">
            <li>Countries</li>
            <li>Popular Cities</li>
            <li>Seasonal Guides</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-100">Stay Connected</h3>
          <div className="mt-5 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-full border border-slate-800 px-3 py-2 text-sm text-slate-300">
              <MapPin className="h-4 w-4" />
              Global destinations
            </div>
            <div className="flex items-center gap-2 rounded-full border border-slate-800 px-3 py-2 text-sm text-slate-300">
              <Globe2 className="h-4 w-4" />
              @worldexplorer
            </div>
            <div className="flex items-center gap-2 rounded-full border border-slate-800 px-3 py-2 text-sm text-slate-300">
              <Send className="h-4 w-4" />
              Weekly travel notes
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
