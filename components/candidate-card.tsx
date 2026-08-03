'use client'

import Image from 'next/image'
import { Check, Award, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { type Candidate, partyColor } from '@/lib/mock-data'

interface CandidateCardProps {
  candidate: Candidate
  selected: boolean
  onSelect: (id: string) => void
  disabled?: boolean
}

export default function CandidateCard({
  candidate,
  selected,
  onSelect,
  disabled = false,
}: CandidateCardProps) {
  const { ring, bg, text, badge } = partyColor(candidate.party)

  return (
    <article
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-pressed={selected}
      aria-label={`${candidate.name}, ${candidate.party}, ${selected ? 'selected' : 'not selected'}`}
      onClick={() => !disabled && onSelect(candidate.id)}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
          e.preventDefault()
          onSelect(candidate.id)
        }
      }}
      className={cn(
        'relative bg-card rounded-3xl overflow-hidden cursor-pointer transition-all duration-250 focus-visible:outline-none',
        selected
          ? 'shadow-lg scale-[1.015]'
          : 'shadow-sm hover:shadow-md',
        disabled && 'opacity-50 cursor-not-allowed',
      )}
      style={
        selected
          ? { boxShadow: `0 0 0 2.5px ${ring}, 0 8px 24px ${ring}22` }
          : { boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }
      }
    >
      {/* ── Banner ── */}
      <div className="h-[72px] w-full relative" style={{ backgroundColor: bg }} aria-hidden="true">
        {/* Party bottom stripe */}
        <div className="absolute inset-x-0 bottom-0 h-[3px]" style={{ backgroundColor: ring, opacity: 0.7 }} />

        {/* Incumbent badge */}
        {candidate.incumbent && (
          <span className="absolute top-2.5 left-3 flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-sm text-gray-700 shadow-sm">
            <Award size={10} aria-hidden="true" />
            Incumbent
          </span>
        )}

        {/* Selected check */}
        {selected && (
          <span
            className="absolute top-2.5 right-3 w-6 h-6 rounded-full flex items-center justify-center shadow-md"
            style={{ backgroundColor: ring }}
            aria-hidden="true"
          >
            <Check size={13} className="text-white" strokeWidth={3} />
          </span>
        )}
      </div>

      {/* ── Body ── */}
      <div className="px-4 pb-4">
        {/* Avatar + name row */}
        <div className="flex items-end gap-3 -mt-7 mb-3">
          <div
            className="w-14 h-14 rounded-2xl border-[3px] border-card overflow-hidden shrink-0 bg-muted"
            style={{ boxShadow: `0 0 0 2.5px ${ring}45` }}
          >
            <Image
              src={candidate.imageUrl}
              alt={`Photo of ${candidate.name}`}
              width={56}
              height={56}
              className="w-full h-full object-cover"
              unoptimized
            />
          </div>
          <div className="flex-1 min-w-0 pb-0.5">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-black text-[15px] text-foreground leading-tight text-balance">
                {candidate.name}
              </h3>
              <span
                className={cn(
                  'shrink-0 text-[10px] font-black px-2 py-0.5 rounded-full whitespace-nowrap tracking-wide',
                  badge,
                )}
              >
                {candidate.party.slice(0, 3).toUpperCase()}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5 font-medium">
              {candidate.office}
              {candidate.district ? ` · ${candidate.district}` : ''}
            </p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-[12px] text-muted-foreground leading-relaxed mb-3 line-clamp-2">
          {candidate.bio}
        </p>

        {/* Key issues */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {candidate.keyIssues.slice(0, 3).map((issue) => (
            <span
              key={issue}
              className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: `${ring}18`, color: text }}
            >
              {issue}
            </span>
          ))}
        </div>

        {/* Stats row */}
        <div className="flex items-center justify-between pt-3 border-t border-border mb-3">
          <div>
            <p className="text-sm font-black text-foreground">{candidate.yearsExperience}+</p>
            <p className="text-[10px] text-muted-foreground">Years Exp.</p>
          </div>
          <a
            href={candidate.website}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-xs font-semibold hover:underline"
            style={{ color: text }}
            aria-label={`Visit ${candidate.name}'s website`}
          >
            Website
            <ExternalLink size={10} aria-hidden="true" />
          </a>
        </div>

        {/* Select button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            if (!disabled) onSelect(candidate.id)
          }}
          disabled={disabled}
          className={cn(
            'w-full py-3 rounded-2xl text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          )}
          style={
            selected
              ? { backgroundColor: ring, color: '#fff' }
              : { backgroundColor: `${ring}15`, color: ring }
          }
          aria-pressed={selected}
        >
          {selected ? (
            <span className="flex items-center justify-center gap-2">
              <Check size={14} strokeWidth={3} aria-hidden="true" />
              Selected
            </span>
          ) : (
            'Select Candidate'
          )}
        </button>
      </div>
    </article>
  )
}
