'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff, ArrowLeft, Check } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import PageShell from '@/components/page-shell'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

export default function SignUpPage() {
  const router = useRouter()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirm: '' })
  const [showPw, setShowPw] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const strength = (() => {
    const p = form.password
    if (!p) return 0
    let s = 0
    if (p.length >= 8) s++
    if (/[A-Z]/.test(p)) s++
    if (/[0-9]/.test(p)) s++
    if (/[^A-Za-z0-9]/.test(p)) s++
    return s
  })()

  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength]
  const strengthColor = ['', 'bg-red-400', 'bg-amber-400', 'bg-lime-500', 'bg-green-500'][strength]

  function validate() {
    const e: Record<string, string> = {}
    if (!form.firstName.trim()) e.firstName = 'First name is required'
    if (!form.lastName.trim()) e.lastName = 'Last name is required'
    if (!form.email.includes('@')) e.email = 'Enter a valid email'
    if (form.password.length < 8) e.password = 'Password must be at least 8 characters'
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match'
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    const supabase = createClient()
    const { error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          first_name: form.firstName,
          last_name: form.lastName,
        },
      },
    })
    if (authError) {
      setErrors({ email: authError.message })
      setLoading(false)
      return
    }
    router.push('/onboarding/demographics')
  }

  function field(name: keyof typeof form, label: string, type = 'text', placeholder = '') {
    return (
      <div className="flex flex-col gap-1.5">
        <Label htmlFor={name} className="text-sm font-semibold text-foreground">
          {label}
        </Label>
        <div className="relative">
          <Input
            id={name}
            type={name === 'password' || name === 'confirm' ? (showPw ? 'text' : 'password') : type}
            placeholder={placeholder}
            value={form[name]}
            onChange={(e) => setForm((f) => ({ ...f, [name]: e.target.value }))}
            className={cn(
              'rounded-2xl h-12 bg-muted border-0 focus-visible:ring-2 focus-visible:ring-primary text-sm',
              errors[name] && 'ring-2 ring-destructive',
            )}
            aria-describedby={errors[name] ? `${name}-error` : undefined}
            aria-invalid={!!errors[name]}
          />
          {(name === 'password' || name === 'confirm') && (
            <button
              type="button"
              onClick={() => setShowPw((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={showPw ? 'Hide password' : 'Show password'}
            >
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
        </div>
        {errors[name] && (
          <p id={`${name}-error`} className="text-xs text-destructive" role="alert">
            {errors[name]}
          </p>
        )}
      </div>
    )
  }

  return (
    <PageShell withNav={false}>
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
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-3"
          >
            <Image
              src="/images/voterai-icon-final.png"
              alt="VoterAI"
              width={90}
              height={90}
              className="object-contain"
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h1 className="text-[26px] font-black text-foreground tracking-tight">Create Account</h1>
            <p className="text-sm text-muted-foreground mt-1">Join millions making their voice heard.</p>
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
            <div className="grid grid-cols-2 gap-3">
              {field('firstName', 'First Name', 'text', 'Jane')}
              {field('lastName', 'Last Name', 'text', 'Doe')}
            </div>
            {field('email', 'Email Address', 'email', 'jane@example.com')}
            {field('password', 'Password')}

            {/* Strength bar */}
            {form.password.length > 0 && (
              <div className="flex flex-col gap-1.5 -mt-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((n) => (
                    <div
                      key={n}
                      className={cn(
                        'h-1.5 flex-1 rounded-full transition-all duration-300',
                        strength >= n ? strengthColor : 'bg-border',
                      )}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">{strengthLabel} password</p>
              </div>
            )}

            {field('confirm', 'Confirm Password')}

            {form.confirm.length > 0 && form.password === form.confirm && (
              <div className="flex items-center gap-1.5 -mt-2 text-green-600 text-xs">
                <Check size={13} aria-hidden="true" />
                Passwords match
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full py-4 rounded-2xl font-bold text-[15px] text-white transition-all hover:opacity-90 disabled:opacity-60 active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, oklch(0.40 0.20 280), oklch(0.50 0.18 265))',
                boxShadow: '0 4px 20px rgba(80, 60, 200, 0.28)',
              }}
            >
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-primary font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </PageShell>
  )
}
