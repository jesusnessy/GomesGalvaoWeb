/* eslint-disable @next/next/no-img-element */
import { ArrowUpRight } from "lucide-react";
import { SiteBrand } from "@/components/site-brand";
import { CONTACT_EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL, whatsappUrl } from "@/lib/site";

export function SiteFooter() {
  return <>
    <aside className="instagram-callout" aria-label="Instagram da Gomes Galvão">
      <div className="container">
        <a className="instagram-callout-link" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label={`Acompanhe dicas contábeis no Instagram @${INSTAGRAM_HANDLE} (abre em nova aba)`}>
          <img src="/icons/instagram.svg" alt="" aria-hidden="true" width={28} height={28} />
          <span className="instagram-callout-copy"><strong>Acompanhe dicas contábeis no Instagram</strong><span>@{INSTAGRAM_HANDLE}</span></span>
          <ArrowUpRight size={22} aria-hidden="true" />
        </a>
      </div>
    </aside>
    <footer className="footer">
      <div className="container footer-top">
        <a className="brand" href="/" aria-label="Gomes Galvão — início"><SiteBrand negative /></a>
        <p>Contabilidade próxima, ágil e digital.<br />Atendimento online em todo o Brasil.</p>
        <div className="social-links">
          <a className="social-instagram" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label={`Instagram @${INSTAGRAM_HANDLE} (abre em nova aba)`}><img src="/icons/instagram.svg" alt="" aria-hidden="true" width={21} height={21} /><span>@{INSTAGRAM_HANDLE}</span></a>
          <a href={`mailto:${CONTACT_EMAIL}`} aria-label="Enviar e-mail"><img src="/icons/gmail.svg" alt="" aria-hidden="true" width={21} height={21} /></a>
        </div>
      </div>
      <div className="container footer-navigation" aria-label="Links do rodapé">
        <a href="/#servicos">Serviços para empresas</a>
        <a href="/imposto-de-renda">Imposto de Renda</a>
        <a href="/#empresa">O escritório</a>
        <a href="/#contato">Contato</a>
      </div>
      <div className="container company-credentials">
        <span>Gomes Galvão Contabilidade LTDA · CNPJ 07.110.763/0001-34</span>
        <a href="https://contaazul.com/encontre-contador/contadores/gomes-galvao-contabilidade-ltda/" target="_blank" rel="noreferrer">Contador parceiro Conta Azul <ArrowUpRight size={15} aria-hidden="true" /></a>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Gomes Galvão Contabilidade.</span>
        <div><a href="/#privacidade">Privacidade</a><a href="#conteudo">Voltar ao topo</a></div>
      </div>
    </footer>
    <a className="floating-whatsapp" href={whatsappUrl("Olá! Encontrei o site da Gomes Galvão e gostaria de conversar.")} target="_blank" rel="noreferrer" aria-label="Falar com a Gomes Galvão pelo WhatsApp">
      <img src="/icons/whatsapp.svg" alt="" aria-hidden="true" width={26} height={26} />
    </a>
  </>;
}
