import { AlertTriangle, Check, CheckCircle2, ClipboardCheck, Eye, MapPin } from "lucide-react";
import { type SyntheticEvent, useState } from "react";

import { Button, Surface } from "@/components/ui";
import { cn } from "@/lib/cn";

type InspectionResultsProps = {
  fileName: string;
  imageSrc: string;
};

const attentionPoints = [
  {
    id: 1,
    position: { left: "88%", top: "42%" },
    title: "Bobinamento e isolação",
    severity: "Alta atenção",
    severityClass: "bg-[#f8e4e1] text-brand",
    summary: "Verifique sinais visuais de escurecimento, deformação ou deslocamento no conjunto de bobinas.",
    observations: ["Uniformidade dos condutores", "Integridade aparente da isolação", "Marcas de aquecimento ou atrito"],
    pop: "POP-ME-014 · Inspeção visual de estatores",
  },
  {
    id: 2,
    position: { left: "70%", top: "24%" },
    title: "Carcaça e fixações",
    severity: "Atenção moderada",
    severityClass: "bg-[#fff1d7] text-[#8a5a00]",
    summary: "Observe o estado externo da carcaça e a condição visual dos pontos de união e fixação.",
    observations: ["Trincas ou deformações", "Oxidação superficial", "Fixadores ausentes ou desalinhados"],
    pop: "POP-ME-006 · Verificação externa de motores",
  },
  {
    id: 3,
    position: { left: "54%", top: "48%" },
    title: "Eixo e região de acoplamento",
    severity: "Verificação padrão",
    severityClass: "bg-[#e8f2ec] text-success",
    summary: "Confirme visualmente a condição do eixo e procure marcas incomuns na região de acoplamento.",
    observations: ["Riscos ou rebarbas", "Sinais de impacto", "Condição aparente da superfície"],
    pop: "POP-ME-009 · Avaliação visual do eixo",
  },
];

export function InspectionResults({ fileName, imageSrc }: InspectionResultsProps) {
  const [activeId, setActiveId] = useState(1);
  const [verified, setVerified] = useState<Set<number>>(new Set());
  const [completed, setCompleted] = useState(false);
  const [imageAspectRatio, setImageAspectRatio] = useState("4 / 3");
  const activePoint = attentionPoints.find((point) => point.id === activeId) ?? attentionPoints[0];
  const allVerified = verified.size === attentionPoints.length;

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
    <div className="space-y-6">
      {completed && (
        <div className="flex gap-4 border-l-4 border-success bg-[#e8f2ec] p-5" role="status">
          <CheckCircle2 aria-hidden className="size-6 shrink-0 text-success" />
          <div>
            <p className="font-bold text-ink">Inspeção visual concluída</p>
            <p className="mt-1 text-sm leading-6 text-ink-muted">Os três pontos foram marcados como verificados nesta demonstração local.</p>
          </div>
        </div>
      )}

      <Surface className="min-w-0 overflow-hidden">
        <div className="grid min-w-0 xl:grid-cols-[minmax(0,1fr)_23rem]">
          <div className="min-w-0 border-b border-line bg-[#252529] xl:border-b-0 xl:border-r">
            <div className="relative w-full" style={{ aspectRatio: imageAspectRatio }}>
              <img
                alt={`Imagem analisada: ${fileName}`}
                className="absolute inset-0 size-full object-contain"
                onLoad={preserveImageRatio}
                src={imageSrc}
              />
              <div aria-hidden className="absolute inset-0 bg-black/10" />

              {attentionPoints.map((point) => (
                <button
                  aria-label={`Ponto ${point.id}: ${point.title}`}
                  aria-pressed={activeId === point.id}
                  className={cn(
                    "absolute grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center border-2 border-white bg-brand text-sm font-bold text-white shadow-[0_3px_12px_rgb(0_0_0/0.35)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-white",
                    activeId === point.id && "size-12 border-[3px]",
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

          <aside className="min-w-0 bg-white">
            <div className="border-b border-line p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.13em] text-brand">Ponto {activePoint.id} de {attentionPoints.length}</p>
                  <h2 className="mt-2 text-xl font-bold tracking-[-0.025em] text-ink">{activePoint.title}</h2>
                </div>
                <span className="border-b-2 border-brand pb-2 text-brand"><Eye aria-hidden className="size-5 shrink-0" /></span>
              </div>
              <span className={cn("mt-4 inline-flex px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.08em]", activePoint.severityClass)}>
                {activePoint.severity}
              </span>
              <p className="mt-4 text-sm leading-6 text-ink-muted">{activePoint.summary}</p>
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
            <p className="mt-2 text-sm text-ink-muted">{verified.size} de {attentionPoints.length} pontos marcados como verificados.</p>
          </div>
          <Button disabled={!allVerified || completed} onClick={() => setCompleted(true)}>
            {completed ? "Inspeção concluída" : "Concluir inspeção"}
          </Button>
        </div>
      </Surface>
    </div>
  );
}
