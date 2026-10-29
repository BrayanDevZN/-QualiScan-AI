import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

import { Container } from "@/components/ui";
import { Reveal } from "@/components/motion/Reveal";
import { MaterialCapture } from "@/features/material-capture/MaterialCapture";
import { AppHeader } from "@/layouts/AppHeader";
import { AppShell } from "@/layouts/AppShell";

const photoTips = [
  "Use iluminação uniforme e evite sombras fortes.",
  "Enquadre toda a região que precisa ser verificada.",
  "Evite reflexos, desfoque e objetos cobrindo a peça.",
  "Para conferir dimensões, mostre as bordas inteiras. As medidas são sempre em milímetros (mm).",
];

export function ScanPage() {
  return (
    <AppShell>
      <AppHeader />
      <main className="pb-24 pt-8 sm:pt-12">
        <Container>
          <Link className="inline-flex items-center gap-2 text-base font-semibold text-ink-muted transition-colors hover:text-brand" to="/home">
            <ArrowLeft aria-hidden className="size-4" /> Voltar ao início
          </Link>

          <Reveal className="mt-8 flex flex-col gap-4">
            <h1 className="text-page-title text-ink">Capture o material</h1>
            <p className="max-w-2xl text-lg leading-8 text-ink-muted">
              Registre uma imagem clara para preparar a identificação e os pontos de atenção da inspeção.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-8 lg:grid-cols-[19rem_minmax(0,1fr)] xl:gap-12">
            <Reveal className="order-last lg:order-first">
              <aside className="flex flex-col gap-8">
                <div>
                  <h2 className="text-xl font-bold text-ink">Antes da foto</h2>
                  <ol className="mt-4 flex list-decimal flex-col gap-3 pl-5 marker:font-bold marker:text-brand">
                    {photoTips.map((text) => (
                      <li className="pl-2 text-base leading-7 text-ink-muted" key={text}>{text}</li>
                    ))}
                  </ol>
                </div>

                <div className="rounded-sm bg-success-soft p-5">
                  <h2 className="flex items-center gap-2 text-base font-bold text-ink">
                    <ShieldCheck aria-hidden className="size-5 text-success" /> Privacidade do protótipo
                  </h2>
                  <p className="mt-2 text-base leading-7 text-ink-muted">A imagem permanece no navegador e não é enviada para nenhum servidor.</p>
                </div>
              </aside>
            </Reveal>

            <Reveal delay={90}>
              <MaterialCapture />
            </Reveal>
          </div>
        </Container>
      </main>
    </AppShell>
  );
}
