# PROJECT GUIDE — Mars Mission 001

Landing page conceitual (fictícia, não afiliada à SpaceX) construída com **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · GSAP 3.15 (ScrollTrigger, SplitText, MotionPath, ScrollTo)**.

---

## 1. Instalação

Requisitos: Node.js 20.9+ (testado com Node 24) e npm.

```bash
npm install
```

## 2. Desenvolvimento

```bash
npm run dev
```

Abra `http://localhost:3000`. Em desenvolvimento, o React Strict Mode está ativo (efeitos montam duas vezes) — todas as timelines são limpas pelo `useGSAP()`, então isso é esperado e seguro.

## 3. Verificações e build

```bash
npm run lint        # ESLint (config do Next)
npm run typecheck   # tsc --noEmit
npm run build       # build de produção (página estática pré-renderizada)
npm run start       # serve o build
```

---

## 4. Estrutura

```text
src/
├── app/
│   ├── layout.tsx            fontes (next/font), metadata
│   ├── page.tsx              resolve os assets no servidor e monta as seções
│   ├── globals.css           tokens (@theme), primitivas tipográficas, botões, slots
│   └── icon.svg              favicon genérico (não é a marca)
├── components/
│   ├── layout/               Navbar, Footer, ScrollRuntime (refresh global do ScrollTrigger)
│   ├── preloader/            MissionPreloader
│   ├── providers/            AssetsProvider (contexto com as URLs resolvidas)
│   ├── sections/             HeroSection … FinalSection (uma por seção)
│   └── ui/                   AssetSlot, Logo, MaskLines, ScrollButton, SectionLabel
├── data/
│   ├── assets.ts             manifesto de imagens (ID → caminho, proporção, alt)
│   ├── content.ts            todos os textos e dados ficcionais
│   └── site.ts               título, créditos, aviso legal, opções da logo
└── lib/
    ├── assets.server.ts      verifica quais arquivos existem em /public
    ├── gsap.ts               registro de plugins, easings, media queries, scroll suave
    ├── intro.ts              sincronização preloader → hero
    ├── reveal.ts             padrões de animação reutilizáveis
    └── cn.ts
public/
├── branding/                 ← logo original
└── images/{hero,journey,starship,landing,astronauts,data,habitat,final}/
docs/
├── IMAGE_ASSETS.md           prompts e especificações de cada imagem
├── IMAGE_GENERATION.json     prompts usados, dimensões entregues e SHA-256
├── DESIGN_SYSTEM.md
└── PROJECT_GUIDE.md
```

---

## 5. Como adicionar as imagens

As 19 imagens já estão incluídas em `public/images/`, em WebP, e a logo original está em `public/branding/spacex-logo.svg`. Os cinco recortes transparentes usam WebP sem perdas. `docs/IMAGE_GENERATION.json` registra os prompts exatos enviados ao gerador nativo do ChatGPT, as dimensões reais e os checksums dos arquivos entregues. As imagens mantêm a resolução nativa da geração, sem ampliação artificial.

Para produzir novas versões:

1. Gere cada imagem com o prompt correspondente em `docs/IMAGE_ASSETS.md`.
2. Salve com o **nome exato** na pasta indicada. A extensão é livre — o resolvedor procura, nesta ordem: `.avif`, `.webp`, `.png`, `.jpg`, `.jpeg`.
   Exemplo: `public/images/hero/hero-mars-landscape.webp`.
3. **Desenvolvimento:** basta recarregar a página.
   **Produção:** rode `npm run build` novamente — a página é estática e a detecção de arquivos acontece no build.

Enquanto um arquivo não existir, o slot mostra `ASSET / <ID>` com a proporção correta. Nada quebra: nem o build, nem a execução, nem as animações.

### Como os assets são referenciados

- `src/data/assets.ts` declara cada asset (`id`, `path` **sem extensão**, `alt`, `ratio`, `critical`, `transparent`).
- `src/lib/assets.server.ts` (`resolveAssets()`) roda no servidor, verifica `public/` e devolve `{ ID: "/images/...webp" | null }`.
- `src/app/page.tsx` passa esse mapa para o `AssetsProvider`.
- Cada seção usa `<AssetSlot id="HERO_LANDSCAPE" … />`, que renderiza `next/image` (lazy por padrão; `loading="eager"` e `fetchPriority="high"` para os assets `critical` da hero) ou o placeholder.
- O preloader aguarda as imagens marcadas com `data-critical` (camadas da hero) e as fontes, com limite de 2.8 s.

Para **renomear** ou **adicionar** um asset: edite `src/data/assets.ts` (o tipo `AssetId` garante que todos os usos sejam atualizados) e documente-o em `docs/IMAGE_ASSETS.md`.

---

## 6. Onde colocar a logo original

```
public/branding/spacex-logo.svg
```

(também aceita `spacex-logo.png` ou `spacex-logo.webp` com transparência)

