"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import { ArrowUpRight, X } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { testimonials } from "@/content/testimonials";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

export function TestimonialsCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [reading, setReading] = useState<(typeof testimonials)[number] | null>(null);
  const readingTrigger = useRef<HTMLButtonElement | null>(null);
  const plugins = useMemo(() => [AutoScroll({
    speed: 0.35,
    startDelay: 600,
    stopOnInteraction: false,
    stopOnMouseEnter: false,
    stopOnFocusIn: false,
    breakpoints: { [reducedMotionQuery]: { speed: 0.2 } },
  })], []);

  useEffect(() => {
    if (!api) return;
    if (!reading) {
      api.plugins().autoScroll?.play();
      return;
    }

    let active = true;
    // Resizing and a completed drag can restart the plugin after the dialog opens.
    const keepPaused = () => queueMicrotask(() => {
      if (active) api.plugins().autoScroll?.stop();
    });
    api.on("autoScroll:play", keepPaused).on("reInit", keepPaused);
    api.plugins().autoScroll?.stop();
    return () => {
      active = false;
      api.off("autoScroll:play", keepPaused).off("reInit", keepPaused);
    };
  }, [api, reading]);

  return (
    <>
      <Carousel
        className="testimonials-carousel"
        opts={{ align: "start", loop: true, dragFree: true }}
        setApi={setApi}
        plugins={plugins}
        tabIndex={0}
        aria-label="Depoimentos de clientes"
        aria-describedby="testimonials-instructions"
      >
        <CarouselContent className="testimonials-track">
          {testimonials.map((testimonial, index) => (
            <CarouselItem
              className="testimonials-slide"
              key={testimonial.company}
              aria-label={`${index + 1} de ${testimonials.length}`}
            >
              <figure className="testimonial">
                <div className="testimonial-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</div>
                <span className="quote-mark" aria-hidden="true">“</span>
                <blockquote className={testimonial.quote.length > 300 ? "testimonial-preview" : undefined}>{testimonial.quote}</blockquote>
                {testimonial.quote.length > 300 && (
                  <button
                    type="button"
                    className="testimonial-read-more"
                    aria-label={`Ler depoimento completo de ${testimonial.company}`}
                    aria-haspopup="dialog"
                    onClick={(event) => {
                      readingTrigger.current = event.currentTarget;
                      setReading(testimonial);
                    }}
                  >
                    Ler mais <ArrowUpRight size={16} aria-hidden="true" />
                  </button>
                )}
                <figcaption><strong>{testimonial.company}</strong></figcaption>
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <p className="testimonials-instructions" id="testimonials-instructions">Arraste ou deslize para explorar os depoimentos.<span className="sr-only"> No teclado, use as setas para a esquerda e para a direita.</span></p>
      <Dialog open={reading !== null} onOpenChange={(open) => { if (!open) setReading(null); }}>
        <DialogContent
          className="testimonial-dialog"
          showCloseButton={false}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            readingTrigger.current?.focus({ preventScroll: true });
          }}
        >
          <p className="testimonial-dialog-label">Depoimento completo</p>
          <DialogTitle>{reading?.company}</DialogTitle>
          <DialogDescription className="sr-only">Leia o relato completo deste cliente da Gomes Galvão Contabilidade.</DialogDescription>
          <blockquote>{reading?.quote}</blockquote>
          <DialogClose asChild>
            <button type="button" className="testimonial-dialog-close" aria-label="Fechar depoimento">
              <X size={22} aria-hidden="true" />
            </button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}
