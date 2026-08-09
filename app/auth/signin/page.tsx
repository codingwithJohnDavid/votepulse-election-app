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
import { createClient } from '@/lib/supabase/client'

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
    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    })
    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }
    router.push('/home')
    router.refresh()
  }

  return (
    <PageShell withNav={false} showLogo={false}>
      <div className="flex flex-col min-h-svh bg-background">

        {/* ── Header ── */}
        <header className="px-5 pt-12 pb-6 flex flex-col items-center text-center">
          <Link
            href="/"
            className="self-start inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors"
            aria-label="Back to home"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h1 className="text-[26px] font-black text-foreground tracking-tight">Welcome Back</h1>
            <p className="text-sm text-muted-foreground mt-1">Your voice is waiting for you.</p>
          </motion.div>
        </header>

        {/* ── Form ── */}
        <motion.div
          className="flex-1 px-5 pb-10"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
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
                className="rounded-2xl h-12 bg-muted border-0 focus-visible:ring-2 focus-visible:ring-primary text-sm"
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
                  className="rounded-2xl h-12 bg-muted border-0 focus-visible:ring-2 focus-visible:ring-primary text-sm"
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
              className="mt-2 w-full py-4 rounded-2xl font-bold text-[15px] text-primary-foreground bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all disabled:opacity-60 active:scale-[0.98]"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-border" aria-hidden="true" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" aria-hidden="true" />
          </div>

          {/* Guest shortcut */}
          <button
            type="button"
            onClick={() => router.push('/home')}
            className={cn(
              'w-full py-4 rounded-2xl border border-border text-foreground font-semibold text-sm',
              'transition-colors hover:bg-muted active:scale-[0.98] bg-background',
            )}
          >
            Continue as Guest
          </button>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="text-primary font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </PageShell>
  )
}
