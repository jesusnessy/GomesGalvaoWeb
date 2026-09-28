import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, Check, FileCheck2, Files, MessageCircle, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Imposto de Renda Pessoa Física online | Gomes Galvão Contabilidade",
  description: "Atendimento online para Imposto de Renda em todo o Brasil. Análise, preparação, revisão e acompanhamento da declaração, com orientação próxima e clara.",
  alternates: { canonical: "/imposto-de-renda" },
  openGraph: {
    title: "Sua declaração sem dor de cabeça | Gomes Galvão",
    description: "Imposto de Renda Pessoa Física com atendimento online em todo o Brasil.",
    url: "/imposto-de-renda",
    type: "website",
    locale: "pt_BR",
    siteName: "Gomes Galvão Contabilidade",
  },
  twitter: {
    card: "summary",
    title: "Sua declaração sem dor de cabeça | Gomes Galvão",
    description: "Análise, revisão e acompanhamento do seu Imposto de Renda. Atendimento online em todo o Brasil.",
  },
};

const assessmentUrl = whatsappUrl("Olá! Vim pela página de Imposto de Renda e gostaria de verificar se preciso declarar e como funciona o atendimento online.");
const serviceUrl = whatsappUrl("Olá! Gostaria de conversar sobre a minha declaração de Imposto de Renda Pessoa Física.");
const receiptRules = "https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/quem";
const refundRules = "https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/restituicao/lotes";

const situations = [
  ["Rendimentos tributáveis", "Recebimento acima do limite anual definido pela Receita Federal, como salários, aposentadoria e aluguéis."],
  ["Outros rendimentos", "Rendimentos isentos, não tributáveis ou tributados exclusivamente na fonte acima do limite do exercício."],
  ["Venda de bens", "Ganho de capital sujeito ao imposto ou situações específicas de isenção na venda de imóveis."],
  ["Operações em bolsa", "Operações acima do limite anual ou com ganhos líquidos sujeitos ao imposto."],
  ["Bens e direitos", "Patrimônio em 31 de dezembro acima do limite estabelecido para o exercício."],
  ["Residência no Brasil", "Mudança para a condição de residente durante o ano, permanecendo nessa condição em 31 de dezembro."],
];

const deliverables = [
  ["Análise da sua situação", "Entendemos seus rendimentos, bens e despesas para identificar a forma adequada de declarar."],
  ["Preparação da declaração", "Organizamos as informações e preparamos a declaração a partir dos documentos fornecidos."],
  ["Deduções legais", "Avaliamos as deduções aplicáveis à sua situação, respeitando as regras da Receita Federal."],
  ["Acompanhamento", "Acompanhamos o processamento da declaração e orientamos sobre os próximos passos."],
  ["Apoio em pendências", "Caso surjam inconsistências ou malha fina, orientamos o caminho de regularização."],
  ["Atendimento próximo", "Explicamos cada etapa com clareza para que você saiba o que está sendo feito."],
];

const steps = [
  [MessageCircle, "01", "Primeiro contato", "Converse pelo WhatsApp ou e-mail. Combinamos os documentos necessários e a forma adequada de compartilhá-los."],
  [Files, "02", "Análise e preparação", "Analisamos sua situação e preparamos a declaração com base nas informações recebidas."],
  [ShieldCheck, "03", "Revisão com você", "Conferimos os dados juntos antes da transmissão. Nenhum envio sem a sua validação."],
  [FileCheck2, "04", "Entrega e acompanhamento", "Transmitimos a declaração e acompanhamos seu processamento, incluindo a restituição quando houver."],
] as const;

const faqs = [
  ["O atendimento é somente online?", "Sim. O atendimento de Imposto de Renda é online em todo o território nacional, com orientação pelos canais digitais do escritório."],
  ["Não sei se preciso declarar. Posso consultar?", "Sim. Entre em contato para verificarmos sua situação sem compromisso, considerando as regras do exercício e as informações que você fornecer."],
  ["Preciso enviar meus documentos agora?", "Não. No primeiro contato, conte apenas sua necessidade. A equipe orientará quais documentos são necessários e como compartilhá-los. Não envie senhas, códigos de acesso ou documentos pelo formulário do site."],
  ["Vocês garantem uma restituição maior ou mais rápida?", "Não. A existência e o valor da restituição dependem da sua situação e da apuração do imposto. A ordem de pagamento segue os critérios da Receita Federal. Nosso trabalho é aplicar as regras e deduções cabíveis e acompanhar o processamento."],
];

