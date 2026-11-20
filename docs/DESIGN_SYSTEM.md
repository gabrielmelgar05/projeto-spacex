# DESIGN SYSTEM — Mars Mission 001

Direção: **PRECISION. EXPLORATION. ENGINEERING. HUMANITY.**
Uma experiência documental, escura e silenciosa, em que a fotografia carrega a cor e a interface se comporta como instrumentação de missão: fina, exata, discreta.

Todos os tokens vivem em `src/app/globals.css` (bloco `@theme` + `:root`) e viram utilitários Tailwind automaticamente (`bg-void`, `text-mute`, `border-line`, `font-display`…).

---

## 1. Paleta

| Token | Hex | Utilitário | Uso |
|---|---|---|---|
| `void` | `#050608` | `bg-void` | Fundo principal, preto da página |
| `deep` | `#0B0F14` | `bg-deep` | Superfícies secundárias (seção de dados, placeholders) |
| `panel` | `#12171E` | `bg-panel` | Painéis elevados |
| `raise` | `#171C23` | `text-raise` | Cards e marca monumental do rodapé |
| `ink` | `#F4F5F6` | `text-ink` | Branco principal: títulos, números, CTA sólido |
| `mute` | `#A9AFB8` | `text-mute` | Texto secundário |
| `dim` | `#5D6672` | `text-dim` | Labels técnicos de menor hierarquia |
| `faint` | `#3A434E` | `text-faint` | Palavras “apagadas” do statement, índices |
| `haze` | `#8298AC` | `text-haze` | Único azul — status, telemetria, traço de sinal |
| `line` | `#232B35` | `border-line` | Hairlines e divisórias |
| `line-strong` | `#303B47` | `border-line-strong` | Bordas de botões, cards, réguas |

**Regras**
- Nenhum laranja/vermelho na interface. Cores quentes existem **apenas** nas fotografias de Marte.
- O azul (`haze`) é atmosférico: pontos de status, telemetria, um traço de sinal. Nunca em botões, nunca com glow.
- Sem gradientes decorativos. Gradientes só como **sombra funcional** (vinhetas para legibilidade sobre fotos).
- Contraste: `ink` e `mute` sobre `void` passam AA; `dim` é reservado a labels curtos em caixa alta (decorativos/complementares).

---

## 2. Tipografia

| Papel | Família | Fonte (next/font) | Classe |
|---|---|---|---|
| Display | **Michroma** | `--font-michroma` | `font-display`, `.t-mega`, `.t-h1`, `.t-h2`, `.t-number` |
| Texto | **Inter Tight** (300/400/500) | `--font-inter-tight` | `font-sans` (padrão do body), `.t-statement`, `.t-lead` |
| Técnica / dados | **IBM Plex Mono** (400/500) | `--font-plex-mono` | `font-mono`, `.t-label`, `.t-data` |

Por que Michroma: geométrica, larga, com o espírito de engenharia aeroespacial — e com uma única espessura, o que impõe disciplina (hierarquia por escala, não por peso). Inter Tight equilibra a largura do display com leitura densa e elegante. Plex Mono dá a voz de instrumento.

### Escala fluida (320 → 1920 px)

| Token | Valor | Uso |
|---|---|---|
| `--fs-mega` | `clamp(1.75rem, 0.55rem + 5.9vw, 7.5rem)` | Título da hero |
| `--fs-h1` | `clamp(1.7rem, 0.7rem + 4.4vw, 6.25rem)` | Títulos de capítulo (Touchdown, Life, Frontier) |
| `--fs-h2` | `clamp(1.45rem, 0.75rem + 3.1vw, 4.4rem)` | Títulos de seção em colunas |
| `--fs-statement` | `clamp(1.75rem, 0.9rem + 4.1vw, 6rem)` | Manifesto (Inter Tight Light) |
| `--fs-number` | `clamp(2.25rem, 1.2rem + 4.2vw, 6.5rem)` | Números grandes |
| `--fs-lead` | `clamp(1.05rem, 0.95rem + 0.45vw, 1.4rem)` | Parágrafos de abertura |
| `--fs-body` | `clamp(0.94rem, 0.9rem + 0.15vw, 1.05rem)` | Corpo |
| `--fs-small` | `0.8125rem` | Dados |
| `--fs-label` | `0.6875rem` | Labels mono em caixa alta |

