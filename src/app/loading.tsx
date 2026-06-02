export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      {/* Animated Logo Placeholder */}
      <div className="relative mb-8">
        <div
          className="w-12 h-12 border-2 border-brand-turquoise/30 rotate-45"
          style={{
            animation: "pulse-rotate 2s ease-in-out infinite",
          }}
        />
        <div
          className="absolute inset-0 w-12 h-12 border-2 border-brand-turquoise rotate-45"
          style={{
            animation: "pulse-scale 2s ease-in-out infinite",
          }}
        />
      </div>

      {/* Brand Name */}
      <p className="font-serif text-2xl text-gray-800 mb-2">Seyyah</p>
      <p className="font-sans text-[10px] tracking-[0.3em] text-brand-turquoise uppercase">
        Loading your journey...
      </p>

      <style>{`
        @keyframes pulse-rotate {
          0%, 100% { transform: rotate(45deg) scale(1); opacity: 0.3; }
          50% { transform: rotate(45deg) scale(1.1); opacity: 0.6; }
        }
        @keyframes pulse-scale {
          0%, 100% { transform: rotate(45deg) scale(1); opacity: 1; }
          50% { transform: rotate(45deg) scale(0.8); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
