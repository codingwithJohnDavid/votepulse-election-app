'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import PageShell from '@/components/page-shell'
import { cn } from '@/lib/utils'

export default function SignInPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!form.email || !form.password) {
      setError('Please enter your email and password.')
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 700))
    // Simulate success – replace with real auth
    router.push('/home')
  }

  return (
    <PageShell withNav={false}>
      <div className="flex flex-col min-h-svh bg-card">
        {/* Header */}
        <div
          className="px-5 pt-14 pb-10"
          style={{ background: 'linear-gradient(165deg, oklch(0.36 0.22 285) 0%, oklch(0.50 0.18 275) 100%)' }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-6 transition-colors"
            aria-label="Back to home"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back
          </Link>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl font-black text-white mb-1 tracking-tight">Welcome Back</h1>
            <p className="text-white/65 text-sm">Your voice is waiting for you.</p>
          </motion.div>
        </div>

        {/* Form */}
        <div className="flex-1 px-5 py-8">
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email" className="text-sm font-semibold">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="jane@example.com"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="rounded-xl h-12 bg-muted border-0 focus-visible:ring-2 focus-visible:ring-primary text-sm"
                autoComplete="email"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-semibold">
                  Password
                </Label>
                <button type="button" className="text-xs text-primary hover:underline font-medium">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPw ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  className="rounded-xl h-12 bg-muted border-0 focus-visible:ring-2 focus-visible:ring-primary text-sm"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive -mt-2" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-[15px] transition-opacity hover:opacity-90 disabled:opacity-60 active:scale-95"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-7">
            <div className="flex-1 h-px bg-border" aria-hidden="true" />
            <span className="text-xs text-muted-foreground">or continue with</span>
            <div className="flex-1 h-px bg-border" aria-hidden="true" />
          </div>

          {/* Demo shortcut */}
          <button
            type="button"
            onClick={() => router.push('/home')}
            className={cn(
              'w-full py-4 rounded-2xl border border-border text-foreground font-semibold text-sm',
              'transition-colors hover:bg-muted active:scale-95',
            )}
          >
            Continue as Guest (Demo)
          </button>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="text-primary font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </PageShell>
  )
}
