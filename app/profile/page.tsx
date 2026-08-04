'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User, ChevronRight, Shield, Bell, LogOut,
  BarChart3, Vote, HelpCircle, Edit3, Check, X,
  ChevronDown,
} from 'lucide-react'
import BottomNav from '@/components/bottom-nav'
import PageShell from '@/components/page-shell'
import { cn } from '@/lib/utils'
import { useProfile, type UserProfile } from '@/lib/profile-context'
import {
  AGE_OPTIONS,
  RACE_OPTIONS,
  RELIGION_OPTIONS,
  GENDER_OPTIONS,
  POLITICAL_OPTIONS,
} from '@/lib/mock-data'

// ─── Demographic field config ─────────────────────────────────────────────────

const DEMO_FIELDS: {
  key: keyof UserProfile
  label: string
  options: string[]
}[] = [
  { key: 'ageRange',             label: 'Age Range',             options: AGE_OPTIONS },
  { key: 'race',                 label: 'Race / Ethnicity',      options: RACE_OPTIONS },
  { key: 'religion',             label: 'Religion',              options: RELIGION_OPTIONS },
  { key: 'gender',               label: 'Gender',                options: GENDER_OPTIONS },
  { key: 'politicalAffiliation', label: 'Political Affiliation', options: POLITICAL_OPTIONS },
]

// ─── Edit Sheet ───────────────────────────────────────────────────────────────

