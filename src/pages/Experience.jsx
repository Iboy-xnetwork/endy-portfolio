import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import { experience } from '../data'

export default function Experience() {
  return (
    <PageWrapper>
      <h1 className="page-title">Experience</h1>
      <p className="page-subtitle">My professional work history and what I built there.</p>

      <div className="relative border-l-2 border-tertiary ml-3 pl-8 space-y-10">
        {experience.map((job, i) => (
          <motion.div
            key={job.company}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative"
          >
            {/* dot */}
            <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full border-2 border-accent bg-primary" />

            <div className="card">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-4">
                <div>
                  <h2 className="text-base font-semibold text-gray-100">{job.role}</h2>
                  <p className="text-sm text-accent font-medium">{job.company}</p>
                </div>
                <span className="text-xs font-mono text-gray-500 bg-secondary px-2 py-1 rounded border border-tertiary whitespace-nowrap">
                  {job.period}
                </span>
              </div>
              <ul className="space-y-2">
                {job.points.map((point, pi) => (
                  <li key={pi} className="flex gap-2.5 text-sm text-gray-400">
                    <span className="text-accent mt-0.5 flex-shrink-0">→</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Education */}
      <div className="mt-12">
        <h2 className="text-xs font-mono text-accent uppercase tracking-widest mb-5">Education</h2>
        <div className="space-y-3">
          {[
            { school: 'Rosebank College', degree: 'Diploma in Information Technology — Software Development', year: '2022 – 2024' },
            { school: 'Spartan High School', degree: 'Matric (Grade 12)', year: '2021' },
          ].map((edu, i) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1"
            >
              <div>
                <p className="text-sm font-medium text-gray-200">{edu.school}</p>
                <p className="text-xs text-gray-500">{edu.degree}</p>
              </div>
              <span className="text-xs font-mono text-gray-500 flex-shrink-0">{edu.year}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
