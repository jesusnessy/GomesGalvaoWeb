"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SiteBrand } from "@/components/site-brand";
import { whatsappUrl } from "@/lib/site";

export function SiteHeader({ incomeTax = false }: { incomeTax?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const homeLink = (hash: string) => incomeTax ? `/${hash}` : hash;

  useEffect(() => {
    if (!menuOpen) return;
    function dismiss(event: KeyboardEvent | PointerEvent) {
      if (event instanceof KeyboardEvent && event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      } else if (event instanceof PointerEvent && event.target instanceof Node && !header.current?.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("keydown", dismiss);
    document.addEventListener("pointerdown", dismiss);
    return () => {
      document.removeEventListener("keydown", dismiss);
      document.removeEventListener("pointerdown", dismiss);
    };
  }, [menuOpen]);

  return (
    <header className="site-header" ref={header}>
      <div className="container header-inner">
        <a className="brand" href={incomeTax ? "/" : "#inicio"} aria-label="Gomes Galvão — início" onClick={() => setMenuOpen(false)}><SiteBrand /></a>
        <nav id="menu-principal" className={`nav ${menuOpen ? "nav-open" : ""}`} aria-label="Navegação principal">
          <a href={homeLink("#inicio")} onClick={() => setMenuOpen(false)}>Início</a>
          <a href={homeLink("#servicos")} onClick={() => setMenuOpen(false)}>Serviços</a>
          <a href="/imposto-de-renda" aria-current={incomeTax ? "page" : undefined} onClick={() => setMenuOpen(false)}>Imposto de Renda</a>
          <a href={homeLink("#empresa")} onClick={() => setMenuOpen(false)}>O escritório</a>
          <a href={homeLink("#depoimentos")} onClick={() => setMenuOpen(false)}>Depoimentos</a>
          <a href={incomeTax ? "#duvidas-ir" : "#faq"} onClick={() => setMenuOpen(false)}>Dúvidas</a>
          <a href={homeLink("#contato")} onClick={() => setMenuOpen(false)}>Contato</a>
          <a className="button button-small nav-cta" href={whatsappUrl("Olá! Gostaria de falar com a Gomes Galvão Contabilidade.")} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>Falar no WhatsApp</a>
        </nav>
        <button className="menu-button" ref={menuButton} type="button" aria-controls="menu-principal" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}
