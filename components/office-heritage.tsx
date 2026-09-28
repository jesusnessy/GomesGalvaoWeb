"use client";

import { useEffect, useRef, useState } from "react";
import { SiteBrand } from "@/components/site-brand";
import { ExperienceCounter } from "@/components/experience-counter";

const milestones = [
  { year: "1988", description: "Início da trajetória contábil de Sirlene" },
  { year: "1994", description: "Formação técnica em Contabilidade" },
  { year: "2003", description: "Fundação da Gomes Galvão" },
];

export function OfficeHeritage() {
  const ref = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [counterReplay, setCounterReplay] = useState(0);

  useEffect(() => {
    const card = ref.current;
    if (!card) return;

    const stepDuration = 3000;
    const cycleDuration = stepDuration * 4;
    let frame = 0;
    let elapsed = 0;
    let lastTime = 0;
    let previousStep = 0;
    let inView = false;

    const tick = (now: number) => {
      elapsed = (elapsed + Math.min(now - lastTime, 100)) % cycleDuration;
      lastTime = now;
      const step = Math.floor(elapsed / stepDuration);
      if (step !== previousStep) {
        previousStep = step;
        setActiveStep(step);
        if (step === 3) setCounterReplay((value) => value + 1);
      }
      // Inline progress remains active when a global CSS rule disables animations.
      const first = Math.min(Math.max((elapsed - 500) / 2500, 0), 1);
      const second = Math.min(Math.max((elapsed - 3500) / 2500, 0), 1);
      card.style.setProperty("--heritage-first-progress", first.toFixed(3));
      card.style.setProperty("--heritage-second-progress", second.toFixed(3));
      frame = requestAnimationFrame(tick);
    };

    const syncPlayback = () => {
      cancelAnimationFrame(frame);
      if (!inView || document.hidden) return;
      lastTime = performance.now();
      frame = requestAnimationFrame(tick);
    };

    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver(([entry]) => {
          const nextInView = entry.isIntersecting;
          if (nextInView && !inView) {
            elapsed = 0;
            previousStep = 0;
            setActiveStep(0);
          }
          inView = nextInView;
          syncPlayback();
        }, { threshold: 0 })
      : null;

    if (observer) observer.observe(card);
    else {
      inView = true;
      syncPlayback();
    }
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, []);

  return (
    <aside className="heritage-card" ref={ref} aria-labelledby="heritage-title" data-active-step={activeStep}>
      <div className="heritage-brand"><SiteBrand /></div>
      <h3 className="heritage-kicker" id="heritage-title">Nossa trajetória</h3>
      <ol className="heritage-timeline">
        {milestones.map(({ year, description }, index) => (
          <li key={year} data-active={activeStep === index ? "true" : undefined}>
            <span className="heritage-stage-highlight" aria-hidden="true" />
            {index < milestones.length - 1 && <span className="heritage-connector" aria-hidden="true" />}
            <time dateTime={year}>{year}</time>
            <p>{description}</p>
          </li>
        ))}
      </ol>
      <div className="heritage-experience" data-active={activeStep === 3 ? "true" : undefined}>
        <ExperienceCounter key={counterReplay} />
        <p>Experiência profissional de Sirlene</p>
      </div>
    </aside>
  );
}
