/* eslint-disable @next/next/no-img-element */
export function SiteBrand({ negative = false }: { negative?: boolean }) {
  return (
    <span className="brand-lockup" role="img" aria-label="Gomes Galvão Contabilidade">
      <img className="brand-mark" src="/brand/symbol-3d.webp" alt="" aria-hidden="true" width={320} height={320} />
      <img className="brand-wordmark" src={negative ? "/brand/wordmark-negative.svg" : "/brand/wordmark.svg"} alt="" aria-hidden="true" width={311} height={68} />
    </span>
  );
}
