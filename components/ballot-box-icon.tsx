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
      <defs>
        {/* Outer glow for the star */}
        <filter id="starGlow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="5" result="blur1" />
          <feGaussianBlur stdDeviation="2" result="blur2" />
          <feMerge>
            <feMergeNode in="blur1" />
            <feMergeNode in="blur2" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Subtle drop shadow under box */}
        <filter id="boxShadow" x="-10%" y="-5%" width="120%" height="130%">
          <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#1e1b4b" floodOpacity="0.5" />
        </filter>
      </defs>

      {/* ── 3D Ballot Box ── */}
      <g filter="url(#boxShadow)">
        {/* Top face - lightest */}
        <path d="M22 54 L60 44 L98 54 L60 64 Z" fill="#475569" />
        {/* Left front face */}
        <path d="M22 54 L60 64 L60 102 L22 92 Z" fill="#334155" />
        {/* Right front face - darkest for depth */}
        <path d="M60 64 L98 54 L98 92 L60 102 Z" fill="#1e293b" />

        {/* Slot on top face */}
        <path d="M47 57 L73 51 L73 54 L47 60 Z" fill="#1e293b" opacity="0.8" rx="1" />
      </g>

      {/* ── AI Sparkle Star ── */}
      <g filter="url(#starGlow)" transform="translate(60, 26)">
        {/* Soft outer glow circle */}
        <circle cx="0" cy="0" r="14" fill="#93c5fd" opacity="0.15" />
        <circle cx="0" cy="0" r="9" fill="#bfdbfe" opacity="0.2" />

        {/* 4-point star — sharp like the screenshot */}
        <path
          d="M0,-18 L2.5,-2.5 L18,0 L2.5,2.5 L0,18 L-2.5,2.5 L-18,0 L-2.5,-2.5 Z"
          fill="white"
          opacity="0.98"
        />
        {/* Blue tinted inner layer for the glow color from screenshot */}
        <path
          d="M0,-10 L1.5,-1.5 L10,0 L1.5,1.5 L0,10 L-1.5,1.5 L-10,0 L-1.5,-1.5 Z"
          fill="#93c5fd"
          opacity="0.7"
        />
        {/* Bright center */}
        <circle cx="0" cy="0" r="2.5" fill="white" />
      </g>
    </svg>
  )
}
