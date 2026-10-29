import { AlertTriangle, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { Alert, AlertDescription } from "@/components/shadcn/alert";
import { Button } from "@/components/shadcn/button";
import { Container } from "@/components/ui";
import { Reveal } from "@/components/motion/Reveal";
import { InspectionResults } from "@/features/inspection-results/InspectionResults";
import { defaultSample, findSampleById, findSampleByImage } from "@/features/inspection-results/samples";
import { AppHeader } from "@/layouts/AppHeader";
import { AppShell } from "@/layouts/AppShell";

type AnalysisLocationState = {
  fileName?: string;
  imageSrc?: string;
  sampleId?: string;
};

const procedureSteps = [
  "Confirmar a identificação e a condição segura para inspeção.",
  "Revisar visualmente cada ponto destacado na imagem.",
  "Medir com instrumento calibrado e registrar todas as dimensões em milímetros (mm).",
  "Comparar a condição observada com o POP oficial da empresa.",
  "Registrar evidências e encaminhar divergências ao responsável.",
];

export function AnalysisPage() {
  const location = useLocation();
  const state = location.state as AnalysisLocationState | null;
  const sample = findSampleById(state?.sampleId) ?? findSampleByImage(state?.imageSrc) ?? defaultSample;
  const imageSrc = state?.imageSrc ?? sample.imageSrc;
  const fileName = state?.fileName ?? sample.fileName;
  const errorCount = sample.points.filter((point) => point.finding).length;

  return (
    <AppShell>
      <AppHeader />
      <main className="pb-24 pt-8 sm:pt-12">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link className="inline-flex items-center gap-2 text-base font-semibold text-ink-muted transition-colors hover:text-brand" to="/scan">
              <ArrowLeft aria-hidden className="size-4" /> Voltar à captura
            </Link>
            <Button asChild size="sm" variant="secondary"><Link to="/scan">Nova inspeção</Link></Button>
          </div>

          <Reveal className="mt-8 flex flex-col gap-4">
            <h1 className="text-page-title text-ink">Resultado da inspeção</h1>
            <p className="max-w-2xl text-lg leading-8 text-ink-muted">
              Revise os pontos sugeridos para o material e confirme cada verificação seguindo os procedimentos oficiais da operação. Resultado simulado.
            </p>
          </Reveal>

          <Reveal className="mt-10">
            <dl aria-label="Resumo da identificação" className="grid gap-6 rounded-sm bg-surface p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
              <div>
                <dt className="text-sm text-ink-muted">Material simulado</dt>
                <dd className="mt-1 text-lg font-bold leading-snug text-ink">{sample.material}</dd>
              </div>
              <div>
                <dt className="text-sm text-ink-muted">Pontos sugeridos</dt>
                <dd className="mt-1 text-lg font-bold leading-snug text-ink">{sample.points.length} verificações · {errorCount} com erro observado</dd>
              </div>
              <div>
                <dt className="text-sm text-ink-muted">Base de referência</dt>
                <dd className="mt-1 text-lg font-bold leading-snug text-ink">POPs demonstrativos</dd>
              </div>
              <div>
                <dt className="text-sm text-ink-muted">Estado</dt>
                <dd className="mt-1 flex items-center gap-2 text-lg font-bold leading-snug text-ink"><span className="size-2.5 rounded-full bg-success" /> Pronta para revisão</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal className="mt-5" delay={70}>
            <section aria-label="Pontos de atenção da inspeção">
              <InspectionResults fileName={fileName} imageSrc={imageSrc} key={`${sample.id}-${imageSrc}`} points={sample.points} />
            </section>
          </Reveal>

          <Reveal className="mt-20 grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div className="flex flex-col gap-4">
              <h2 className="text-title text-ink">Roteiro de inspeção visual</h2>
              <p className="max-w-md text-base leading-7 text-ink-muted">
                Conteúdo demonstrativo. Na versão integrada, esta área será preenchida pelo POP associado ao material reconhecido.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <ol className="flex list-decimal flex-col gap-4 pl-6 marker:font-bold marker:text-brand">
                {procedureSteps.map((step) => (
                  <li className="pl-2 text-lg leading-8 text-ink" key={step}>{step}</li>
                ))}
              </ol>
              <Alert variant="warning">
                <AlertTriangle aria-hidden />
                <AlertDescription className="text-base text-warning-text">
                  Este protótipo não substitui avaliação técnica, requisitos de segurança ou o procedimento oficial vigente da empresa.
                </AlertDescription>
              </Alert>
            </div>
          </Reveal>
        </Container>
      </main>
    </AppShell>
  );
}