function EditSheet({
  open,
  onClose,
  profile,
  onSave,
}: {
  open: boolean
  onClose: () => void
  profile: UserProfile
  onSave: (patch: Partial<UserProfile>) => void
}) {
  const [draft, setDraft] = useState<UserProfile>({ ...profile })
  const [activeField, setActiveField] = useState<keyof UserProfile | null>(null)

  function toggleField(key: keyof UserProfile) {
    setActiveField((prev) => (prev === key ? null : key))
  }

  function select(key: keyof UserProfile, value: string) {
    setDraft((d) => ({ ...d, [key]: d[key] === value ? null : value }))
    setActiveField(null)
  }

  function handleSave() {
    onSave(draft)
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Sheet */}
          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-3xl shadow-2xl max-h-[88svh] flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Edit demographic profile"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1 shrink-0">
              <div className="w-10 h-1 rounded-full bg-border" aria-hidden="true" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-2 pb-4 border-b border-border shrink-0">
              <div>
                <h2 className="text-lg font-black text-foreground">Edit Profile</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Only used for anonymized demographic breakdowns
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center hover:bg-border transition-colors"
                aria-label="Close"
              >
                <X size={14} className="text-muted-foreground" />
              </button>
            </div>

            {/* Field list */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {DEMO_FIELDS.map(({ key, label, options }) => {
                const current = draft[key]
                const isOpen = activeField === key
                return (
                  <div key={key} className="rounded-2xl border border-border overflow-hidden bg-card">
                    {/* Field header row */}
                    <button
                      type="button"
                      onClick={() => toggleField(key)}
                      className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-muted/50 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <div className="text-left">
                        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">
                          {label}
                        </p>
                        <p className={cn(
                          'text-sm font-semibold mt-0.5',
                          current ? 'text-foreground' : 'text-muted-foreground/60',
                        )}>
                          {current ?? 'Not set'}
                        </p>
                      </div>
                      <ChevronDown
                        size={15}
                        className={cn(
                          'text-muted-foreground transition-transform duration-200 shrink-0',
                          isOpen && 'rotate-180',
                        )}
                        aria-hidden="true"
                      />
                    </button>

                    {/* Options */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="overflow-hidden border-t border-border"
                        >
                          <div className="px-3 py-3 flex flex-wrap gap-2">
                            {options.map((opt) => {
                              const active = current === opt
                              return (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => select(key, opt)}
                                  className={cn(
                                    'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150',
                                    active
                                      ? 'bg-primary text-primary-foreground border-primary'
                                      : 'bg-background text-foreground border-border hover:border-primary/40',
                                  )}
                                  aria-pressed={active}
                                >
                                  {active && <Check size={10} strokeWidth={3} aria-hidden="true" />}
                                  {opt}
                                </button>
                              )
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>

            {/* Save button */}
            <div className="px-5 pb-8 pt-3 border-t border-border shrink-0">
              <button
                type="button"
                onClick={handleSave}
                className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-[15px] hover:opacity-90 active:scale-95 transition-all"
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── Demographic summary row ──────────────────────────────────────────────────

function DemoTag({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">{label}</p>
      <p className={cn('text-xs font-semibold', value ? 'text-foreground' : 'text-muted-foreground/50')}>
        {value ?? 'Not set'}
      </p>
    </div>
  )
}

// ─── Menu config ──────────────────────────────────────────────────────────────

const MENU_SECTIONS = [
  {
    title: 'Voting Activity',
    items: [
      { label: 'My Ballot',  sub: '2 races completed',       Icon: Vote,       href: '/vote?state=FL' },
      { label: 'Results',    sub: 'See how others voted',    Icon: BarChart3,  href: '/results' },
    ],
  },
  {
    title: 'Account',
    items: [
      { label: 'Privacy Settings', sub: 'Manage your data',    Icon: Shield,     href: '#' },
      { label: 'Notifications',    sub: 'Election reminders',  Icon: Bell,       href: '#' },
    ],
  },
  {
    title: 'Support',
    items: [
      { label: 'Help Center', sub: 'FAQs and guides', Icon: HelpCircle, href: '#' },
    ],
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const { profile, setProfile } = useProfile()
  const [editOpen, setEditOpen] = useState(false)

  const filledCount = Object.values(profile).filter(Boolean).length
  const totalFields = DEMO_FIELDS.length

  return (
    <PageShell>
      <div className="flex flex-col min-h-svh bg-background">

        {/* Banner */}
        <div
          className="px-5 pt-14 pb-20 relative"
          style={{ background: 'linear-gradient(160deg, oklch(0.36 0.22 285) 0%, oklch(0.50 0.18 275) 100%)' }}
        >
          <p className="text-white/60 text-sm font-medium mb-1">Your Profile</p>
          <h1 className="text-2xl font-black text-white tracking-tight">Demographics</h1>
        </div>

        {/* Floating profile card */}
        <div className="relative px-5 -mt-12 mb-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-card rounded-3xl p-4 shadow-md border border-border"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: 'linear-gradient(135deg, oklch(0.42 0.19 285), oklch(0.55 0.16 265))' }}
                  aria-hidden="true"
                >
                  <User size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-sm text-foreground">Demographic Profile</p>
                  <p className="text-xs text-muted-foreground">
                    {filledCount} of {totalFields} fields set
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 transition-opacity"
                aria-label="Edit demographic profile"
              >
                <Edit3 size={11} aria-hidden="true" />
                Edit
              </button>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-4">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(filledCount / totalFields) * 100}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>

            {/* Demographic tags grid */}
            <div className="grid grid-cols-2 gap-3">
              {DEMO_FIELDS.map(({ key, label }) => (
                <DemoTag key={key} label={label} value={profile[key]} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Menu sections */}
        <div className="flex-1 px-5 overflow-y-auto">
          {MENU_SECTIONS.map(({ title, items }, si) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: si * 0.06 }}
              className="mb-5"
            >
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">
                {title}
              </p>
              <div className="bg-card rounded-3xl border border-border overflow-hidden divide-y divide-border">
                {items.map(({ label, sub, Icon, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="flex items-center gap-3 px-4 py-3.5 hover:bg-muted transition-colors"
                  >
                    <div className="w-8 h-8 rounded-xl bg-brand-subtle flex items-center justify-center shrink-0">
                      <Icon size={15} className="text-primary" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground">{label}</p>
                      <p className="text-xs text-muted-foreground">{sub}</p>
                    </div>
                    <ChevronRight size={15} className="text-muted-foreground shrink-0" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Sign out */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border border-destructive/30 text-destructive text-sm font-semibold hover:bg-destructive/5 transition-colors mb-6"
          >
            <LogOut size={15} aria-hidden="true" />
            Sign Out
          </button>
        </div>

        <BottomNav />
      </div>

      {/* Edit sheet — rendered outside scroll container */}
      <EditSheet
        open={editOpen}
        onClose={() => setEditOpen(false)}
        profile={profile}
        onSave={(patch) => setProfile(patch)}
      />
    </PageShell>
  )
}
