export default function AuroraBackground() {
  return (
    <>
      {/* Warm amber aurora — top left */}
      <div
        aria-hidden
        className="fixed pointer-events-none z-[-4] animate-aurora"
        style={{
          inset: '-15%',
          background: `
            radial-gradient(65% 55% at 10% 5%,  rgba(200,149,42,0.10), transparent 68%),
            radial-gradient(50% 45% at 90% 15%,  rgba(30,58,95,0.07),  transparent 68%),
            radial-gradient(55% 45% at 50% 95%,  rgba(184,92,56,0.06), transparent 70%)
          `,
          contain: 'strict',
        }}
      />
      {/* Deeper warm layer */}
      <div
        aria-hidden
        className="fixed pointer-events-none z-[-5] animate-aurora-deep"
        style={{
          inset: '-15%',
          background: `
            radial-gradient(40% 35% at 75% 80%, rgba(200,149,42,0.07), transparent 65%),
            radial-gradient(30% 28% at 20% 60%, rgba(30,58,95,0.05),  transparent 60%)
          `,
          contain: 'strict',
        }}
      />
    </>
  )
}
