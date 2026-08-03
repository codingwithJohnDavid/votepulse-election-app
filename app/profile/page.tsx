'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  User, MapPin, ChevronRight, Shield, Bell, LogOut,
  BarChart3, Vote, HelpCircle, Edit3,
} from 'lucide-react'
import BottomNav from '@/components/bottom-nav'
import PageShell from '@/components/page-shell'

const MOCK_USER = {
  firstName: 'Jordan',
  lastName: 'Rivera',
  email: 'jordan.rivera@example.com',
  state: 'Florida',
  district: 'District 7',
  age: '25–34',
  gender: 'Non-binary',
  ballotSubmitted: true,
}

const MENU_SECTIONS = [
  {
    title: 'Voting Activity',
    items: [
      { label: 'My Ballot', sub: '2 races completed', Icon: Vote, href: '/vote?state=FL' },
      { label: 'Results', sub: 'See how others voted', Icon: BarChart3, href: '/results' },
    ],
  },
  {
    title: 'Account',
    items: [
      { label: 'Edit Profile', sub: 'Update your information', Icon: Edit3, href: '#' },
      { label: 'Privacy Settings', sub: 'Manage your data', Icon: Shield, href: '#' },
      { label: 'Notifications', sub: 'Election reminders', Icon: Bell, href: '#' },
    ],
  },
  {
    title: 'Support',
    items: [
      { label: 'Help Center', sub: 'FAQs and guides', Icon: HelpCircle, href: '#' },
    ],
  },
]

export default function ProfilePage() {
  return (
    <PageShell>
      <div className="flex flex-col min-h-svh bg-background">
        {/* Banner + avatar */}
        <div
          className="px-5 pt-14 pb-20 relative"
          style={{ background: 'linear-gradient(160deg, oklch(0.36 0.22 285) 0%, oklch(0.50 0.18 275) 100%)' }}
          aria-hidden="false"
        >
          <p className="text-white/60 text-sm font-medium mb-1">Your Profile</p>
          <h1 className="text-2xl font-black text-white tracking-tight">
            {MOCK_USER.firstName} {MOCK_USER.lastName}
          </h1>
        </div>

        {/* Floating avatar card */}
        <div className="relative px-5 -mt-12 mb-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="bg-card rounded-3xl p-4 shadow-md border border-border flex items-center gap-4"
          >
            {/* Avatar circle */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 text-2xl font-black text-white"
              style={{ background: 'linear-gradient(135deg, oklch(0.42 0.19 285), oklch(0.55 0.16 265))' }}
              aria-hidden="true"
            >
              {MOCK_USER.firstName[0]}{MOCK_USER.lastName[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-[15px] text-foreground truncate">
                {MOCK_USER.firstName} {MOCK_USER.lastName}
              </p>
              <p className="text-xs text-muted-foreground truncate">{MOCK_USER.email}</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <MapPin size={11} className="text-primary" aria-hidden="true" />
                <span className="text-xs text-primary font-medium">
                  {MOCK_USER.state}, {MOCK_USER.district}
                </span>
              </div>
            </div>
            <button
              className="shrink-0 w-8 h-8 rounded-xl bg-muted flex items-center justify-center hover:bg-brand-subtle transition-colors"
              aria-label="Edit profile"
            >
              <Edit3 size={14} className="text-muted-foreground" aria-hidden="true" />
            </button>
          </motion.div>
        </div>

        {/* Stats row */}
        <div className="px-5 mb-4">
          <div className="bg-card rounded-3xl p-4 border border-border grid grid-cols-3 divide-x divide-border">
            {[
              { label: 'Races', value: '2' },
              { label: 'Age Group', value: MOCK_USER.age },
              { label: 'Status', value: MOCK_USER.ballotSubmitted ? 'Voted' : 'Pending' },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col items-center gap-0.5 px-2">
                <p
                  className="text-sm font-black text-foreground"
                  style={{ fontSize: value.length > 5 ? '11px' : undefined }}
                >
                  {value}
                </p>
                <p className="text-[10px] text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Menu */}
        <div className="flex-1 px-5 overflow-y-auto">
          {MENU_SECTIONS.map(({ title, items }, si) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: si * 0.07 }}
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
            onClick={() => {}}
          >
            <LogOut size={15} aria-hidden="true" />
            Sign Out
          </button>
        </div>

        <BottomNav />
      </div>
    </PageShell>
  )
}
