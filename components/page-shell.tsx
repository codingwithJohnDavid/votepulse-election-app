import { cn } from '@/lib/utils'

interface PageShellProps {
  children: React.ReactNode
  className?: string
  withNav?: boolean
}

export default function PageShell({ children, className, withNav = true }: PageShellProps) {
  return (
    <div className="flex justify-center min-h-svh" style={{ background: '#ffffff' }}>
      <main
        className={cn(
          'mobile-shell w-full',
          withNav && 'pb-nav',
          className,
        )}
      >
        {children}
      </main>
    </div>
  )
}
