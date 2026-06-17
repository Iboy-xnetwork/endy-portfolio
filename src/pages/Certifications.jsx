import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'

const certifications = [
  {
    id: 'rosebank',
    title: 'Diploma in Information Technology',
    subtitle: 'Software Development',
    issuer: 'Rosebank College',
    issuerShort: 'Rosebank College',
    year: '2024',
    icon: 'fa-solid fa-graduation-cap',
    color: 'from-blue-500/20 to-blue-600/10',
    accent: 'text-blue-400',
    border: 'border-blue-500/30',
    badge: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    pdf: '/rosebankQ.pdf',
    highlight: true,
    description: 'A comprehensive qualification covering software engineering fundamentals, application development, databases, and systems analysis. Completed at Rosebank College with a focus on practical, industry-relevant skills.',
    skills: ['Java', 'C#', 'Web Development', 'Databases', 'Software Engineering', 'Agile'],
    issuedTo: 'Fulufhelo Endy Mohlola',
  },
  {
    id: 'thinkcloudly',
    title: 'AI and Data Science Bootcamp',
    subtitle: 'Certificate of Participation',
    issuer: 'ThinkCloudly',
    issuerShort: 'ThinkCloudly',
    year: '2023',
    icon: 'fa-solid fa-brain',
    color: 'from-purple-500/20 to-purple-600/10',
    accent: 'text-purple-400',
    border: 'border-purple-500/30',
    badge: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    pdf: '/TCcertificate.pdf',
    highlight: false,
    description: 'Intensive bootcamp covering artificial intelligence fundamentals, machine learning concepts, and data science practices. Issued by Angela, Senior IT Cloud Consultant at ThinkCloudly (Toronto, Canada).',
    skills: ['Artificial Intelligence', 'Data Science', 'Machine Learning', 'Cloud Computing'],
    issuedTo: 'Endy Mohlola',
    issuedBy: 'Angela — Senior IT Cloud Consultant',
    org: 'ThinkCloudly, Toronto, Ontario',
  },
  {
    id: 'coursera',
    title: 'Build a Free Website with WordPress',
    subtitle: 'Course Certificate',
    issuer: 'Coursera',
    issuerShort: 'Coursera',
    year: '2023',
    icon: 'fa-brands fa-wordpress',
    color: 'from-green-500/20 to-green-600/10',
    accent: 'text-green-400',
    border: 'border-green-500/30',
    badge: 'bg-green-500/10 text-green-400 border-green-500/30',
    pdf: '/courseraC.pdf',
    highlight: false,
    description: 'Official Coursera certificate for completing the WordPress website building course. Shareable on LinkedIn and verifiable through Coursera\'s certification platform.',
    skills: ['WordPress', 'Web Design', 'CMS', 'Theme Customisation'],
    issuedTo: 'Endy Mohlola',
    verifiable: true,
  },
  {
    id: 'stocktaking',
    title: 'Certificate in Stock Taking',
    subtitle: 'Professional Qualification',
    issuer: 'Dial a StockTaker',
    issuerShort: 'Professional',
    year: '2022',
    icon: 'fa-solid fa-certificate',
    color: 'from-amber-500/20 to-amber-600/10',
    accent: 'text-amber-400',
    border: 'border-amber-500/30',
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    pdf: null,
    highlight: false,
    description: 'Professional qualification in stock taking and inventory management. Earned through hands-on work at Dial a StockTaker conducting accurate stock counts for retail clients.',
    skills: ['Inventory Management', 'Retail Operations', 'Accuracy & Attention to Detail'],
    issuedTo: 'Fulufhelo Endy Mohlola',
  },
]