**Diretrizes**
- Display sempre em caixa alta, `letter-spacing: -0.03 a -0.05em`, `line-height ≈ 1`.
- Labels mono em caixa alta com `letter-spacing: 0.16em`.
- Quebras de linha são **intencionais**: títulos são arrays de linhas em `src/data/content.ts` e renderizados pelo `<MaskLines>`.
- Parágrafos limitados a 34–46 `ch`.

---

## 3. Grid e espaçamento

- **Container:** `.shell` — largura total, `padding-inline: var(--gutter)` (`clamp(1rem, 3.2vw, 3.5rem)`), `max-width: 120rem`.
- **Grid:** `.grid-12` — 4 colunas no mobile, 12 a partir de 768 px; gap `clamp(0.75rem, 1.6vw, 1.75rem)`.
- **Ritmo vertical:** `--section-y: clamp(6rem, 14vw, 13rem)` entre seções editoriais.
- **Navbar:** `--nav-h: 4.5rem`; conteúdo de seções fixadas começa em `calc(var(--nav-h) + 1.5rem)`.
- Composição **assimétrica** por padrão: títulos em 5–8 colunas, texto de apoio deslocado para as colunas 9–12, imagens que escapam do grid (detalhe da Starship, frame deslocado da galeria).

---

## 4. Componentes

| Componente | Arquivo | Notas |
|---|---|---|
| `AssetSlot` | `src/components/ui/AssetSlot.tsx` | Slot de imagem com placeholder técnico; anima-se o frame ou `[data-asset-media]`, nunca o `<img>` |
| `Logo` | `src/components/ui/Logo.tsx` | Exibe o arquivo original da marca; fallback neutro `[ BRAND / LOGO ]` |
| `MaskLines` | `src/components/ui/MaskLines.tsx` | Título com linhas mascaradas (`[data-line]`) e cópia acessível única |
| `ScrollButton` | `src/components/ui/Button.tsx` | Âncora real com rolagem suave; variantes `ghost` e `solid`; ícone `right/down/up` |
| `SectionLabel` | `src/components/ui/SectionLabel.tsx` | Índice editorial “02 ── THE JOURNEY” |

### Botões
- Altura 44 px (alvo de toque), cantos retos, borda 1 px `line-strong`, texto mono em caixa alta.
- **Hover:** preenchimento sobe de baixo (`scaleY 0 → 1`, 0.5 s, `expo.out`), texto inverte; ícone desloca 2–3 px na direção da ação.
- **Foco:** `outline: 1px solid ink; outline-offset: 4px` — o mesmo estado visual do hover.
- `solid` = branco sobre preto (CTA principal). `ghost` = contorno.

### Cards / painéis
- Só onde agrupam dados (card da hero, telemetria, painel do mapa).
- Borda fina, fundo `deep/60` com `backdrop-blur` sobre fotos, **sem sombras**, cantos retos.
- Cabeçalho do painel: linha mono com label à esquerda e status à direita, separado por hairline.
- Detalhe `.bracket`: cantos em L de 10 px.

### Indicadores
- `.dot` (6 px, quadrado) e `.dot--live` (pulso de opacidade 2.4 s).
- Hairlines `.hairline`, réguas de cota (Starship), retículas (Landing, mapa).

---

## 5. Breakpoints

| Nome | Largura | Comportamento |
|---|---|---|
| Mobile pequeno | 320 px | Tudo em 4 colunas; título da hero ≥ 28 px |
| Mobile | 390 px | Cena da jornada com geometria vertical própria; fase ativa em card único |
| `sm` | 640 px | CTA “Mission log” aparece na navbar |
| `md` / Tablet | 768 px | Grid de 12; cena da jornada horizontal; card completo na hero |
| `lg` / Desktop | 1024 px | Navbar com links; parallax por ponteiro; deriva horizontal da galeria; pin da Starship (se altura ≥ 720 px) |
| Desktop | 1440 px | Referência de composição |
| Grande | 1920 px | Tipografia limitada pelos `clamp()`; container máx. 1920 px |

