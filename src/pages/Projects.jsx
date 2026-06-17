import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import { projects } from '../data'

const categories = [
  { key: 'all', label: 'All' },
  { key: 'web', label: 'Web' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'game', label: 'Games' },
  { key: 'tool', label: 'Tools' },
]

function ProjectModal({ proj, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div
        className="relative w-full sm:max-w-lg bg-[#161b22] border border-[#21262d] rounded-t-2xl sm:rounded-2xl overflow-hidden"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Image header */}
        <div className="relative h-48 bg-[#0f1117] overflow-hidden">
          {proj.image ? (
            <img src={proj.image} alt={proj.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl">{proj.emoji}</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#161b22] to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-gray-300 hover:text-white flex items-center justify-center transition"
          >
            <i className="fa-solid fa-xmark text-sm" />
          </button>
          <div className="absolute bottom-3 left-4">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
              proj.wip
                ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                : 'bg-accent/10 text-accent border-accent/30'
            }`}>
              {proj.categoryLabel}
            </span>
          </div>
        </div>

        <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
          <div>
            <h2 className="text-lg font-bold text-gray-100 mb-1">{proj.name}</h2>
            <p className="text-sm text-gray-400 leading-relaxed">{proj.desc}</p>
          </div>

          {/* Tech stack */}
          <div>
            <p className="text-xs font-mono text-gray-600 uppercase tracking-widest mb-2">Tech stack</p>
            <div className="flex flex-wrap gap-2">
              {proj.stack.map(s => (
                <span key={s} className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-[#21262d] text-gray-300 border border-[#2d333b] font-medium">
                  <i className={`${stackIcon(s)} text-accent text-[10px]`} />
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* What I built / learned */}
          {proj.highlights && (
            <div>
              <p className="text-xs font-mono text-gray-600 uppercase tracking-widest mb-2">Key features</p>
              <ul className="space-y-1.5">
                {proj.highlights.map((h, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-400">
                    <span className="text-accent mt-0.5 flex-shrink-0">→</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            {proj.link && (
              <a
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-accent/15 border border-accent/40 text-accent text-xs font-semibold hover:bg-accent/25 transition"
              >
                <i className="fa-solid fa-arrow-up-right-from-square text-[10px]" />
                {proj.linkLabel}
              </a>
            )}
            {proj.repo && (
              <a
                href={proj.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[#21262d] text-gray-400 text-xs font-semibold hover:border-gray-500 hover:text-gray-200 transition"
              >
                <i className="fa-brands fa-github text-xs" />
                View Repo
              </a>
            )}
            {proj.wip && (
              <span className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-yellow-500/20 text-yellow-500/60 text-xs font-semibold">
                ⏳ In progress
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Map tech names to FA icons
function stackIcon(name) {
  const map = {
    'React': 'fa-brands fa-react',
    'Vite': 'fa-solid fa-bolt',
    'JavaScript': 'fa-brands fa-js',
    'HTML': 'fa-brands fa-html5',
    'CSS': 'fa-brands fa-css3-alt',
    'PHP': 'fa-brands fa-php',
    'C#': 'fa-solid fa-hashtag',
    'Java': 'fa-brands fa-java',
    'Kotlin': 'fa-solid fa-k',
    'Android': 'fa-brands fa-android',
    'Firebase': 'fa-solid fa-fire',
    'Mapbox SDK': 'fa-solid fa-map-pin',
    'GPS': 'fa-solid fa-location-dot',
    'WPF': 'fa-solid fa-window-maximize',
    'GDevelop': 'fa-solid fa-gamepad',
    'Godot': 'fa-solid fa-ghost',
    'GDScript': 'fa-solid fa-scroll',
    'Unreal Engine': 'fa-solid fa-rocket',
    'Blueprints': 'fa-solid fa-diagram-project',
    'Tailwind CSS': 'fa-solid fa-wind',
    'TypeScript': 'fa-solid fa-t',
  }
  return map[name] || 'fa-solid fa-circle-dot'
}

export default function Projects() {
  const [active, setActive] = useState('all')
  const [selected, setSelected] = useState(null)

  const filtered = active === 'all' ? projects : projects.filter(p => p.category === active)

  return (
    <PageWrapper>
      <h1 className="page-title">Projects</h1>
      <p className="page-subtitle">Web, mobile, games and tools. Tap a card for full details.</p>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActive(cat.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              active === cat.key
                ? 'bg-accent/20 text-accent border border-accent/40'
                : 'text-gray-500 border border-tertiary hover:border-gray-600 hover:text-gray-300'
            }`}
          >
            {cat.label}
            <span className="ml-1.5 text-gray-600">
              {cat.key === 'all' ? projects.length : projects.filter(p => p.category === cat.key).length}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((proj, i) => (
            <motion.div
              key={proj.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2, delay: i * 0.04 }}
              className="card flex flex-col overflow-hidden p-0 group cursor-pointer"
              onClick={() => setSelected(proj)}
            >
              {/* Image */}
              <div className="relative h-44 bg-secondary overflow-hidden">
                {proj.image ? (
                  <img
                    src={proj.image}
                    alt={proj.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={e => {
                      e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-4xl bg-[#0f1117]">${proj.emoji}</div>`
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl bg-[#0f1117]">{proj.emoji}</div>
                )}
                {/* gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#161b22]/80 to-transparent" />
                <div className="absolute top-2 left-2">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                    proj.wip
                      ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                      : 'bg-accent/10 text-accent border-accent/30'
                  }`}>
                    {proj.categoryLabel}
                  </span>
                </div>
                {/* tap hint */}
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition">
                  <span className="text-[10px] text-gray-400 bg-black/50 px-2 py-0.5 rounded-full">
                    Tap for details
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-sm font-semibold text-gray-100 mb-1">{proj.name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-3 flex-1 line-clamp-2">{proj.desc}</p>

                {/* Stack pills */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {proj.stack.slice(0, 4).map(s => (
                    <span key={s} className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-tertiary text-gray-500 border border-tertiary/50">
                      <i className={`${stackIcon(s)} text-accent/60 text-[8px]`} />
                      {s}
                    </span>
                  ))}
                  {proj.stack.length > 4 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-tertiary text-gray-600 border border-tertiary/50">
                      +{proj.stack.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  {proj.link ? (
                    <span className="flex items-center gap-1.5 text-xs font-medium text-accent">
                      <i className="fa-solid fa-arrow-up-right-from-square text-[10px]" />
                      {proj.linkLabel}
                    </span>
                  ) : (
                    <span className="text-xs text-gray-600">
                      {proj.wip ? '⏳ Coming soon' : 'Private'}
                    </span>
                  )}
                  <span className="text-[10px] text-gray-700 flex items-center gap-1">
                    <i className="fa-solid fa-up-right-and-down-left-from-center text-[8px]" />
                    Details
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal proj={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </PageWrapper>
  )
}