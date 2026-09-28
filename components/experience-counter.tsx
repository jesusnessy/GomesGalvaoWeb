"use client";

import { useEffect, useRef, useState } from "react";

export const EXPERIENCE_YEARS = 35;
export const COUNTER_DURATION = 1600;

export function ExperienceCounter({ compact = false }: { compact?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  // Useful even without JavaScript; animate only after visibility is established.
  const [value, setValue] = useState(EXPERIENCE_YEARS);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches || !("IntersectionObserver" in window)) return;
    let frame = 0;
    let started = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      observer.disconnect();
      const start = performance.now();
      setValue(0);
      const tick = (now: number) => {
        const progress = Math.min(Math.max((now - start) / COUNTER_DURATION, 0), 1);
        setValue(Math.round(EXPERIENCE_YEARS * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.35 });
    const stopMotion = () => {
      if (!reducedMotion.matches) return;
      observer.disconnect();
      cancelAnimationFrame(frame);
      setValue(EXPERIENCE_YEARS);
    };
    observer.observe(element);
    reducedMotion.addEventListener("change", stopMotion);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      reducedMotion.removeEventListener("change", stopMotion);
    };
  }, []);

  return <div ref={ref} className={compact ? "experience-counter" : "experience-counter about-experience"} aria-label="Mais de 35 anos de experiência de Sirlene na área contábil">
    <strong aria-hidden="true">+{value}</strong>
    <span aria-hidden="true">{compact ? "anos na área contábil" : "anos de experiência na área contábil"}</span>
  </div>;
}
