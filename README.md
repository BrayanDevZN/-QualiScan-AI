# QualiScan AI

Plataforma de apoio a inspeções de qualidade. A aplicação reconhecerá o
material fotografado e apresentará os pontos que exigem atenção com base nos
procedimentos operacionais (POPs) e no histórico de ocorrências.

## Organização do projeto

- `src/frontend`: aplicação web responsiva e experiência visual do produto.
- `src/backend`: serviço de API e inteligência artificial, reservado para uma
  etapa posterior.

A arquitetura definida para a primeira interface está documentada em
`src/frontend/ARCHITECTURE.md`.

## Protótipo disponível

O frontend não funcional inclui login, página inicial, captura de imagem e
resultado simulado da inspeção com pontos de atenção e referências aos POPs.
Todo o processamento permanece local e demonstrativo; nenhuma IA ou API real é
executada nesta versão.

Para iniciar:

```bash
cd src/frontend
npm install
npm run dev
```

Verificações disponíveis:

```bash
npm run typecheck
npm run lint
npm run build
```
