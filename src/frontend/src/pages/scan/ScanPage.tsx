import { ArrowLeft, Check, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

import { MaterialCapture } from "@/features/material-capture/MaterialCapture";
import { Reveal } from "@/components/motion/Reveal";
import { AppHeader } from "@/layouts/AppHeader";
import { AppShell } from "@/layouts/AppShell";

import { Badge, Container } from "@/components/ui";

const photoTips = [
  "Use iluminação uniforme e evite sombras fortes.",
  "Enquadre toda a região que precisa ser verificada.",
  "Evite reflexos, desfoque e objetos cobrindo a peça.",
];

export function ScanPage() {
  return (
    <AppShell>
      <AppHeader />
      <main className="pb-20 pt-8 sm:pt-12">
        <Container>
          <Link className="inline-flex items-center gap-2 text-sm font-semibold text-ink-muted hover:text-brand" to="/home">
            <ArrowLeft aria-hidden className="size-4" /> Voltar ao início
          </Link>

          <Reveal className="mt-8 flex flex-col justify-between gap-6 border-b border-line pb-8 sm:flex-row sm:items-end">
            <div>
              <Badge>Nova inspeção</Badge>
              <h1 className="mt-5 text-4xl font-bold tracking-[-0.045em] text-ink sm:text-5xl">Capture o material</h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-ink-muted">
                Registre uma imagem clara para preparar a identificação e os pontos de atenção da inspeção.
              </p>
            </div>
            <div className="flex min-w-52 items-center gap-3 text-xs font-semibold text-ink-muted">
              <span className="grid size-7 place-items-center bg-brand text-white">1</span>
              <span>Captura</span>
              <span className="h-px flex-1 bg-line-strong" />
              <span className="grid size-7 place-items-center border border-line-strong bg-white text-ink-subtle">2</span>
              <span>Resultado</span>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-6 lg:grid-cols-[17rem_minmax(0,1fr)] xl:gap-8">
            <Reveal>
            <aside>
              <div className="border-t-2 border-brand py-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">Orientação de captura</p>
                <h2 className="mt-3 text-lg font-bold text-ink">Antes da foto</h2>
                <ol className="mt-5 border-t border-line">
                  {photoTips.map((text, index) => (
                    <li className="grid grid-cols-[2rem_1fr] gap-2 border-b border-line py-4 text-sm leading-5 text-ink-muted" key={text}>
                      <span className="font-mono text-xs font-bold text-brand">{String(index + 1).padStart(2, "0")}</span>
                      {text}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-6 border-l-2 border-success pl-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck aria-hidden className="size-4 text-success" />
                  <h2 className="text-sm font-bold text-ink">Privacidade do protótipo</h2>
                </div>
                <p className="mt-2 text-xs leading-5 text-ink-muted">A imagem permanece no navegador e não é enviada para nenhum servidor.</p>
              </div>

              <div className="mt-7 hidden border-t border-line pt-5 lg:block">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-subtle">Nesta etapa</p>
                <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-ink"><Check aria-hidden className="size-4 text-success" /> Capturar ou selecionar</p>
                <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-ink"><Check aria-hidden className="size-4 text-success" /> Revisar enquadramento</p>
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
