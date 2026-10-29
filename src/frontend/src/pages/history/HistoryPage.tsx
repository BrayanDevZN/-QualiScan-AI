import { ArrowLeft, CalendarDays, ChevronRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/shadcn/badge";
import { Button } from "@/components/shadcn/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shadcn/card";
import { Input } from "@/components/shadcn/input";
import { Container } from "@/components/ui";
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
      <main className="pb-24 pt-8 sm:pt-12">
        <Container>
          <Link className="inline-flex items-center gap-2 text-base font-semibold text-ink-muted transition-colors hover:text-brand" to="/home">
            <ArrowLeft aria-hidden className="size-4" /> Voltar ao início
          </Link>

          <Reveal className="mt-8 grid gap-8 lg:grid-cols-[1fr_24rem] lg:items-end">
            <div className="flex flex-col gap-4">
              <h1 className="text-page-title text-ink">Peças já analisadas</h1>
              <p className="max-w-2xl text-lg leading-8 text-ink-muted">
                Consulte as verificações recentes e retome os resultados registrados para cada material.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-base font-semibold text-ink" htmlFor="busca">Buscar no histórico</label>
              <div className="relative">
                <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink-subtle" />
                <Input
                  className="h-13 bg-surface pl-12 text-base"
                  id="busca"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Peça ou código"
                  type="search"
                  value={query}
                />
              </div>
            </div>
          </Reveal>

          <p className="mt-12 flex items-baseline justify-between gap-4 text-base">
            <span className="font-semibold text-ink">{visibleInspections.length} inspeções encontradas</span>
            <span className="hidden text-sm text-ink-subtle sm:inline">Dados demonstrativos do protótipo</span>
          </p>

          <section aria-label="Lista de peças analisadas" className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visibleInspections.map(({ code, date, id, imageAlt, imageSrc, material, points, status, statusVariant }, index) => (
              <Reveal delay={index * 80} key={id}>
                <Card className="group h-full gap-0 overflow-hidden border-0 py-0 shadow-none">
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface-overlay">
                    <img alt={imageAlt} className="photo-zoom absolute inset-0 size-full object-cover" src={imageSrc} />
                  </div>
                  <CardHeader className="gap-3 px-5 pt-5 sm:px-6">
                    <Badge variant={statusVariant}>{status}</Badge>
                    <CardTitle className="text-xl font-bold leading-snug tracking-[-0.02em] text-ink">{material}</CardTitle>
                    <CardDescription className="flex flex-col gap-1 text-base text-ink-muted">
                      <span className="font-semibold text-ink">{code}</span>
                      <span>{points.length} pontos de atenção</span>
                      <span className="flex items-center gap-2"><CalendarDays aria-hidden className="size-4 shrink-0 text-ink-subtle" /> {date}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto px-5 pt-6 pb-5 sm:px-6 sm:pb-6">
                    <Button asChild className="w-full" variant="secondary">
                      <Link state={{ sampleId: id }} to="/analysis">Ver análise <ChevronRight aria-hidden /></Link>
                    </Button>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </section>

          {visibleInspections.length === 0 && (
            <div className="mt-5 rounded-sm bg-surface px-5 py-16 text-center">
              <p className="text-lg font-bold text-ink">Nenhuma peça encontrada</p>
              <p className="mt-2 text-base text-ink-muted">Tente buscar por outro nome ou código de identificação.</p>
            </div>
          )}
        </Container>
      </main>
    </AppShell>
  );
}
