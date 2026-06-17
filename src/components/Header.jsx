import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Skills', href: '/skills' },
  { name: 'Experience', href: '/experience' },
  { name: 'Projects', href: '/projects' },
  { name: 'Certifications', href: '/certifications' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const crumbs = pathname === '/' ? [] : pathname.split('/').filter(Boolean)

  return (
    <nav className="relative flex items-center justify-between px-6 py-4 border-b border-tertiary">
      {/* Breadcrumb */}
      <ol className="flex items-center space-x-1 text-sm font-mono">
        <li>
          <Link to="/" className="text-gray-300 hover:opacity-70 transition">~</Link>
        </li>
        {crumbs.map((crumb, i) => (
          <li key={crumb} className="flex items-center space-x-1">
            <span className="text-gray-600">/</span>
            <span className="gradient-text font-semibold capitalize">{crumb}</span>
          </li>
        ))}
      </ol>

      {/* Desktop nav */}
      <ul className="hidden md:flex list-none space-x-1">
        {navItems.map(item => (
          <li key={item.href}>
            <Link
              to={item.href}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                (item.href === '/' ? pathname === '/' : pathname.startsWith(item.href))
                  ? 'bg-gray-700/40 text-accent font-medium'
                  : 'text-gray-400 hover:bg-gray-700/30 hover:text-gray-200'
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile hamburger */}
      <button
        className="md:hidden text-gray-400 hover:text-gray-200 transition p-1"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`} />
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            className="absolute top-full left-0 z-50 w-full bg-primary border-b border-tertiary list-none flex flex-col py-4 px-6 space-y-1 md:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {navItems.map(item => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm transition-all ${
                    (item.href === '/' ? pathname === '/' : pathname.startsWith(item.href))
                      ? 'text-accent font-medium bg-gray-700/40'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/20'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  )
}
