import { AlertTriangle, Check, CheckCircle2, ClipboardCheck, Eye, MapPin, Ruler } from "lucide-react";
import { type SyntheticEvent, useEffect, useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/shadcn/alert";
import { Badge } from "@/components/shadcn/badge";
import { Progress } from "@/components/shadcn/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/shadcn/tabs";
import { Button, Surface } from "@/components/ui";
import { cn } from "@/lib/cn";

import type { AttentionPoint, SampleImage } from "./samples";

type InspectionResultsProps = {
  fileName: string;
  images: SampleImage[];
  onVerifiedChange?: (verified: ReadonlySet<number>) => void;
  points: AttentionPoint[];
};

export function InspectionResults({ fileName, images, onVerifiedChange, points: attentionPoints }: InspectionResultsProps) {
  const [activeId, setActiveId] = useState(attentionPoints[0]?.id ?? 1);
  const [verified, setVerified] = useState<Set<number>>(new Set());
  const [completed, setCompleted] = useState(false);
  const [imageAspectRatio, setImageAspectRatio] = useState("4 / 3");
  const [imageIndex, setImageIndex] = useState(0);
  const image = images[imageIndex] ?? images[0];
  const hasManyImages = images.length > 1;
  const pointImage = (point: AttentionPoint) => Math.min(point.image ?? 0, images.length - 1);
  const imagePoints = attentionPoints.filter((point) => pointImage(point) === imageIndex);
  const activePoint = attentionPoints.find((point) => point.id === activeId) ?? attentionPoints[0];
  const allVerified = verified.size === attentionPoints.length;

  useEffect(() => {
    onVerifiedChange?.(verified);
  }, [onVerifiedChange, verified]);

  function toggleVerified(id: number) {
    setVerified((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
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
          <AlertDescription className="text-ink-muted">Os {attentionPoints.length} pontos foram marcados como verificados nesta demonstração local.</AlertDescription>
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
                    "point-marker absolute grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center border-2 border-white bg-brand text-sm font-bold text-white shadow-[0_3px_12px_rgb(166_33_21/0.55)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-white",
                    activeId === point.id && "is-active border-[3px]",
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
              <Button
                className="mt-5 w-full px-3 text-xs sm:px-5 sm:text-sm"
                icon={verified.has(activePoint.id) ? <CheckCircle2 aria-hidden className="size-4" /> : <Check aria-hidden className="size-4" />}
                onClick={() => toggleVerified(activePoint.id)}
                variant={verified.has(activePoint.id) ? "secondary" : "primary"}
              >
                {verified.has(activePoint.id) ? "Ponto verificado" : "Marcar como verificado"}
              </Button>
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
            <p className="mt-2 text-sm text-ink-muted">{verified.size} de {attentionPoints.length} pontos marcados como verificados. {attentionPoints.filter((point) => point.finding).length} com erro observado.</p>
            <Progress
              aria-label="Pontos verificados"
              className="mt-4 w-full sm:w-72"
              indicatorClassName={allVerified ? "bg-success" : undefined}
              value={(verified.size / attentionPoints.length) * 100}
            />
          </div>
          <Button disabled={!allVerified || completed} onClick={() => setCompleted(true)}>
            {completed ? "Inspeção concluída" : "Concluir inspeção"}
          </Button>
        </div>
      </Surface>
    </div>
  );
}
