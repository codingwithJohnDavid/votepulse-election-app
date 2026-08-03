'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, AlertCircle } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import PageShell from '@/components/page-shell'
import { cn } from '@/lib/utils'
import {
  AGE_OPTIONS,
  RACE_OPTIONS,
  RELIGION_OPTIONS,
  GENDER_OPTIONS,
  INCOME_OPTIONS,
  EDUCATION_OPTIONS,
} from '@/lib/mock-data'

interface DemoForm {
  age: string
  race: string
  religion: string
  gender: string
  income: string
  education: string
  zip: string
}

const STEPS = [
  {
    key: 'age' as keyof DemoForm,
    label: 'Age Range',
    question: 'How old are you?',
    sub: 'Used only for anonymized demographic breakdowns.',
    options: AGE_OPTIONS,
  },
  {
    key: 'race' as keyof DemoForm,
    label: 'Race / Ethnicity',
    question: 'How do you identify racially?',
    sub: 'This helps us show diversity in results.',
    options: RACE_OPTIONS,
  },
  {
    key: 'religion' as keyof DemoForm,
    label: 'Religion',
    question: 'What is your religious affiliation?',
    sub: 'Never shared individually — only in aggregate.',
    options: RELIGION_OPTIONS,
  },
  {
    key: 'gender' as keyof DemoForm,
    label: 'Gender',
    question: 'How do you identify?',
    sub: 'Helps break down results by gender.',
    options: GENDER_OPTIONS,
  },
  {
    key: 'income' as keyof DemoForm,
    label: 'Household Income',
    question: 'What is your household income?',
    sub: 'Grouped into broad ranges for anonymity.',
    options: INCOME_OPTIONS,
  },
  {
    key: 'education' as keyof DemoForm,
    label: 'Education Level',
    question: 'What is your highest level of education?',
    sub: 'Helps show how education correlates with views.',
    options: EDUCATION_OPTIONS,
  },
]

const TOTAL_STEPS = STEPS.length + 1 // +1 for ZIP step

export default function DemographicsPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [form, setForm] = useState<DemoForm>({
    age: '', race: '', religion: '', gender: '', income: '', education: '', zip: '',
  })
  const [zipError, setZipError] = useState('')

  const isZipStep = step === STEPS.length
  const currentStep = isZipStep ? null : STEPS[step]

  function select(val: string) {
    if (!currentStep) return
    setForm((f) => ({ ...f, [currentStep.key]: val }))
  }

  function goNext() {
    setDirection(1)
    if (step < STEPS.length) {
      setStep((s) => s + 1)
    } else {
      // ZIP step submit
      if (!/^\d{5}$/.test(form.zip)) {
        setZipError('Please enter a valid 5-digit ZIP code.')
        return
      }
      router.push('/onboarding/state')
    }
  }

  function goBack() {
    setDirection(-1)
    if (step > 0) setStep((s) => s - 1)
    else router.back()
  }

  const canProceed = isZipStep
    ? /^\d{5}$/.test(form.zip)
    : !!form[STEPS[step]?.key]

  const isUnder18 = form.age === 'Under 18' && step > 0

  const slideVariants = {
    enter: (d: number) => ({ x: d * 60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d * -60, opacity: 0 }),
  }

  return (
    <PageShell withNav={false}>
      <div className="flex flex-col min-h-svh bg-background">
        {/* Top bar */}
        <div className="px-5 pt-14 pb-4">
          <button
            onClick={goBack}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm mb-5 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back
          </button>

          {/* Progress bar */}
          <div className="flex gap-1.5 mb-5" role="progressbar" aria-valuenow={step + 1} aria-valuemax={TOTAL_STEPS} aria-label="Step progress">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  'h-1.5 flex-1 rounded-full transition-all duration-300',
                  i <= step ? 'bg-primary' : 'bg-border',
                )}
              />
            ))}
          </div>

          <p className="text-xs text-muted-foreground font-medium">
            Step {step + 1} of {TOTAL_STEPS}
          </p>
        </div>

        {/* Under-18 block */}
        {isUnder18 && (
          <div className="mx-5 mb-4 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <AlertCircle size={16} className="text-amber-600 mt-0.5 shrink-0" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-amber-800">Age Restriction</p>
              <p className="text-xs text-amber-700 leading-relaxed">
                VotePulse is available to users 18 and older. You can still explore candidate information.
              </p>
            </div>
          </div>
        )}

        {/* Animated step content */}
        <div className="flex-1 px-5 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              {!isZipStep && currentStep ? (
                <>
                  <h2 className="text-2xl font-black text-foreground mb-1 text-balance leading-snug">
                    {currentStep.question}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    {currentStep.sub}
                  </p>

                  {/* Option pills */}
                  <div className="flex flex-col gap-2.5">
                    {currentStep.options.map((opt) => {
                      const active = form[currentStep.key] === opt
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => select(opt)}
                          className={cn(
                            'w-full text-left px-4 py-3.5 rounded-2xl border-2 text-sm font-medium transition-all duration-200',
                            active
                              ? 'border-primary bg-brand-subtle text-primary'
                              : 'border-border bg-card text-foreground hover:border-primary/40 hover:bg-muted',
                          )}
                          aria-pressed={active}
                        >
                          {opt}
                        </button>
                      )
                    })}
                  </div>
                </>
              ) : (
                /* ZIP step */
                <>
                  <h2 className="text-2xl font-black text-foreground mb-1 text-balance">
                    What&apos;s your ZIP code?
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    We use this to show you the races in your congressional district.
                  </p>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="zip" className="sr-only">ZIP Code</Label>
                    <Input
                      id="zip"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]{5}"
                      maxLength={5}
                      placeholder="e.g. 33101"
                      value={form.zip}
                      onChange={(e) => {
                        setZipError('')
                        setForm((f) => ({ ...f, zip: e.target.value.replace(/\D/g, '') }))
                      }}
                      className={cn(
                        'rounded-2xl h-14 text-xl font-bold bg-card border-2 border-border focus-visible:ring-0 focus-visible:border-primary text-center tracking-[0.25em]',
                        zipError && 'border-destructive',
                      )}
                      aria-describedby={zipError ? 'zip-error' : undefined}
                      aria-invalid={!!zipError}
                    />
                    {zipError && (
                      <p id="zip-error" className="text-xs text-destructive" role="alert">
                        {zipError}
                      </p>
                    )}
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <div className="px-5 pb-10 pt-6">
          <button
            type="button"
            onClick={goNext}
            disabled={!canProceed || isUnder18}
            className={cn(
              'w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-[15px] transition-all',
              canProceed && !isUnder18
                ? 'bg-primary text-primary-foreground hover:opacity-90 active:scale-95'
                : 'bg-muted text-muted-foreground cursor-not-allowed',
            )}
          >
            {isZipStep ? 'Find My Races' : 'Continue'}
            <ArrowRight size={16} aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => {
              if (!isZipStep) {
                setDirection(1)
                setStep((s) => s + 1)
              } else {
                router.push('/onboarding/state')
              }
            }}
            className="mt-3 w-full text-center text-sm text-muted-foreground hover:text-foreground py-2 transition-colors"
          >
            Skip for now
          </button>
        </div>
      </div>
    </PageShell>
  )
}
