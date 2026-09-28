import { Brand } from "@/components/ui";
import { Reveal } from "@/components/motion/Reveal";
import { LoginForm } from "@/features/authentication/LoginForm";

export function LoginPage() {
  return (
    <main className="page-enter min-h-dvh bg-white lg:grid lg:grid-cols-[minmax(0,1.08fr)_minmax(28rem,0.92fr)]">
      <section className="relative min-h-[18rem] overflow-hidden bg-[#27262a] lg:min-h-dvh">
        <img
          alt="Inspetor avaliando um componente de motor elétrico em ambiente industrial"
          className="absolute inset-0 size-full object-cover object-[66%_center]"
          src="/assets/images/qualiscan-industrial-inspection.webp"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[#27262a]/95 via-[#27262a]/62 to-[#27262a]/10 lg:bg-gradient-to-t lg:from-[#27262a]/95 lg:via-[#27262a]/35 lg:to-transparent" />

        <div className="relative z-10 flex min-h-[18rem] flex-col p-5 sm:p-8 lg:min-h-dvh lg:p-12 xl:p-16">
          <Brand inverse />

          <Reveal className="mt-auto max-w-2xl border-l border-white/45 pb-1 pl-5 sm:pl-7">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/75">
              Inspeção industrial · QualiScan AI
            </p>
            <h1 className="mt-5 max-w-xl text-balance text-3xl font-bold leading-[1.08] tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
              Qualidade começa por saber onde olhar.
            </h1>
            <p className="mt-5 hidden max-w-lg text-base leading-7 text-white/80 sm:block">
              Um apoio visual para reconhecer materiais, consultar procedimentos e conduzir verificações com mais clareza.
            </p>
            <p className="mt-7 hidden text-xs font-semibold uppercase tracking-[0.14em] text-white/65 lg:block">Fluxo padronizado · Decisão orientada</p>
          </Reveal>
        </div>
      </section>

      <section className="flex items-center bg-white px-5 py-12 sm:px-10 lg:min-h-dvh lg:px-12 xl:px-20">
        <Reveal className="mx-auto w-full max-w-[29rem]" delay={80}>
          <div className="mb-9 border-t border-line pt-6">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand">Acesso à plataforma</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] text-ink sm:text-4xl">Bem-vindo de volta</h2>
            <p className="mt-3 text-sm leading-6 text-ink-muted sm:text-base">Entre com suas credenciais para acessar o ambiente de inspeção.</p>
          </div>

          <LoginForm />

          <p className="mt-9 border-t border-line pt-5 text-center text-xs leading-5 text-ink-subtle">
            Ambiente demonstrativo · Nenhuma credencial será enviada
          </p>
        </Reveal>
      </section>
    </main>
  );
}
