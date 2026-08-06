export default function BallotBoxIcon({ size = 120 }: { size?: number }) {
  // Isometric cube: viewed from slightly above-left
  // Top face vertices:    TL(32,36) TR(68,36) BR(68,52) BL(32,52) — flat top
  // Left face:            TL(18,46) TR(32,36) BR(32,80) BL(18,70)
  // Right face:           TL(32,36) TR(68,36) BR(68,80) BL(32,80) -- front
  // Star center:          (50, 26) — sits centered on top face

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
        <filter id="bbShadow" x="-20%" y="-10%" width="150%" height="150%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="rgba(30,20,80,0.6)" />
        </filter>
        <filter id="bbGlow" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="bbStarSharp" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#bbShadow)">
        {/* Top face — lightest indigo-blue */}
        <path d="M22 44 L50 30 L78 44 L50 58 Z" fill="#6b7db3" />

        {/* Left face — medium indigo */}
        <path d="M22 44 L50 58 L50 86 L22 72 Z" fill="#4a5483" />

        {/* Right face — darkest for depth */}
        <path d="M50 58 L78 44 L78 72 L50 86 Z" fill="#343860" />

        {/* Slot on top face */}
        <path d="M38 44 L62 38 L62 41 L38 47 Z" fill="#252849" opacity="0.9" />
      </g>

      {/* Outer soft blue halo */}
      <circle cx="50" cy="26" r="14" fill="#818cf8" opacity="0.18" filter="url(#bbGlow)" />

      {/* Sharp 4-point sparkle star */}
      <g filter="url(#bbStarSharp)">
        {/* Soft mid glow */}
        <circle cx="50" cy="26" r="6" fill="#c7d2fe" opacity="0.35" />
        {/* Main star — bright white-blue */}
        <path
          d="M50 14 L51.8 24.2 L62 26 L51.8 27.8 L50 38 L48.2 27.8 L38 26 L48.2 24.2 Z"
          fill="white"
        />
        {/* Inner indigo tint matching reference */}
        <path
          d="M50 19 L51.1 24.6 L57 26 L51.1 27.4 L50 33 L48.9 27.4 L43 26 L48.9 24.6 Z"
          fill="#a5b4fc"
          opacity="0.75"
        />
        {/* Bright center */}
        <circle cx="50" cy="26" r="2" fill="white" />
      </g>
    </svg>
  )
}
