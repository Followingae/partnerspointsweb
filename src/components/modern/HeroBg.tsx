"use client";

export default function HeroBg() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      {/* Single impactful radial gradient from bottom middle */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120vw] h-[120vh] rounded-full blur-3xl opacity-40"
        style={{ 
          background: "radial-gradient(ellipse 80% 60% at 50% 100%, #0F172A 0%, rgba(15,23,42,0.6) 20%, rgba(15,23,42,0.3) 40%, rgba(15,23,42,0.1) 70%, rgba(15,23,42,0) 100%)"
        }}
      />
      
      {/* Subtle noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-soft-light" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
        }} 
      />
    </div>
  );
}