"use client";

/* Local image files are served directly because the hosted image optimizer is unavailable. */
/* eslint-disable @next/next/no-img-element */

import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Check,
  FileCheck2,
  MapPin,
  MessageCircle,
  Phone,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { FormEvent, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ExperienceCounter } from "@/components/experience-counter";
import { OfficeHeritage } from "@/components/office-heritage";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { services } from "@/content/services";
import { CONTACT_EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL, OFFICE_ADDRESS, OFFICE_DIRECTIONS_URL, whatsappUrl } from "@/lib/site";

const audiences = [
  "MEI",
  "Pequenas empresas",
  "Médicos e dentistas",
  "Comércio varejista",
  "Bares e restaurantes",
  "Prestadores de serviços",
];

const faqs = [
  {
    question: "A Gomes Galvão atende MEI?",
    answer: "Sim. O escritório oferece acompanhamento para MEI, com orientação para manter o negócio regular e tomar decisões com mais segurança.",
  },
  {
    question: "O atendimento pode ser feito online?",
    answer: "Sim. O atendimento é online para clientes em todo o Brasil. O escritório tem sede em Curitiba e acompanha as demandas pelos canais digitais.",
  },
  {
    question: "Quais serviços estão disponíveis?",
    answer: "Atuamos nas áreas tributária e fiscal, contábil, trabalhista e previdenciária e de legalização empresarial. Também oferecemos acompanhamento ao MEI e atendimento para Imposto de Renda Pessoa Física.",
  },
  {
    question: "Como solicitar um atendimento?",
    answer: "Você pode falar diretamente com a Sirlene pelo WhatsApp ou preencher o formulário. A mensagem será preparada para você revisar antes do envio.",
  },
];

