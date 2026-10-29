import { LogOut, ScanLine } from "lucide-react";
import { Link } from "react-router-dom";

import { Brand, Button, Container } from "@/components/ui";

const links = [
  { label: "Como funciona", to: "/home#como-funciona" },
  { label: "Benefícios", to: "/home#beneficios" },
  { label: "Análises", to: "/history" },
];

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 pt-3">
      <Container className="max-w-[70rem] px-5 sm:px-8">
        <div className="rounded-[2rem] border border-line bg-white/90 shadow-panel backdrop-blur-md lg:rounded-full">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-3 pt-3 pb-2 sm:h-16 sm:flex-nowrap sm:justify-between sm:p-0 sm:pr-2.5 sm:pl-8 lg:pb-0">
            <Link aria-label="QualiScan AI — início" className="order-1 mr-auto rounded-full pl-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:mr-0 sm:pl-0" to="/home">
              <Brand className="[&_img]:h-8 sm:[&_img]:h-11" />
            </Link>
            <nav aria-label="Navegação principal" className="order-2 hidden items-center gap-1 lg:flex">
              {links.map(({ label, to }) => (
                <Button asChild key={label} size="sm" variant="ghost">
                  <Link to={to}>{label}</Link>
                </Button>
              ))}
            </nav>
            <Button asChild className="order-4 w-full sm:order-3 sm:w-auto" icon={<ScanLine aria-hidden />} size="sm">
              <Link to="/scan">Nova inspeção</Link>
            </Button>
            <Button asChild aria-label="Sair da demonstração" className="order-3 sm:order-4 sm:ml-0" size="icon" variant="ghost">
              <Link to="/login"><LogOut aria-hidden /></Link>
            </Button>
          </div>
          <nav aria-label="Navegação principal no celular" className="grid grid-cols-3 gap-1.5 px-3 pb-3 lg:hidden">
            {links.map(({ label, to }) => (
              <Button asChild key={label} className="h-8 px-1 text-[0.7rem] sm:text-xs" size="sm" variant="secondary">
                <Link to={to}>{label}</Link>
              </Button>
            ))}
          </nav>
        </div>
      </Container>
    </header>
  );
}
