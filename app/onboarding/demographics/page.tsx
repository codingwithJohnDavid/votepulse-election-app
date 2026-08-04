'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, AlertCircle, Check } from 'lucide-react'
import PageShell from '@/components/page-shell'
import { cn } from '@/lib/utils'
import {
  AGE_OPTIONS,
  RACE_OPTIONS,
  RELIGION_OPTIONS,
  GENDER_OPTIONS,
  POLITICAL_OPTIONS,
} from '@/lib/mock-data'

interface DemoForm {
  ageRange: string
  race: string
  religion: string
  gender: string
  politicalAffiliation: string
}

const STEPS: {
  key: keyof DemoForm
  question: string
  sub: string
  options: string[]
}[] = [
  {
    key: 'ageRange',
    question: 'How old are you?',
    sub: 'Used only for anonymized demographic breakdowns.',
    options: AGE_OPTIONS,
  },
  {
    key: 'race',
    question: 'How do you identify racially?',
    sub: 'This helps us show diversity across results.',
    options: RACE_OPTIONS,
  },
  {
    key: 'religion',
    question: 'What is your religious affiliation?',
    sub: 'Never shared individually — only shown in aggregate.',
    options: RELIGION_OPTIONS,
  },
  {
    key: 'gender',
    question: 'How do you identify?',
    sub: 'Helps break down results by gender.',
    options: GENDER_OPTIONS,
  },
  {
    key: 'politicalAffiliation',
    question: 'How would you describe your political views?',
    sub: 'Helps contextualize how different groups view candidates.',
    options: POLITICAL_OPTIONS,
  },
]

const TOTAL_STEPS = STEPS.length

export default function DemographicsPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [form, setForm] = useState<DemoForm>({
    ageRange: '',
    race: '',
    religion: '',
    gender: '',
    politicalAffiliation: '',
  })

  const currentStep = STEPS[step]

  function select(val: string) {
    setForm((f) => ({ ...f, [currentStep.key]: val }))
  }

  function goNext() {
    setDirection(1)
    if (step < TOTAL_STEPS - 1) {
      setStep((s) => s + 1)
    } else {
      router.push('/onboarding/state')
    }
  }

  function goBack() {
    setDirection(-1)
    if (step > 0) setStep((s) => s - 1)
    else router.back()
  }

  function skipStep() {
    setDirection(1)
    if (step < TOTAL_STEPS - 1) setStep((s) => s + 1)
    else router.push('/onboarding/state')
  }

  const canProceed = !!form[currentStep.key]
  const isUnder18 = form.ageRange === 'Under 18' && step > 0

  const slideVariants = {
    enter:  (d: number) => ({ x: d * 56, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d: number) => ({ x: d * -56, opacity: 0 }),
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
            <ArrowLeft size={15} aria-hidden="true" />
            Back
          </button>

          {/* Segmented progress */}
          <div
            className="flex gap-1.5 mb-4"
            role="progressbar"
            aria-valuenow={step + 1}
            aria-valuemax={TOTAL_STEPS}
            aria-label="Step progress"
          >
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  'h-1.5 flex-1 rounded-full transition-all duration-300',
                  i < step
                    ? 'bg-primary/50'
                    : i === step
                    ? 'bg-primary'
                    : 'bg-border',
                )}
              />
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground font-semibold tracking-wide uppercase">
            Step {step + 1} of {TOTAL_STEPS}
          </p>
        </div>

        {/* Under-18 warning */}
        {isUnder18 && (
          <div className="mx-5 mb-4 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <AlertCircle size={15} className="text-amber-600 mt-0.5 shrink-0" aria-hidden="true" />
            <div>
              <p className="text-sm font-bold text-amber-800">Age Restriction</p>
              <p className="text-xs text-amber-700 leading-relaxed mt-0.5">
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
              transition={{ duration: 0.26, ease: 'easeOut' }}
            >
              <h2 className="text-[22px] font-black text-foreground mb-1.5 text-balance leading-snug">
                {currentStep.question}
              </h2>
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                {currentStep.sub}
              </p>

              <div className="flex flex-col gap-2.5">
                {currentStep.options.map((opt) => {
                  const active = form[currentStep.key] === opt
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => select(opt)}
                      className={cn(
                        'w-full flex items-center justify-between px-4 py-3.5 rounded-2xl border-2 text-sm font-semibold transition-all duration-180',
                        active
                          ? 'border-primary bg-brand-subtle text-primary shadow-sm'
                          : 'border-border bg-card text-foreground hover:border-primary/35 hover:bg-muted/60',
                      )}
                      aria-pressed={active}
                    >
                      <span>{opt}</span>
                      {active && (
                        <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0" aria-hidden="true">
                          <Check size={11} className="text-white" strokeWidth={3} />
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
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
              'w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-[15px] transition-all duration-200',
              canProceed && !isUnder18
                ? 'bg-primary text-primary-foreground hover:opacity-90 active:scale-95'
                : 'bg-muted text-muted-foreground cursor-not-allowed',
            )}
          >
            {step === TOTAL_STEPS - 1 ? 'Finish' : 'Continue'}
            <ArrowRight size={15} aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={skipStep}
            className="mt-3 w-full text-center text-sm text-muted-foreground hover:text-foreground py-2 transition-colors"
          >
            Skip for now
          </button>
        </div>
      </div>
    </PageShell>
  )
}
