'use client'

import { use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronLeft, Globe, AtSign, Link2, Award, Clock, ExternalLink } from 'lucide-react'
import BottomNav from '@/components/bottom-nav'
import PageShell from '@/components/page-shell'
import { CANDIDATES, partyColor } from '@/lib/mock-data'

export default function CandidateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const candidate = CANDIDATES.find((c) => c.id === id)

  if (!candidate) {
    return (
      <PageShell>
        <div className="flex flex-col items-center justify-center min-h-svh bg-background gap-4">
          <p className="text-muted-foreground font-medium">Candidate not found.</p>
          <Link href="/candidates" className="text-primary font-semibold text-sm hover:underline">
            Back to Candidates
          </Link>
        </div>
      </PageShell>
    )
  }

  const { ring, bg, badge } = partyColor(candidate.party)
  const partyLabel = candidate.party === 'Democrat' ? 'DEM' : candidate.party === 'Republican' ? 'REP' : 'IND'

  return (
    <PageShell>
      <div className="flex flex-col min-h-svh bg-background">
        {/* ── Header bar ── */}
        <header className="bg-card px-5 pt-14 pb-4 border-b border-border flex items-center gap-2">
          <Link
            href="/candidates"
            className="flex items-center gap-1 text-primary font-semibold text-sm -ml-1 px-1 py-0.5 rounded-xl hover:bg-brand-subtle transition-colors"
          >
            <ChevronLeft size={16} aria-hidden="true" />
            Candidates
          </Link>
        </header>

        <div
          className="flex-1 overflow-y-auto"
          style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 5rem)' }}
        >
          {/* ── Profile hero ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mx-5 mt-5 bg-card rounded-3xl border border-border p-5 flex flex-col items-center text-center"
          >
            {/* Avatar */}
            <div
              className="w-20 h-20 rounded-full overflow-hidden mb-3"
              style={{ backgroundColor: bg, boxShadow: `0 0 0 3px ${ring}50` }}
            >
              <Image
                src={candidate.imageUrl}
                alt={`Photo of ${candidate.name}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>

            {/* Party badge */}
            <span className={`text-[11px] font-black px-2.5 py-1 rounded-full mb-2 ${badge}`}>
              {partyLabel} · {candidate.party}
            </span>

            <h1 className="text-xl font-black text-foreground text-balance">{candidate.name}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {candidate.office}{candidate.district ? ` · ${candidate.district}` : ''}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{candidate.state}</p>

            {/* Stats row */}
            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border w-full justify-center">
              {candidate.incumbent && (
                <div className="flex flex-col items-center gap-1">
                  <Award size={15} className="text-amber-500" />
                  <span className="text-[11px] text-muted-foreground font-medium">Incumbent</span>
                </div>
              )}
              <div className="flex flex-col items-center gap-1">
                <Clock size={15} className="text-primary" />
                <span className="text-[11px] text-muted-foreground font-medium">{candidate.yearsExperience} yrs exp.</span>
              </div>
            </div>
          </motion.div>

          {/* ── Bio ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mx-5 mt-4 bg-card rounded-3xl border border-border p-5"
          >
            <h2 className="font-black text-[14px] text-foreground mb-2">About</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{candidate.bio}</p>
          </motion.div>

          {/* ── Key Issues ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="mx-5 mt-4 bg-card rounded-3xl border border-border p-5"
          >
            <h2 className="font-black text-[14px] text-foreground mb-3">Key Issues</h2>
            <div className="flex flex-wrap gap-2">
              {candidate.keyIssues.map((issue) => (
                <span
                  key={issue}
                  className="text-[12px] font-semibold px-3 py-1.5 rounded-full bg-brand-subtle text-primary"
                >
                  {issue}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── Links ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mx-5 mt-4 bg-card rounded-3xl border border-border overflow-hidden"
          >
            <h2 className="font-black text-[14px] text-foreground px-5 pt-5 pb-3">Links</h2>

            <a
              href={candidate.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3.5 border-t border-border hover:bg-muted transition-colors"
            >
              <Globe size={16} className="text-primary shrink-0" aria-hidden="true" />
              <span className="flex-1 text-sm font-medium text-foreground">Official Website</span>
              <ExternalLink size={13} className="text-muted-foreground" aria-hidden="true" />
            </a>

            {candidate.twitter && (
              <a
                href={`https://twitter.com/${candidate.twitter.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3.5 border-t border-border hover:bg-muted transition-colors"
              >
                <AtSign size={16} className="text-primary shrink-0" aria-hidden="true" />
                <span className="flex-1 text-sm font-medium text-foreground">{candidate.twitter}</span>
                <ExternalLink size={13} className="text-muted-foreground" aria-hidden="true" />
              </a>
            )}

            {candidate.instagram && (
              <a
                href={`https://instagram.com/${candidate.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3.5 border-t border-border hover:bg-muted transition-colors"
              >
                <Link2 size={16} className="text-primary shrink-0" aria-hidden="true" />
                <span className="flex-1 text-sm font-medium text-foreground">{candidate.instagram}</span>
                <ExternalLink size={13} className="text-muted-foreground" aria-hidden="true" />
              </a>
            )}
          </motion.div>

          {/* ── Vote CTA ── */}
          <div className="mx-5 mt-4">
            <Link
              href={`/vote?state=${candidate.stateCode}`}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-3xl font-bold text-sm text-white transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, oklch(0.38 0.20 285) 0%, oklch(0.52 0.17 265) 100%)' }}
            >
              Vote in {candidate.state}
            </Link>
          </div>
        </div>

        <BottomNav />
      </div>
    </PageShell>
  )
}