function CertModal({ cert, onClose }) {
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
        <div className={`bg-gradient-to-r ${cert.color} border-b ${cert.border} px-5 py-4 flex items-start justify-between`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl border ${cert.border} bg-black/20 flex items-center justify-center flex-shrink-0`}>
              <i className={`${cert.icon} ${cert.accent} text-lg`} />
            </div>
            <div>
              <p className={`text-xs font-mono ${cert.accent} uppercase tracking-widest`}>{cert.issuerShort}</p>
              <h2 className="text-sm font-semibold text-gray-100 leading-snug mt-0.5">{cert.title}</h2>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-300 transition p-1 flex-shrink-0">
            <i className="fa-solid fa-xmark text-base" />
          </button>
        </div>

        <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="flex flex-wrap gap-2">
            <span className={`text-xs px-2 py-1 rounded-full border font-medium ${cert.badge}`}>{cert.subtitle}</span>
            {cert.year && <span className="text-xs px-2 py-1 rounded-full border border-[#21262d] text-gray-500 font-mono">{cert.year}</span>}
            {cert.highlight && <span className="text-xs px-2 py-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 font-medium">⭐ Main Qualification</span>}
          </div>

          <p className="text-sm text-gray-400 leading-relaxed">{cert.description}</p>

          <div className="space-y-2 text-sm border-t border-[#21262d] pt-4">
            <div className="flex justify-between"><span className="text-gray-600">Issued to</span><span className="text-gray-300 font-medium">{cert.issuedTo}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Issuing body</span><span className="text-gray-300">{cert.issuer}</span></div>
            {cert.issuedBy && <div className="flex justify-between"><span className="text-gray-600">Issued by</span><span className="text-gray-300">{cert.issuedBy}</span></div>}
            {cert.org && <div className="flex justify-between gap-4"><span className="text-gray-600 flex-shrink-0">Organisation</span><span className="text-gray-300 text-right">{cert.org}</span></div>}
          </div>

          <div>
            <p className="text-xs text-gray-600 uppercase tracking-widest mb-2 font-mono">Skills covered</p>
            <div className="flex flex-wrap gap-1.5">
              {cert.skills.map(s => (
                <span key={s} className="text-xs px-2 py-0.5 rounded bg-[#21262d] text-gray-400 border border-[#2d333b]">{s}</span>
              ))}
            </div>
          </div>

          {cert.pdf && (
            <div className="border-t border-[#21262d] pt-4 space-y-3">
              <p className="text-xs text-gray-600 uppercase tracking-widest font-mono">Certificate preview</p>
              <div className="rounded-xl overflow-hidden border border-[#21262d] bg-black/30" style={{ height: 260 }}>
                <iframe src={`${cert.pdf}#view=FitH`} title={cert.title} className="w-full h-full" style={{ border: 'none' }} />
              </div>
              <div className="flex gap-2">
                <a href={cert.pdf} target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[#21262d] text-gray-300 text-xs font-medium hover:border-gray-500 transition">
                  <i className="fa-solid fa-up-right-from-square text-xs" /> Open full screen
                </a>
                <a href={cert.pdf} download
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border ${cert.border} ${cert.accent} text-xs font-medium hover:bg-white/5 transition`}>
                  <i className="fa-solid fa-file-arrow-down text-xs" /> Download PDF
                </a>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Certifications() {
  const [selected, setSelected] = useState(null)
  const featured = certifications.find(c => c.highlight)
  const rest = certifications.filter(c => !c.highlight)

  return (
    <PageWrapper>
      <h1 className="page-title">Certifications</h1>
      <p className="page-subtitle">Qualifications, courses and bootcamps. Tap any card to preview the certificate.</p>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mb-4 cursor-pointer rounded-xl border-2 ${featured.border} bg-gradient-to-br ${featured.color} p-5 hover:opacity-90 transition-all`}
        onClick={() => setSelected(featured)}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className={`w-11 h-11 rounded-xl border ${featured.border} bg-black/20 flex items-center justify-center flex-shrink-0`}>
              <i className={`${featured.icon} ${featured.accent} text-xl`} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-yellow-400 bg-yellow-500/10 border border-yellow-500/30 px-2 py-0.5 rounded-full">⭐ Main Qualification</span>
              </div>
              <h3 className="text-base font-bold text-gray-100">{featured.title}</h3>
              <p className={`text-sm ${featured.accent} font-medium`}>{featured.subtitle}</p>
              <p className="text-xs text-gray-500 mt-1">{featured.issuer} · {featured.year}</p>
            </div>
          </div>
          <i className="fa-solid fa-chevron-right text-gray-600 mt-1 flex-shrink-0" />
        </div>
        <p className="text-xs text-gray-400 mt-3 leading-relaxed">{featured.description}</p>
      </motion.div>

      <div className="space-y-3">
        {rest.map((cert, i) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.07 }}
            className="card flex items-center gap-4 cursor-pointer hover:border-gray-600 transition-all"
            onClick={() => setSelected(cert)}
          >
            <div className={`w-10 h-10 rounded-xl border ${cert.border} bg-gradient-to-br ${cert.color} flex items-center justify-center flex-shrink-0`}>
              <i className={`${cert.icon} ${cert.accent} text-base`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-200 leading-snug">{cert.title}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`text-xs ${cert.accent}`}>{cert.issuer}</span>
                {cert.year && <><span className="text-gray-700">·</span><span className="text-xs font-mono text-gray-600">{cert.year}</span></>}
                {cert.pdf && <span className="text-xs text-gray-600 flex items-center gap-1"><i className="fa-solid fa-file-pdf text-[10px]" /> PDF</span>}
              </div>
            </div>
            <i className="fa-solid fa-chevron-right text-gray-700 flex-shrink-0" />
          </motion.div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-dashed border-[#21262d] p-4">
        <p className="text-xs text-gray-600 flex items-center gap-2">
          <i className="fa-solid fa-plus text-gray-700" />
          More certifications being added. Drop PDF in <code className="font-mono text-gray-500">public/</code> and add an entry here.
        </p>
      </div>

      <AnimatePresence>
        {selected && <CertModal cert={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </PageWrapper>
  )
}