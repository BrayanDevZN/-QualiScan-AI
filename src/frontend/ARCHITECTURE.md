# Arquitetura do frontend

## Escopo do primeiro protótipo

O frontend é um protótipo visual responsivo, priorizando celulares, com cinco
experiências principais:

1. login;
2. página inicial com acesso rápido à inspeção;
3. captura ou envio da foto do material;
4. resultado visual com os pontos de atenção da inspeção.
5. histórico demonstrativo de peças analisadas.

Nesta etapa não haverá autenticação real, envio de imagens, reconhecimento por
IA nem integração com o backend. Os dados exibidos serão simulações locais.

## Tecnologias definidas

- **Vite**: ambiente de desenvolvimento e build;
- **React + TypeScript**: interface e tipagem;
- **React Router**: navegação entre as quatro telas;
- **Tailwind CSS**: sistema visual responsivo e consistente;
- **Lucide React**: ícones da interface.

A direção visual é institucional e industrial, com superfícies claras, vermelho
como cor de ação, cinza grafite para conteúdo e fotografia real. Animações de
rolagem e elementos 3D leves complementam a experiência sem participar do
fluxo funcional.

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
    │   │   ├── analysis/       # material identificado e pontos de atenção
    │   │   └── history/        # inspeções anteriores demonstrativas
    │   ├── features/
    │   │   ├── authentication/ # formulário e sessão simulada
    │   │   ├── material-capture/ # experiência de captura ou envio
    │   │   └── inspection-results/ # marcações e recomendações da inspeção
    │   ├── components/
    │   │   ├── ui/             # botões, campos, cards e componentes básicos
    │   │   ├── feedback/       # loading, vazio, erro e mensagens de estado
    │   │   └── motion/         # animações e ambientação 3D
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
| `/` e `/login` | Login | Apresentar a marca e permitir a entrada simulada. |
| `/home` | Início | Resumir a proposta e iniciar uma inspeção. |
| `/scan` | Escanear | Capturar ou escolher uma foto do material. |
| `/analysis` | Análise | Exibir o material reconhecido e os pontos de atenção. |
| `/history` | Histórico | Consultar peças analisadas no conjunto demonstrativo. |

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

As partes do protótipo visual foram implementadas: fundação técnica, login,
página inicial, captura real pela câmera, upload, recorte local, resultado e
histórico demonstrativos. O fluxo utiliza dados locais, incluindo identificação
simulada de material, pontos de atenção, checklist e referências fictícias aos
POPs. Nenhuma IA, persistência ou API real é executada nesta versão.
