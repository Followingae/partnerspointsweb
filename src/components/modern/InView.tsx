"use client";
import { useEffect, useRef } from "react";

export default function InView({
  children,
  once = true,
  rootMargin = "0px 0px -10% 0px",
  className = "",
}: {
  children: React.ReactNode;
  once?: boolean;
  rootMargin?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            el.classList.add("is-inview");
            if (once) obs.unobserve(el);
          } else if (!once) {
            el.classList.remove("is-inview");
          }
        });
      },
      { root: null, rootMargin, threshold: 0.2 }
    );
    
    obs.observe(el);
    return () => obs.disconnect();
  }, [once, rootMargin]);

  return <div ref={ref} className={className}>{children}</div>;
}