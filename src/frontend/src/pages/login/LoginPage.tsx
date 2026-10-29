import { Brand } from "@/components/ui";
import { Reveal } from "@/components/motion/Reveal";
import { LoginForm } from "@/features/authentication/LoginForm";

export function LoginPage() {
  return (
    <main className="min-h-dvh bg-canvas lg:grid lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative flex min-h-[21rem] flex-col justify-between overflow-hidden bg-ink p-5 sm:min-h-[26rem] sm:p-8 lg:min-h-dvh lg:p-12 xl:p-16">
        <img
          alt="Inspetor avaliando um componente de motor elétrico em ambiente industrial"
          className="hero-photo absolute inset-0 size-full object-cover object-[66%_center]"
          src="/assets/images/qualiscan-industrial-inspection.webp"
        />
        <div aria-hidden className="absolute inset-0 bg-ink/55" />

        <div className="relative z-10">
          <Brand inverse />
        </div>

        <div className="relative z-10 flex max-w-2xl flex-col gap-4 pt-16 text-white">
          <h1 className="hero-in text-page-title">Qualidade começa por saber onde olhar.</h1>
          <p className="hero-in hidden max-w-lg text-lg leading-8 text-white/90 sm:block">
            Um apoio visual para conferir transformadores, válvulas, placas e componentes, consultando os procedimentos com mais clareza.
          </p>
          <p className="hero-in hidden text-base font-semibold text-white/80 lg:block">Fluxo padronizado · Decisão orientada</p>
        </div>
      </section>

      <section className="flex items-center justify-center px-4 py-12 sm:px-10 lg:min-h-dvh lg:px-14 xl:px-20">
        <Reveal className="w-full max-w-[28rem]">
          <h2 className="text-3xl font-bold leading-tight tracking-[-0.035em] text-ink sm:text-4xl">Bem-vindo de volta</h2>
          <p className="mt-3 mb-9 text-base leading-7 text-ink-muted">Entre com suas credenciais para acessar o ambiente de inspeção.</p>

          <LoginForm />

          <p className="mt-10 text-center text-sm leading-6 text-ink-subtle">
            Ambiente demonstrativo. Nenhuma credencial será enviada.
          </p>
        </Reveal>
      </section>
    </main>
  );
}
