# IMAGE ASSETS — Mars Mission 001

Guia de produção de todas as imagens da landing page. Os 19 assets fotográficos foram gerados com o gerador nativo de imagens do ChatGPT e incluídos em `public/images/`, nos slots definidos em `src/data/assets.ts`. A logo original está em `public/branding/spacex-logo.svg`.

Todas as imagens entregues usam WebP: qualidade 88 nas fotografias opacas e compressão sem perdas nos cinco recortes com transparência. O conjunto ocupa aproximadamente 8,1 MiB, cerca de 80% menos que os PNGs gerados. O Next.js continua produzindo variantes responsivas sob demanda.

Os **prompts exatos usados**, caminhos, dimensões reais e checksums SHA-256 estão em [`IMAGE_GENERATION.json`](IMAGE_GENERATION.json). As resoluções das fichas abaixo são **alvos de direção de arte**; os arquivos entregues preservam a resolução nativa do gerador, sem ampliação artificial. Se um arquivo for removido, o slot mantém o fallback técnico com a mesma proporção.

> **Projeto conceitual.** A missão é fictícia e o site não é afiliado à SpaceX. As imagens devem parecer fotografia documental plausível de uma missão futura — nunca reproduções de fotos reais, nem com logotipos, textos ou marcas visíveis.

---

## 0. Como usar este documento

1. Gere a imagem com o **prompt em inglês** do asset.
2. Exporte no formato indicado e salve com o **nome exato** no caminho indicado (a extensão é livre entre `.avif`, `.webp`, `.png`, `.jpg`).
3. Rode `npm run dev` (ou refaça o `npm run build`) — o resolvedor em `src/lib/assets.server.ts` detecta o arquivo automaticamente. Nada precisa ser alterado no código.
4. Se o enquadramento não cair bem, ajuste `position` / `mobilePosition` do `<AssetSlot>` (veja `docs/PROJECT_GUIDE.md`).

### Formatos

| Tipo | Formato recomendado | Observação |
|---|---|---|
| Fotografia opaca | `.webp` (qualidade 82–88) ou `.avif` | O Next.js gera variantes responsivas automaticamente. |
| Recorte com transparência | `.png` ou `.webp` com canal alfa | Bordas limpas, sem halo claro ou escuro. |
| Logo | `.svg` original | Ver seção “Branding”. |

### Prioridades

- **P1** — essencial para a primeira impressão (hero + momentos-chave).
- **P2** — completa a narrativa principal.
- **P3** — enriquece; o layout funciona bem sem ela.

---

## 1. Direção de arte global (vale para TODAS as imagens)

Use este bloco como referência fixa para manter a série consistente. Ele já está incorporado em cada prompt, mas vale reler ao revisar os resultados.

- **Linguagem:** fotografia cinematográfica documental de uma missão espacial real, rodada por um diretor de fotografia de cinema. Nada de ilustração, render “de videogame” ou concept art pintado.
- **Paleta:** pretos profundos (próximos de `#050608`), cinzas neutros e frios, brancos limpos. Marte aparece com seus tons naturais — ferrugem, ocre, caramelo — porém **dessaturados e puxados para o neutro** (saturação baixa, como na referência 04). O céu marciano tende a cinza-ocre pálido, não laranja vibrante.
- **Azul:** só como atmosfera — sombras frias, reflexos discretos no aço, brilho tênue de exaustão metano/oxigênio. Nunca neon.
- **Luz:** fisicamente plausível, uma fonte principal (o Sol, baixo no horizonte na maioria das cenas), muito contraste, sombras longas, highlights controlados. Sem bloom exagerado, sem lens flare chamativo.
- **Lente e câmera:** sensação de câmera de cinema full-frame, lentes 24–85 mm, profundidade de campo realista, grão fino de filme, leve vinheta natural.
- **Escala:** sempre monumental — a nave e a paisagem devem parecer enormes em relação aos humanos.
- **Starship (hardware):** veículo de aço inoxidável escovado, cilíndrico, 9 m de diâmetro; ogiva cônica arredondada; dois flaps dianteiros pequenos perto do topo e dois flaps traseiros maiores na base; lado de barlavento coberto por placas hexagonais pretas de proteção térmica; base com seis motores Raptor (três centrais menores e três externos com sinos de vácuo maiores). Para cenas em Marte, pernas de pouso curtas e robustas na base. Proporções realistas — sem asas, sem formas de foguete genérico.
- **Proibido em todas as imagens:** texto, tipografia, números, marcas d’água, logotipos (inclusive SpaceX/NASA), bandeiras, elementos de interface, molduras, bordas, colagens.

### Bloco de restrições padrão (cole no fim de cada prompt, se a ferramenta aceitar “negative prompt”)

```
No text, no typography, no letters, no numbers, no watermark, no logos, no flags, no interface elements, no HUD, no borders, no frames, no collage, no illustration style, no cartoon, no 3D-game look, no oversaturated orange, no neon blue, no lens flare streaks, no extra limbs, no warped hardware.
```

---

## 2. Branding

### BRAND_LOGO

| Campo | Valor |
|---|---|
| Arquivo | `spacex-logo.svg` (aceita também `.png` / `.webp` transparente) |
| Caminho | `public/branding/spacex-logo.svg` |
| Usado em | Navbar, preloader (revelação por máscara), rodapé |
| Prioridade | P1 |

**Não gere este asset.** Use o arquivo **oficial e original** da marca, sem redesenhar, sem trocar a fonte, sem “aproximações”. O componente `src/components/ui/Logo.tsx` apenas exibe o arquivo; por padrão aplica um filtro que o deixa 100% branco (`SITE.logo.forceWhite` em `src/data/site.ts`). Se o SVG já for branco ou se quiser manter as cores originais, defina `forceWhite: false`.

Requisitos do arquivo: `viewBox` correto, sem fundo, sem margens extras ao redor do desenho (o componente controla a altura; margens internas deixam a logo menor e desalinhada).

