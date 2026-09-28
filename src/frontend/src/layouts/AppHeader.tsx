import { LogOut, ScanLine } from "lucide-react";
import { Link } from "react-router-dom";

import { Brand, Button, Container } from "@/components/ui";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-t-[3px] border-b-line border-t-brand bg-white shadow-[0_6px_20px_rgb(39_38_42/0.06)]">
      <Container className="flex h-[4.875rem] items-center justify-between gap-5">
        <Link aria-label="QualiScan AI — início" className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand" to="/home">
          <Brand />
        </Link>
        <nav aria-label="Navegação principal" className="hidden items-center gap-8 lg:flex">
          <Link className="text-sm font-medium text-ink-muted hover:text-brand" to="/home#como-funciona">Como funciona</Link>
          <Link className="text-sm font-medium text-ink-muted hover:text-brand" to="/home#beneficios">Benefícios</Link>
          <Link className="text-sm font-medium text-ink-muted hover:text-brand" to="/history">Análises</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild className="hidden sm:inline-flex" icon={<ScanLine aria-hidden className="size-4" />} size="sm">
            <Link to="/scan">Nova inspeção</Link>
          </Button>
          <Button asChild aria-label="Sair da demonstração" size="icon" variant="ghost">
            <Link to="/login"><LogOut aria-hidden className="size-[1.125rem]" /></Link>
          </Button>
        </div>
      </Container>
      <nav aria-label="Navegação principal no celular" className="border-t border-line lg:hidden">
        <Container className="grid grid-cols-3 px-0 sm:px-0">
          <Link className="border-r border-line py-3 text-center text-xs font-semibold text-ink-muted hover:bg-surface-raised hover:text-brand" to="/home#como-funciona">
            Como funciona
          </Link>
          <Link className="border-r border-line py-3 text-center text-xs font-semibold text-ink-muted hover:bg-surface-raised hover:text-brand" to="/home#beneficios">
            Benefícios
          </Link>
          <Link className="py-3 text-center text-xs font-semibold text-ink-muted hover:bg-surface-raised hover:text-brand" to="/history">
            Análises
          </Link>
        </Container>
      </nav>
    </header>
  );
}
