export type SampleImage = {
  src: string;
  alt: string;
  label: string;
};

export type AttentionPoint = {
  id: number;
  /** Index of the photo (in `images`) where this point is marked. Defaults to the first photo. */
  image?: number;
  position: { left: string; top: string };
  title: string;
  severity: string;
  severityVariant: "attention" | "warning" | "success";
  summary: string;
  /** Error seen in the photo for this point. Absent when nothing wrong was observed. */
  finding?: string;
  observations: string[];
  measurements?: string[];
  pop: string;
};

export type InspectionSample = {
  id: string;
  code: string;
  date: string;
  material: string;
  imageSrc: string;
  imageAlt: string;
  /** Photos of the same item, shown as tabs. The first one must match `imageSrc`. */
  images?: SampleImage[];
  fileName: string;
  focus: string;
  description: string;
  status: string;
  statusVariant: "attention" | "success";
  points: AttentionPoint[];
};

// The three real photos used by the prototype. Every analysis below is a demonstration: the markers
// and criteria are fixed text, written from the checks the inspection team performs on each item.
// All dimensions are measured in millimeters (mm).
export const samples: InspectionSample[] = [
  {
    id: "trafo-potencia",
    code: "TR-0482",
    date: "29 out. 2026 · 13:31",
    material: "Transformador de potência",
    imageSrc: "/assets/images/trafo-potencia.jpg",
    imageAlt: "Transformador de potência na área de montagem, com buchas, radiadores e caixas de comando",
    fileName: "trafo-potencia.jpg",
    focus: "Buchas, radiadores, válvulas e caixas de comando",
    description: "Conferência visual externa do transformador montado: buchas, radiadores, válvulas laterais e instrumentos.",
    status: "Requer atenção",
    statusVariant: "attention",
    points: [
      {
        id: 1,
        position: { left: "45%", top: "25%" },
        title: "Buchas e terminais (H1 a H3)",
        severity: "Alta atenção",
        severityVariant: "attention",
        summary: "Verifique a integridade das buchas de alta tensão, a vedação da base e a identificação dos terminais.",
        finding: "A marcação do terminal H3 aparece parcialmente encoberta na foto. Refaça o registro com outro ângulo para confirmar H1, H2 e H3.",
        observations: ["Trincas ou lascas na porcelana", "Vedação e fixação da base", "Marcação correta dos terminais H1, H2 e H3"],
        measurements: ["Altura e diâmetro de cada bucha (mm)", "Distância entre os eixos das buchas (mm)"],
        pop: "POP-TR-014 · Inspeção visual de buchas e terminais",
      },
      {
        id: 2,
        position: { left: "73%", top: "28%" },
        title: "Radiadores e aletas",
        severity: "Atenção moderada",
        severityVariant: "warning",
        summary: "Observe o estado dos painéis do radiador, das conexões ao tanque e do acabamento da pintura.",
        finding: "Manchas avermelhadas na pintura do tanque, junto ao radiador. Podem ser reflexo de luz ou início de oxidação; confirme na peça.",
        observations: ["Amassados ou deformações nas aletas", "Sinais de óleo nas conexões", "Falhas de pintura ou início de oxidação"],
        measurements: ["Espessura da camada de pintura, quando exigida (µm)"],
        pop: "POP-TR-009 · Verificação externa de radiadores",
      },
      {
        id: 3,
        position: { left: "44%", top: "64%" },
        title: "Caixa de comando e instrumentos",
        severity: "Atenção moderada",
        severityVariant: "warning",
        summary: "Confira a caixa de ligações, os visores, os conduítes e os instrumentos de proteção.",
        finding: "Cabos brancos soltos pendurados na frente da caixa de comando. Confira se estão fixados e identificados.",
        observations: ["Vedação e fechamento da tampa", "Fiação e conduítes bem fixados", "Visores e indicadores sem danos"],
        pop: "POP-TR-021 · Inspeção de painéis e instrumentos",
      },
      {
        id: 4,
        position: { left: "27%", top: "67%" },
        title: "Válvulas e flanges laterais",
        severity: "Verificação padrão",
        severityVariant: "success",
        summary: "Confirme a posição das válvulas, o aperto dos flanges e a ausência de vazamentos.",
        observations: ["Posição e travamento das alavancas", "Parafusos dos flanges completos", "Ausência de vazamento de óleo"],
        pop: "POP-TR-017 · Verificação de válvulas e flanges",
      },
    ],
  },
  {
    id: "valvula-flange",
    code: "VF-204",
    date: "29 out. 2026 · 10:18",
    material: "Válvula esfera 2\" DN50 flange/rosca BSP",
    imageSrc: "/assets/images/valvula-flange-furos.webp",
    imageAlt: "Face do flange da válvula vista de frente, com os 4 furos de fixação e o furo central",
    images: [
      {
        src: "/assets/images/valvula-flange-furos.webp",
        alt: "Face do flange da válvula vista de frente, com os 4 furos de fixação e o furo central",
        label: "Face do flange",
      },
      {
        src: "/assets/images/valvula-flange-outra-face.webp",
        alt: "Face de um flange de válvula segurado na mão, com furos chanfrados e o furo central aberto",
        label: "Outra face",
      },
      {
        src: "/assets/images/valvula-flange-maos.webp",
        alt: "Válvula segurada na mão, com flange protegido por plástico bolha nas duas pontas",
        label: "Em mãos",
      },
      {
        src: "/assets/images/valvula-flange-geral.webp",
        alt: "Válvula esfera 2\" série 204 DIN DN50, com alavanca, etiqueta da OS e gravação PN10-16, DN50 e CF8",
        label: "Etiqueta",
      },
    ],
    fileName: "valvula-flange-furos.webp",
    focus: "Diâmetro do flange, centro a centro e quantidade de furos",
    description: "Recebimento de válvulas de fechamento para transformador, com conferência dimensional do flange e da identificação.",
    status: "Requer atenção",
    statusVariant: "attention",
    points: [
      {
        id: 1,
        image: 0,
        position: { left: "45%", top: "31%" },
        title: "Diâmetro do flange",
        severity: "Alta atenção",
        severityVariant: "attention",
        summary: "Meça o diâmetro externo do flange, de borda a borda passando pelo centro, e compare com o desenho da série 204 DIN.",
        observations: ["Flange circular, sem deformação na borda", "Sem rebarbas ou amassados na borda", "Mesmo diâmetro em todas as válvulas do lote"],
        measurements: ["Diâmetro externo do flange (mm)"],
        pop: "POP-VF-003 · Dimensional de flanges",
      },
      {
        id: 2,
        image: 0,
        position: { left: "50%", top: "37%" },
        title: "Centro a centro dos furos",
        severity: "Alta atenção",
        severityVariant: "attention",
        summary: "Meça do meio de um furo ao meio do furo oposto, na diagonal. Faça as duas diagonais: devem dar o mesmo valor.",
        finding: "A foto foi tirada em ângulo, então o espaçamento entre os furos aparece distorcido. Não dá para confirmar o centro a centro pela imagem: meça na peça.",
        observations: ["As duas diagonais cruzam no centro do furo de passagem", "Furos igualmente espaçados em volta do centro", "Medir de centro de furo a centro de furo, não de borda a borda"],
        measurements: ["Centro a centro, diagonal 1 (mm)", "Centro a centro, diagonal 2 (mm)"],
        pop: "POP-VF-003 · Dimensional de flanges",
      },
      {
        id: 3,
        image: 0,
        position: { left: "68%", top: "54%" },
        title: "Quantidade de furos",
        severity: "Alta atenção",
        severityVariant: "attention",
        summary: "Conte os furos de fixação do flange. O esperado é 4 furos de fixação, além do furo central de passagem.",
        observations: ["4 furos de fixação visíveis, mais o furo central", "Mesma quantidade nas outras faces fotografadas", "Nenhum furo faltando ou tampado"],
        pop: "POP-VF-003 · Dimensional de flanges",
      },
      {
        id: 4,
        image: 0,
        position: { left: "24%", top: "45%" },
        title: "Superfície da face do flange",
        severity: "Atenção moderada",
        severityVariant: "warning",
        summary: "Observe a face de vedação em busca de riscos, marcas e resíduos que comprometam a montagem.",
        observations: ["Riscos profundos ou marcas de impacto", "Oxidação, manchas ou resíduos", "Marcas circulares de usinagem uniformes"],
        pop: "POP-VF-005 · Condição de superfícies",
      },
      {
        id: 5,
        image: 1,
        position: { left: "64%", top: "56%" },
        title: "Diâmetro e acabamento dos furos",
        severity: "Alta atenção",
        severityVariant: "attention",
        summary: "Meça o diâmetro de cada furo de fixação e confira o acabamento das bordas.",
        finding: "Nesta face os furos têm chanfro visível nas bordas (esquerdo e inferior direito), e na foto da outra face não aparecem chanfros. Confirme se os dois flanges seguem o mesmo padrão. Fitas plásticas também passam por alguns furos: retire antes de medir.",
        observations: ["Mesmo acabamento em todos os furos", "Bordas dos furos sem rebarbas", "Furos livres, sem fita ou resíduo"],
        measurements: ["Diâmetro de cada furo de fixação (mm)"],
        pop: "POP-VF-003 · Dimensional de flanges",
      },
      {
        id: 6,
        image: 1,
        position: { left: "36%", top: "40%" },
        title: "Furo central de passagem",
        severity: "Atenção moderada",
        severityVariant: "warning",
        summary: "Meça o diâmetro do furo central e confira se a passagem está livre.",
        finding: "Nesta foto o furo central parece maior em relação ao flange do que na foto da primeira face. Pode ser o ângulo da foto: meça com paquímetro nas duas faces.",
        observations: ["Passagem livre, sem resíduo ou objeto", "Mesmo diâmetro nas duas faces", "Bordas sem rebarbas"],
        measurements: ["Diâmetro do furo central (mm)"],
        pop: "POP-VF-003 · Dimensional de flanges",
      },
      {
        id: 7,
        image: 2,
        position: { left: "50%", top: "29%" },
        title: "Tipo de conexão",
        severity: "Atenção moderada",
        severityVariant: "warning",
        summary: "Confira se as pontas da válvula são as pedidas na OS: a etiqueta descreve flange face lisa de um lado e rosca BSP do outro.",
        finding: "A válvula desta foto parece ter flange nas duas pontas, e a etiqueta descreve flange/rosca BSP. Confirme se é o modelo certo.",
        observations: ["Uma ponta com flange face lisa", "Outra ponta com rosca BSP, protegida com tampa azul", "Conexões conforme a descrição da etiqueta"],
        pop: "POP-VF-001 · Conferência de identificação",
      },
      {
        id: 8,
        image: 3,
        position: { left: "30%", top: "11%" },
        title: "Etiqueta e identificação",
        severity: "Atenção moderada",
        severityVariant: "warning",
        summary: "Compare a etiqueta com a ordem de serviço: código, descrição, quantidade e fornecedor. Confira também a gravação no corpo.",
        finding: "O campo de quantidade da etiqueta tem só um rabisco à mão, difícil de ler. Confirme a quantidade com a OS.",
        observations: ["Código 15754 e OS 20500 conferem com a ordem de serviço", "Gravação Micromazza, PN10-16, DN50 e CF8 legível no corpo", "Código de barras legível"],
        pop: "POP-VF-001 · Conferência de identificação",
      },
    ],
  },
  {
    id: "placas-identificacao",
    code: "PI-V1-V20",
    date: "28 out. 2026 · 16:05",
    material: "Placas de identificação dos motoventiladores",
    imageSrc: "/assets/images/placas-identificacao.jpg",
    imageAlt: "Dez placas metálicas gravadas com os motoventiladores V1 a V20, organizadas em pares",
    fileName: "placas-identificacao.jpg",
    focus: "Escrita, furos, superfícies e dimensões em milímetros",
    description: "Placas de aço gravadas para identificar os motoventiladores V1 a V20 do transformador.",
    status: "Concluída",
    statusVariant: "success",
    points: [
      {
        id: 1,
        position: { left: "24%", top: "12%" },
        title: "Escrita correta",
        severity: "Alta atenção",
        severityVariant: "attention",
        summary: "Confirme cada texto gravado: o número do motoventilador precisa corresponder à lista e ao par da placa.",
        observations: ["Texto igual ao pedido (V1 a V20)", "Pares corretos em cada placa", "Gravação legível e sem borrões"],
        pop: "POP-PI-002 · Conferência de gravação",
      },
      {
        id: 2,
        position: { left: "4.4%", top: "31.8%" },
        title: "Diâmetro e distância dos furos",
        severity: "Atenção moderada",
        severityVariant: "warning",
        summary: "Meça o diâmetro dos furos de fixação e a distância entre eles em cada placa.",
        finding: "Alguns furos aparecem com parafuso ou marca de fenda (como em V2/V8 e V5/V19) e outros estão vazios. Confirme o padrão e meça em mm.",
        observations: ["Furos centralizados na placa", "Sem rebarbas nas bordas dos furos", "Mesmo padrão em todas as placas"],
        measurements: ["Diâmetro de cada furo (mm)", "Distância entre os furos (mm)"],
        pop: "POP-PI-004 · Dimensional de furos",
      },
      {
        id: 3,
        position: { left: "30%", top: "57%" },
        title: "Superfícies e acabamento",
        severity: "Atenção moderada",
        severityVariant: "warning",
        summary: "Observe a face da placa em busca de riscos, manchas ou marcas de manuseio.",
        finding: "Riscos finos e marcas de manuseio na superfície, mais visíveis nas placas da coluna da esquerda.",
        observations: ["Riscos profundos na superfície", "Manchas ou oxidação", "Bordas sem cortes ou rebarbas"],
        pop: "POP-PI-005 · Condição de superfícies",
      },
      {
        id: 4,
        position: { left: "48.3%", top: "70%" },
        title: "Altura e largura",
        severity: "Verificação padrão",
        severityVariant: "success",
        summary: "Meça a altura e a largura de cada placa. Todas as medidas são registradas em milímetros.",
        observations: ["Placas do mesmo tamanho", "Esquadro das bordas", "Conferir com o desenho aprovado"],
        measurements: ["Altura da placa (mm)", "Largura da placa (mm)"],
        pop: "POP-PI-001 · Dimensional de placas",
      },
    ],
  },
];

export const defaultSample = samples[0];

export function getSampleImages(sample: InspectionSample): SampleImage[] {
  return sample.images ?? [{ src: sample.imageSrc, alt: sample.imageAlt, label: "Foto" }];
}

export function findSampleByImage(imageSrc?: string) {
  return samples.find((sample) => sample.imageSrc === imageSrc);
}

export function findSampleById(id?: string) {
  return samples.find((sample) => sample.id === id);
}
