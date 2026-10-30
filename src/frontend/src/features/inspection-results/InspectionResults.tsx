import { AlertTriangle, Check, CheckCircle2, ClipboardCheck, Clock, Eye, MapPin, Ruler, X } from "lucide-react";
import { type SyntheticEvent, useEffect, useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/shadcn/alert";
import { Badge } from "@/components/shadcn/badge";
import { Progress } from "@/components/shadcn/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/shadcn/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/shadcn/toggle-group";
import { Button, Surface } from "@/components/ui";
import { cn } from "@/lib/cn";

import { countDecisions, type Decision, decisionLabels } from "./decisions";
import type { AttentionPoint, SampleImage } from "./samples";

type InspectionResultsProps = {
  fileName: string;
  images: SampleImage[];
  onDecisionsChange?: (decisions: ReadonlyMap<number, Decision>) => void;
  points: AttentionPoint[];
};

export function InspectionResults({ fileName, images, onDecisionsChange, points: attentionPoints }: InspectionResultsProps) {
  const [activeId, setActiveId] = useState(attentionPoints[0]?.id ?? 1);
  const [decisions, setDecisions] = useState<Map<number, Decision>>(new Map());
  const [completed, setCompleted] = useState(false);
  const [imageAspectRatio, setImageAspectRatio] = useState("4 / 3");
  const [imageIndex, setImageIndex] = useState(0);
  const image = images[imageIndex] ?? images[0];
  const hasManyImages = images.length > 1;
  const pointImage = (point: AttentionPoint) => Math.min(point.image ?? 0, images.length - 1);
  const imagePoints = attentionPoints.filter((point) => pointImage(point) === imageIndex);
  const activePoint = attentionPoints.find((point) => point.id === activeId) ?? attentionPoints[0];
  const counts = countDecisions(decisions);
  const allDecided = decisions.size === attentionPoints.length;

  useEffect(() => {
    onDecisionsChange?.(decisions);
  }, [onDecisionsChange, decisions]);

  function decide(id: number, decision: Decision | "") {
    setDecisions((current) => {
      const next = new Map(current);
      if (decision) next.set(id, decision);
      else next.delete(id);
      return next;
    });
    setCompleted(false);
  }

  function selectImage(value: string) {
    const index = Number(value);
    setImageIndex(index);
    const firstPoint = attentionPoints.find((point) => pointImage(point) === index);
    if (firstPoint) setActiveId(firstPoint.id);
  }

  function preserveImageRatio(event: SyntheticEvent<HTMLImageElement>) {
    const { naturalHeight, naturalWidth } = event.currentTarget;
    if (naturalHeight > 0 && naturalWidth > 0) {
      setImageAspectRatio(`${naturalWidth} / ${naturalHeight}`);
    }
  }

  return (
    <div className="space-y-6">
      {completed && (
        <Alert className="animate-in-up" role="status" variant="success">
          <CheckCircle2 aria-hidden />
          <AlertTitle className="font-bold text-ink">Inspeção visual concluída</AlertTitle>
          <AlertDescription className="text-ink-muted">Os {attentionPoints.length} pontos foram avaliados nesta demonstração local. Aprovados: {counts.approved} · Em análise: {counts.analysis} · Reprovados: {counts.rejected}.</AlertDescription>
        </Alert>
      )}

      <Surface className="min-w-0 overflow-hidden">
        <div className="grid min-w-0 xl:grid-cols-[minmax(0,1fr)_23rem]">
          <div className="min-w-0 border-b border-line bg-[#252529] xl:border-b-0 xl:border-r">
            {hasManyImages && (
              <Tabs className="border-b border-white/10 p-3" onValueChange={selectImage} value={String(imageIndex)}>
                <TabsList aria-label="Fotos da peça" className="h-auto w-full">
                  {images.map((item, index) => (
                    <TabsTrigger className="px-3 py-2 text-xs sm:text-sm" key={item.src} value={String(index)}>
                      Foto {index + 1}<span className="hidden sm:inline"> · {item.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            )}
            <div className="relative w-full" style={{ aspectRatio: imageAspectRatio }}>
              <img
                alt={hasManyImages ? image.alt : `Imagem analisada: ${fileName}`}
                className="absolute inset-0 size-full object-contain"
                key={image.src}
                onLoad={preserveImageRatio}
                src={image.src}
              />
              <div aria-hidden className="absolute inset-0 bg-black/10" />

              {imagePoints.map((point) => (
                <button
                  aria-label={`Ponto ${point.id}: ${point.title}`}
                  aria-pressed={activeId === point.id}
                  className={cn(
                    "point-marker absolute grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center border-2 border-white bg-caution text-sm font-bold text-ink shadow-[0_3px_12px_rgb(0_0_0/0.4)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-white",
                    activeId === point.id && "is-active border-[3px]",
                    decisions.get(point.id) === "approved" && "bg-success text-white",
                    decisions.get(point.id) === "rejected" && "bg-danger text-white",
                  )}
                  key={point.id}
                  onClick={() => setActiveId(point.id)}
                  style={point.position}
                  type="button"
                >
                  {decisions.get(point.id) === "approved" ? <Check aria-hidden className="size-5" /> : decisions.get(point.id) === "rejected" ? <X aria-hidden className="size-5" /> : point.id}
                </button>
              ))}

              <div className="absolute bottom-4 left-4 flex items-center gap-2 border-l-2 border-brand bg-white/95 px-3 py-2 text-xs font-semibold text-ink">
                <MapPin aria-hidden className="size-4 text-brand" /> Selecione uma marcação
              </div>
            </div>
          </div>

          <aside className="min-w-0 bg-white" key={activePoint.id}>
            <div className="border-b border-line p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.13em] text-brand">Ponto {activePoint.id} de {attentionPoints.length}</p>
                  <h2 className="mt-2 text-xl font-bold tracking-[-0.025em] text-ink">{activePoint.title}</h2>
                </div>
                <span className="border-b-2 border-brand pb-2 text-brand"><Eye aria-hidden className="size-5 shrink-0" /></span>
              </div>
              <Badge className="mt-4" key={activePoint.id} variant={activePoint.severityVariant}>
                {activePoint.severity}
              </Badge>
              <p className="mt-4 text-sm leading-6 text-ink-muted">{activePoint.summary}</p>
              {activePoint.finding ? (
                <Alert className="mt-5" variant="destructive">
                  <AlertTriangle aria-hidden />
                  <AlertTitle className="text-xs font-bold uppercase tracking-[0.1em]">Erro observado</AlertTitle>
                  <AlertDescription className="text-ink">{activePoint.finding}</AlertDescription>
                </Alert>
              ) : (
                <Alert className="mt-5" variant="success">
                  <CheckCircle2 aria-hidden />
                  <AlertTitle className="text-xs font-bold uppercase tracking-[0.1em]">Nenhum erro observado</AlertTitle>
                  <AlertDescription className="text-ink-muted">Nada fora do esperado neste ponto, pela foto. Siga a verificação abaixo.</AlertDescription>
                </Alert>
              )}
            </div>

            <div className="border-b border-line p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-subtle">O que observar</p>
              <ul className="mt-4 space-y-3">
                {activePoint.observations.map((observation) => (
                  <li className="flex gap-3 text-sm leading-5 text-ink-muted" key={observation}>
                    <span className="mt-1.5 size-1.5 shrink-0 bg-brand" /> {observation}
                  </li>
                ))}
              </ul>
            </div>

            {activePoint.measurements && (
              <div className="border-b border-line p-5 sm:p-6">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-ink-subtle">
                  <Ruler aria-hidden className="size-4 text-brand" /> Medir (em mm)
                </p>
                <ul className="mt-4 space-y-3">
                  {activePoint.measurements.map((measurement) => (
                    <li className="flex gap-3 text-sm leading-5 text-ink" key={measurement}>
                      <span className="mt-1.5 size-1.5 shrink-0 bg-brand" /> {measurement}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-subtle">Referência simulada</p>
              <div className="mt-3 flex min-w-0 gap-3 border-l-2 border-brand bg-surface-raised p-3.5">
                <ClipboardCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-brand" />
                <p className="min-w-0 break-words text-xs font-semibold leading-5 text-ink">{activePoint.pop}</p>
              </div>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-ink-subtle">Sua decisão</p>
              <ToggleGroup
                aria-label={`Decisão para o ponto ${activePoint.id}`}
                className="mt-3 grid w-full grid-cols-3"
                onValueChange={(value) => decide(activePoint.id, value as Decision | "")}
                size="lg"
                spacing={2}
                type="single"
                value={decisions.get(activePoint.id) ?? ""}
                variant="outline"
              >
                <ToggleGroupItem
                  className="h-11 px-1 text-xs data-[state=off]:hover:bg-surface-overlay data-[state=off]:hover:text-ink data-[state=on]:border-success data-[state=on]:bg-success data-[state=on]:text-white data-[state=on]:hover:bg-success data-[state=on]:hover:text-white"
                  value="approved"
                >
                  <Check data-icon="inline-start" /> {decisionLabels.approved}
                </ToggleGroupItem>
                <ToggleGroupItem
                  className="h-11 px-1 text-xs data-[state=off]:hover:bg-surface-overlay data-[state=off]:hover:text-ink data-[state=on]:border-caution data-[state=on]:bg-caution data-[state=on]:text-ink data-[state=on]:hover:bg-caution data-[state=on]:hover:text-ink"
                  value="analysis"
                >
                  <Clock data-icon="inline-start" /> Análise
                </ToggleGroupItem>
                <ToggleGroupItem
                  className="h-11 px-1 text-xs data-[state=off]:hover:bg-surface-overlay data-[state=off]:hover:text-ink data-[state=on]:border-danger data-[state=on]:bg-danger data-[state=on]:text-white data-[state=on]:hover:bg-danger data-[state=on]:hover:text-white"
                  value="rejected"
                >
                  <X data-icon="inline-start" /> {decisionLabels.rejected}
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </aside>
        </div>
      </Surface>

      <Surface className="p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <AlertTriangle aria-hidden className="size-5 text-brand" />
              <p className="font-bold text-ink">Revisão do inspetor</p>
            </div>
            <p className="mt-2 text-sm text-ink-muted">{decisions.size} de {attentionPoints.length} pontos avaliados. Aprovados: {counts.approved} · Em análise: {counts.analysis} · Reprovados: {counts.rejected}. {attentionPoints.filter((point) => point.finding).length} com erro observado.</p>
            <Progress
              aria-label="Pontos avaliados"
              className="mt-4 w-full sm:w-72"
              indicatorClassName={allDecided ? "bg-success" : undefined}
              value={(decisions.size / attentionPoints.length) * 100}
            />
          </div>
          <Button disabled={!allDecided || completed} onClick={() => setCompleted(true)}>
            {completed ? "Inspeção concluída" : "Concluir inspeção"}
          </Button>
        </div>
      </Surface>
    </div>
  );
}