export default function IncomeTaxPage() {
  return <>
    <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>
    <SiteHeader incomeTax />
    <main id="conteudo" tabIndex={-1}>
      <section className="ir-hero" aria-labelledby="ir-title">
        <div className="container">
          <nav className="breadcrumb" aria-label="Caminho da página"><a href="/">Início</a><span aria-hidden="true">/</span><span aria-current="page">Imposto de Renda</span></nav>
          <div className="ir-hero-grid">
            <div>
              <p className="eyebrow"><span /> Imposto de Renda Pessoa Física</p>
              <h1 id="ir-title">Sua declaração<br />sem <em>dor de cabeça.</em></h1>
              <p className="ir-lead">Atenção aos detalhes, orientação clara e tranquilidade em cada etapa do seu Imposto de Renda.</p>
              <p>Um erro simples pode gerar pendências, multas ou imposto pago a mais. Com a experiência de Sirlene na área contábil desde 1988, a Gomes Galvão ajuda você a organizar as informações e declarar com segurança.</p>
              <div className="hero-actions"><a className="button" href={serviceUrl} target="_blank" rel="noreferrer">Falar sobre minha declaração <ArrowRight size={18} aria-hidden="true" /></a></div>
              <p className="ir-online"><Check size={17} aria-hidden="true" /> Atendimento online em todo o Brasil</p>
            </div>
            <aside className="ir-summary" aria-label="O que você pode esperar do atendimento">
              <div className="ir-summary-heading"><span className="mini-label">Informação organizada. Decisão tranquila.</span><FileCheck2 size={34} strokeWidth={1.4} aria-hidden="true" /></div>
              <h2>Você entende.<br />A gente acompanha.</h2>
              <ul>
                <li><Check size={18} aria-hidden="true" /><span>Análise dos seus documentos e da sua situação.</span></li>
                <li><Check size={18} aria-hidden="true" /><span>Revisão com você antes do envio.</span></li>
                <li><Check size={18} aria-hidden="true" /><span>Orientação após a entrega da declaração.</span></li>
              </ul>
              <div className="ir-experience"><strong>+35</strong><span>anos de experiência de Sirlene<br />na área contábil</span></div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section ir-eligibility" aria-labelledby="quem-declara">
        <div className="container">
          <div className="section-heading heading-row"><div><p className="eyebrow"><span /> Primeiro, entenda sua situação</p><h2 id="quem-declara">Quem precisa declarar?</h2></div><p>A obrigatoriedade depende das regras de cada exercício. Estas são algumas das situações que precisam ser avaliadas.</p></div>
          <div className="ir-situations">{situations.map(([title, body], index) => <article key={title}><span className="mini-label">{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
          <p className="ir-source">A lista não é exaustiva: atividade rural e situações no exterior também podem exigir declaração. <a href={receiptRules} target="_blank" rel="noreferrer">Consulte as regras e os limites vigentes na Receita Federal <ArrowUpRight size={14} aria-hidden="true" /></a>.</p>
          <div className="ir-check-callout"><div><h3>Ainda está em dúvida?</h3><p>Verificamos se você precisa declarar, sem compromisso.</p></div><a className="text-link" href={assessmentUrl} target="_blank" rel="noreferrer">Quero verificar minha situação <ArrowRight size={18} aria-hidden="true" /></a></div>
        </div>
      </section>

      <section className="section ir-services" aria-labelledby="ir-servicos">
        <div className="container">
          <div className="section-heading"><p className="eyebrow"><span /> Do início ao acompanhamento</p><h2 id="ir-servicos">O que fazemos por você.</h2></div>
          <div className="ir-deliverables">{deliverables.map(([title, body]) => <article key={title}><Check size={22} aria-hidden="true" /><div><h3>{title}</h3><p>{body}</p></div></article>)}</div>
          <div className="ir-trust"><ShieldCheck size={25} aria-hidden="true" /><p><strong>Cuidado com a confidencialidade.</strong> Solicitamos as informações necessárias ao atendimento e orientamos o compartilhamento dos documentos. Você não precisa enviar senhas ou códigos de acesso.</p></div>
        </div>
      </section>

      <section className="section ir-process" aria-labelledby="ir-como-funciona">
        <div className="container">
          <div className="section-heading centered-heading"><p className="eyebrow"><span /> Como funciona</p><h2 id="ir-como-funciona">Quatro etapas. Atendimento próximo em todas elas.</h2></div>
          <div className="ir-step-grid">{steps.map(([Icon, number, title, body]) => <article className="process-card" key={number}><div className="process-icon"><Icon size={25} aria-hidden="true" /></div><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
        </div>
      </section>

      <section className="section faq" id="duvidas-ir" aria-labelledby="duvidas-ir-title">
        <div className="container faq-grid">
          <div className="faq-intro"><p className="eyebrow"><span /> Dúvidas frequentes</p><h2 id="duvidas-ir-title">Clareza antes de começar.</h2><p>Sem promessas de restituição. Com análise, cuidado e orientação.</p></div>
          <div className="faq-list">{faqs.map(([question, answer], index) => <details key={question}><summary><span>{String(index + 1).padStart(2, "0")}</span>{question}</summary><p>{answer}</p></details>)}</div>
        </div>
      </section>

      <section className="contact ir-final" aria-labelledby="ir-contato-title">
        <div className="container ir-final-inner">
          <p className="eyebrow eyebrow-light"><span /> Não deixe para a última hora</p>
          <h2 id="ir-contato-title">Organize sua declaração<br />com antecedência.</h2>
          <p>Reserve tempo para reunir os documentos, esclarecer dúvidas e revisar as informações. Atendimento online em todo o território nacional.</p>
          <a className="button" href={serviceUrl} target="_blank" rel="noreferrer">Conversar com a Gomes Galvão <ArrowRight size={18} aria-hidden="true" /></a>
          <p className="ir-disclaimer">A restituição, quando devida, segue a análise e os critérios de prioridade da Receita Federal. <a href={refundRules} target="_blank" rel="noreferrer">Entenda a ordem de pagamento</a>.</p>
        </div>
      </section>
    </main>
    <SiteFooter />
  </>;
}
