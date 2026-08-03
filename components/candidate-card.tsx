'use client'

import Image from 'next/image'
import { CheckCircle2, Award, ExternalLink } from 'lucide-react'
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
        'relative bg-card rounded-3xl overflow-hidden cursor-pointer transition-all duration-300',
        'shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        selected && 'ring-2 shadow-lg scale-[1.01]',
        disabled && 'opacity-50 cursor-not-allowed',
      )}
      style={selected ? { outline: `2px solid ${ring}`, outlineOffset: '2px' } : undefined}
    >
      {/* ── Banner ── */}
      <div
        className="h-20 w-full relative"
        style={{ backgroundColor: bg }}
        aria-hidden="true"
      >
        {/* Party accent stripe */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1 opacity-60"
          style={{ backgroundColor: ring }}
        />
        {/* Incumbent badge */}
        {candidate.incumbent && (
          <span className="absolute top-2.5 left-3 flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/80 text-gray-700">
            <Award size={10} aria-hidden="true" />
            Incumbent
          </span>
        )}
        {/* Selected check */}
        {selected && (
          <span
            className="absolute top-2.5 right-3 rounded-full bg-white/90 p-0.5"
            aria-hidden="true"
          >
            <CheckCircle2 size={18} style={{ color: ring }} />
          </span>
        )}
      </div>

      {/* ── Avatar ring ── */}
      <div className="px-4 pb-4">
        <div className="relative -mt-9 mb-3 w-16 h-16">
          <div
            className="w-16 h-16 rounded-full border-4 border-card overflow-hidden bg-muted"
            style={{ boxShadow: `0 0 0 3px ${ring}40` }}
          >
            <Image
              src={candidate.imageUrl}
              alt={`Photo of ${candidate.name}`}
              width={64}
              height={64}
              className="w-full h-full object-cover"
              unoptimized
            />
          </div>
        </div>

        {/* ── Name + party ── */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-base text-foreground leading-tight text-balance">
            {candidate.name}
          </h3>
          <span
            className={cn(
              'shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap',
              badge,
            )}
          >
            {candidate.party.slice(0, 3).toUpperCase()}
          </span>
        </div>

        {/* ── Office ── */}
        <p className="text-xs text-muted-foreground mb-2 font-medium">
          {candidate.office}
          {candidate.district ? ` · ${candidate.district}` : ''}
        </p>

        {/* ── Bio ── */}
        <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-3">
          {candidate.bio}
        </p>

        {/* ── Key issues ── */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {candidate.keyIssues.slice(0, 3).map((issue) => (
            <span
              key={issue}
              className="text-[10px] font-medium px-2 py-0.5 rounded-full"
              style={{ backgroundColor: `${ring}18`, color: text }}
            >
              {issue}
            </span>
          ))}
        </div>

        {/* ── Stats row ── */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="text-center">
            <p className="text-sm font-bold text-foreground">{candidate.yearsExperience}+</p>
            <p className="text-[10px] text-muted-foreground">Years Exp.</p>
          </div>
          <div
            className="flex-1 mx-4 h-px"
            style={{ backgroundColor: `${ring}30` }}
            aria-hidden="true"
          />
          <a
            href={candidate.website}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-xs font-medium hover:underline"
            style={{ color: text }}
            aria-label={`Visit ${candidate.name}'s website`}
          >
            Website
            <ExternalLink size={10} aria-hidden="true" />
          </a>
        </div>

        {/* ── Select button ── */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            if (!disabled) onSelect(candidate.id)
          }}
          disabled={disabled}
          className={cn(
            'mt-3 w-full py-2.5 rounded-2xl text-sm font-semibold transition-all duration-200',
            selected
              ? 'text-white'
              : 'bg-brand-subtle text-primary hover:opacity-90',
          )}
          style={
            selected
              ? { backgroundColor: ring }
              : undefined
          }
          aria-pressed={selected}
        >
          {selected ? 'Selected' : 'Select Candidate'}
        </button>
      </div>
    </article>
  )
}
