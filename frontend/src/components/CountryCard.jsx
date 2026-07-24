import { ArrowRight, MapPin, Heart, Star, Bookmark } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import Button from './Button'

export default function CountryCard({ country }) {
  const navigate = useNavigate()
  const { currentUser, isAuthenticated, toggleFavorite, addToWishlist } = useAuth()
  const isFavorite = currentUser?.favoriteCountries?.includes(country.id)
  const isInWishlist = currentUser?.wishlist?.some((item) => item.id === country.id)

  const handleFavorite = () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    toggleFavorite(country)
  }

  const handleWishlist = () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    addToWishlist(country)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -8, scale: 1.01 }}
      className="group overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_70px_-24px_rgba(15,23,42,0.25)]"
    >
      <div className="relative h-56 overflow-hidden">
        <img src={country.coverImage} alt={country.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-900/10 to-transparent" />
        <div className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-slate-700 backdrop-blur">
          {country.flag} {country.continent}
        </div>
      </div>

      <div className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">{country.name}</h3>
            <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
              <MapPin className="h-4 w-4" /> {country.capital}
            </p>
          </div>
        </div>

        <p className="text-sm leading-6 text-slate-600">{country.description}</p>

        <div className="grid gap-3">
          <div className="grid gap-2 sm:grid-cols-2">
            <Button type="button" onClick={handleFavorite} variant={isFavorite ? 'secondary' : 'ghost'} className="w-full">
              <span className="inline-flex items-center gap-2">
                <Heart className={`h-4 w-4 ${isFavorite ? 'text-rose-500' : 'text-slate-500'}`} />
                {isFavorite ? 'Saved' : 'Favorite'}
              </span>
            </Button>
            <Button type="button" onClick={handleWishlist} variant={isInWishlist ? 'secondary' : 'ghost'} className="w-full">
              <span className="inline-flex items-center gap-2">
                <Bookmark className={`h-4 w-4 ${isInWishlist ? 'text-sky-600' : 'text-slate-500'}`} />
                {isInWishlist ? 'In wishlist' : 'Wishlist'}
              </span>
            </Button>
          </div>
          <Button to={`/country/${country.id}`} className="w-full">
            Explore
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.article>
  )
}
