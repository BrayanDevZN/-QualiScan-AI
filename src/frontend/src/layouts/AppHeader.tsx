import { LogOut, Menu, ScanLine } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/shadcn/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/shadcn/sheet";
import { Brand, Container } from "@/components/ui";

const links = [
  { label: "Como funciona", to: "/home#como-funciona" },
  { label: "Benefícios", to: "/home#beneficios" },
  { label: "Análises", to: "/history" },
];

export function AppHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-surface">
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
        <Link aria-label="QualiScan AI, início" className="rounded-sm" to="/home">
          <Brand />
        </Link>

        <nav aria-label="Navegação principal" className="hidden items-center gap-9 lg:flex">
          {links.map(({ label, to }) => (
            <Link className="text-base font-medium text-ink-muted transition-colors hover:text-brand" key={to} to={to}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild className="hidden sm:inline-flex" size="default">
            <Link to="/scan"><ScanLine aria-hidden /> Nova inspeção</Link>
          </Button>
          <Button asChild aria-label="Sair da demonstração" className="hidden lg:inline-flex" size="icon" variant="ghost">
            <Link to="/login"><LogOut aria-hidden /></Link>
          </Button>

          <Sheet onOpenChange={setOpen} open={open}>
            <SheetTrigger asChild>
              <Button aria-label="Abrir menu" className="lg:hidden" size="icon" variant="ghost">
                <Menu aria-hidden className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[min(22rem,90vw)] gap-0 bg-surface">
              <SheetHeader className="p-6 text-left">
                <SheetTitle className="text-xl font-bold">Menu</SheetTitle>
                <SheetDescription>Navegue pelo QualiScan AI.</SheetDescription>
              </SheetHeader>
              <nav aria-label="Navegação no celular" className="flex flex-col gap-1 px-4">
                {links.map(({ label, to }) => (
                  <SheetClose asChild key={to}>
                    <Link className="rounded-sm px-3 py-4 text-lg font-semibold text-ink transition-colors hover:bg-surface-overlay" to={to}>
                      {label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-3 p-6">
                <SheetClose asChild>
                  <Button asChild size="lg">
                    <Link to="/scan"><ScanLine aria-hidden /> Nova inspeção</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button asChild size="lg" variant="ghost">
                    <Link to="/login"><LogOut aria-hidden /> Sair da demonstração</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
