import {
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Badge, Button, Container } from "@/components/ui";
import { Reveal } from "@/components/motion/Reveal";
import { AppHeader } from "@/layouts/AppHeader";
import { AppShell } from "@/layouts/AppShell";

const workflow = [
  {
    number: "01",
    title: "Inicie uma nova inspeção",
    description: "Na página inicial, selecione “Iniciar uma inspeção” ou use o botão “Nova inspeção” no cabeçalho. Você será levado para a área de captura do material.",
    details: ["Acesse a área de captura", "Leia as orientações laterais", "Prepare a peça para o registro"],
    result: "Resultado: o ambiente fica pronto para receber a foto do material.",
  },
  {
    number: "02",
    title: "Fotografe ou envie a peça",
    description: "Escolha “Abrir câmera” para registrar o material naquele momento ou “Selecionar arquivo” para usar uma imagem do aparelho. Mantenha toda a região de inspeção visível.",
    details: ["Use iluminação uniforme", "Evite reflexos e desfoque", "Não cubra partes da peça"],
    result: "Resultado: a imagem aparece na tela para conferência antes de qualquer análise.",
  },
  {
    number: "03",
    title: "Revise e envie para análise",
    description: "Confira se a foto está nítida e bem enquadrada. Se necessário, use “Trocar foto” ou remova o arquivo. Quando estiver satisfeito, selecione “Analisar material” e depois abra o resultado.",
    details: ["Confira o enquadramento", "Troque a foto se necessário", "Selecione “Analisar material”"],
    result: "Resultado: o QualiScan prepara a identificação e apresenta os pontos sugeridos para revisão.",
  },
  {
    number: "04",
    title: "Confira cada ponto de atenção",
    description: "Na tela de resultado, toque nas marcações numeradas sobre a foto. Para cada ponto, leia o nível de atenção, o que deve ser observado e a referência de POP apresentada ao lado.",
    details: ["Selecione uma marcação", "Compare com o estado da peça", "Marque o ponto como verificado"],
    result: "Resultado: cada região revisada muda de estado e entra na contagem da inspeção.",
  },
  {
    number: "05",
    title: "Conclua e consulte depois",
    description: "Depois de verificar todos os pontos, selecione “Concluir inspeção”. Para consultar peças anteriores, abra “Análises” no menu e pesquise pelo nome ou código do material.",
    details: ["Finalize todos os pontos", "Conclua a inspeção", "Consulte o histórico pelo menu"],
    result: "Resultado: a inspeção fica finalizada e pode ser localizada novamente no histórico demonstrativo.",
  },
];

const benefits = [
  {
    number: "01",
    title: "POPs acessíveis",
    description: "O procedimento deixa de ficar isolado em arquivos extensos e passa a acompanhar o contexto da peça inspecionada.",
    outcome: "Na rotina: consulta mais rápida às etapas, aos critérios e às recomendações aplicáveis.",
  },
  {
    number: "02",
    title: "Histórico visual",
    description: "Regiões que já apresentaram ocorrências podem ser sinalizadas para receber atenção especial em inspeções futuras.",
    outcome: "Na rotina: o conhecimento acumulado pela equipe volta para o processo em forma de referência visual.",
  },
  {
    number: "03",
    title: "Padrão de qualidade",
    description: "Todos os inspetores consultam a mesma orientação e percorrem uma sequência comum de verificação do material.",
    outcome: "Na rotina: menos variação entre avaliações e maior consistência no registro dos pontos revisados.",
  },
  {
    number: "04",
    title: "Uso em campo",
    description: "A experiência foi pensada para telas pequenas, leitura rápida e operação direta durante a atividade industrial.",
    outcome: "Na rotina: captura, consulta e confirmação reunidas no celular, sem interromper o fluxo de trabalho.",
  },
];

