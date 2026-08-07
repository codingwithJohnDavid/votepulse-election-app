export default function BallotBoxIcon({ size = 120, color = '#6d28d9' }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <filter id="boxShadow" x="-15%" y="-5%" width="140%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="rgba(0,0,0,0.25)" />
        </filter>
        {/* Subtle gradient for box depth */}
        <linearGradient id="frontFace" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.95" />
          <stop offset="100%" stopColor={color} stopOpacity="0.75" />
        </linearGradient>
        <linearGradient id="topFace" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="sideFace" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={color} stopOpacity="0.6" />
          <stop offset="100%" stopColor={color} stopOpacity="0.45" />
        </linearGradient>
      </defs>

      {/* ── SPARKLE — two 4-point stars, matching reference image ── */}
      {/* Large 4-point star — centered slightly left */}
      <path
        d="M38 4 L40.2 14.8 L51 17 L40.2 19.2 L38 30 L35.8 19.2 L25 17 L35.8 14.8 Z"
        fill={color}
      />
      {/* Small 4-point star — top right of large star */}
      <path
        d="M58 2 L59.2 8.8 L66 10 L59.2 11.2 L58 18 L56.8 11.2 L50 10 L56.8 8.8 Z"
        fill={color}
      />

      {/* ── 3D BALLOT BOX — front-facing, slight top/side depth ── */}
      <g filter="url(#boxShadow)">
        {/* Top face */}
        <path d="M15 42 L20 36 L80 36 L85 42 Z" fill="url(#topFace)" />

        {/* Right side face */}
        <path d="M85 42 L80 36 L80 96 L85 102 Z" fill="url(#sideFace)" />

        {/* Main front face */}
        <rect x="15" y="42" width="70" height="60" rx="2" fill="url(#frontFace)" />

        {/* Lid separator line */}
        <rect x="15" y="54" width="70" height="3" fill={color} opacity="0.4" />

        {/* Slot on lid — centered */}
        <rect x="36" y="44" width="28" height="6" rx="3" fill="rgba(0,0,0,0.35)" />
      </g>
    </svg>
  )
}
