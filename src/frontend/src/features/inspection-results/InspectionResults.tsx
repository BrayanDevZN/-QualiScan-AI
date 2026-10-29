import { AlertTriangle, Check, CheckCircle2, ClipboardCheck, MapPin, Ruler } from "lucide-react";
import { type SyntheticEvent, useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/shadcn/alert";
import { Badge } from "@/components/shadcn/badge";
import { Button } from "@/components/shadcn/button";
import { Progress } from "@/components/shadcn/progress";
import { ToggleGroup, ToggleGroupItem } from "@/components/shadcn/toggle-group";
import { cn } from "@/lib/cn";

import type { AttentionPoint } from "./samples";

type InspectionResultsProps = {
  fileName: string;
  imageSrc: string;
  points: AttentionPoint[];
};

export function InspectionResults({ fileName, imageSrc, points: attentionPoints }: InspectionResultsProps) {
  const [activeId, setActiveId] = useState(attentionPoints[0]?.id ?? 1);
  const [verified, setVerified] = useState<Set<number>>(new Set());
  const [completed, setCompleted] = useState(false);
  const [imageAspectRatio, setImageAspectRatio] = useState("4 / 3");
  const activePoint = attentionPoints.find((point) => point.id === activeId) ?? attentionPoints[0];
  const allVerified = verified.size === attentionPoints.length;
  const errorCount = attentionPoints.filter((point) => point.finding).length;

  function toggleVerified(id: number) {
    setVerified((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setCompleted(false);
  }

  function preserveImageRatio(event: SyntheticEvent<HTMLImageElement>) {
    const { naturalHeight, naturalWidth } = event.currentTarget;
    if (naturalHeight > 0 && naturalWidth > 0) {
      setImageAspectRatio(`${naturalWidth} / ${naturalHeight}`);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      {completed && (
        <Alert className="animate-in-up" role="status" variant="success">
          <CheckCircle2 aria-hidden />
          <AlertTitle className="text-base font-bold text-ink">Inspeção visual concluída</AlertTitle>
          <AlertDescription className="text-base text-ink-muted">Os {attentionPoints.length} pontos foram marcados como verificados nesta demonstração local.</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_26rem]">
        <div className="flex min-w-0 flex-col gap-3">
          <div className="overflow-hidden rounded-sm bg-[#252529]">
            <div className="relative w-full" style={{ aspectRatio: imageAspectRatio }}>
              <img
                alt={`Imagem analisada: ${fileName}`}
                className="absolute inset-0 size-full object-contain"
                onLoad={preserveImageRatio}
                src={imageSrc}
              />

              {attentionPoints.map((point) => (
                <button
                  aria-label={`Ponto ${point.id}: ${point.title}`}
                  aria-pressed={activeId === point.id}
                  className={cn(
                    "point-marker absolute grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-sm border-2 border-white bg-brand text-sm font-bold text-white outline-none focus-visible:ring-[3px] focus-visible:ring-white sm:size-10",
                    activeId === point.id && "is-active size-11 border-[3px] sm:size-12",
                    verified.has(point.id) && "bg-success",
                  )}
                  key={point.id}
                  onClick={() => setActiveId(point.id)}
                  style={point.position}
                  type="button"
                >
                  {verified.has(point.id) ? <Check aria-hidden className="size-5" /> : point.id}
                </button>
              ))}

              <p className="absolute right-3 bottom-3 hidden items-center gap-2 rounded-sm bg-surface px-3 py-2 sm:flex text-sm font-semibold text-ink">
                <MapPin aria-hidden className="size-4 text-brand" /> Selecione uma marcação
              </p>
            </div>
          </div>

          <ToggleGroup
            aria-label="Pontos de atenção"
            className="flex w-full flex-wrap justify-start gap-2"
            onValueChange={(value) => value && setActiveId(Number(value))}
            type="single"
            value={String(activeId)}
          >
            {attentionPoints.map((point) => (
              <ToggleGroupItem
                className="group h-auto min-h-11 min-w-0 flex-1 items-start whitespace-normal basis-[calc(50%-0.25rem)] justify-start gap-3 rounded-sm bg-surface px-3 py-2.5 text-left text-sm font-semibold text-ink data-[state=on]:bg-brand data-[state=on]:text-white sm:basis-[calc(25%-0.5rem)]"
                key={point.id}
                value={String(point.id)}
              >
                <span className="grid size-6 shrink-0 place-items-center rounded-sm bg-surface-overlay text-xs font-bold text-ink group-data-[state=on]:bg-white">
                  {verified.has(point.id) ? <Check aria-hidden className="size-3.5 text-success" /> : point.id}
                </span>
                <span className="min-w-0 leading-snug">{point.title}</span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <aside className="flex min-w-0 flex-col gap-6 rounded-sm bg-surface p-5 sm:p-6" key={activePoint.id}>
          <div className="animate-in-up flex flex-col gap-3">
            <p className="text-sm font-semibold text-ink-muted">Ponto {activePoint.id} de {attentionPoints.length}</p>
            <h2 className="text-2xl font-bold leading-tight tracking-[-0.025em] text-ink">{activePoint.title}</h2>
            <Badge className="w-fit" variant={activePoint.severityVariant}>{activePoint.severity}</Badge>
            <p className="text-base leading-7 text-ink-muted">{activePoint.summary}</p>
          </div>

          {activePoint.finding ? (
            <Alert variant="destructive">
              <AlertTriangle aria-hidden />
              <AlertTitle className="text-base font-bold">Erro observado</AlertTitle>
              <AlertDescription className="text-base text-ink">{activePoint.finding}</AlertDescription>
            </Alert>
          ) : (
            <Alert variant="success">
              <CheckCircle2 aria-hidden />
              <AlertTitle className="text-base font-bold">Nenhum erro observado</AlertTitle>
              <AlertDescription className="text-base text-ink-muted">Nada fora do esperado neste ponto, pela foto. Siga a verificação abaixo.</AlertDescription>
            </Alert>
          )}

          <div>
            <h3 className="text-base font-bold text-ink">O que observar</h3>
            <ul className="mt-3 flex flex-col gap-2.5">
              {activePoint.observations.map((observation) => (
                <li className="flex gap-3 text-base leading-6 text-ink-muted" key={observation}>
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand" /> {observation}
                </li>
              ))}
            </ul>
          </div>

          {activePoint.measurements && (
            <div>
              <h3 className="flex items-center gap-2 text-base font-bold text-ink">
                <Ruler aria-hidden className="size-4 text-brand" /> Medir (em mm)
              </h3>
              <ul className="mt-3 flex flex-col gap-2.5">
                {activePoint.measurements.map((measurement) => (
                  <li className="flex gap-3 text-base leading-6 text-ink" key={measurement}>
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand" /> {measurement}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <p className="flex gap-3 rounded-sm bg-canvas p-4 text-sm font-semibold leading-6 text-ink">
              <ClipboardCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-brand" />
              <span className="min-w-0 break-words">Referência simulada: {activePoint.pop}</span>
            </p>
            <Button
              onClick={() => toggleVerified(activePoint.id)}
              size="lg"
              variant={verified.has(activePoint.id) ? "secondary" : "default"}
            >
              {verified.has(activePoint.id) ? <CheckCircle2 aria-hidden /> : <Check aria-hidden />}
              {verified.has(activePoint.id) ? "Ponto verificado" : "Marcar como verificado"}
            </Button>
          </div>
        </aside>
      </div>

      <section aria-label="Revisão do inspetor" className="flex flex-col gap-5 rounded-sm bg-surface p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex flex-1 flex-col gap-3">
          <h3 className="text-lg font-bold text-ink">Revisão do inspetor</h3>
          <p className="text-base text-ink-muted">
            {verified.size} de {attentionPoints.length} pontos marcados como verificados. {errorCount} com erro observado.
          </p>
          <Progress
            aria-label="Pontos verificados"
            className="w-full sm:max-w-sm"
            indicatorClassName={allVerified ? "bg-success" : undefined}
            value={(verified.size / attentionPoints.length) * 100}
          />
        </div>
        <Button disabled={!allVerified || completed} onClick={() => setCompleted(true)} size="lg">
          {completed ? "Inspeção concluída" : "Concluir inspeção"}
        </Button>
      </section>
    </div>
  );
}
