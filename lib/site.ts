export const CONTACT_EMAIL = "sirlene@gomesgalvaocontabilidade.com";
export const WHATSAPP_NUMBER = "5541920026651";
export const INSTAGRAM_HANDLE = "gomesgalvaocontabilidade";
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;
// Client-confirmed production domain. The Worker keeps preview hosts noindex.
export const SITE_URL = "https://gomesgalvaocontabilidade.com";
export const SEARCH_INDEXING_ENABLED = true;
// Link preview image (see app/og-image.png/route.tsx).
export const SHARE_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Gomes Galvão Contabilidade — atendimento online em todo o Brasil",
};

export const OFFICE_ADDRESS = {
  streetAddress: "Rua Napoleão Lopes, 80 · Apto 05, 3º andar",
  neighborhood: "São Francisco",
  addressLocality: "Curitiba",
  addressRegion: "PR",
  postalCode: "80530-090",
  addressCountry: "BR",
};
// Google Maps must receive only street + number: with the apartment number it
// snaps to another business at no. 110 instead of the building at no. 80.
const officeMapDestination = "R. Napoleão Lopes, 80 - São Francisco, Curitiba - PR, 80530-090";
export const OFFICE_MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(officeMapDestination)}`;
export const OFFICE_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(officeMapDestination)}`;

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