**Arquivo incluído:** vetor original de autoria da SpaceX, preservado sem redesenho. [Página de origem e histórico no Wikimedia Commons](https://commons.wikimedia.org/wiki/File:SpaceX-Logo.svg), extraído originalmente do press kit Falcon 1, Flight 4; [SVG de origem](https://upload.wikimedia.org/wikipedia/commons/d/de/SpaceX-Logo.svg). O filtro branco já existente no componente adapta a cor à interface escura. As cenas geradas são conceituais; não representam fotografias de uma missão real.

---

## 3. HERO — Section 01

A hero é composta por **três camadas independentes** para gerar profundidade real com parallax (fundo, nave, primeiro plano). Todas devem compartilhar exatamente a mesma luz, horário e atmosfera.

### Diagrama de alinhamento das camadas (desktop 16:9)

```
┌──────────────────────────────────────────────────────────────┐
│  navbar / textos superiores (céu limpo, sem detalhes)        │  0–20%
│                    ┌──────────┐                              │
│                    │ STARSHIP │  caixa centralizada          │  10% → 74% da altura (desktop)
│                    │  (2:5)   │  ancorada na BASE            │  mobile: entre tags e título
│   título           │          │                     card    │
│   (inf. esq.)      └──────────┘                     (inf.dir)│
│▓▓▓▓▓▓▓▓▓▓▓▓▓ FOREGROUND ROCKS (30% inferior) ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  70–100%
└──────────────────────────────────────────────────────────────┘
```

- Linha do horizonte do fundo: **entre 58% e 66% da altura** da imagem.
- A nave deve parecer flutuar **acima** da planície, com o terreno visível por baixo dela (é a sensação de “objeto suspenso” da referência 05).
- Os 30% inferiores ficam escuros (a interface aplica um gradiente para legibilidade do título).

---

### HERO_LANDSCAPE

| Campo | Valor |
|---|---|
| ID | `HERO_LANDSCAPE` |
| Arquivo | `hero-mars-landscape.webp` |
| Caminho | `public/images/hero/hero-mars-landscape.webp` |
| Seção | 01 — Hero / Mars Arrival (camada de fundo) |
| Prioridade | **P1** |
| Proporção | 16:9 |
| Resolução | 3200 × 1800 px (mín. 2560 × 1440) |
| Orientação | Horizontal |
| Enquadramento | Plano geral muito aberto; horizonte a ~62% da altura |
| Ponto focal | Centro horizontal, logo acima do horizonte (onde a nave será sobreposta) |
| Área de texto | Faixa superior (0–20%) limpa para navbar e textos; quadrante inferior esquerdo escuro para o título; inferior direito escuro para o card |
| Corte no mobile | Corta laterais; mantém o centro (`object-position` 58% 70%). Nada importante fora do terço central |
| Transparência | Não |

**Direção artística**
- **Elementos:** planície marciana rochosa e ampla, campos de pedras basálticas escuras em primeiro plano médio, colinas e mesas suaves ao fundo, poeira fina em suspensão. **Sem a nave** (ela vem em camada própria).
- **Câmera:** altura de olhos humanos (~1,7 m), levemente baixa, olhando reto para o horizonte; lente 35 mm.
- **Distância:** plano geral; montanhas a dezenas de quilômetros.
- **Iluminação:** sol baixo vindo da esquerda, atrás de uma névoa fina; luz difusa e cinematográfica; contraluz suave nas bordas das rochas.
- **Materiais/texturas:** regolito fino, rochas vesiculares, poeira assentada nas superfícies.
- **Atmosfera:** céu cinza-ocre pálido, quase cinza neutro no topo; névoa de poeira nas distâncias; clima silencioso e monumental.
- **Paleta:** cinzas quentes dessaturados, ocre apagado, sombras quase pretas com leve tom frio.
- **Escala:** imensidão; horizonte distante.
- **Realismo:** fotorrealismo total, como foto de rover de alta resolução tratada por um colorista de cinema.
- **Relação com outras imagens:** mesma luz e mesmo horário de `HERO_STARSHIP` e `HERO_FOREGROUND`; mesmo tratamento de cor de `LANDING_TOUCHDOWN`.

**Prompt**

```
Cinematic wide landscape photograph of the surface of Mars, an immense rocky plain stretching to a distant horizon of low eroded mesas and soft hills, horizon line placed at about 62 percent of the frame height. Scattered dark basaltic boulders in the middle ground, fine regolith, a thin veil of suspended dust in the distance. Low sun from the left behind a light haze, soft diffused cinematic light, long gentle shadows, subtle rim light on rock edges. Pale grey-ochre sky fading to an almost neutral grey at the top, the upper 20 percent of the frame calm and empty. The lower third darker and in shadow. Desaturated, restrained Martian palette — muted rust and ochre graded toward neutral greys, deep near-black shadows with a slightly cool tint. Eye-level camera, 35mm lens, full-frame cinema camera look, fine film grain, natural vignette, ultra-detailed, photorealistic, monumental sense of scale, quiet and solemn mood. Empty scene: no spacecraft, no people, no vehicles. 16:9 composition.
```

**Restrições:** no spacecraft, no rocket, no people, no rover, no text, no logos, no watermark, no interface elements, no borders, no oversaturated orange sky, no sun disc flare, no fantasy elements, physically plausible lighting, cinematic photorealism.

---

### HERO_STARSHIP

| Campo | Valor |
|---|---|
| ID | `HERO_STARSHIP` |
| Arquivo | `hero-starship.webp` (WebP com alfa, sem perdas) |
| Caminho | `public/images/hero/hero-starship.webp` |
| Seção | 01 — Hero (camada central, elemento protagonista) |
| Prioridade | **P1** |
| Proporção | 2:5 (vertical) |
| Resolução | 1200 × 3000 px |
| Orientação | Vertical |
| Enquadramento | Nave inteira, centralizada, ocupando ~88% da altura; base da nave a ~5% do limite inferior |
| Ponto focal | Corpo da nave e motores |
| Área de texto | Não se aplica (a interface fica ao redor) |
| Corte no mobile | Não corta (renderizada com `object-fit: contain`, ancorada na base) |
| Transparência | **Sim — fundo 100% transparente** |

**Direção artística**
- **Elementos:** Starship (somente a nave, sem booster) em descida final, vertical, perfeitamente na vertical ou com inclinação de no máximo 2°; flaps abertos; pernas de pouso já estendidas; motores centrais acesos com exaustão curta, translúcida, azul-esbranquiçada pálida.
- **Câmera:** de baixo para cima, levemente abaixo da nave (contra-plongée suave, ~10°), lente 50 mm, para reforçar a monumentalidade.
- **Distância:** nave inteira visível, sem cortes.
- **Iluminação:** mesma do `HERO_LANDSCAPE` — sol baixo pela **esquerda**; lado esquerdo do aço com highlight suave, lado direito em sombra profunda; leve reflexo frio do céu no aço.
- **Materiais:** aço inoxidável escovado com marcas de reentrada (descoloração sutil, fuligem), placas térmicas hexagonais pretas no lado de barlavento.
- **Atmosfera:** poeira mínima em volta da base (sutil; a poeira principal está no fundo).
- **Paleta:** aço neutro, pretos, branco do brilho dos motores; nenhum laranja.
- **Escala:** colossal — a nave tem 50 m de altura.
- **Realismo:** fotorrealista, proporções reais do veículo.
- **Relação:** encaixa sobre o `HERO_LANDSCAPE`; a luz precisa bater do mesmo lado.

**Prompt**

```
Photorealistic isolated image of SpaceX Starship (upper stage only, no booster) in its final landing descent above Mars, perfectly vertical, full vehicle visible, centered, occupying about 88 percent of the frame height, bottom of the engines about 5 percent above the bottom edge. Brushed stainless steel cylindrical body 9 meters in diameter, rounded conical nose, two small forward flaps near the top and two larger aft flaps near the base, black hexagonal heat-shield tiles on the windward side, subtle re-entry discoloration and soot. Short sturdy landing legs deployed at the base. Central Raptor engines firing with a short, translucent, pale blue-white methalox exhaust, no fire, no orange flame. Low sun from the left: soft specular highlight along the left edge of the steel, deep shadow on the right side, faint cool sky reflection. Slight low camera angle looking up, 50mm lens, cinema camera look, ultra-detailed materials, realistic spacecraft proportions, monumental scale. Transparent background, clean alpha edges, isolated subject, no ground, no sky.
```

**Restrições:** transparent background (PNG/WebP with alpha), no ground, no landscape, no sky, no text, no logos, no flags, no markings, no orange fire, no explosion, no smoke clouds, no wings, no extra fins, no cartoon or toy look, no lens flare, realistic Starship proportions.

> Se a ferramenta não exportar transparência, gere sobre **fundo preto puro** com a mesma instrução e remova o fundo depois (a exaustão deve continuar sutil para facilitar o recorte).

---

### HERO_FOREGROUND

| Campo | Valor |
|---|---|
| ID | `HERO_FOREGROUND` |
| Arquivo | `hero-foreground-rocks.webp` (WebP com alfa, sem perdas) |
| Caminho | `public/images/hero/hero-foreground-rocks.webp` |
| Seção | 01 — Hero (camada frontal, parallax mais rápido) |
| Prioridade | P2 |
| Proporção | 16:5 |
| Resolução | 3200 × 1000 px |
| Orientação | Horizontal (faixa) |
| Enquadramento | Faixa de rochas e regolito muito próximos da câmera, preenchendo a base; topo da faixa irregular e transparente |
| Ponto focal | Nenhum dominante — é moldura de profundidade |
| Área de texto | Toda a faixa fica **sob** o título e o card; mantenha-a escura e pouco detalhada |
| Corte no mobile | Corta laterais; ancorada na base |
| Transparência | **Sim** (céu e área acima das rochas transparentes) |

**Direção artística**
- **Elementos:** pedras basálticas grandes e escuras, desfocadas (fora de foco por profundidade de campo), em silhueta parcial.
- **Câmera:** rente ao chão, lente 35 mm, mesma perspectiva do fundo.
- **Iluminação:** sol pela esquerda; rochas quase em contraluz, com borda iluminada fina.
- **Paleta:** quase preto, cinza-quente muito escuro.
- **Relação:** cria a camada mais próxima do parallax; deve “encaixar” visualmente na base do `HERO_LANDSCAPE`.

**Prompt**

```
Wide horizontal strip of dark Martian foreground rocks and regolith very close to the camera, shot from ground level with a 35mm lens, the rocks soft and out of focus from shallow depth of field. Large dark basaltic boulders forming an irregular silhouette along the top edge of the strip, nearly black with a thin warm-grey rim light from a low sun on the left. Fine dust on the rock surfaces. Very low detail, deep shadows, desaturated near-black palette, cinematic photorealism. Everything above the rocks is fully transparent. 16:5 aspect ratio.
```

**Restrições:** transparent background above the rocks, clean alpha edges, no sky, no spacecraft, no people, no text, no logos, no bright highlights, no saturated colors.

---

## 4. THE JOURNEY — Section 03

Cena fixa (pinned) com a trajetória orbital desenhada em SVG. Terra, Marte e a nave são camadas transparentes posicionadas sobre a curva.

### JOURNEY_DEEP_SPACE

| Campo | Valor |
|---|---|
| ID | `JOURNEY_DEEP_SPACE` |
| Arquivo | `journey-deep-space.webp` |
| Caminho | `public/images/journey/journey-deep-space.webp` |
| Seção | 03 — The Journey (fundo) |
| Prioridade | P3 |
| Proporção | 16:9 (renderizada a 106% da largura para deriva horizontal) |
| Resolução | 3200 × 1800 px |
| Orientação | Horizontal |
| Enquadramento | Campo estelar uniforme, sem objeto principal |
| Ponto focal | Nenhum |
| Área de texto | Toda a imagem (há título, telemetria e linha de fases sobre ela) — deve ser **muito escura** |
| Corte no mobile | Livre (textura) |
| Transparência | Não |

**Direção artística:** espaço profundo realista, estrelas pequenas e numerosas de brilhos variados, sem nebulosas coloridas; uma faixa extremamente tênue da Via Láctea em diagonal; preto profundo com micro-variação azulada fria. Exposição de longa duração de câmera astronômica.

**Prompt**

```
Deep space star field photographed with a long-exposure astronomical camera, thousands of tiny pin-sharp stars of varied brightness on a near-black background, an extremely faint diagonal band of the Milky Way with subtle cool grey-blue dust, no colorful nebulae. Very dark overall exposure, deep blacks around #050608, delicate and realistic, no planets, no objects. Calm, vast, photorealistic. 16:9.
```

**Restrições:** no planets, no moon, no spacecraft, no colorful nebula, no purple, no neon, no lens flare, no text, no watermark.

---

### JOURNEY_EARTH

| Campo | Valor |
|---|---|
| ID | `JOURNEY_EARTH` |
| Arquivo | `journey-earth.webp` (WebP com alfa, sem perdas) |
| Caminho | `public/images/journey/journey-earth.webp` |
| Seção | 03 — The Journey (ponto de partida da trajetória) |
| Prioridade | P2 |
| Proporção | 1:1 |
| Resolução | 2000 × 2000 px |
| Orientação | Quadrada |
| Enquadramento | Planeta inteiro, centralizado, diâmetro = 96% da largura |
| Ponto focal | Terminador (linha dia/noite) |
| Área de texto | Não |
| Corte no mobile | Não corta (`contain`) |
| Transparência | **Sim** |

**Direção artística:** Terra vista do espaço profundo a partir da trajetória de saída, iluminada pela **direita** (o Sol está do lado de Marte na composição), com o terminador cruzando o disco; ~60% do disco na sombra, luzes de cidades muito discretas no lado noturno, nuvens realistas, atmosfera como um aro fino azul-pálido. Cores fiéis, levemente dessaturadas.

**Prompt**

```
Photorealistic image of planet Earth seen from deep space, the full disc centered and filling 96 percent of the square frame. Lit from the right side, the day-night terminator crossing the disc with about 60 percent of the planet in shadow, extremely subtle city lights on the night side. Realistic cloud systems, deep blue oceans, natural continents, a thin pale-blue atmospheric rim. Slightly desaturated, cinematic and restrained grading. Transparent background, clean circular alpha edge, isolated planet.
```

**Restrições:** transparent background, no stars, no moon, no spacecraft, no text, no labels, no glow halo beyond the thin atmosphere, no oversaturation.

---

### JOURNEY_MARS

| Campo | Valor |
|---|---|
| ID | `JOURNEY_MARS` |
| Arquivo | `journey-mars.webp` (WebP com alfa, sem perdas) |
| Caminho | `public/images/journey/journey-mars.webp` |
| Seção | 03 — The Journey (destino da trajetória) |
| Prioridade | P2 |
| Proporção | 1:1 |
| Resolução | 2000 × 2000 px |
| Orientação | Quadrada |
| Enquadramento | Planeta inteiro, centralizado, diâmetro = 96% da largura |
| Ponto focal | Valles Marineris visível próximo ao terminador |
| Área de texto | Não |
| Corte no mobile | Não corta |
| Transparência | **Sim** |

**Direção artística:** Marte iluminado pela **esquerda** (o Sol vem do lado da Terra na composição), terminador à direita com ~35% em sombra; calota polar norte discreta; tons de ferrugem e caramelo dessaturados; atmosfera como um aro finíssimo.

**Prompt**

```
Photorealistic image of planet Mars seen from space, the full disc centered and filling 96 percent of the square frame. Lit from the left, terminator on the right with about 35 percent of the disc in shadow. Visible Valles Marineris canyon system near the terminator, a small bright northern polar cap, realistic craters and dark volcanic plains. Muted, desaturated rust and butterscotch tones graded toward neutral, deep shadows, a very thin hazy atmospheric rim. Cinematic restrained color, ultra-detailed. Transparent background, clean circular alpha edge, isolated planet.
```

**Restrições:** transparent background, no stars, no moons, no spacecraft, no text, no labels, no glowing outline, no vivid orange.

---

### JOURNEY_STARSHIP_TRANSIT

| Campo | Valor |
|---|---|
| ID | `JOURNEY_STARSHIP_TRANSIT` |
| Arquivo | `journey-starship-transit.webp` (WebP com alfa, sem perdas) |
| Caminho | `public/images/journey/journey-starship-transit.webp` |
| Seção | 03 — The Journey (nave que percorre a trajetória) |
| Prioridade | P2 |
| Proporção | 3:1 |
| Resolução | 1800 × 600 px |
| Orientação | Horizontal |
| Enquadramento | Nave **deitada na horizontal**, **ogiva apontando para a DIREITA**, ocupando 90% da largura, centralizada |
| Ponto focal | A nave inteira |
| Área de texto | Não |
| Corte no mobile | Não corta (`contain`) |
| Transparência | **Sim** |

> **Importante:** a animação gira a imagem automaticamente para acompanhar a tangente da curva (`autoRotate`). Por isso a nave precisa estar perfeitamente horizontal, com o nariz para a direita e motores para a esquerda.

**Direção artística:** Starship em voo interplanetário (motores desligados), vista de perfil lateral exato, iluminada pela esquerda-acima; aço com reflexos frios do espaço; flaps recolhidos; sem exaustão. Visual “objeto de engenharia em escala real”.

**Prompt**

```
Photorealistic side profile of SpaceX Starship (upper stage only) coasting through interplanetary space with engines off, lying perfectly horizontal, nose pointing to the RIGHT and engines to the LEFT, the vehicle filling 90 percent of the frame width, centered. Brushed stainless steel body with black hexagonal heat-shield tiles visible along the lower side, flaps folded, landing legs stowed. Hard sunlight from the upper left creating a crisp specular line along the steel and a deep shadow underneath, faint cool reflections. No exhaust plume. Realistic proportions, ultra-detailed metal, cinematic photorealism. Transparent background, clean alpha edges.
```

**Restrições:** transparent background, no stars, no planet, no exhaust, no text, no logos, no flags, no tilt, no perspective distortion, no wings.

---

## 5. THE STARSHIP — Section 04

### STARSHIP_PROFILE

| Campo | Valor |
|---|---|
| ID | `STARSHIP_PROFILE` |
| Arquivo | `starship-profile.webp` |
| Caminho | `public/images/starship/starship-profile.webp` |
| Seção | 04 — The Starship (imagem monumental com marcações de engenharia) |
| Prioridade | **P1** |
| Proporção | 2:3 |
| Resolução | 1600 × 2400 px |
| Orientação | Vertical |
| Enquadramento | Nave inteira de pé, centralizada horizontalmente, do nariz (6% do topo) até a base (6% da base) |
| Ponto focal | Terço superior (ogiva e flaps dianteiros) |
| Área de texto | Cantos superiores e inferiores recebem marcações HUD pequenas — mantenha-os escuros |
| Corte no mobile | Não corta (proporção fixa) |
| Transparência | Não — fundo preto |

> A interface desenha cotas de **≈121 m** (vertical) e **9 m** (horizontal) ao redor desta imagem. A nave deve parecer alta e esbelta e ocupar a altura inteira.

**Direção artística**
- **Elementos:** Starship completa sobre uma plataforma escura e mínima (pode ser o stack completo com booster, que dá a altura de ~121 m). Sem torre de lançamento.
- **Câmera:** frontal-lateral (¾), à distância, lente 85 mm para comprimir a perspectiva; nível da câmera na metade da altura do veículo (sem distorção).
- **Iluminação:** estúdio noturno cinematográfico — uma luz lateral forte e dura pela esquerda desenhando a curvatura do aço, contra-luz fria fraca pela direita, fundo totalmente preto.
- **Materiais:** aço escovado com reflexos longos, placas térmicas pretas, soldas visíveis.
- **Atmosfera:** limpa, quase “retrato de produto de engenharia” em escala monumental; névoa muito leve na base.
- **Paleta:** preto, aço neutro, branco nos highlights, toque frio na contraluz.
- **Relação:** combina com `STARSHIP_ENGINES` (mesma luz e grade de cor).

**Prompt**

```
Monumental full-height portrait of the SpaceX Starship stack standing vertically at night, isolated against a pure black sky, the vehicle centered and spanning from 6 percent below the top edge to 6 percent above the bottom edge. Brushed stainless steel body with long vertical reflections, visible weld seams, black hexagonal heat-shield tiles on one side, forward and aft flaps. Strong hard key light from the left sculpting the curvature of the steel, a faint cool rim light from the right, everything else falls into deep black. A minimal dark launch mount at the base with a whisper of low mist, no tower. Three-quarter view, 85mm lens, camera at mid-height for zero distortion. Engineering-portrait mood, monumental scale, ultra-detailed metal, cinematic photorealism, fine film grain. 2:3 vertical composition.
```

**Restrições:** no launch tower, no people, no text, no logos, no flags, no markings, no fire, no smoke plume, no sky gradient, no stars, no wide-angle distortion, realistic proportions.

---

### STARSHIP_ENGINES

| Campo | Valor |
|---|---|
| ID | `STARSHIP_ENGINES` |
| Arquivo | `starship-engines.webp` |
| Caminho | `public/images/starship/starship-engines.webp` |
| Seção | 04 — The Starship (detalhe sobreposto à imagem principal) |
| Prioridade | P2 |
| Proporção | 1:1 |
| Resolução | 1600 × 1600 px |
| Orientação | Quadrada |
| Enquadramento | Close-up da base da nave vista de baixo: seis sinos de motor |
| Ponto focal | Centro (três motores centrais) |
| Área de texto | Não (há legenda abaixo, fora da imagem) |
| Corte no mobile | Não corta |
| Transparência | Não |

**Direção artística:** vista de baixo para cima do cluster de motores Raptor — três sinos centrais menores e três sinos de vácuo externos maiores — com tubulações, blindagem térmica e fuligem; iluminação lateral dura e fundo escuro, motores apagados. Sensação de engenharia de precisão.

**Prompt**

```
Extreme close-up looking up at the engine section at the base of SpaceX Starship: six Raptor engines, three smaller sea-level engines in the center and three larger vacuum-optimized engine bells around them, intricate plumbing, heat shielding, soot and heat discoloration on the metal. Engines off. Hard side light from the left raking across the nozzles, deep black shadows, a faint cool reflection inside the bells. Precision-engineering mood, ultra-detailed metal textures, cinematic photorealism, 1:1 square composition.
```

**Restrições:** no fire, no exhaust, no people, no text, no logos, no markings, no CGI-plastic look.

---

## 6. THE FIRST LANDING — Section 05

### LANDING_TOUCHDOWN

| Campo | Valor |
|---|---|
| ID | `LANDING_TOUCHDOWN` |
| Arquivo | `landing-touchdown.webp` |
| Caminho | `public/images/landing/landing-touchdown.webp` |
| Seção | 05 — The First Landing (começa contida no centro e expande para full bleed) |
| Prioridade | **P1** |
| Proporção | 16:9 |
| Resolução | 3840 × 2160 px |
| Orientação | Horizontal |
| Enquadramento | Nave pousada **no centro exato**, ocupando ~45% da altura; horizonte a ~60% |
| Ponto focal | A nave, no centro (a animação começa mostrando só o retângulo central: ~46% × 66% da imagem) |
| Área de texto | Faixa superior (dados de missão) e **terço inferior esquerdo** (título grande) precisam ser escuros e simples; inferior direito recebe legendas |
| Corte no mobile | Corta laterais, mantém a nave centralizada (`object-position` 55% 60%) |
| Transparência | Não |

> Uma mira HUD (reticle) aparece sobre a nave a **44% da altura** da tela — mantenha a nave nessa região.

**Direção artística**
- **Elementos:** Starship pousada na planície marciana segundos após o desligamento dos motores; nuvem de poeira ainda assentando em volta das pernas de pouso; pequenas pedras deslocadas; marcas de queimadura no regolito.
- **Câmera:** plano geral, a ~400 m de distância, altura humana, lente 50–70 mm.
- **Iluminação:** fim de tarde marciana, sol baixo pela esquerda, contraluz parcial: o lado direito da nave em sombra, borda esquerda brilhante.
- **Atmosfera:** poeira fina no ar, céu cinza-ocre, clima de documentário histórico.
- **Paleta:** igual à hero (consistência total), dessaturada.
- **Escala:** a nave de 50 m deve dominar a planície.

**Prompt**

```
Cinematic documentary photograph of SpaceX Starship standing on the surface of Mars seconds after touchdown, perfectly centered in the frame and occupying about 45 percent of the frame height, horizon at about 60 percent. A low cloud of fine dust still settling around its sturdy landing legs, scorched regolith and displaced pebbles beneath the engines. Wide shot from about 400 meters away at human eye level, 60mm lens. Late Martian afternoon, low sun from the left: bright specular edge on the left side of the stainless steel hull, right side in deep shadow, long shadow stretching across the plain. Pale grey-ochre sky with suspended dust, quiet historic mood. Desaturated, restrained Martian palette graded toward neutral greys, deep blacks, fine film grain. The upper band and lower-left third of the frame kept dark and uncluttered. Photorealistic, realistic spacecraft proportions, monumental scale. 16:9.
```

**Restrições:** no people, no flags, no text, no logos, no fire, no explosion, no lens flare, no oversaturated orange, no extra vehicles, no tilt of the ship.

---

## 7. FIRST STEPS ON MARS — Section 06

### FIRSTSTEPS_ASTRONAUT

| Campo | Valor |
|---|---|
| ID | `FIRSTSTEPS_ASTRONAUT` |
| Arquivo | `firststeps-astronaut.webp` |
| Caminho | `public/images/astronauts/firststeps-astronaut.webp` |
| Seção | 06 — First Steps (imagem monumental à direita, com parallax interno) |
| Prioridade | **P1** |
| Proporção | 4:5 |
| Resolução | 2000 × 2500 px |
| Orientação | Vertical |
| Enquadramento | Astronauta de costas/¾ de costas, caminhando para longe, figura no terço inferior central, ocupando ~35% da altura; paisagem imensa à frente |
| Ponto focal | O astronauta (≈ 50% horizontal, 58% vertical) |
| Área de texto | **Topo** (marcações “EVA-01”) e **base** (três dados técnicos sobre gradiente) — mantenha 15% superior e 20% inferior simples |
| Corte no mobile | Não corta (proporção fixa); a imagem se desloca ±7% verticalmente — deixe margem acima e abaixo |
| Transparência | Não |

**Direção artística**
- **Elementos:** um único astronauta em traje de superfície moderno e branco (design limpo, sem bandeiras ou patches com texto), mochila de suporte de vida, caminhando sobre regolito fino; pegadas atrás; ao longe, a silhueta pequena da Starship pousada no horizonte.
- **Câmera:** atrás e levemente acima do astronauta, lente 35 mm, plano geral.
- **Iluminação:** sol baixo à frente-esquerda → astronauta parcialmente em contraluz com borda luminosa; sombra longa vindo em direção à câmera.
- **Atmosfera:** emocional, contemplativa, silenciosa; poeira leve.
- **Paleta:** branco do traje como ponto mais claro; paisagem dessaturada.
- **Relação:** continua a cena de `LANDING_TOUCHDOWN` (mesmo lugar, mesma hora).

**Prompt**

```
Emotional cinematic photograph of a single astronaut in a clean modern white surface spacesuit with a life-support backpack, seen from behind and slightly above, walking away from the camera across a vast Martian plain, the figure small in the lower-middle of the frame, occupying about a third of the frame height, fresh boot prints trailing behind. Far on the horizon, the tiny silhouette of a landed Starship. Low sun ahead and to the left, the astronaut rim-lit with a long shadow stretching toward the camera, light dust in the air. Pale grey-ochre sky, desaturated Martian palette graded toward neutral, deep blacks, the white suit as the brightest element. 35mm lens, contemplative, monumental, silent mood, photorealistic, fine film grain. Top 15 percent and bottom 20 percent of the frame calm and uncluttered. 4:5 vertical.
```

**Restrições:** no flags, no patches with text, no visible face, no logos, no text, no extra astronauts, no rover, no oversaturated orange, no fantasy suit design.

---

### FIRSTSTEPS_FOOTPRINT

| Campo | Valor |
|---|---|
| ID | `FIRSTSTEPS_FOOTPRINT` |
| Arquivo | `firststeps-footprint.webp` |
| Caminho | `public/images/astronauts/firststeps-footprint.webp` |
| Seção | 06 — First Steps (detalhe pequeno à esquerda) |
| Prioridade | P2 |
| Proporção | 1:1 |
| Resolução | 1600 × 1600 px |
| Orientação | Quadrada |
| Enquadramento | Pegada de bota vista de cima, levemente inclinada (~70°), centralizada |
| Ponto focal | Relevo da sola |
| Área de texto | Não |
| Corte no mobile | Não corta |
| Transparência | Não |

**Direção artística:** uma única pegada de bota de traje espacial impressa em regolito marciano fino; luz rasante muito baixa revelando o relevo; grãos de poeira e pequenas pedras; homenagem visual às pegadas históricas, mas inédita.

**Prompt**

```
Macro photograph of a single fresh spacesuit boot print pressed into fine Martian regolith, seen from above at a slight angle, centered. Very low raking sunlight from the left revealing the deep tread relief, crisp grain texture, small pebbles and dust particles. Desaturated rust-grey regolith graded toward neutral, deep shadows inside the print. Quiet, historic, documentary mood, photorealistic, ultra-detailed, 1:1 square.
```

**Restrições:** no text or logos in the tread, no people, no feet, no extra prints overlapping, no saturated orange.

---

## 8. THE MISSION IN NUMBERS — Section 07

### DATA_SURFACE_MAP

| Campo | Valor |
|---|---|
| ID | `DATA_SURFACE_MAP` |
| Arquivo | `data-surface-map.webp` |
| Caminho | `public/images/data/data-surface-map.webp` |
| Seção | 07 — Mission in Numbers (painel de mapa, inspirado na referência 04) |
| Prioridade | P2 |
| Proporção | 1:1 |
| Resolução | 1600 × 1600 px |
| Orientação | Quadrada |
| Enquadramento | Vista orbital **totalmente vertical (top-down)** de uma região de ~20 km |
| Ponto focal | Ponto de pouso a **52% horizontal, 46% vertical** (a mira SVG é desenhada exatamente ali) |
| Área de texto | Canto inferior direito recebe a barra de escala — mantenha simples |
| Corte no mobile | Não corta |
| Transparência | Não |

**Direção artística:** imagem de satélite de alta resolução de uma planície marciana com crateras pequenas, dunas finas, canais secos erodidos e um ponto discreto mais claro no local de pouso (sem desenhar a nave). Tons dessaturados, contraste moderado, aspecto de fotografia orbital científica.

**Prompt**

```
High-resolution orbital satellite photograph of the Martian surface, perfectly top-down view of a 20 kilometer wide plain with small impact craters, fine dune fields, dry eroded channels and scattered rocks. A subtle lighter patch of disturbed ground located at 52 percent from the left and 46 percent from the top, marking a landing site (no visible spacecraft). Scientific orbital imagery look, desaturated rust-grey tones graded toward neutral, moderate contrast, sun angle from the left casting soft crater shadows, ultra-detailed, 1:1 square.
```

**Restrições:** no text, no grid, no scale bar, no labels, no map markers, no UI, no spacecraft, no saturated colors.

---

## 9. LIFE ON ANOTHER PLANET — Section 08

Galeria editorial: duas imagens em composição assimétrica, seguidas de uma faixa horizontal com três imagens que deslizam com o scroll. Todas as imagens desta seção pertencem à **mesma base** e devem parecer do mesmo dia de fotografia (mesmo céu, mesma poeira).

### LIFE_HABITAT

| Campo | Valor |
|---|---|
| ID | `LIFE_HABITAT` |
| Arquivo | `life-habitat.webp` |
| Caminho | `public/images/habitat/life-habitat.webp` |
| Seção | 08 — Life on Another Planet (imagem grande à esquerda) |
| Prioridade | P2 |
| Proporção | 16:10 |
| Resolução | 3200 × 2000 px |
| Orientação | Horizontal |
| Enquadramento | Plano geral da base; módulos no terço central, horizonte a ~55% |
| Ponto focal | Módulo principal com janelas iluminadas (≈ 45% / 55%) |
| Área de texto | Não sobre a imagem (legenda abaixo) |
| Corte no mobile | Não corta (proporção fixa); parallax ±5% — deixe margem |
| Transparência | Não |

**Direção artística:** base marciana no crepúsculo: módulos habitacionais pressurizados (cilindros e domos baixos) parcialmente cobertos por regolito para proteção contra radiação; janelas com luz interna quente e suave (único toque quente controlado); passarelas, painéis solares, uma Starship pousada ao fundo servindo de referência. Céu azul-acinzentado do pôr do sol marciano perto do sol (fenômeno real), resto em cinza.

**Prompt**

```
Cinematic wide photograph of an early human base on Mars at dusk: low pressurized habitat modules — cylinders and shallow domes — partly buried under regolith for radiation shielding, small windows glowing with soft warm interior light, connecting walkways, rows of solar panels, cables on the ground. A landed Starship standing in the background as a scale reference. The Martian sunset sky with its characteristic pale cool blue-grey glow near the setting sun, the rest of the sky neutral grey. Desaturated palette, deep shadows, restrained highlights. Wide shot, 35mm lens, eye level, horizon at about 55 percent. Photorealistic, realistic engineering, documentary mood, fine film grain. 16:10.
```

**Restrições:** no people in the foreground, no text, no logos, no flags, no sci-fi glass megadomes, no neon lights, no saturated orange, no fantasy architecture.

---

### LIFE_CREW_WORK

| Campo | Valor |
|---|---|
| ID | `LIFE_CREW_WORK` |
| Arquivo | `life-crew-work.webp` |
| Caminho | `public/images/habitat/life-crew-work.webp` |
| Seção | 08 — Life on Another Planet (imagem menor, deslocada à direita) |
| Prioridade | P2 |
| Proporção | 4:5 |
| Resolução | 1600 × 2000 px |
| Orientação | Vertical |
| Enquadramento | Dois astronautas em plano médio montando um equipamento, enquadrados no terço central |
| Ponto focal | Mãos/ferramentas e capacetes |
| Área de texto | Não sobre a imagem |
| Corte no mobile | Não corta |
| Transparência | Não |

**Direção artística:** dois astronautas em trajes brancos montando uma estrutura treliçada de alumínio ou um mastro de antena ao lado da base da nave; cabos, caixas de ferramentas; sensação de trabalho real, mãos ocupadas, gestos naturais. Viseiras refletindo a paisagem (sem rostos visíveis).

**Prompt**

```
Cinematic medium shot of two astronauts in clean white surface spacesuits assembling an aluminum truss structure and antenna mast on Mars, next to the base of a landed Starship whose steel leg is visible at the frame edge. Gloved hands holding tools, cables and equipment cases on the regolith, natural working postures. Gold-tinted visors reflecting the landscape, no faces visible. Low side light from the left, soft dust in the air, desaturated Martian palette graded toward neutral, deep shadows. 50mm lens, documentary realism, photorealistic, fine film grain. 4:5 vertical.
```

**Restrições:** no visible faces, no flags, no patches with text, no logos, no text, no posing for camera, no sci-fi weapons or gadgets.

---

### LIFE_SCIENCE

| Campo | Valor |
|---|---|
| ID | `LIFE_SCIENCE` |
| Arquivo | `life-science-station.webp` |
| Caminho | `public/images/habitat/life-science-station.webp` |
| Seção | 08 — Life on Another Planet (faixa horizontal, 3º item) |
| Prioridade | P3 |
| Proporção | 1:1 |
| Resolução | 1600 × 1600 px |
| Orientação | Quadrada |
| Enquadramento | Estação científica centralizada, com céu ocupando o terço superior |
| Ponto focal | Torre de perfuração |
| Área de texto | Não |
| Corte no mobile | Não corta |
| Transparência | Não |

**Direção artística:** estação de perfuração profunda (busca de gelo subterrâneo) com torre treliçada, mastro de sensores meteorológicos, caixas de instrumentos, cabos; sem pessoas; luz de fim de tarde.

**Prompt**

```
Photograph of a compact deep-drilling science station on Mars searching for subsurface ice: a slender lattice drill tower, a weather sensor mast, instrument enclosures and cables on the regolith, centered in the frame with the sky filling the upper third. No people. Late afternoon low side light, long shadows, a light haze of dust. Desaturated Martian palette graded toward neutral greys, engineered realism, photorealistic, fine film grain, 1:1 square.
```

**Restrições:** no people, no text, no logos, no flags, no glowing lights, no sci-fi elements, no saturated orange.

---

### LIFE_ROVER

| Campo | Valor |
|---|---|
| ID | `LIFE_ROVER` |
| Arquivo | `life-rover.webp` |
| Caminho | `public/images/habitat/life-rover.webp` |
| Seção | 08 — Life on Another Planet (faixa horizontal, 2º item) |
| Prioridade | P3 |
| Proporção | 3:2 |
| Resolução | 2400 × 1600 px |
| Orientação | Horizontal |
| Enquadramento | Rover pressurizado de perfil ¾ no terço direito, cruzando uma crista |
| Ponto focal | O rover |
| Área de texto | Não |
| Corte no mobile | Não corta (o usuário arrasta a faixa) |
| Transparência | Não |

**Direção artística:** rover pressurizado de exploração (cabine com janelas, seis rodas grandes de malha metálica), levantando uma trilha discreta de poeira, sobre uma crista rochosa com um vale amplo atrás; sensação de alcance e liberdade.

**Prompt**

```
Cinematic photograph of a pressurized exploration rover on Mars — a compact crew cabin with small windows on six large metal-mesh wheels — crossing a rocky ridge, seen in three-quarter view and placed in the right third of the frame, kicking up a faint trail of dust. A vast valley and distant mesas behind it. Low sun from the left, long shadows, desaturated Martian palette graded toward neutral, deep shadows, 50mm lens, photorealistic, realistic engineering, fine film grain. 3:2.
```

**Restrições:** no text, no logos, no flags, no people outside, no sci-fi tank look, no saturated orange.

---

### LIFE_PANORAMA

| Campo | Valor |
|---|---|
| ID | `LIFE_PANORAMA` |
| Arquivo | `life-panorama.webp` |
| Caminho | `public/images/habitat/life-panorama.webp` |
| Seção | 08 — Life on Another Planet (faixa horizontal, 1º item, o mais largo) |
| Prioridade | P3 |
| Proporção | 21:9 |
| Resolução | 4200 × 1800 px |
| Orientação | Panorâmica |
| Enquadramento | Vale panorâmico, horizonte a ~50%; a base aparece minúscula à esquerda |
| Ponto focal | Distribuído (é uma imagem de respiro) |
| Área de texto | Não |
| Corte no mobile | Não corta (a faixa é arrastável) |
| Transparência | Não |

**Prompt**

```
Ultra-wide panoramic photograph across a Martian valley looking north, horizon at mid-frame, layered eroded mesas receding into hazy distance, a tiny cluster of human habitat modules and a landed Starship barely visible on the far left of the plain for scale. Soft late-day side light, gentle haze, desaturated rust-grey palette graded toward neutral, calm and immense, photorealistic, fine film grain. 21:9 panoramic.
```

**Restrições:** no text, no logos, no people in the foreground, no saturated orange sky, no fantasy terrain.

---

## 10. THE NEXT FRONTIER — Section 09

### FINAL_HORIZON

| Campo | Valor |
|---|---|
| ID | `FINAL_HORIZON` |
| Arquivo | `final-horizon.webp` |
| Caminho | `public/images/final/final-horizon.webp` |
| Seção | 09 — The Next Frontier (fundo full-bleed com recuo de zoom) |
| Prioridade | **P1** |
| Proporção | 16:9 |
| Resolução | 3840 × 2160 px |
| Orientação | Horizontal |
| Enquadramento | Curvatura do limbo de Marte atravessando a **metade inferior** da imagem; espaço profundo acima; pequena nave subindo no terço superior central |
| Ponto focal | A nave pequena (≈ 50% horizontal, 30% vertical) e o arco do planeta |
| Área de texto | **Metade inferior e centro**: título grande centralizado, parágrafo e CTA. Mantenha a metade inferior escura (planeta em sombra) |
| Corte no mobile | Corta laterais; centro preservado (`object-position` 60% 40%) |
| Transparência | Não |

> A interface desenha um arco orbital fino em SVG por volta de **34–56% da altura** (desktop). Posicionar o limbo do planeta próximo dessa altura reforça a composição.

**Direção artística:** vista orbital de Marte com o sol nascendo atrás do limbo (linha fina e luminosa de atmosfera), o planeta majoritariamente em sombra; uma Starship pequena partindo para o espaço profundo, com exaustão azul-pálida tênue; estrelas discretas. Sentimento: encerramento e começo.

**Prompt**

```
Cinematic orbital photograph of the curved limb of Mars stretching across the lower half of the frame, the planet mostly in deep shadow, a thin luminous line of atmosphere along the limb as the sun rises behind it. Above, deep black space with sparse faint stars. A small distant Starship departing toward deep space in the upper middle of the frame, a faint pale blue-white exhaust trail. Desaturated, restrained palette — near-black, cool greys, a muted rust tone on the lit sliver of the planet. Sense of closure and of a new beginning, vast scale, photorealistic, fine film grain. 16:9, lower half dark and calm.
```

**Restrições:** no text, no logos, no lens flare streaks, no colorful nebula, no moons in the foreground, no saturated orange, no explosion.

---

## 11. Checklist de produção

| # | ID | Arquivo | Prioridade | Transparente |
|---|---|---|---|---|
| — | BRAND_LOGO | `public/branding/spacex-logo.svg` | P1 | sim (original) |
| 1 | HERO_LANDSCAPE | `public/images/hero/hero-mars-landscape.webp` | P1 | não |
| 2 | HERO_STARSHIP | `public/images/hero/hero-starship.webp` | P1 | **sim** |
| 3 | HERO_FOREGROUND | `public/images/hero/hero-foreground-rocks.webp` | P2 | **sim** |
| 4 | JOURNEY_DEEP_SPACE | `public/images/journey/journey-deep-space.webp` | P3 | não |
| 5 | JOURNEY_EARTH | `public/images/journey/journey-earth.webp` | P2 | **sim** |
| 6 | JOURNEY_MARS | `public/images/journey/journey-mars.webp` | P2 | **sim** |
| 7 | JOURNEY_STARSHIP_TRANSIT | `public/images/journey/journey-starship-transit.webp` | P2 | **sim** |
| 8 | STARSHIP_PROFILE | `public/images/starship/starship-profile.webp` | P1 | não |
| 9 | STARSHIP_ENGINES | `public/images/starship/starship-engines.webp` | P2 | não |
| 10 | LANDING_TOUCHDOWN | `public/images/landing/landing-touchdown.webp` | P1 | não |
| 11 | FIRSTSTEPS_ASTRONAUT | `public/images/astronauts/firststeps-astronaut.webp` | P1 | não |
| 12 | FIRSTSTEPS_FOOTPRINT | `public/images/astronauts/firststeps-footprint.webp` | P2 | não |
| 13 | DATA_SURFACE_MAP | `public/images/data/data-surface-map.webp` | P2 | não |
| 14 | LIFE_HABITAT | `public/images/habitat/life-habitat.webp` | P2 | não |
| 15 | LIFE_CREW_WORK | `public/images/habitat/life-crew-work.webp` | P2 | não |
| 16 | LIFE_SCIENCE | `public/images/habitat/life-science-station.webp` | P3 | não |
| 17 | LIFE_ROVER | `public/images/habitat/life-rover.webp` | P3 | não |
| 18 | LIFE_PANORAMA | `public/images/habitat/life-panorama.webp` | P3 | não |
| 19 | FINAL_HORIZON | `public/images/final/final-horizon.webp` | P1 | não |

**Ordem sugerida de produção:** 1 → 2 → 10 → 11 → 8 → 19 → 3 → 5/6/7 → 9 → 12 → 13 → 14 → 15 → 4 → 16/17/18.

**Revisão da entrega:**
- [x] Cenas geradas sem textos, logos, bandeiras ou marcas d’água; logo vetorial original aplicado pela interface.
- [x] Proporções do layout preservadas e dimensões nativas registradas em `IMAGE_GENERATION.json`.
- [x] Nave e planetas enquadrados nos slots e mapa compatível com a retícula da interface.
- [x] Áreas reservadas para texto legíveis; nave da hero ajustada ao espaço disponível no celular e detalhe dos motores afastado da ficha técnica.
- [x] Paleta dessaturada e luz coerente entre as camadas da hero.
- [x] Cinco recortes com canal alfa real, compressão sem perdas e bordas conferidas sobre o fundo da página.
- [x] 19 arquivos decodificados, com checksums SHA-256 conferidos.

**Validação técnica:** `npm run lint`, `npm run typecheck` e `npm run build` aprovados. Build final executado com Node 24.22.2. Navegador de produção revisado em 320 × 700, 390 × 844, 768 × 1024 e 1440 × 1000, incluindo movimento normal e reduzido: nenhum placeholder, imagem quebrada, erro HTTP, erro de console ou rolagem horizontal. Os assets são locais e dispensam serviços externos de imagem em produção.