---

## 6. Princípios de direção de arte

1. **A fotografia é a cor.** A interface é preta, branca e cinza; Marte traz o calor.
2. **Instrumento, não videogame.** Dados pequenos, mono, alinhados, com hairlines — nunca neon, nunca brilho.
3. **Escala monumental.** Uma ideia por tela; títulos enormes e muito espaço negativo.
4. **Cada seção tem sua própria composição** (hero assimétrica, manifesto tipográfico, cena orbital, ficha técnica, plano full-bleed, spread editorial, painel de telemetria, galeria, encerramento centrado).
5. **Ficção declarada.** Todo dado inventado é rotulado (`SIMULATED`, `CONCEPT`, `fictional dramatisation`) e o rodapé traz o aviso de não afiliação.

---

## 7. Padrões de animação (GSAP)

Configuração central em `src/lib/gsap.ts`; padrões reutilizáveis em `src/lib/reveal.ts`.

| Padrão | Onde | Implementação |
|---|---|---|
| Preloader | Section 00 | Timeline própria: máscara `clip-path` na logo + linha de varredura + progresso → espera fontes/imagens críticas (máx. 2.8 s) → cortina sobe |
| Entrada da hero | Section 01 | Timeline pausada, liberada pelo preloader (`src/lib/intro.ts`); fundo de-zoom, nave sobe, linhas mascaradas, card por `clip-path` |
| Profundidade | Hero, First Steps, Life | Camadas com velocidades diferentes (`scrub: true`); parallax interno de mídia ±5–7% |
| Ponteiro | Hero (desktop, ponteiro fino) | `gsap.quickTo` em x/rotação, amplitude ≤ 30 px |
| Text reveal | Todas | `[data-line]` de `yPercent: 115 → 0`, `expo.out`, stagger 0.09 |
| Contraste por scroll | Humanity | Palavras de `faint → ink` ligadas ao scroll (`scrub: 0.6`) |
| Cena fixada | Journey | `pin` + `MotionPathPlugin` (`align`, `autoRotate`) + `strokeDashoffset` + telemetria via `onUpdate` |
| Revelação técnica | Starship | `pin` (≥1024×720) com `clip-path`, varredura, cotas e count-up no mesmo scrub |
| Expansão de imagem | Landing | `clip-path: inset()` contido → 0, escala 1.22 → 1, depois título e dados |
| Count-up | Starship, Data | Proxy `{v}` → `textContent`; valores finais já vêm no HTML |
| Deriva horizontal | Life (desktop) | `x` função de `scrollWidth`, `invalidateOnRefresh` |
| Encerramento | Frontier | Imagem recua (scale 1.3 → 1), arco orbital desenhado |

**Easing:** `expo.out` para entradas, `expo.inOut` para máscaras e cortinas, `none` em tudo que é scrub.
**Durações:** entradas 1.1–1.6 s; hover 0.45–0.5 s; nunca acima de 2.6 s.

### Regras de robustez
- Todo efeito roda dentro de `useGSAP()` (cleanup automático) + `gsap.matchMedia()`.
- `prefers-reduced-motion: reduce` → nenhum pin, nenhum estado oculto; o preloader é pulado; o conteúdo final é o HTML do servidor.
- Estados iniciais ocultos são aplicados **somente** pelo JS no ramo com movimento; sem JS o site é legível.
- Reveals usam `fromTo` + `once: true`: nada volta a sumir e um remount nunca captura um estado oculto.
- `ScrollTrigger.refresh()` com debounce após fontes, `window.load` e cada imagem carregada (`scheduleRefresh`).
- Slots reservam proporção (`aspect-ratio` ou dimensões do pai) → trocar placeholder por imagem não gera layout shift.