- A logo aparece na navbar, no preloader (revelada por máscara `clip-path` + linha de varredura) e no rodapé.
- O componente `src/components/ui/Logo.tsx` **não redesenha** a marca; só exibe o arquivo.
- Por padrão ela é forçada para branco (`filter: brightness(0) invert(1)`). Para manter as cores originais do arquivo: `src/data/site.ts → logo.forceWhite = false`.
- A altura é controlada pelo contêiner (navbar ≈ 15–17 px, preloader `clamp(20px, 3.4vw, 42px)`, rodapé ≈ 18 px). Exporte o SVG sem margens internas.
- Sem o arquivo, aparece o marcador técnico `[ BRAND / LOGO ]` (não imita a identidade).

---

## 7. Ajustar posicionamento e recorte das imagens

Todas as opções ficam nas props do `<AssetSlot>` dentro da seção correspondente:

| Prop | Efeito |
|---|---|
| `position` | `object-position` a partir de 768 px. Ex.: `"50% 62%"` sobe/desce o enquadramento |
| `mobilePosition` | `object-position` abaixo de 768 px |
| `fit` | `"cover"` (padrão) ou `"contain"` (recortes transparentes: nave, planetas) |
| `intrinsic` | Reserva o espaço pela proporção do manifesto (imagens no fluxo do texto) |
| `sizes` | Larguras para o `next/image` gerar as variantes certas |
| `mediaClassName` | Classes na camada interna animada (ex.: escala extra para parallax) |

Camadas da hero (`src/components/sections/HeroSection.tsx`):
- Caixa da nave: `md:top-[10%] md:bottom-[26%]` (desktop). No mobile, `.hero-ship-stage` em `globals.css` reserva espaço entre as tags e o conjunto título/card; a área acompanha o tamanho do título para evitar sobreposições, inclusive em telas de 320 px.
- Faixa de primeiro plano: `h-[30%]` na base.

Jornada (`JourneySection.tsx → SCENES`): posições da Terra/Marte em % da cena e os caminhos SVG (`path`). Se mover um planeta, ajuste também o início/fim do `path`.

---

## 8. Alterar o conteúdo

- **Textos e dados:** `src/data/content.ts` (todas as seções). Títulos são arrays de linhas → cada item é uma linha intencional.
- **Navegação:** `NAV` em `content.ts` (`NAV_PRIMARY` = links visíveis na navbar desktop).
- **Créditos, ano, aviso legal, título da página:** `src/data/site.ts`.
- **Telemetria simulada da jornada:** `JOURNEY.telemetry` + curva `VELOCITY` e marcos `PHASE_STARTS`/`MARKERS` em `JourneySection.tsx`.

Mantenha os rótulos `SIMULATED` / `CONCEPT` em qualquer número inventado.

---

## 9. Alterar as animações

| Onde | O que mexer |
|---|---|
| `src/lib/gsap.ts` | Easings (`EASE`), media queries (`MEDIA`), duração do scroll suave |
| `src/lib/reveal.ts` | Padrões globais: linhas mascaradas, fades, labels, frames, parallax |
| `MissionPreloader.tsx` | Duração da revelação, `ASSET_TIMEOUT`, saída da cortina |
| `HeroSection.tsx` | Timeline de entrada, flutuação da nave, parallax de scroll e de ponteiro |
| `JourneySection.tsx` | Comprimento do pin (`end: "+=320%"`), `scrub`, escalas dos planetas |
| `StarshipSection.tsx` | `PIN_QUERY` (quando fixar), `end: "+=130%"`, ordem da revelação |
| `LandingSection.tsx` | Retângulo inicial (`contained`), `end: "+=220%"` |
| Demais seções | Cada uma tem seu próprio bloco `useGSAP` documentado |

Boas práticas já adotadas (mantenha-as):
- Crie tudo dentro de `useGSAP(() => { const mm = gsap.matchMedia(); mm.add(...) }, { scope })`.
- Coloque estados ocultos somente no ramo `MEDIA.motion`.
- Anime o frame ou `[data-asset-media]` — nunca o `<img>`.
- Prefira `fromTo` com valores finais explícitos.

---

## 10. Deploy

**Vercel (recomendado):** importe o repositório, framework “Next.js”, sem variáveis de ambiente. Cada push gera um build com as imagens presentes em `public/`.

**Servidor Node próprio:**

```bash
npm run build
npm run start   # porta 3000 (use PORT=8080 npm run start para outra)
```

O site usa a otimização de imagens do Next (`next/image`), então precisa de um runtime Node/Vercel. Para hospedagem 100% estática seria necessário `output: "export"` com `images.unoptimized: true` em `next.config.ts`.

Antes de publicar no portfólio: preencha `SITE.credits` em `src/data/site.ts`, adicione as imagens e a logo original, e mantenha o aviso de projeto não oficial visível no rodapé.
