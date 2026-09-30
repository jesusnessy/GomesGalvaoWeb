import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Link preview image (WhatsApp, LinkedIn, Facebook…), generated at build time.
// Served as /og-image.png so static hosts send it with an image/png type.
export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

export async function GET() {
  const logo = await readFile(join(process.cwd(), "public/brand/logo.svg"));
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fbfaf7",
          borderLeft: "24px solid #c6990b",
          padding: "72px 88px",
          color: "#231f20",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={700} height={182} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.15, maxWidth: 960 }}>
            Contabilidade próxima, ágil e responsável para o seu negócio.
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 30, color: "#474143" }}>
            Atendimento online em todo o Brasil · Curitiba/PR
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#8a6a07", fontWeight: 700 }}>
          gomesgalvaocontabilidade.com
        </div>
      </div>
    ),
    size,
  );
}
