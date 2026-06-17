import { useState } from 'react'
import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'

const skillGroups = [
  {
    category: 'Core Languages',
    icon: 'fa-solid fa-code',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
    items: [
      { name: 'Java', icon: 'fa-brands fa-java', level: 85 },
      { name: 'Kotlin', icon: 'fa-solid fa-k', level: 80 },
      { name: 'C#', icon: 'fa-solid fa-hashtag', level: 75 },
      { name: 'JavaScript', icon: 'fa-brands fa-js', level: 80 },
      { name: 'Python', icon: 'fa-brands fa-python', level: 50 },
      { name: 'SQL', icon: 'fa-solid fa-database', level: 70 },
    ],
  },
  {
    category: 'Web Development',
    icon: 'fa-solid fa-globe',
    color: 'text-green-400',
    bg: 'bg-green-500/10 border-green-500/20',
    items: [
      { name: 'React', icon: 'fa-brands fa-react', level: 75 },
      { name: 'HTML & CSS', icon: 'fa-brands fa-html5', level: 90 },
      { name: 'PHP', icon: 'fa-brands fa-php', level: 65 },
      { name: 'ASP.NET', icon: 'fa-solid fa-window-maximize', level: 60 },
      { name: 'REST APIs', icon: 'fa-solid fa-plug', level: 75 },
      { name: 'WordPress', icon: 'fa-brands fa-wordpress', level: 60 },
    ],
  },
  {
    category: 'Mobile (Android)',
    icon: 'fa-brands fa-android',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    items: [
      { name: 'Android Studio', icon: 'fa-brands fa-android', level: 80 },
      { name: 'Kotlin', icon: 'fa-solid fa-mobile', level: 80 },
      { name: 'Java Android', icon: 'fa-brands fa-java', level: 85 },
      { name: 'Mapbox SDK', icon: 'fa-solid fa-map-pin', level: 65 },
      { name: 'Firebase', icon: 'fa-solid fa-fire', level: 65 },
      { name: 'XML Layouts', icon: 'fa-solid fa-layer-group', level: 75 },
    ],
  },
  {
    category: 'Game Development',
    icon: 'fa-solid fa-gamepad',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/20',
    items: [
      { name: 'Godot', icon: 'fa-solid fa-ghost', level: 55 },
      { name: 'GDevelop', icon: 'fa-solid fa-gamepad', level: 60 },
      { name: 'Unreal Engine', icon: 'fa-solid fa-rocket', level: 40 },
      { name: 'Unity', icon: 'fa-solid fa-cube', level: 45 },
    ],
  },
  {
    category: 'Databases',
    icon: 'fa-solid fa-database',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10 border-orange-500/20',
    items: [
      { name: 'MySQL / Oracle', icon: 'fa-solid fa-table', level: 70 },
      { name: 'Firebase Realtime', icon: 'fa-solid fa-fire', level: 65 },
      { name: 'phpMyAdmin', icon: 'fa-solid fa-server', level: 70 },
      { name: 'Azure DB', icon: 'fa-brands fa-microsoft', level: 55 },
    ],
  },
  {
    category: 'Tools & Platforms',
    icon: 'fa-solid fa-screwdriver-wrench',
    color: 'text-gray-400',
    bg: 'bg-gray-500/10 border-gray-500/20',
    items: [
      { name: 'GitHub', icon: 'fa-brands fa-github', level: 80 },
      { name: 'Azure DevOps', icon: 'fa-brands fa-microsoft', level: 60 },
      { name: 'Postman', icon: 'fa-solid fa-paper-plane', level: 75 },
      { name: 'Figma', icon: 'fa-brands fa-figma', level: 60 },
      { name: 'VS Code', icon: 'fa-solid fa-code', level: 90 },
      { name: 'cPanel', icon: 'fa-solid fa-server', level: 65 },
    ],
  },
]

const levelLabel = (n) => {
  if (n >= 85) return 'Expert'
  if (n >= 70) return 'Proficient'
  if (n >= 55) return 'Intermediate'
  return 'Learning'
}

const levelColor = (n) => {
  if (n >= 85) return 'text-green-400'
  if (n >= 70) return 'text-blue-400'
  if (n >= 55) return 'text-yellow-400'
  return 'text-gray-500'
}

const levelBarColor = (n) => {
  if (n >= 85) return 'bg-green-500'
  if (n >= 70) return 'bg-blue-500'
  if (n >= 55) return 'bg-yellow-500'
  return 'bg-gray-600'
}

export default function Skills() {
  const [activeGroup, setActiveGroup] = useState(null)

  return (
    <PageWrapper>
      <h1 className="page-title">Technical Skills</h1>
      <p className="page-subtitle">Languages, frameworks, tools and platforms I work with. Click a category to expand.</p>

      <div className="space-y-3">
        {skillGroups.map((group, gi) => {
          const isOpen = activeGroup === group.category
          return (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: gi * 0.06 }}
              className="rounded-xl border border-[#21262d] bg-[#161b22] overflow-hidden"
            >
              {/* Header — always visible */}
              <button
                className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-white/5 transition-colors text-left"
                onClick={() => setActiveGroup(isOpen ? null : group.category)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg border ${group.bg} flex items-center justify-center flex-shrink-0`}>
                    <i className={`${group.icon} ${group.color} text-sm`} />
                  </div>
                  <span className="text-sm font-medium text-gray-200">{group.category}</span>
                  <span className="text-xs text-gray-600">{group.items.length} skills</span>
                </div>
                <div className="flex items-center gap-3">
                  {/* Mini pill previews */}
                  <div className="hidden sm:flex gap-1">
                    {group.items.slice(0, 3).map(item => (
                      <span key={item.name} className="text-[10px] px-1.5 py-0.5 rounded bg-[#21262d] text-gray-500 border border-[#2d333b]">
                        {item.name}
                      </span>
                    ))}
                    {group.items.length > 3 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#21262d] text-gray-600 border border-[#2d333b]">
                        +{group.items.length - 3}
                      </span>
                    )}
                  </div>
                  <i className={`fa-solid fa-chevron-down text-gray-600 text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {/* Expanded skill bars */}
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="px-4 pb-4 border-t border-[#21262d]"
                >
                  <div className="pt-4 space-y-3">
                    {group.items.map((item, ii) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: ii * 0.04 }}
                        className="space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <i className={`${item.icon} ${group.color} text-xs w-3.5 text-center`} />
                            <span className="text-sm text-gray-300">{item.name}</span>
                          </div>
                          <span className={`text-[11px] font-mono ${levelColor(item.level)}`}>
                            {levelLabel(item.level)}
                          </span>
                        </div>
                        <div className="h-1.5 bg-[#21262d] rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${levelBarColor(item.level)}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${item.level}%` }}
                            transition={{ duration: 0.5, delay: ii * 0.05 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-3 text-xs text-gray-600">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500 inline-block" /> Expert (85%+)</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500 inline-block" /> Proficient (70%+)</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-yellow-500 inline-block" /> Intermediate (55%+)</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-gray-600 inline-block" /> Learning</span>
      </div>
    </PageWrapper>
  )
}