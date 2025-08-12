export default function Section({ 
  children, 
  id,
  className = ""
}: { 
  children: React.ReactNode; 
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={`py-32 md:py-38 ${className}`}>
      <div className="mx-auto max-w-page px-6">{children}</div>
    </section>
  );
}