export function HomePage() {
  return (
    <AppShell>
      <AppHeader />

      <main>
        <section className="bg-white/82 py-10 sm:py-14 lg:py-20">
          <Container>
            <div className="grid items-stretch gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14 xl:gap-20">
              <Reveal className="flex flex-col justify-center py-4 lg:py-10">
                <Badge>Inspeção orientada por informação</Badge>
                <h1 className="mt-7 max-w-xl text-balance text-[clamp(2.7rem,5vw,4.75rem)] font-bold leading-[1.02] tracking-[-0.05em] text-ink">
                  Veja o que exige <span className="text-brand">atenção.</span>
                </h1>
                <p className="mt-7 max-w-lg border-l border-line-strong pl-5 text-base leading-7 text-ink-muted sm:text-lg sm:leading-8">
                  Fotografe o material e encontre os pontos importantes da inspeção com apoio dos procedimentos da sua operação.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Button asChild icon={<ArrowRight aria-hidden className="size-4" />} size="lg">
                    <Link to="/scan">Iniciar uma inspeção</Link>
                  </Button>
                  <Button asChild size="lg" variant="secondary"><a href="#como-funciona">Como funciona</a></Button>
                </div>
              </Reveal>

              <Reveal className="min-h-[23rem] sm:min-h-[31rem] lg:min-h-[35rem]" delay={100}>
                <figure className="relative size-full min-h-[23rem] overflow-hidden bg-surface-overlay sm:min-h-[31rem] lg:min-h-[35rem]">
                  <img
                    alt="Profissional inspecionando um motor elétrico com apoio de um celular"
                    className="absolute inset-0 size-full object-cover object-[66%_center]"
                    src="/assets/images/qualiscan-industrial-inspection.webp"
                  />
                  <figcaption className="absolute bottom-0 left-0 border-t-4 border-brand bg-white px-5 py-4 sm:px-6">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink">Leitura visual do material</p>
                    <p className="mt-1 text-xs text-ink-muted">Demonstração de inspeção assistida</p>
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </Container>
        </section>

        <section className="border-y border-line bg-brand text-white">
          <Container className="grid divide-y divide-white/20 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[
              ["01", "Imagem do material"],
              ["02", "Contexto dos POPs"],
              ["03", "Pontos de atenção"],
            ].map(([number, label]) => (
              <Reveal className="px-1 sm:px-6 lg:px-10" delay={Number(number) * 60} key={number}>
                <div className="flex items-center gap-4 py-5">
                  <span className="text-xs font-bold tracking-[0.16em] text-white/65">{number}</span>
                  <span className="text-sm font-semibold">{label}</span>
                </div>
              </Reveal>
            ))}
          </Container>
        </section>

        <section className="scroll-mt-36 bg-white/82 py-20 sm:py-28 lg:scroll-mt-24" id="como-funciona">
          <Container>
            <Reveal className="max-w-2xl">
              <Badge>Como funciona</Badge>
              <h2 className="mt-3 text-balance text-3xl font-bold leading-tight tracking-[-0.04em] text-ink sm:text-5xl">Como usar o QualiScan, passo a passo.</h2>
              <p className="mt-5 text-base leading-7 text-ink-muted sm:text-lg">Siga o fluxo completo, desde a preparação da foto até a conclusão da inspeção e a consulta das peças já analisadas.</p>
            </Reveal>

            <ol className="mt-12 border-y border-line">
              {workflow.map(({ description, details, number, result, title }) => (
                <li className="border-b border-line last:border-b-0" key={title}>
                  <Reveal className="grid gap-4 py-7 sm:grid-cols-[4rem_15rem_1fr] sm:items-start sm:gap-6 lg:grid-cols-[6rem_19rem_1fr] lg:py-9" delay={Number(number) * 45}>
                    <span className="font-mono text-sm font-bold text-brand">{number}</span>
                    <h3 className="text-xl font-bold tracking-[-0.025em] text-ink">{title}</h3>
                    <div className="max-w-2xl">
                      <p className="text-sm leading-6 text-ink-muted">{description}</p>
                      <ul className="mt-5 grid gap-2 sm:grid-cols-3">
                        {details.map((detail) => (
                          <li className="flex gap-2 text-xs font-semibold leading-5 text-ink" key={detail}>
                            <span className="mt-2 size-1.5 shrink-0 bg-brand" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-5 border-l-2 border-brand pl-3 text-xs font-semibold leading-5 text-ink">{result}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <section className="scroll-mt-36 border-y border-line bg-canvas/82 py-20 sm:py-28 lg:scroll-mt-24" id="beneficios">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
              <Reveal className="lg:sticky lg:top-10 lg:self-start">
                <Badge>Informação no momento certo</Badge>
                <h2 className="mt-4 text-balance text-3xl font-bold leading-tight tracking-[-0.04em] text-ink sm:text-5xl">Qualidade que acompanha o inspetor.</h2>
                <p className="mt-5 max-w-md text-base leading-7 text-ink-muted">O QualiScan aproxima o conhecimento técnico da rotina sem tornar o processo mais complicado.</p>
                <p className="mt-5 max-w-md border-l border-line-strong pl-4 text-sm leading-6 text-ink-muted">A proposta é apoiar a decisão do profissional: a tecnologia organiza as referências, enquanto a avaliação continua nas mãos do inspetor.</p>
              </Reveal>
              <div className="border-t border-line-strong">
                {benefits.map(({ description, number, outcome, title }) => (
                  <article className="border-b border-line-strong" key={title}>
                    <Reveal className="grid gap-3 py-6 sm:grid-cols-[3rem_12rem_1fr] sm:gap-5 sm:py-8" delay={Number(number) * 55}>
                      <span className="font-mono text-xs font-bold text-brand">{number}</span>
                      <h3 className="text-lg font-bold text-ink">{title}</h3>
                      <div>
                        <p className="text-sm leading-6 text-ink-muted">{description}</p>
                        <p className="mt-3 text-xs font-semibold leading-5 text-ink">{outcome}</p>
                      </div>
                    </Reveal>
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-white/82 py-20 sm:py-28">
          <Container>
            <Reveal className="grid bg-brand text-white lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="p-7 sm:p-10 lg:p-12">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/65">Próxima inspeção</p>
                <h2 className="mt-4 max-w-2xl text-balance text-3xl font-bold leading-tight tracking-[-0.04em] sm:text-4xl">Comece pela imagem. Termine com uma decisão mais clara.</h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-white/75">Inicie o fluxo visual e veja como a captura do material será organizada.</p>
              </div>
              <div className="p-7 lg:p-12">
                <Button asChild className="w-full border-white bg-white text-brand hover:bg-[#f2f2f0] lg:w-auto" icon={<ChevronRight aria-hidden className="size-4" />} size="lg">
                  <Link to="/scan">Começar agora</Link>
                </Button>
              </div>
            </Reveal>
          </Container>
        </section>
      </main>

      <footer className="border-t border-line bg-white/95 py-7">
        <Container>
          <Reveal className="flex flex-col gap-3 text-xs text-ink-subtle sm:flex-row sm:items-center sm:justify-between">
            <p>QualiScan AI · Protótipo visual</p>
            <p>Inspeções mais claras, decisões mais seguras.</p>
          </Reveal>
        </Container>
      </footer>
    </AppShell>
  );
}
