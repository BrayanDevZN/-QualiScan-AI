import { ArrowLeft, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";

import { AppShell } from "@/layouts/AppShell";

import { Badge, Brand, Button, Container, Surface } from "../ui";

type RoutePlaceholderProps = { description: string; eyebrow: string; title: string };

export function RoutePlaceholder({ description, eyebrow, title }: RoutePlaceholderProps) {
  return (
    <AppShell>
      <header className="border-b border-line bg-white">
        <Container className="flex h-[4.75rem] items-center"><Brand /></Container>
      </header>
      <Container className="grid min-h-[calc(100dvh-4.75rem)] place-items-center py-16">
        <Surface className="w-full max-w-xl border-t-4 border-t-brand p-7 sm:p-10">
          <span className="mb-6 grid size-12 place-items-center bg-[#f4e7e5] text-brand"><ClipboardList aria-hidden className="size-6" /></span>
          <Badge>{eyebrow}</Badge>
          <h1 className="mt-5 text-3xl font-bold tracking-[-0.035em] text-ink sm:text-4xl">{title}</h1>
          <p className="mt-4 max-w-md text-base leading-7 text-ink-muted">{description}</p>
          <Button asChild className="mt-8" icon={<ArrowLeft className="size-4" />}>
            <Link to="/home">Voltar ao início</Link>
          </Button>
        </Surface>
      </Container>
    </AppShell>
  );
}
