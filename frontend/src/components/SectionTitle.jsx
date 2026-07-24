export default function SectionTitle({ eyebrow, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : 'text-left'

  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow ? <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">{eyebrow}</p> : null}
      <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-lg text-slate-600">{description}</p> : null}
    </div>
  )
}
