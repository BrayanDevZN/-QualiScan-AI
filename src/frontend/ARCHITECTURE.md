# Arquitetura do frontend

## Escopo do primeiro protótipo

O frontend será um protótipo visual responsivo, priorizando celulares, com
quatro experiências:

1. login;
2. página inicial com acesso rápido à inspeção;
3. captura ou envio da foto do material;
4. resultado visual com os pontos de atenção da inspeção.

Nesta etapa não haverá autenticação real, envio de imagens, reconhecimento por
IA nem integração com o backend. Os dados exibidos serão simulações locais.

## Tecnologias definidas

- **Vite**: ambiente de desenvolvimento e build;
- **React + TypeScript**: interface e tipagem;
- **React Router**: navegação entre as quatro telas;
- **Tailwind CSS**: sistema visual responsivo e consistente;
- **Lucide React**: ícones da interface.

A direção visual é institucional e industrial, com superfícies claras, vermelho
como cor de ação, cinza grafite para conteúdo e fotografia real. Não serão
utilizadas cenas 3D nem animações decorativas.

Nenhuma biblioteca de estado global será adicionada no protótipo. Estado local
e contexto de React são suficientes até existir integração real.

## Estrutura

```text
src/
├── backend/                    # fronteira reservada para API e IA
└── frontend/
    ├── public/
    │   └── assets/
    │       └── images/         # fotografias e imagens públicas da interface
    ├── src/
    │   ├── app/
    │   │   ├── providers/      # provedores globais estritamente necessários
    │   │   └── router/         # rotas e proteção visual de acesso
    │   ├── pages/
    │   │   ├── login/          # entrada no produto
    │   │   ├── home/           # visão inicial e chamada para nova inspeção
    │   │   ├── scan/           # câmera/upload e estado de processamento
    │   │   └── analysis/       # material identificado e pontos de atenção
    │   ├── features/
    │   │   ├── authentication/ # formulário e sessão simulada
    │   │   ├── material-capture/ # experiência de captura ou envio
    │   │   └── inspection-results/ # marcações e recomendações da inspeção
    │   ├── components/
    │   │   ├── ui/             # botões, campos, cards e componentes básicos
    │   │   └── feedback/       # loading, vazio, erro e mensagens de estado
    │   ├── layouts/             # estruturas compartilhadas entre páginas
    │   ├── hooks/               # comportamento reutilizável de React
    │   ├── services/            # contrato isolado para a futura API
    │   ├── mocks/               # materiais e inspeções simulados
    │   ├── types/               # tipos compartilhados do domínio
    │   └── styles/              # tema, fontes e estilos globais
    └── ARCHITECTURE.md
```

## Rotas previstas

| Rota | Tela | Responsabilidade |
| --- | --- | --- |
| `/login` | Login | Apresentar a marca e permitir a entrada simulada. |
| `/` | Início | Resumir a proposta e iniciar uma inspeção. |
| `/scan` | Escanear | Capturar ou escolher uma foto do material. |
| `/analysis` | Análise | Exibir o material reconhecido e os pontos de atenção. |

## Regras de organização

- Uma `page` apenas compõe a tela; a lógica visual específica fica em
  `features`.
- Componentes entram em `components/ui` somente quando são usados em mais de
  uma tela.
- O frontend acessará a futura API apenas por `services`, evitando dependência
  direta entre interface e backend.
- O layout será desenhado primeiro para telas pequenas e ampliado para tablet e
  desktop.
- Fotografias utilizadas pelo produto ficam locais em `public/assets/images`,
  evitando dependência de servidores externos durante o uso.

## Estado da implementação

As cinco partes do protótipo visual foram implementadas: fundação técnica,
login, página inicial, captura e resultado da inspeção. O fluxo utiliza dados
locais e demonstrativos, incluindo identificação de material, pontos de atenção,
checklist e referências simuladas aos POPs. Nenhuma IA ou API real é executada
nesta versão.
