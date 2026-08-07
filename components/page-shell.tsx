import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface PageShellProps {
  children: React.ReactNode
  className?: string
  withNav?: boolean
  showLogo?: boolean
}

export default function PageShell({ children, className, withNav = true, showLogo = true }: PageShellProps) {
  return (
    <div className="flex justify-center min-h-svh" style={{ background: '#ffffff' }}>
      <main
        className={cn(
          'mobile-shell w-full',
          withNav && 'pb-nav',
          className,
        )}
      >
        {showLogo && (
          <div className="flex justify-center pt-10 pb-2">
            <Link href="/home" aria-label="Go to home">
              <Image
                src="/images/logo.png"
                alt="VoterAI"
                width={64}
                height={64}
                className="object-contain"
                priority
              />
            </Link>
          </div>
        )}
        {children}
      </main>
    </div>
  )
}
