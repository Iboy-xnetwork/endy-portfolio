import { useState } from 'react'
import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import { profile } from '../data'

// ─── FILL THESE IN FROM EMAILJS DASHBOARD ───────────────────────
const EMAILJS_SERVICE_ID  = 'service_7s11kuz'
const EMAILJS_TEMPLATE_ID = 'template_jbs2r0m'
const EMAILJS_PUBLIC_KEY  = 'aEjcp9QHB5x9kiHGQ'
// ────────────────────────────────────────────────────────────────

const contacts = [
  { label: 'Email',    value: profile.email,      href: `mailto:${profile.email}`,                    icon: 'fa-solid fa-envelope'    },
  { label: 'Phone',    value: profile.phone,       href: `tel:${profile.phone.replace(/\s/g,'')}`,     icon: 'fa-solid fa-phone'       },
  { label: 'LinkedIn', value: 'endy-mohlola',      href: profile.linkedin,                             icon: 'fa-brands fa-linkedin',  external: true },
  { label: 'GitHub',   value: 'Iboy-xnetwork',     href: profile.github,                               icon: 'fa-brands fa-github',    external: true },
  { label: 'TikTok',   value: '@enderson_iboy',    href: 'https://www.tiktok.com/@enderson_iboy',      icon: 'fa-brands fa-tiktok',    external: true },
]

const STATUS = { IDLE: 'idle', SENDING: 'sending', SUCCESS: 'success', ERROR: 'error' }

export default function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(STATUS.IDLE)
  const [error, setError]   = useState('')

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return

    setStatus(STATUS.SENDING)
    setError('')

    try {
      // Lazy-load EmailJS only when needed (keeps bundle small)
      const emailjs = await import('https://cdn.jsdelivr.net/npm/@emailjs/browser@4/+esm')

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:    form.name,
          from_email:   form.email,
          subject:      form.subject || 'Portfolio contact',
          message:      form.message,
          to_name:      'Endy',
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      )

      setStatus(STATUS.SUCCESS)
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      console.error(err)
      setError('Failed to send — please email me directly.')
      setStatus(STATUS.ERROR)
    }
  }

  return (
    <PageWrapper>
      <h1 className="page-title">Contact</h1>
      <p className="page-subtitle">Open to dev opportunities, freelance projects and collaborations.</p>

      {/* ── Contact links ── */}
      <div className="space-y-2.5 mb-10">
        {contacts.map((c, i) => (
          <motion.a
            key={c.label}
            href={c.href}
            target={c.external ? '_blank' : undefined}
            rel={c.external ? 'noopener noreferrer' : undefined}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="card flex items-center gap-4 hover:border-accent/40 group no-underline"
          >
            <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
              <i className={`${c.icon} text-accent text-sm`} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-mono">{c.label}</p>
              <p className="text-sm text-gray-200 group-hover:text-accent transition">{c.value}</p>
            </div>
            <i className="fa-solid fa-arrow-up-right-from-square text-gray-600 group-hover:text-accent transition ml-auto text-xs" />
          </motion.a>
        ))}
      </div>

      {/* ── Contact form ── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="rounded-xl border border-[#21262d] bg-[#161b22] p-5 mb-6"
      >
        <h2 className="text-sm font-semibold text-gray-200 mb-1">Send a message</h2>
        <p className="text-xs text-gray-500 mb-5">I'll get back to you within 24 hours.</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Name + Email row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 font-mono mb-1.5">Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="w-full bg-[#0f1117] border border-[#21262d] rounded-lg px-3 py-2.5 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-accent/50 transition"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 font-mono mb-1.5">Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className="w-full bg-[#0f1117] border border-[#21262d] rounded-lg px-3 py-2.5 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-accent/50 transition"
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-xs text-gray-500 font-mono mb-1.5">Subject</label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="What's this about?"
              className="w-full bg-[#0f1117] border border-[#21262d] rounded-lg px-3 py-2.5 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-accent/50 transition"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs text-gray-500 font-mono mb-1.5">Message <span className="text-red-500">*</span></label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell me about your project or opportunity..."
              required
              rows={5}
              className="w-full bg-[#0f1117] border border-[#21262d] rounded-lg px-3 py-2.5 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-accent/50 transition resize-none"
            />
          </div>

          {/* Status messages */}
          {status === STATUS.SUCCESS && (
            <div className="flex items-center gap-2 text-green-400 text-sm bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2.5">
              <i className="fa-solid fa-circle-check" />
              Message sent! I'll get back to you soon.
            </div>
          )}
          {status === STATUS.ERROR && (
            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5">
              <i className="fa-solid fa-circle-exclamation" />
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={status === STATUS.SENDING}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-accent/20 border border-accent/40 text-accent text-sm font-medium hover:bg-accent/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === STATUS.SENDING ? (
              <><i className="fa-solid fa-spinner fa-spin" /> Sending…</>
            ) : (
              <><i className="fa-solid fa-paper-plane" /> Send Message</>
            )}
          </button>
        </form>
      </motion.div>

      {/* ── CV download ── */}
      <motion.a
        href="/Endy mohlola-resume.pdf"
        download
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-[#21262d] text-gray-400 text-sm font-medium hover:border-accent/40 hover:text-accent transition-all"
      >
        <i className="fa-solid fa-file-arrow-down" />
        Download CV (PDF)
      </motion.a>
    </PageWrapper>
  )
}