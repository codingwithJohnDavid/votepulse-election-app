import Image from 'next/image'

const icons = [
  { src: '/images/voterai-icon.png',    label: 'V1 — Original',              desc: 'Transparent bg, navy box, electric blue sparkle' },
  { src: '/images/voterai-icon-v2.png', label: 'V2 — Royal Blue + Gold',     desc: 'Royal blue bg, white box, gold AI sparkle' },
  { src: '/images/voterai-icon-v3.png', label: 'V3 — Purple Gradient',       desc: 'Purple-navy gradient, outline box, white sparkle' },
  { src: '/images/voterai-icon-v4.png', label: 'V4 — Light + Electric Blue', desc: 'Light bg, navy 3D box, vivid blue sparkle' },
  { src: '/images/voterai-icon-v5.png', label: 'V5 — Dark Neon',             desc: 'Near-black bg, neon wireframe box, white burst' },
  { src: '/images/voterai-icon-v6.png', label: 'V6 — Navy + Gold',           desc: 'Royal blue bg, dark navy box, gold sparkle, no white' },
  { src: '/images/voterai-icon-v7.png', label: 'V7 — Steel Blue + Star',     desc: 'Deep navy bg, steel blue box, white glowing star' },
  { src: '/images/voterai-icon-v8.png', label: 'V8 — V6 Box + V1 Star',      desc: 'Transparent bg, dark navy 3D box, electric blue sparkle' },
]

export default function IconPreviewPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-10 gap-8">
      <h1 className="text-2xl font-bold text-gray-900">VoterAI Icon Variations</h1>
      <div className="grid grid-cols-4 gap-8 items-start">
        {icons.map((icon) => (
          <div key={icon.src} className="flex flex-col items-center gap-3">
            <div className="w-32 h-32 rounded-3xl overflow-hidden shadow-lg bg-white flex items-center justify-center">
              <Image
                src={icon.src}
                alt={icon.label}
                width={128}
                height={128}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
            <p className="text-sm font-bold text-gray-800 text-center">{icon.label}</p>
            <p className="text-xs text-gray-500 text-center leading-tight">{icon.desc}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
