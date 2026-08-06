export default function BallotBoxIcon({ size = 120 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* ── Drop shadow filter ── */}
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#3730a3" floodOpacity="0.25" />
        </filter>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── Ballot box body ── */}
      <g filter="url(#shadow)">
        {/* Front face */}
        <rect x="18" y="52" width="72" height="50" rx="4" fill="#4338ca" />
        {/* Top face (lid) */}
        <path d="M18 52 L26 42 L94 42 L90 52 Z" fill="#6366f1" />
        {/* Right side face */}
        <path d="M90 52 L94 42 L94 86 L90 102 Z" fill="#3730a3" />

        {/* Slot on lid */}
        <rect x="42" y="45" width="30" height="4" rx="2" fill="#3730a3" opacity="0.7" />

        {/* Ballot paper going into slot */}
        <rect x="52" y="34" width="10" height="14" rx="1.5" fill="white" opacity="0.9" />
        {/* Lines on ballot paper */}
        <rect x="54" y="37" width="6" height="1" rx="0.5" fill="#c7d2fe" />
        <rect x="54" y="39.5" width="6" height="1" rx="0.5" fill="#c7d2fe" />
        <rect x="54" y="42" width="4" height="1" rx="0.5" fill="#c7d2fe" />

        {/* Bottom highlight line on front face */}
        <rect x="18" y="96" width="72" height="3" rx="2" fill="#3730a3" opacity="0.4" />
      </g>

      {/* ── AI Sparkle Star ── */}
      <g filter="url(#glow)" transform="translate(60, 18)">
        {/* Outer glow ring */}
        <circle cx="0" cy="0" r="12" fill="white" opacity="0.12" />
        {/* 4-point sparkle */}
        <path
          d="M0 -16 C0 -6, 0 -6, 0 0 C0 -6, 0 -6, 16 0 C6 0, 6 0, 0 0 C6 0, 6 0, 0 16 C0 6, 0 6, 0 0 C0 6, 0 6, -16 0 C-6 0, -6 0, 0 0 C-6 0, -6 0, 0 -16Z"
          fill="white"
          opacity="0.95"
        />
        {/* Small secondary star for depth */}
        <path
          d="M0 -8 C0 -3, 0 -3, 0 0 C0 -3, 0 -3, 8 0 C3 0, 3 0, 0 0 C3 0, 3 0, 0 8 C0 3, 0 3, 0 0 C0 3, 0 3, -8 0 C-3 0, -3 0, 0 0 C-3 0, -3 0, 0 -8Z"
          fill="#a5b4fc"
          opacity="0.8"
        />
        {/* Center dot */}
        <circle cx="0" cy="0" r="2.5" fill="white" />
      </g>
    </svg>
  )
}
