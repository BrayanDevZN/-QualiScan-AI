import type { AttentionPoint, InspectionSample, SampleImage } from "./samples";

type InspectionReportProps = {
  fileName: string;
  generatedAt: string;
  images: SampleImage[];
  sample: InspectionSample;
  verified: ReadonlySet<number>;
};

/** Print-only report: hidden on screen, it is the only thing shown when the page is printed or saved as PDF. */
export function InspectionReport({ fileName, generatedAt, images, sample, verified }: InspectionReportProps) {
  const withFinding = sample.points.filter((point) => point.finding).length;

  return (
    <article aria-hidden className="report hidden text-ink print:block">
      <header className="flex items-end justify-between border-b-2 border-brand pb-4">
        <div>
          <img alt="" className="h-9 w-auto" src="/assets/brand/qualiscan-logo.svg" />
          <h1 className="mt-4 text-2xl font-bold tracking-[-0.03em]">Relatório de inspeção</h1>
        </div>
        <p className="text-right text-xs leading-5 text-ink-muted">
          Gerado em {generatedAt}
          <br />
          Resultado simulado · POPs demonstrativos
        </p>
      </header>

      <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
        {[
          ["Material", sample.material],
          ["Código", sample.code],
          ["Data da inspeção", sample.date],
          ["Arquivo analisado", fileName],
          ["Pontos verificados", `${verified.size} de ${sample.points.length}`],
          ["Pontos com erro observado", String(withFinding)],
        ].map(([label, value]) => (
          <div key={label}>
            <dt className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-ink-subtle">{label}</dt>
            <dd className="mt-0.5 font-semibold">{value}</dd>
          </div>
        ))}
      </dl>

      {images.map((image, imageIndex) => (
        <div className="mt-6 break-inside-avoid overflow-hidden bg-[#252529]" key={image.src}>
          <div className="relative mx-auto w-fit">
            <img
              alt={images.length > 1 ? image.alt : `Imagem analisada: ${fileName}`}
              className="block max-h-[22rem] w-auto object-contain"
              src={image.src}
            />
            {sample.points.filter((point) => Math.min(point.image ?? 0, images.length - 1) === imageIndex).map((point) => (
              <span
                className="absolute grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center border-2 border-white bg-brand text-xs font-bold text-white"
                key={point.id}
                style={point.position}
              >
                {point.id}
              </span>
            ))}
          </div>
        </div>
      ))}

      <h2 className="mt-8 text-lg font-bold">Pontos de atenção</h2>
      <ol className="mt-3 flex flex-col gap-4">
        {sample.points.map((point) => (
          <ReportPoint isVerified={verified.has(point.id)} key={point.id} point={point} />
        ))}
      </ol>

      <p className="mt-8 border-t border-line pt-4 text-[0.7rem] leading-5 text-ink-muted">
        Este relatório é demonstrativo e não substitui avaliação técnica, requisitos de segurança ou o procedimento oficial vigente da empresa.
        Todas as dimensões são medidas em milímetros (mm).
      </p>
    </article>
  );
}

function ReportPoint({ isVerified, point }: { isVerified: boolean; point: AttentionPoint }) {
  return (
    <li className="break-inside-avoid border border-line p-4">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-sm font-bold">
          {point.id}. {point.title}
        </h3>
        <p className="shrink-0 text-[0.65rem] font-bold uppercase tracking-[0.08em] text-brand">
          {point.severity} · {isVerified ? "Verificado" : "Pendente"}
        </p>
      </div>
      <p className="mt-2 text-xs leading-5 text-ink-muted">{point.summary}</p>
      {point.finding && (
        <p className="mt-2 border-l-2 border-brand pl-3 text-xs font-semibold leading-5">Erro observado: {point.finding}</p>
      )}
      <div className="mt-3 grid grid-cols-2 gap-4 text-xs leading-5">
        <div>
          <p className="font-bold">O que observar</p>
          <ul className="mt-1 list-disc pl-4 text-ink-muted">
            {point.observations.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        {point.measurements && (
          <div>
            <p className="font-bold">Medidas (mm)</p>
            <ul className="mt-1 list-disc pl-4 text-ink-muted">
              {point.measurements.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        )}
      </div>
      <p className="mt-3 text-[0.7rem] font-semibold text-ink-subtle">{point.pop}</p>
    </li>
  );
}
