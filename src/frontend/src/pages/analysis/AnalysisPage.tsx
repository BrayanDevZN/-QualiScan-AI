import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { Badge, Button, Container } from "@/components/ui";
import { Reveal } from "@/components/motion/Reveal";
import { InspectionResults } from "@/features/inspection-results/InspectionResults";
import { AppHeader } from "@/layouts/AppHeader";
import { AppShell } from "@/layouts/AppShell";

type AnalysisLocationState = {
  fileName?: string;
  imageSrc?: string;
};

const procedureSteps = [
  "Confirmar a identificação e a condição segura para inspeção.",
  "Revisar visualmente cada ponto destacado na imagem.",
  "Comparar a condição observada com o POP oficial da empresa.",
  "Registrar evidências e encaminhar divergências ao responsável.",
];

export function AnalysisPage() {
  const location = useLocation();
  const state = location.state as AnalysisLocationState | null;
  const imageSrc = state?.imageSrc ?? "/assets/images/qualiscan-industrial-inspection.webp";
  const fileName = state?.fileName ?? "material-demonstracao.webp";

  return (
    <AppShell>
      <AppHeader />
      <main className="bg-canvas/82 pb-20 pt-8 sm:pt-12">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link className="inline-flex items-center gap-2 text-sm font-semibold text-ink-muted hover:text-brand" to="/scan">
              <ArrowLeft aria-hidden className="size-4" /> Voltar à captura
            </Link>
            <Button asChild size="sm" variant="secondary"><Link to="/scan">Nova inspeção</Link></Button>
          </div>

          <Reveal className="mt-8 flex flex-col justify-between gap-6 border-b border-line pb-8 lg:flex-row lg:items-end">
            <div>
              <Badge>Resultado simulado</Badge>
              <h1 className="mt-5 text-4xl font-bold tracking-[-0.045em] text-ink sm:text-5xl">Resultado da inspeção</h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-ink-muted">
                Revise os pontos sugeridos para o material e confirme cada verificação seguindo os procedimentos oficiais da operação.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold text-ink-muted">
              <span className="grid size-7 place-items-center bg-success text-white"><CheckCircle2 aria-hidden className="size-4" /></span>
              <span>Captura</span>
              <span className="h-px w-8 bg-success" />
              <span className="grid size-7 place-items-center bg-brand text-white">2</span>
              <span>Resultado</span>
            </div>
          </Reveal>

          <Reveal>
          <section aria-label="Resumo da identificação" className="mt-8 border-y border-line-strong bg-white lg:grid lg:grid-cols-4">
            <div className="border-b border-line p-5 lg:border-b-0 lg:border-r">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-ink-subtle">Material simulado</p>
              <p className="mt-2 text-sm font-bold text-ink">Motor elétrico industrial</p>
            </div>
            <div className="border-b border-line p-5 lg:border-b-0 lg:border-r">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-ink-subtle">Pontos sugeridos</p>
              <p className="mt-2 text-sm font-bold text-ink">3 verificações visuais</p>
            </div>
            <div className="border-b border-line p-5 lg:border-b-0 lg:border-r">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-ink-subtle">Base de referência</p>
              <p className="mt-2 text-sm font-bold text-ink">POPs demonstrativos</p>
            </div>
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-ink-subtle">Estado</p>
              <p className="mt-2 flex items-center gap-2 text-sm font-bold text-ink"><span className="size-2 bg-success" /> Pronta para revisão</p>
            </div>
          </section>
          </Reveal>

          <Reveal delay={70}>
            <section className="mt-6" aria-label="Pontos de atenção da inspeção">
              <InspectionResults fileName={fileName} imageSrc={imageSrc} />
            </section>
          </Reveal>

          <Reveal>
          <section className="mt-12 border-t-2 border-t-brand bg-white p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand">Procedimento aplicável</p>
                <h2 className="mt-3 text-2xl font-bold tracking-[-0.03em] text-ink sm:text-3xl">Roteiro de inspeção visual</h2>
                <p className="mt-4 text-sm leading-6 text-ink-muted">
                  Conteúdo demonstrativo. Na versão integrada, esta área será preenchida pelo POP associado ao material reconhecido.
                </p>
              </div>
              <ol className="border-t border-line-strong">
                {procedureSteps.map((step, index) => (
                  <li className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-line py-4" key={step}>
                    <span className="font-mono text-xs font-bold text-brand">{String(index + 1).padStart(2, "0")}</span>
                    <p className="text-sm leading-6 text-ink-muted">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="mt-7 border-l-4 border-[#c78600] bg-[#fff5df] p-4 text-xs leading-5 text-[#6d4b08]">
              Este protótipo não substitui avaliação técnica, requisitos de segurança ou o procedimento oficial vigente da empresa.
            </div>
          </section>
          </Reveal>
        </Container>
      </main>
    </AppShell>
  );
}
