export default function BallotBoxIcon({ size = 120 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Star outer halo */}
        <filter id="halo" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Star crisp glow */}
        <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Box drop shadow */}
        <filter id="shadow" x="-15%" y="-5%" width="140%" height="140%">
          <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="rgba(0,0,0,0.55)" />
        </filter>
      </defs>

      {/* ── 3D BOX: straight-on perspective, top-right depth ── */}
      <g filter="url(#shadow)">
        {/* Front face — main dark charcoal */}
        <rect x="14" y="48" width="62" height="46" rx="2" fill="#2d3142" />

        {/* Top face — lighter, slants back to right */}
        <path d="M14 48 L22 38 L84 38 L76 48 Z" fill="#474f6e" />

        {/* Right side face — darkest for depth */}
        <path d="M76 48 L84 38 L84 84 L76 94 Z" fill="#1a1d2e" />

        {/* Slot on top face — centered */}
        <path d="M34 42 L56 42 L56 45 L34 45 Z" rx="1" fill="#111320" />
      </g>

      {/* ── SPARKLE STAR — bright blue-white with radial glow ── */}
      {/* Outer diffuse halo */}
      <circle cx="47" cy="24" r="13" fill="#60a5fa" opacity="0.12" filter="url(#halo)" />

      {/* Mid glow ring */}
      <circle cx="47" cy="24" r="7" fill="#93c5fd" opacity="0.25" />

      {/* 4-point star — sharp points, white with blue center */}
      <g filter="url(#glow)">
        <path
          d="M47 8 L49.2 22 L63 24 L49.2 26 L47 40 L44.8 26 L31 24 L44.8 22 Z"
          fill="white"
        />
        {/* Inner blue tint for the glow color seen in screenshot */}
        <path
          d="M47 16 L48.4 22.6 L55 24 L48.4 25.4 L47 32 L45.6 25.4 L39 24 L45.6 22.6 Z"
          fill="#bfdbfe"
          opacity="0.8"
        />
        {/* Bright white center dot */}
        <circle cx="47" cy="24" r="2.2" fill="white" />
      </g>
    </svg>
  )
}
