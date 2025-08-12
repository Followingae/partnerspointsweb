export function Card({ 
  title, 
  children, 
  className = "",
  hover = true 
}: { 
  title?: string; 
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div className={`rounded-2xl border border-borderSoft bg-surfacePrimary p-8 shadow-soft transition will-change-transform ${
      hover ? "hover:-translate-y-0.5 hover:shadow-lg" : ""
    } ${className}`}>
      {title && <h3 className="text-xl font-semibold mb-4 text-inkPrimary">{title}</h3>}
      <div className="text-inkMuted">{children}</div>
    </div>
  );
}