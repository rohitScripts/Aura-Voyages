import { motion } from 'framer-motion'

export default function TouristPlaceCard({ place }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_50px_-24px_rgba(15,23,42,0.3)]"
    >
      <img src={place.image} alt={place.name} className="h-56 w-full object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-slate-900">{place.name}</h3>
        <p className="mt-2 text-sm font-medium text-sky-600">{place.location}</p>
        <p className="mt-3 text-sm leading-6 text-slate-600">{place.description}</p>
      </div>
    </motion.article>
  )
}