export default function Home() {
  const [preparedContact, setPreparedContact] = useState<{ channel: "whatsapp" | "email"; url: string } | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const channel = submitter?.value === "email" ? "email" : "whatsapp";
    const field = (name: string) => String(data.get(name) ?? "").trim();
    const message = [
      "Olá! Vim pelo formulário do site da Gomes Galvão Contabilidade.",
      "",
      `Nome: ${field("name")}`,
      ...(field("company") ? [`Empresa: ${field("company")}`] : []),
      `Telefone / WhatsApp: ${field("contact")}`,
      `Serviço de interesse: ${field("service")}`,
      "",
      `Necessidade: ${field("message")}`,
    ].join("\n");

    const url = channel === "email"
      ? `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Contato pelo site — Gomes Galvão Contabilidade")}&body=${encodeURIComponent(message)}`
      : whatsappUrl(message);
    setPreparedContact({ channel, url });

    // Keep this synchronous with the submit gesture; the visible link also works
    // when a browser or in-app view blocks external navigation.
    try {
      window.open(url, "_blank", "noopener,noreferrer");
    } catch {
      // The form values and prepared link remain available for another attempt.
    }
  }

  return (
    <>
      <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>

      <SiteHeader />

      <main id="conteudo" tabIndex={-1}>
        <section className="hero" id="inicio">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow"><span /> Atendimento online em todo o Brasil</p>
              <h1>Clareza contábil para você cuidar do seu <em>negócio.</em></h1>
              <p className="hero-lead">
                Atendimento próximo, ágil e responsável para MEIs, pequenas empresas e profissionais que querem crescer com as obrigações em dia.
              </p>
              <div className="hero-actions">
                <a
                  className="button"
                  href={whatsappUrl("Olá! Encontrei o site da Gomes Galvão e gostaria de conversar sobre serviços contábeis.")}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img className="button-whatsapp-icon" src="/icons/whatsapp.svg" alt="" aria-hidden="true" width={22} height={22} /> Fale com a Sirlene
                </a>
                <a className="text-link" href="#servicos">Conheça os serviços <ArrowRight size={18} /></a>
              </div>
              <div className="hero-proof" aria-label="Destaques do escritório">
                <div><strong>2003</strong><span>fundação em Curitiba</span></div>
                <ExperienceCounter compact />
                <div><strong>Online</strong><span>em todo o Brasil</span></div>
              </div>
            </div>

            <div className="hero-visual" aria-label="Escritório Gomes Galvão">
              <div className="hero-image-wrap">
                <img
                  src="/images/escritorio.webp"
                  alt="Ambiente do escritório Gomes Galvão Contabilidade"
                  width={1280}
                  height={720}
                  fetchPriority="high"
                />
              </div>
              <div className="hero-badge">
                <ShieldCheck size={23} />
                <div><strong>Atendimento personalizado</strong><span>Orientação clara em cada etapa</span></div>
              </div>
              <img className="hero-symbol" src="/brand/symbol-3d.webp" alt="" aria-hidden="true" width={320} height={320} />
            </div>
          </div>
        </section>

        <section className="audience-strip" aria-labelledby="audience-title">
          <div className="container audience-inner">
            <h2 id="audience-title">Contabilidade para quem faz acontecer</h2>
            <div className="audience-list">
              {audiences.map((audience) => <span key={audience}>{audience}</span>)}
            </div>
          </div>
        </section>

        <section className="reform-section" aria-labelledby="reforma-title">
          <div className="container reform-card">
            <div className="reform-icon"><ShieldCheck size={36} strokeWidth={1.5} aria-hidden="true" /></div>
            <div>
              <p className="reform-label"><Check size={15} aria-hidden="true" /> ATUALIZAÇÃO LEGISLATIVA GARANTIDA</p>
              <h2 id="reforma-title">Adequado à Reforma Tributária</h2>
              <p>Nosso escritório está plenamente preparado e atualizado para assessorar sua empresa diante das mudanças trazidas pela Reforma Tributária, garantindo conformidade e planejamento fiscal desde já.</p>
            </div>
            <a className="button" href={whatsappUrl("Olá! Vim pelo site e gostaria de entender como a Reforma Tributária afeta a minha empresa.")} target="_blank" rel="noreferrer">Falar sobre a Reforma <ArrowRight size={18} aria-hidden="true" /></a>
          </div>
        </section>

        <section className="section services" id="servicos">
          <div className="container">
            <div className="section-heading heading-row">
              <div><p className="eyebrow"><span /> Serviços</p><h2>Sua empresa organizada, da abertura ao dia a dia.</h2></div>
              <p>Soluções contábeis para decisões seguras, menos retrabalho e mais tranquilidade na gestão.</p>
            </div>

            <div className="service-grid">
              {services.map((service, index) => {
                const Icon = [ReceiptText, FileCheck2, Users, Building2][index];
                return (
                  <article className="service-card" key={service.title}>
                    <div className="card-topline"><span>{service.number}</span><Icon size={25} strokeWidth={1.7} /></div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <ul>{service.items.map((item) => {
                      const colon = item.indexOf(":");
                      return <li key={item}><Check size={16} aria-hidden="true" /><span>{colon >= 0 ? <><strong>{item.slice(0, colon)}:</strong>{item.slice(colon + 1)}</> : item}</span></li>;
                    })}</ul>
                    <a className="text-link service-action" href={whatsappUrl(`Olá! Gostaria de conversar sobre ${service.title.toLowerCase()}.`)} target="_blank" rel="noreferrer" aria-label={`Conversar sobre ${service.title.toLowerCase()}`}>Conversar sobre este serviço <ArrowRight size={17} aria-hidden="true" /></a>
                  </article>
                );
              })}
            </div>

            <a className="income-tax-teaser" href="/imposto-de-renda">
              <span className="teaser-icon"><ReceiptText size={27} aria-hidden="true" /></span>
              <span><span className="mini-label">Imposto de Renda Pessoa Física</span><strong>Sua declaração sem dor de cabeça.</strong><span>Conheça o atendimento online, da análise ao acompanhamento.</span></span>
              <ArrowUpRight size={26} aria-hidden="true" />
            </a>

            <div className="mei-callout">
              <div className="mei-icon"><BriefcaseBusiness size={28} /></div>
              <div>
                <p className="mini-label">Acompanhamento para MEI</p>
                <h3>Você não precisa resolver tudo sozinho.</h3>
                <p>Receba orientação personalizada para manter o seu negócio regular e tomar decisões com mais segurança.</p>
              </div>
              <a
                className="text-link"
                href={whatsappUrl("Olá! Sou MEI e gostaria de saber como funciona o acompanhamento da Gomes Galvão.")}
                target="_blank"
                rel="noreferrer"
              >
                Quero orientação <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        <section className="section difference">
          <div className="container difference-grid">
            <div className="difference-intro">
              <p className="eyebrow eyebrow-light"><span /> Nosso jeito de trabalhar</p>
              <h2>Técnica para resolver. Proximidade para orientar.</h2>
              <p>Cada empresa tem uma realidade. Por isso, o atendimento começa pela escuta e continua com respostas claras, responsabilidade e acompanhamento próximo.</p>
              <div className="signature"><span>Desde 2003</span><strong>Gomes Galvão</strong></div>
            </div>

            <div className="difference-list">
              {[
                ["01", "Atendimento personalizado", "Você fala com quem conhece a realidade da sua empresa."],
                ["02", "Agilidade no atendimento", "Dúvidas e demandas tratadas com objetividade e atenção."],
                ["03", "Suporte digital e online", "Rotinas financeiras e fiscais acompanhadas sem complicação."],
                ["04", "Consultoria preventiva", "Orientação para reduzir riscos e possíveis passivos tributários."],
                ["05", "Apoio aos recursos humanos", "Suporte para obrigações e gestão de benefícios da equipe."],
              ].map(([number, title, text]) => (
                <article key={number}>
                  <span>{number}</span>
                  <div><h3>{title}</h3><p>{text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section about" id="empresa">
          <div className="container about-grid">
            <OfficeHeritage />
            <div className="about-copy">
              <p className="eyebrow"><span /> Sobre o escritório</p>
              <h2>Experiência que se traduz em confiança.</h2>
              <p className="about-lead">À frente do escritório está <strong>Sirlene Correia Gomes Galvão</strong>, com atuação na área contábil desde 1988 e formação técnica em 1994.</p>
              <p>Fundada em Curitiba em janeiro de 2003, a Gomes Galvão Contabilidade reúne essa experiência em um atendimento próximo, ético e responsável para micro e pequenas empresas, com suporte online em todo o Brasil.</p>
              <blockquote className="founder-quote">
                <p>“Iniciei minhas atividades na área contábil em 1988. São mais de três décadas de trajetória unindo tradição, rigor técnico e atualização constante para oferecer segurança contábil, fiscal e societária aos nossos clientes.”</p>
                <cite>Sirlene Correia Gomes Galvão</cite>
              </blockquote>
              <ul className="professional-credentials" aria-label="Trajetória e registro de Sirlene">
                <li><Check size={16} aria-hidden="true" /> Atuação desde 1988</li>
                <li><Check size={16} aria-hidden="true" /> Formação técnica em 1994</li>
                <li><ShieldCheck size={16} aria-hidden="true" /> CRC/PR 042726-O4</li>
              </ul>
              <a
                className="text-link"
                href={whatsappUrl("Olá, Sirlene! Gostaria de conhecer melhor o atendimento da Gomes Galvão.")}
                target="_blank"
                rel="noreferrer"
              >
                Converse com a Sirlene <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        <section className="section process">
          <div className="container">
            <div className="section-heading centered-heading"><p className="eyebrow"><span /> Como funciona</p><h2>Um começo simples e sem burocracia.</h2></div>
            <div className="process-grid">
              {[
                [MessageCircle, "01", "Conte o que precisa", "Fale sobre sua empresa, momento atual e principal necessidade."],
                [Sparkles, "02", "Receba uma orientação", "Entendemos o cenário e indicamos o caminho contábil adequado."],
                [FileCheck2, "03", "Avance com segurança", "Organizamos os próximos passos e acompanhamos sua rotina."],
              ].map(([Icon, number, title, text]) => {
                const StepIcon = Icon as typeof MessageCircle;
                return (
                  <article className="process-card" key={String(number)}>
                    <div className="process-icon"><StepIcon size={25} /></div>
                    <span>{String(number)}</span><h3>{String(title)}</h3><p>{String(text)}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section testimonials" id="depoimentos">
          <div className="container">
            <div className="section-heading heading-row">
              <div><p className="eyebrow"><span /> Depoimentos</p><h2>Confiança construída no dia a dia.</h2></div>
              <p>Relações duradouras baseadas em competência, clareza e atendimento humano.</p>
            </div>
            <TestimonialsCarousel />
          </div>
        </section>

        <section className="section faq" id="faq" aria-labelledby="faq-title">
          <div className="container faq-grid">
            <div className="faq-intro">
              <p className="eyebrow"><span /> Dúvidas frequentes</p>
              <h2 id="faq-title">Informação clara antes do primeiro contato.</h2>
              <p>Confira respostas rápidas sobre atendimento, serviços e próximos passos.</p>
            </div>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <details key={faq.question}>
                  <summary><span>{String(index + 1).padStart(2, "0")}</span>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="contact" id="contato">
          <div className="container contact-grid">
            <div className="contact-copy">
              <p className="eyebrow eyebrow-light"><span /> Vamos conversar</p>
              <h2>Sua contabilidade pode ser mais clara e próxima.</h2>
              <p>Conte brevemente o que você precisa e continue no WhatsApp para conversar com a Sirlene. Você poderá revisar a mensagem antes de enviar.</p>
              <div className="contact-links">
                <a href={`mailto:${CONTACT_EMAIL}`}>
                  <img className="contact-brand-icon" src="/icons/gmail.svg" alt="" aria-hidden="true" width={150} height={150} /><span><small>E-mail</small>{CONTACT_EMAIL}</span>
                </a>
                <a href="tel:+554120026651">
                  <Phone size={22} aria-hidden="true" /><span><small>Telefone</small>(41) 2002-6651</span>
                </a>
                <a href={whatsappUrl("Olá! Gostaria de conversar sobre serviços contábeis.")} target="_blank" rel="noreferrer">
                  <img className="contact-brand-icon" src="/icons/whatsapp.svg" alt="" aria-hidden="true" width={22} height={22} /><span><small>WhatsApp</small>(41) 92002-6651</span>
                </a>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label={`Instagram @${INSTAGRAM_HANDLE} (abre em nova aba)`}>
                  <img className="contact-brand-icon" src="/icons/instagram.svg" alt="" aria-hidden="true" width={22} height={22} /><span><small>Instagram</small>@{INSTAGRAM_HANDLE}</span>
                </a>
                <p className="company-location"><small>Atendimento</small>Online em todo o Brasil · sede em Curitiba/PR</p>
                <address className="company-address">
                  <small>Endereço</small>
                  <span>{OFFICE_ADDRESS.streetAddress}</span>
                  <span>{OFFICE_ADDRESS.neighborhood} · {OFFICE_ADDRESS.addressLocality}/{OFFICE_ADDRESS.addressRegion}</span>
                  <span>CEP {OFFICE_ADDRESS.postalCode}</span>
                </address>
                <a className="office-directions" href={OFFICE_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" aria-label="Como chegar à Gomes Galvão no Google Maps (abre em nova aba)">
                  <MapPin size={22} aria-hidden="true" /><span>Como chegar</span><ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
              <p className="business-hours">Atendimento de segunda a sexta, das 9h às 18h.</p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit} onChange={() => setPreparedContact(null)} aria-label="Contato pelo WhatsApp ou e-mail" aria-describedby="contact-form-note">
              <p className="form-intro">Os campos com * são obrigatórios. Não inclua senhas, documentos ou dados fiscais sensíveis.</p>
              <div className="form-row">
                <label>Nome *<input name="name" type="text" autoComplete="name" required minLength={2} maxLength={100} placeholder="Seu nome" /></label>
                <label>Empresa<input name="company" type="text" autoComplete="organization" maxLength={150} placeholder="Nome da empresa" /></label>
              </div>
              <div className="form-row">
                <label>Telefone / WhatsApp *<input name="contact" type="tel" inputMode="tel" autoComplete="tel" required minLength={8} maxLength={25} pattern={"[+0-9\\(\\) .\\-]{8,25}"} title="Informe seu telefone com DDD, usando números e, se necessário, +, espaços, parênteses ou hífen." placeholder="(41) 99999-9999" /></label>
                <label>
                  Serviço de interesse *
                  <select name="service" required defaultValue="">
                    <option value="" disabled>Selecione</option>
                    <option>Abertura ou regularização</option>
                    <option>Contabilidade empresarial</option>
                    <option>Consultoria tributária</option>
                    <option>Folha de pagamento</option>
                    <option>Acompanhamento para MEI</option>
                    <option>Imposto de renda</option>
                    <option>Outro assunto</option>
                  </select>
                </label>
              </div>
              <label>Como podemos ajudar? *<textarea name="message" rows={4} required minLength={10} maxLength={1500} placeholder="Descreva brevemente sua necessidade" /></label>
              <label className="consent"><input type="checkbox" required /><span>Concordo em compartilhar estas informações com a Gomes Galvão pelo WhatsApp ou e-mail para receber atendimento.</span></label>
              <div className="form-actions">
                <button className="button form-button" type="submit" name="channel" value="whatsapp"><img src="/icons/whatsapp.svg" alt="" aria-hidden="true" width={20} height={20} />Continuar no WhatsApp</button>
                <button className="form-email-alternative" type="submit" name="channel" value="email">Prefiro enviar por e-mail</button>
              </div>
              <p className="form-note" id="contact-form-note" aria-live="polite">
                {preparedContact?.channel === "whatsapp"
                  ? "Mensagem preparada. Confirme o envio no WhatsApp para que a Sirlene a receba. Se o WhatsApp não abriu, use o link abaixo. O que você escreveu continua no formulário."
                  : preparedContact?.channel === "email"
                    ? `Mensagem preparada para ${CONTACT_EMAIL}. Ela ainda não foi enviada. Abra seu aplicativo de e-mail e confirme o envio. Se não abriu, use o link abaixo ou continue pelo WhatsApp.`
                    : "Ao continuar, o WhatsApp será aberto para você revisar a mensagem e confirmar o envio. A opção por e-mail precisa de um aplicativo ou serviço de e-mail configurado no navegador."}
              </p>
              {preparedContact && <a className="prepared-contact" href={preparedContact.url} target="_blank" rel="noopener noreferrer">{preparedContact.channel === "whatsapp" ? "Abrir WhatsApp novamente" : "Abrir no aplicativo de e-mail"}<ArrowUpRight size={16} aria-hidden="true" /></a>}
            </form>
          </div>
        </section>

        <section className="privacy" id="privacidade">
          <div className="container privacy-inner">
            <h2>Privacidade e uso de dados</h2>
            <p>Os dados preenchidos no formulário não são armazenados pelo site. Ao continuar, as informações são encaminhadas ao WhatsApp para preparar sua mensagem, e você deve confirmar o envio ao escritório. Se escolher e-mail, a mensagem será aberta no aplicativo ou serviço configurado, também para sua revisão e envio. O tratamento das informações segue as regras do canal escolhido. Use este formulário somente para solicitar atendimento e não inclua senhas, documentos ou dados fiscais sensíveis.</p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
