import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/shadcn/accordion";
import { Badge } from "@/components/shadcn/badge";
import { Button } from "@/components/shadcn/button";
import { Container } from "@/components/ui";
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

const flow = ["Imagem do material", "Contexto dos POPs e medidas em mm", "Pontos de atenção"];

export function HomePage() {
  return (
    <AppShell>
      <AppHeader />

      <main>
        <section className="grid lg:min-h-[calc(100dvh-4.5rem)] lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)]">
          <figure className="relative order-first min-h-[19rem] overflow-hidden bg-surface-overlay sm:min-h-[26rem] lg:order-last lg:min-h-0">
            <img
              alt="Profissional inspecionando um motor elétrico com apoio de um celular"
              className="hero-photo absolute inset-0 size-full object-cover object-[66%_center]"
              src="/assets/images/qualiscan-industrial-inspection.webp"
            />
            <figcaption className="absolute bottom-0 left-0 bg-surface px-5 py-4 text-base font-bold text-ink sm:px-7">
              Leitura visual do material · demonstração de inspeção assistida
            </figcaption>
          </figure>

          <div className="flex flex-col justify-center gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:py-20 lg:pr-14 lg:pl-10 xl:pl-[calc((100vw-88rem)/2+2.5rem)]">
            <h1 className="hero-in text-display text-ink">
              Veja o que exige <span className="text-brand">atenção.</span>
            </h1>
            <p className="hero-in max-w-xl text-lg leading-8 text-ink sm:text-xl sm:leading-9">
              Inspeção de transformadores com apoio visual: fotografe o transformador ou seus componentes e encontre os pontos importantes, com as medidas sempre em milímetros e o apoio dos procedimentos da sua operação.
            </p>
            <div className="hero-in flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link to="/scan">Iniciar uma inspeção <ArrowRight aria-hidden /></Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a href="#como-funciona">Como funciona</a>
              </Button>
            </div>
          </div>
        </section>

        <section aria-label="Etapas da inspeção" className="bg-brand text-white">
          <Container className="flex flex-col gap-3 py-10 sm:py-14 md:flex-row md:items-center md:justify-between md:gap-6">
            {flow.map((label, index) => (
              <Reveal className="flex items-center gap-6 md:gap-6" delay={index * 90} key={label}>
                <p className="text-statement">{label}</p>
                {index < flow.length - 1 && <ArrowRight aria-hidden className="hidden size-8 shrink-0 text-white/60 md:block" />}
              </Reveal>
            ))}
          </Container>
        </section>

        <section className="scroll-mt-16 py-20 sm:py-28 lg:scroll-mt-20 lg:py-36" id="como-funciona">
          <Container className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <Reveal className="flex flex-col items-start gap-6 lg:sticky lg:top-28 lg:self-start">
              <h2 className="text-title text-ink">Como usar o QualiScan, passo a passo.</h2>
              <p className="max-w-md text-lg leading-8 text-ink">
                Siga o fluxo completo, desde a preparação da foto até a conclusão da inspeção e a consulta das peças já analisadas.
              </p>
              <Button asChild size="lg">
                <Link to="/scan">Iniciar uma inspeção <ArrowRight aria-hidden /></Link>
              </Button>
            </Reveal>

            <Reveal delay={100}>
              <Accordion className="gap-2" defaultValue="passo-1" type="single" collapsible>
                {workflow.map(({ description, details, number, result, title }) => (
                  <AccordionItem className="rounded-sm border-0 bg-surface" key={title} value={`passo-${Number(number)}`}>
                    <AccordionTrigger className="px-5 py-5 text-left text-lg font-bold hover:no-underline sm:px-7 sm:py-6 sm:text-xl">
                      {title}
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-6 sm:px-7 sm:pb-8">
                      <p className="max-w-2xl text-base leading-7 text-ink">{description}</p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {details.map((detail) => (
                          <li key={detail}>
                            <Badge variant="secondary">{detail}</Badge>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-6 max-w-2xl text-base font-semibold leading-7 text-ink">{result}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </Container>
        </section>

        <section className="scroll-mt-16 bg-accent py-20 text-white sm:py-28 lg:scroll-mt-20 lg:py-36" id="beneficios">
          <Container className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <Reveal className="flex flex-col gap-6">
              <h2 className="text-title">Qualidade que acompanha o inspetor.</h2>
              <p className="max-w-md text-lg leading-8 text-white">
                O QualiScan aproxima o conhecimento técnico da rotina sem tornar o processo mais complicado.
              </p>
              <p className="max-w-md text-base leading-7 text-white">
                A proposta é apoiar a decisão do profissional: a tecnologia organiza as referências, enquanto a avaliação continua nas mãos do inspetor.
              </p>
            </Reveal>

            <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
              {benefits.map(({ description, outcome, title }, index) => (
                <Reveal className="flex flex-col gap-3" delay={index * 80} key={title}>
                  <h3 className="text-2xl font-bold leading-tight">{title}</h3>
                  <p className="text-base leading-7 text-white">{description}</p>
                  <p className="text-base font-semibold leading-7">{outcome}</p>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-brand py-20 text-white sm:py-28 lg:py-36">
          <Container className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end lg:gap-20">
            <Reveal className="flex flex-col gap-6">
              <h2 className="text-title">Comece pela imagem.</h2>
              <p className="max-w-xl text-lg leading-8 text-white">Termine com uma decisão mais clara. Inicie o fluxo visual e veja como a captura do material será organizada.</p>
            </Reveal>
            <Reveal delay={100}>
              <Button asChild className="w-full lg:w-auto" size="lg" variant="inverse">
                <Link to="/scan">Começar agora <ArrowRight aria-hidden /></Link>
              </Button>
            </Reveal>
          </Container>
        </section>
      </main>

      <footer className="bg-ink pt-14 text-white sm:pt-20">
        <Container>
          <img
            alt="QualiScan AI"
            className="h-auto w-full max-w-[56rem]"
            src="/assets/brand/qualiscan-logo-inverse.svg"
          />
          <div className="mt-12 flex flex-col gap-2 pb-10 text-sm text-white/75 sm:flex-row sm:items-center sm:justify-between">
            <p>QualiScan AI · Protótipo visual</p>
            <p>Inspeções mais claras, decisões mais seguras.</p>
          </div>
        </Container>
      </footer>
    </AppShell>
  );
}
