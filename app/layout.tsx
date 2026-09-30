import type { Metadata } from "next";
import { CONTACT_EMAIL, INSTAGRAM_URL, OFFICE_ADDRESS, OFFICE_MAP_URL, SEARCH_INDEXING_ENABLED, SHARE_IMAGE, SITE_URL } from "@/lib/site";
import { services } from "@/content/services";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Gomes Galvão Contabilidade | Atendimento online em todo o Brasil",
  description: "Serviços tributários, contábeis, trabalhistas, legalização empresarial e Imposto de Renda. Escritório em Curitiba com atendimento online em todo o Brasil.",
  alternates: { canonical: "/" },
  icons: { icon: "/brand/symbol.svg", shortcut: "/brand/symbol.svg" },
  robots: { index: SEARCH_INDEXING_ENABLED, follow: true },
  twitter: {
    card: "summary_large_image",
    title: "Gomes Galvão Contabilidade | Atendimento online",
    description: "Contabilidade próxima, responsável e online para clientes em todo o Brasil.",
    images: [SHARE_IMAGE.url],
  },
  openGraph: {
    title: "Gomes Galvão Contabilidade | Atendimento online",
    description: "Contabilidade próxima, responsável e online para clientes em todo o Brasil.",
    url: "/",
    type: "website",
    locale: "pt_BR",
    siteName: "Gomes Galvão Contabilidade",
    images: [SHARE_IMAGE],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "@id": `${SITE_URL}/#escritorio`,
    name: "Gomes Galvão Contabilidade",
    legalName: "Gomes Galvão Contabilidade LTDA",
    taxID: "07.110.763/0001-34",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/symbol-3d.webp`,
    image: `${SITE_URL}/images/escritorio.webp`,
    email: CONTACT_EMAIL,
    telephone: "+55 41 2002-6651",
    foundingDate: "2003",
    areaServed: { "@type": "Country", name: "Brasil" },
    openingHours: "Mo-Fr 09:00-18:00",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${OFFICE_ADDRESS.streetAddress} - ${OFFICE_ADDRESS.neighborhood}`,
      addressLocality: OFFICE_ADDRESS.addressLocality,
      addressRegion: OFFICE_ADDRESS.addressRegion,
      postalCode: OFFICE_ADDRESS.postalCode,
      addressCountry: OFFICE_ADDRESS.addressCountry,
    },
    hasMap: OFFICE_MAP_URL,
    sameAs: [
      INSTAGRAM_URL,
      "https://contaazul.com/encontre-contador/contadores/gomes-galvao-contabilidade-ltda/",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+55 41 2002-6651",
      contactType: "atendimento ao cliente",
      availableLanguage: "Portuguese",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços contábeis",
      itemListElement: [
        ...services.map((service) => service.title),
        "Imposto de Renda Pessoa Física — atendimento online",
        "Acompanhamento para MEI",
      ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
    },
  };

  return (
    <html lang="pt-BR">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}
