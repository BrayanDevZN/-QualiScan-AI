import { ArrowLeft, CalendarDays, ChevronRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { Badge as SectionLabel, Button, Container } from "@/components/ui";
import { Badge } from "@/components/shadcn/badge";
import { Reveal } from "@/components/motion/Reveal";
import { samples } from "@/features/inspection-results/samples";
import { AppHeader } from "@/layouts/AppHeader";
import { AppShell } from "@/layouts/AppShell";


export function HistoryPage() {
  const [query, setQuery] = useState("");
  const visibleInspections = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
    if (!normalizedQuery) return samples;
    return samples.filter(({ code, material }) =>
      `${material} ${code}`.toLocaleLowerCase("pt-BR").includes(normalizedQuery),
    );
  }, [query]);

  return (
    <AppShell>
      <AppHeader />
      <main className="bg-canvas/82 pb-20 pt-8 sm:pt-12">
        <Container>
          <Link className="inline-flex items-center gap-2 text-sm font-semibold text-ink-muted hover:text-brand" to="/home">
            <ArrowLeft aria-hidden className="size-4" /> Voltar ao início
          </Link>

          <Reveal className="mt-8 grid gap-7 border-b border-line pb-8 lg:grid-cols-[1fr_22rem] lg:items-end">
            <div>
              <SectionLabel>Histórico de inspeções</SectionLabel>
              <h1 className="mt-5 text-4xl font-bold tracking-[-0.045em] text-ink sm:text-5xl">Peças já analisadas</h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-ink-muted">
                Consulte as verificações recentes e retome os resultados registrados para cada material.
              </p>
            </div>

            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-ink-subtle">Buscar no histórico</span>
              <span className="flex min-h-12 items-center gap-3 border border-line-strong bg-white px-4 focus-within:border-brand">
                <Search aria-hidden className="size-4 shrink-0 text-ink-subtle" />
                <input
                  className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-subtle"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Peça ou código"
                  type="search"
                  value={query}
                />
              </span>
            </label>
          </Reveal>

          <Reveal className="mt-8 flex items-center justify-between gap-4">
            <p className="text-sm font-semibold text-ink">{visibleInspections.length} inspeções encontradas</p>
            <p className="hidden text-xs text-ink-subtle sm:block">Dados demonstrativos do protótipo</p>
          </Reveal>

          <section aria-label="Lista de peças analisadas" className="mt-5 border-t border-line-strong">
            {visibleInspections.map(({ code, date, id, imageAlt, imageSrc, material, points, status, statusVariant }) => (
              <article className="history-row border-b border-line-strong bg-white" key={code}>
                <Reveal className="grid gap-5 px-5 py-6 sm:px-6 lg:grid-cols-[5rem_minmax(0,1.4fr)_minmax(10rem,0.7fr)_minmax(9rem,0.6fr)_auto] lg:items-center">
                <div className="relative aspect-square overflow-hidden bg-surface-overlay">
                  <img
                    alt={imageAlt}
                    className="absolute inset-0 size-full object-cover"
                    src={imageSrc}
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand">{code}</p>
                  <h2 className="mt-2 text-lg font-bold text-ink">{material}</h2>
                  <p className="mt-1 text-sm text-ink-muted">{points.length} pontos de atenção</p>
                </div>

                <p className="flex items-center gap-2 text-sm text-ink-muted">
                  <CalendarDays aria-hidden className="size-4 shrink-0 text-ink-subtle" /> {date}
                </p>

                <div>
                  <Badge variant={statusVariant}>{status}</Badge>
                </div>

                <Button asChild icon={<ChevronRight aria-hidden className="size-4" />} size="sm" variant="secondary">
                  <Link state={{ sampleId: id }} to="/analysis">Ver análise</Link>
                </Button>
                </Reveal>
              </article>
            ))}
          </section>

          {visibleInspections.length === 0 && (
            <div className="border-b border-line-strong bg-white px-5 py-14 text-center">
              <p className="font-bold text-ink">Nenhuma peça encontrada</p>
              <p className="mt-2 text-sm text-ink-muted">Tente buscar por outro nome ou código de identificação.</p>
            </div>
          )}
        </Container>
      </main>
    </AppShell>
  );
}
