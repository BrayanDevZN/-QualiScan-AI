export type AttentionPoint = {
  id: number;
  position: { left: string; top: string };
  title: string;
  severity: string;
  severityVariant: "attention" | "warning" | "success";
  summary: string;
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
        position: { left: "31%", top: "30%" },
        title: "Buchas e terminais (H1 a H3)",
        severity: "Alta atenção",
        severityVariant: "attention",
        summary: "Verifique a integridade das buchas de alta tensão, a vedação da base e a identificação dos terminais.",
        observations: ["Trincas ou lascas na porcelana", "Vedação e fixação da base", "Marcação correta dos terminais H1, H2 e H3"],
        measurements: ["Altura e diâmetro de cada bucha (mm)", "Distância entre os eixos das buchas (mm)"],
        pop: "POP-TR-014 · Inspeção visual de buchas e terminais",
      },
      {
        id: 2,
        position: { left: "72%", top: "28%" },
        title: "Radiadores e aletas",
        severity: "Atenção moderada",
        severityVariant: "warning",
        summary: "Observe o estado dos painéis do radiador, das conexões ao tanque e do acabamento da pintura.",
        observations: ["Amassados ou deformações nas aletas", "Sinais de óleo nas conexões", "Falhas de pintura ou início de oxidação"],
        measurements: ["Espessura da camada de pintura, quando exigida (µm)"],
        pop: "POP-TR-009 · Verificação externa de radiadores",
      },
      {
        id: 3,
        position: { left: "43%", top: "66%" },
        title: "Caixa de comando e instrumentos",
        severity: "Atenção moderada",
        severityVariant: "warning",
        summary: "Confira a caixa de ligações, os visores, os conduítes e os instrumentos de proteção.",
        observations: ["Vedação e fechamento da tampa", "Fiação e conduítes bem fixados", "Visores e indicadores sem danos"],
        pop: "POP-TR-021 · Inspeção de painéis e instrumentos",
      },
      {
        id: 4,
        position: { left: "28%", top: "63%" },
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
    material: "Válvula esfera 3/4\" flange/flange",
    imageSrc: "/assets/images/valvula-flange.jpg",
    imageAlt: "Duas válvulas de fechamento 3/4\" série 204 com flange, etiquetadas e protegidas com plástico bolha",
    fileName: "valvula-flange.jpg",
    focus: "Diâmetro dos furos, etiqueta e superfície do flange",
    description: "Recebimento de válvulas de fechamento para transformador, com conferência do flange e da identificação.",
    status: "Requer atenção",
    statusVariant: "attention",
    points: [
      {
        id: 1,
        position: { left: "21%", top: "83%" },
        title: "Diâmetro e distância dos furos",
        severity: "Alta atenção",
        severityVariant: "attention",
        summary: "Meça o diâmetro de cada furo do flange e a distância entre eles, comparando com o desenho da série 204 DIN.",
        observations: ["Furos livres de rebarbas", "Circularidade e posição dos furos", "Mesmo padrão nos dois flanges"],
        measurements: ["Diâmetro de cada furo (mm)", "Distância entre os furos (mm)", "Diâmetro externo do flange (mm)"],
        pop: "POP-VF-003 · Dimensional de flanges",
      },
      {
        id: 2,
        position: { left: "47%", top: "27%" },
        title: "Etiqueta e identificação",
        severity: "Atenção moderada",
        severityVariant: "warning",
        summary: "Compare o texto da etiqueta com a ordem de serviço: código, descrição, quantidade e finalidade.",
        observations: ["Código e descrição conferem com a OS", "Quantidade da etiqueta (2 unidades)", "Código de barras legível e finalidade \"Fechamento - Trafo\""],
        pop: "POP-VF-001 · Conferência de identificação",
      },
      {
        id: 3,
        position: { left: "36%", top: "72%" },
        title: "Superfície do flange",
        severity: "Atenção moderada",
        severityVariant: "warning",
        summary: "Observe a face de vedação e a superfície externa em busca de danos que comprometam a montagem.",
        observations: ["Riscos ou marcas na face de vedação", "Amassados e sinais de impacto", "Oxidação ou resíduos"],
        pop: "POP-VF-005 · Condição de superfícies",
      },
      {
        id: 4,
        position: { left: "26%", top: "30%" },
        title: "Alavanca, haste e fixação",
        severity: "Verificação padrão",
        severityVariant: "success",
        summary: "Confira a alavanca, a haste e a porca de fixação, e o estado da embalagem de proteção.",
        observations: ["Alavanca sem folga excessiva", "Porca e haste bem fixadas", "Embalagem protegendo o flange"],
        pop: "POP-VF-007 · Verificação funcional de válvulas",
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
        position: { left: "25%", top: "12%" },
        title: "Escrita correta",
        severity: "Alta atenção",
        severityVariant: "attention",
        summary: "Confirme cada texto gravado: o número do motoventilador precisa corresponder à lista e ao par da placa.",
        observations: ["Texto igual ao pedido (V1 a V20)", "Pares corretos em cada placa", "Gravação legível e sem borrões"],
        pop: "POP-PI-002 · Conferência de gravação",
      },
      {
        id: 2,
        position: { left: "4.5%", top: "31.5%" },
        title: "Diâmetro e distância dos furos",
        severity: "Atenção moderada",
        severityVariant: "warning",
        summary: "Meça o diâmetro dos furos de fixação e a distância entre eles em cada placa.",
        observations: ["Furos centralizados na placa", "Sem rebarbas nas bordas dos furos", "Mesmo padrão em todas as placas"],
        measurements: ["Diâmetro de cada furo (mm)", "Distância entre os furos (mm)"],
        pop: "POP-PI-004 · Dimensional de furos",
      },
      {
        id: 3,
        position: { left: "42%", top: "50%" },
        title: "Superfícies e acabamento",
        severity: "Atenção moderada",
        severityVariant: "warning",
        summary: "Observe a face da placa em busca de riscos, manchas ou marcas de manuseio.",
        observations: ["Riscos profundos na superfície", "Manchas ou oxidação", "Bordas sem cortes ou rebarbas"],
        pop: "POP-PI-005 · Condição de superfícies",
      },
      {
        id: 4,
        position: { left: "93%", top: "66%" },
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

export function findSampleByImage(imageSrc?: string) {
  return samples.find((sample) => sample.imageSrc === imageSrc);
}

export function findSampleById(id?: string) {
  return samples.find((sample) => sample.id === id);
}
