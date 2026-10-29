import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/shadcn/button";
import { AppShell } from "@/layouts/AppShell";

import { Brand, Container } from "../ui";

type RoutePlaceholderProps = { description: string; eyebrow: string; title: string };

export function RoutePlaceholder({ description, eyebrow, title }: RoutePlaceholderProps) {
  return (
    <AppShell>
      <header className="bg-surface">
        <Container className="flex h-[4.5rem] items-center"><Brand /></Container>
      </header>
      <Container className="grid min-h-[calc(100dvh-4.5rem)] place-items-center py-16">
        <div className="flex w-full max-w-xl flex-col items-start gap-6">
          <p className="text-display text-brand">{eyebrow}</p>
          <h1 className="text-page-title text-ink">{title}</h1>
          <p className="max-w-md text-lg leading-8 text-ink-muted">{description}</p>
          <Button asChild size="lg">
            <Link to="/home"><ArrowLeft aria-hidden /> Voltar ao início</Link>
          </Button>
        </div>
      </Container>
    </AppShell>
  );
}
