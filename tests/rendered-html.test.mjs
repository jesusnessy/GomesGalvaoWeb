import assert from "node:assert/strict";
import test from "node:test";

test("renders production metadata and core content", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("https://gomesgalvaocontabilidade.com/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(html, /<title>Gomes Galvão Contabilidade/);
  assert.match(html, /<meta name="robots" content="index, follow"/);
  assert.equal(response.headers.get("x-robots-tag"), null);
  assert.match(html, /<link rel="canonical" href="https:\/\/gomesgalvaocontabilidade\.com\/"/);
  assert.match(html, /Dúvidas frequentes/);
  assert.doesNotMatch(html, /Lucas Molinari|Mauricio M\. Bianchi|Cliente Gomes Galvão/);
  assert.match(html, /Distrito da Cerveja/);
  assert.match(html, /LINMA Engenharia/);
  assert.match(html, /4you Gym Academia Premium/);
  assert.match(html, /Home Picz/);
  assert.match(html, /CA PIOTROWSKI CONSULTORIA/);
  assert.match(html, /NOWA NEGÓCIOS IMOBILIÁRIOS/);
  const testimonialSection = html.match(/<section\b[^>]*id="depoimentos"[^>]*>([\s\S]*?)<\/section>/)?.[1] ?? "";
  assert.equal((testimonialSection.match(/<figure class="testimonial"/g) ?? []).length, 6, "All six testimonials are retained in the interactive carousel");
  assert.match(testimonialSection, /aria-roledescription="carousel"/);
  assert.match(testimonialSection, /tabindex="0"/);
  assert.match(testimonialSection, /Arraste ou deslize/);
  assert.doesNotMatch(testimonialSection, /testimonial-group|testimonial-belt/);
  assert.match(testimonialSection, /Em resumo, é de minha mais alta confiança!/);
  assert.match(testimonialSection, /Parceiros de muitos anos ainda à frente\./);
  assert.match(html, /Mais de 35 anos de experiência de Sirlene/);
  assert.match(html, /Atuação desde 1988/);
  assert.match(html, /Formação técnica em 1994/);
  assert.match(html, /CRC\/PR 042726-O4/);
  assert.doesNotMatch(html, /contadora desde 1994/);
  assert.match(html, /Área Tributária e Fiscal/);
  assert.match(html, /Área Contábil/);
  assert.match(html, /Área Trabalhista e Previdenciária/);
  assert.match(html, /Área de Legalização Empresarial/);
  assert.match(html, /Apuração do IBS\/CBS/);
  assert.ok(html.indexOf('id="reforma-title"') < html.indexOf('id="servicos"'));
  assert.match(html, /mailto:sirlene@gomesgalvaocontabilidade\.com/);
  assert.doesNotMatch(html, /galvao@galvaocontabilidade\.com\.br/);
  assert.match(html, /href="https:\/\/www\.instagram\.com\/gomesgalvaocontabilidade\/"/);
  assert.match(html, /Instagram @gomesgalvaocontabilidade/);
  assert.match(html, /Contato pelo WhatsApp ou e-mail/);
  assert.match(html, /Continuar no WhatsApp/);
  assert.match(html, /Prefiro enviar por e-mail/);
  assert.match(html, /revisar a mensagem e confirmar o envio/);
  assert.doesNotMatch(html, /sirlene@gomesgalvaocontabiliade/);
  assert.match(html, /href="\/imposto-de-renda"/);
  assert.doesNotMatch(html, /Pausar depoimentos/);
  assert.match(html, /"@type":"AccountingService"/);
  assert.doesNotMatch(html, /codex-preview/);
});

test("income-tax page has its own metadata, safe claims and working home navigation", async () => {
  const { default: worker } = await import(new URL("../dist/server/index.js", import.meta.url).href);
  const response = await worker.fetch(new Request("https://gomesgalvaocontabilidade.com/imposto-de-renda", { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>Imposto de Renda Pessoa Física online/);
  assert.match(html, /<link rel="canonical" href="https:\/\/gomesgalvaocontabilidade\.com\/imposto-de-renda"/);
  assert.match(html, /<meta name="robots" content="index, follow"/);
  assert.match(html, /Sua declaração/);
  assert.match(html, /Atendimento online em todo o Brasil/);
  assert.match(html, /href="\/#inicio"/);
  assert.match(html, /href="\/#servicos"/);
  assert.match(html, /href="\/#contato"/);
  assert.match(html, /aria-current="page"/);
  assert.match(html, /wa\.me\/5541920026651/);
  assert.match(html, /Nenhum envio sem a sua validação/);
  assert.match(html, /gov\.br\/receitafederal/);
  assert.doesNotMatch(html, /R\$|Sigilo absoluto|Garanta seu lugar na fila|Quem declara cedo recebe/);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
});

test("client www redirects to the canonical domain and preview stays noindex", async () => {
  const { default: worker } = await import(new URL("../dist/server/index.js", import.meta.url).href);
  const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
  const ctx = { waitUntil() {}, passThroughOnException() {} };
  const redirect = await worker.fetch(new Request("https://www.gomesgalvaocontabilidade.com/imposto-de-renda?origem=instagram"), env, ctx);
  assert.equal(redirect.status, 308);
  assert.equal(redirect.headers.get("location"), "https://gomesgalvaocontabilidade.com/imposto-de-renda?origem=instagram");
  const preview = await worker.fetch(new Request("https://gomesgalvao.supernessy.com/", { headers: { accept: "text/html" } }), env, ctx);
  assert.equal(preview.status, 200);
  assert.equal(preview.headers.get("x-robots-tag"), "noindex, follow");
  await preview.body.cancel();
  const sitemap = await worker.fetch(new Request("https://gomesgalvaocontabilidade.com/sitemap.xml"), env, ctx);
  assert.equal(sitemap.status, 200);
  const xml = await sitemap.text();
  assert.match(xml, /https:\/\/gomesgalvaocontabilidade\.com\/imposto-de-renda/);
  assert.doesNotMatch(xml, /supernessy/);
});
