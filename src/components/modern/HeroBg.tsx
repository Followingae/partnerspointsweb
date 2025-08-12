export default function HeroBg() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div
        className="absolute left-1/2 -top-1/4 h-[900px] w-[900px] -translate-x-1/2 rounded-full blur-3xl opacity-30"
        style={{ background: "radial-gradient(60% 60% at 50% 50%, #6EE7F9 0%, rgba(110,231,249,0) 70%)" }}
      />
      <div
        className="absolute top-1/3 -left-32 h-[600px] w-[600px] rounded-full blur-3xl opacity-25"
        style={{ background: "radial-gradient(60% 60% at 50% 50%, #A78BFA 0%, rgba(167,139,250,0) 70%)" }}
      />
    </div>
  );
}