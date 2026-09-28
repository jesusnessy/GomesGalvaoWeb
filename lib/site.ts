export const CONTACT_EMAIL = "sirlene@gomesgalvaocontabilidade.com";
export const WHATSAPP_NUMBER = "5541920026651";
export const INSTAGRAM_HANDLE = "gomesgalvaocontabilidade";
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;
// Client-confirmed production domain. The Worker keeps preview hosts noindex.
export const SITE_URL = "https://gomesgalvaocontabilidade.com";
export const SEARCH_INDEXING_ENABLED = true;

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
