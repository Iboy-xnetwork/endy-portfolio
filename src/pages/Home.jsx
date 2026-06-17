import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import { profile, projects } from '../data'

const navCards = [
  { label: 'Skills',          href: '/skills',          icon: 'fa-solid fa-code',          desc: 'Languages & tools'  },
  { label: 'Projects',        href: '/projects',         icon: 'fa-solid fa-folder-open',   desc: 'What I\'ve built'  },
  { label: 'Experience',      href: '/experience',       icon: 'fa-solid fa-briefcase',     desc: 'Work history'      },
  { label: 'Certifications',  href: '/certifications',   icon: 'fa-solid fa-certificate',   desc: 'Credentials'       },
  { label: 'Contact',         href: '/contact',          icon: 'fa-solid fa-envelope',      desc: 'Get in touch'      },
  { label: 'GitHub',          href: profile.github,      icon: 'fa-brands fa-github',       desc: 'My repos', external: true },
]

const recentProjects = projects.filter(p => !p.wip).slice(0, 3)

export default function Home() {
  return (
    <PageWrapper>

      {/* ── Hero ── */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.05 }}
          className="flex-shrink-0"
        >
          <img
            src={profile.photo}
            alt={profile.shortName}
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-accent/40 ring-4 ring-accent/10"
            onError={e => { e.target.style.display = 'none' }}
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <p className="text-xs font-mono text-accent mb-1.5 tracking-widest uppercase">Hi, I'm</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-100 leading-tight mb-1">{profile.shortName}</h1>
          <p className="text-sm text-gray-400 font-medium mb-3">{profile.role} · {profile.subtitle}</p>
          <p className="text-sm text-gray-500 leading-relaxed max-w-md">{profile.bio}</p>

          {/* Location + availability */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <i className="fa-solid fa-location-dot text-accent text-[10px]" />
              Pretoria, Gauteng, SA
            </span>
            <span className="flex items-center gap-1.5 text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
              Open to opportunities
            </span>
          </div>
        </motion.div>
      </div>

      {/* ── Quick nav ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-10">
        {navCards.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.05 }}
          >
            {item.external ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer"
                className="card flex items-center gap-3 hover:border-accent/40 group">
                <i className={`${item.icon} text-accent text-base w-4 text-center flex-shrink-0`} />
                <div className="min-w-0">
                  <div className="text-sm font-medium text-gray-200 group-hover:text-accent transition truncate">{item.label}</div>
                  <div className="text-xs text-gray-600 truncate">{item.desc}</div>
                </div>
              </a>
            ) : (
              <Link to={item.href} className="card flex items-center gap-3 hover:border-accent/40 group">
                <i className={`${item.icon} text-accent text-base w-4 text-center flex-shrink-0`} />
                <div className="min-w-0">
                  <div className="text-sm font-medium text-gray-200 group-hover:text-accent transition truncate">{item.label}</div>
                  <div className="text-xs text-gray-600 truncate">{item.desc}</div>
                </div>
              </Link>
            )}
          </motion.div>
        ))}
      </div>

      {/* ── Recent projects ── */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-mono text-gray-600 uppercase tracking-widest">Recent projects</h2>
          <Link to="/projects" className="text-xs text-accent hover:underline flex items-center gap-1">
            View all <i className="fa-solid fa-arrow-right text-[10px]" />
          </Link>
        </div>
        <div className="space-y-2">
          {recentProjects.map((proj, i) => (
            <Link
              key={proj.id}
              to="/projects"
              className="card flex items-center gap-3 hover:border-accent/40 group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#0f1117] border border-[#21262d] overflow-hidden flex-shrink-0">
                {proj.image
                  ? <img src={proj.image} alt={proj.name} className="w-full h-full object-cover" />
                  : <div className="w-full h-full flex items-center justify-center text-lg">{proj.emoji}</div>
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-200 group-hover:text-accent transition truncate">{proj.name}</p>
                <p className="text-xs text-gray-600 truncate">{proj.stack.slice(0,3).join(' · ')}</p>
              </div>
              <span className="text-xs text-gray-700 flex-shrink-0 px-2 py-0.5 rounded border border-[#21262d]">
                {proj.categoryLabel}
              </span>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* ── What I'm up to ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="card"
      >
        <h3 className="text-xs font-mono text-gray-600 uppercase tracking-widest mb-4">What I'm up to</h3>
        <ul className="space-y-3 text-sm text-gray-400">
          <li className="flex gap-2.5">
            <span className="text-accent mt-0.5 flex-shrink-0">→</span>
            Deepening my Android dev skills with <span className="text-gray-200 font-medium ml-1">Kotlin, XML layouts & Android Studio</span>
          </li>
          <li className="flex gap-2.5">
            <span className="text-accent mt-0.5 flex-shrink-0">→</span>
            Building games with <span className="text-gray-200 font-medium ml-1">Godot, GDevelop & Unreal Engine</span>
          </li>
          <li className="flex gap-2.5">
            <span className="text-accent mt-0.5 flex-shrink-0">→</span>
            Growing my freelance brand through <span className="text-gray-200 font-medium ml-1">XNETWORK</span>
          </li>
          <li className="flex gap-2.5">
            <span className="text-accent mt-0.5 flex-shrink-0">→</span>
            Always open to <span className="text-gray-200 font-medium ml-1">collaborations, contracts & new opportunities</span>
          </li>
        </ul>
      </motion.div>

    </PageWrapper>
  )
}