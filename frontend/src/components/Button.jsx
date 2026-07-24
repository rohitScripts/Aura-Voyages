import { Link } from 'react-router-dom'

export default function Button({ children, to, href, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50'
  const variants = {
    primary: 'bg-sky-600 text-white shadow-lg shadow-sky-600/20 hover:bg-sky-700',
    secondary: 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100',
  }

  if (to) {
    return (
      <Link to={to} className={`${base} ${variants[variant]} ${className}`} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={`${base} ${variants[variant]} ${className}`} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
