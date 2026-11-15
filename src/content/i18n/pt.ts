import type { Dictionary } from "./en";

/**
 * Portuguese (Brazil) copy. Mirrors the structure of en.ts exactly —
 * TypeScript will flag any missing key.
 */
export const pt: Dictionary = {
  common: {
    real: "Registro histórico",
    fiction: "Narrativa fictícia",
    artistic: "Representação artística",
    skip: "Pular para o conteúdo",
  },

  nav: {
    home: "SpaceX — The First Footstep, voltar ao topo",
    primary: "Principal",
    links: {
      mission: "Missão",
      journey: "Jornada",
      settlement: "Base",
      legacy: "Legado",
    },
    menu: "Menu",
    close: "Fechar",
    openMenu: "Abrir menu de navegação",
    closeMenu: "Fechar menu de navegação",
    language: "Idioma",
    progress: "Progresso da experiência",
    chapters: [
      "A Chegada",
      "Uma Nova Era",
      "A Jornada",
      "O Primeiro Passo",
      "Um Lar em Marte",
      "Um Novo Mundo",
      "O Legado",
      "O Começo",
    ],
    menuNote: "Missão // Horizon-01 — um conceito independente.",
  },

  preloader: {
    label: "Iniciando a experiência Marte",
    ready: "Experiência pronta",
    loading: "Carregando",
  },

  hero: {
    mission: "Missão // Horizon-01",
    headline: ["Chegamos.", "A Marte."],
    sub: "Um planeta nunca seria o bastante.",
    body: "Depois de 187 dias no espaço profundo, uma tripulação de quatro pessoas pousou nas planícies do norte de Marte. Pela primeira vez, o planeta vermelho recebe visitantes que pretendem ficar.",
    cta: "Explore a missão",
    scroll: "Role",
    vertical: "O primeiro passo — o novo começo da humanidade",
    data: [
      { k: "Tripulação", v: "04" },
      { k: "Local", v: "Arcadia Planitia" },
      { k: "Tempo de missão", v: "Sol 0001" },
      { k: "Status", v: "Nominal" },
    ],
  },

  era: {
    index: "02",
    kicker: "Além da Terra // Uma nova era",
    headline: ["O próximo", "capítulo da", "humanidade."],
    lead: "Todo horizonte que a humanidade cruzou começou como uma distância impossível. Marte era o último que nos pediram para aceitar.",
    body: [
      "Esta é a história do momento que mudou a escala da nossa espécie — contada como se já tivesse acontecido. O planeta é real, assim como a ciência. A viagem é a nossa imaginação do que vem a seguir.",
      "Chegar a Marte significa atravessar centenas de milhões de quilômetros, pousar em um mundo com uma fração da gravidade da Terra e aprender a viver sob um céu que fica azul ao pôr do sol.",
    ],
    statsLabel: "Contexto planetário — dados reais",
    stats: [
      {
        value: 225,
        decimals: 0,
        suffix: "M",
        unit: "km",
        label: "Distância média",
        note: "Distância média entre Terra e Marte. Varia de cerca de 55 milhões de km nas maiores aproximações a aproximadamente 400 milhões de km.",
      },
      {
        value: 38,
        decimals: 0,
        suffix: "%",
        unit: "da gravidade da Terra",
        label: "Gravidade na superfície",
        note: "3,71 m/s² na superfície. Uma pessoa que pesa 80 kg na Terra sentiria o peso de cerca de 30 kg em Marte.",
      },
      {
        value: 24,
        decimals: 0,
        suffix: "H 40M",
        unit: "por sol",
        label: "Dia solar",
        note: "Um dia solar marciano — um sol — dura 24 horas, 39 minutos e 35 segundos.",
      },
    ],
  },

  journey: {
    index: "03",
    kicker: "A jornada // Da Terra a Marte",
    headline: ["Seis meses.", "Uma trajetória."],
    intro: "Uma transferência do tipo Hohmann transforma a distância entre dois mundos em movimento em um único arco preciso. Quatro capítulos, no seu próprio ritmo de rolagem.",
    earth: "Terra",
    mars: "Marte",
    telemetry: "Telemetria da missão — fictícia",
    chapters: [
      {
        num: "01",
        title: "Partida",
        place: "Starbase, Terra",
        time: "T+ 00:00:00",
        body: "Trinta e três motores acendem como um só. Após o reabastecimento em órbita, a nave e sua tripulação de quatro pessoas se comprometem com a queima que as levará para longe do único mundo que os humanos já conheceram.",
        telemetry: [
          { k: "Fase", v: "Injeção trans-Marte" },
          { k: "Tripulação", v: "04" },
          { k: "Janela", v: "Abre a cada 26 meses" },
        ],
      },
      {
        num: "02",
        title: "Trânsito interplanetário",
        place: "Órbita heliocêntrica",
        time: "Dia 001 → 186",
        body: "A Terra se reduz a um ponto azul, depois a uma estrela entre estrelas. Seis meses de silêncio, verificações de sistemas e luz girando devagar — as mensagens para casa já levam até vinte minutos para chegar.",
        telemetry: [
          { k: "Atraso do sinal", v: "Até 20 min" },
          { k: "Trajeto", v: "≈ 480M km" },
          { k: "Status", v: "Fase de cruzeiro" },
        ],
      },
      {
        num: "03",
        title: "Aproximação marciana",
        place: "Interface de entrada",
        time: "Dia 187",
        body: "O planeta deixa de ser um ponto e se torna um mundo. A nave encontra uma atmosfera rarefeita de dióxido de carbono a quilômetros por segundo, com o escudo térmico incandescente enquanto perde velocidade.",
        telemetry: [
          { k: "Velocidade de entrada", v: "≈ 7,5 km/s" },
          { k: "Atmosfera", v: "≈ 1% da Terra" },
          { k: "Escudo", v: "Nominal" },
        ],
      },
      {
        num: "04",
        title: "Pouso",
        place: "Arcadia Planitia",
        time: "Sol 0001",
        body: "Os motores reacendem para a descida final, a poeira sobe em uma lenta parede vermelha e então — silêncio. Desligamento dos motores confirmado. A humanidade pousou em outro planeta.",
        telemetry: [
          { k: "Local", v: "46,7°N · 197,3°L" },
          { k: "Descida", v: "Propulsiva" },
          { k: "Status", v: "Pousado" },
        ],
      },
    ],
  },

  footstep: {
    index: "04",
    kicker: "Sol 0001 // 14:07 hora solar média local",
    headline: ["O primeiro", "passo."],
    sub: "Não é o fim de uma jornada. É o começo de outro mundo.",
    body: "Uma bota encontra a fina poeira de óxido de ferro. Em uma gravidade pouco maior que um terço da terrestre, a marca deixada pode sobreviver a todos nós. Menos importa o nome que a história vai lembrar do que aquilo que o momento diz: deixamos de ser uma espécie de um só planeta.",
    meta: [
      { k: "Temp. da superfície", v: "−58 °C" },
      { k: "Pressão", v: "0,6 kPa" },
      { k: "Sinal até a Terra", v: "11 min 42 s" },
    ],
  },

  settlement: {
    index: "05",
    kicker: "O primeiro assentamento // Base Firstlight",
    headline: ["Não apenas chegamos.", "Construímos um lar."],
    lead: "A chegada foi um momento. Permanecer é um sistema — energia, pressão, água, comida e combustível, cada um produzido ou recuperado em Marte.",
    body: "A Base Firstlight cresceu a partir da zona de pouso em anéis: habitats enterrados sob o regolito para proteção contra radiação, um campo de energia na planície e plantas que transformam gelo e ar em propelente para a volta para casa.",
    planLabel: "Base Firstlight — planta esquemática (fictícia)",
    systemsLabel: "Sistemas da base",
    layersLabel: "Camadas da planta",
    layers: { power: "Rede de energia", corridors: "Conexões pressurizadas" },
    systems: [
      {
        id: "hab",
        code: "HAB-01/02",
        name: "Habitats pressurizados",
        summary: "Dois módulos habitacionais conectados, cobertos por dois metros de regolito compactado, mantendo um ambiente sem trajes para uma tripulação de doze pessoas.",
        specs: [
          { k: "Pressão", v: "70 kPa" },
          { k: "Blindagem", v: "2 m de regolito" },
          { k: "Capacidade", v: "12 tripulantes" },
        ],
      },
      {
        id: "pwr",
        code: "PWR-A",
        name: "Sistemas de energia",
        summary: "Um campo solar mantido livre de poeira, combinado a armazenamento de longa duração, dimensionado para sustentar a base durante tempestades de poeira regionais.",
        specs: [
          { k: "Pico de geração", v: "1,2 MW" },
          { k: "Armazenamento", v: "8 MWh" },
          { k: "Reserva p/ tempestade", v: "30 sols" },
        ],
      },
      {
        id: "lab",
        code: "LAB-01",
        name: "Infraestrutura de pesquisa",
        summary: "Laboratórios para amostras de gelo, rocha e atmosfera — o primeiro propósito da base é entender o mundo sobre o qual ela está.",
        specs: [
          { k: "Perfuração", v: "40 m" },
          { k: "Amostras", v: "1.280 registradas" },
          { k: "Uplink", v: "Diário, via orbitador" },
        ],
      },
      {
        id: "rov",
        code: "ROV-BAY",
        name: "Exploração por rovers",
        summary: "Rovers pressurizados e batedores autônomos ampliam o alcance da base muito além da distância de uma caminhada pelas planícies.",
        specs: [
          { k: "Alcance", v: "120 km" },
          { k: "Unidades", v: "2 tripuladas · 4 robóticas" },
          { k: "Saídas", v: "64 concluídas" },
        ],
      },
      {
        id: "isru",
        code: "ISRU-01",
        name: "Recursos locais",
        summary: "Gelo subterrâneo e CO₂ atmosférico se tornam água, oxigênio e metano — ar respirável e propelente para o retorno.",
        specs: [
          { k: "Processo", v: "Sabatier + eletrólise" },
          { k: "Produção", v: "CH₄ / LOX" },
          { k: "Água", v: "De gelo enterrado" },
        ],
      },
      {
        id: "grn",
        code: "GRN-01",
        name: "Presença sustentável",
        summary: "Suporte de vida em ciclo fechado e a primeira estufa pressurizada — o trabalho lento de transformar uma base em um lugar para viver.",
        specs: [
          { k: "Recuperação de água", v: "98%" },
          { k: "Área de cultivo", v: "340 m²" },
          { k: "Cultivos", v: "11 espécies" },
        ],
      },
    ],
    pad: "Zona de pouso",
  },

  explore: {
    index: "06",
    kicker: "Explorando um novo mundo",
    headline: ["Um mundo inteiro", "a descobrir."],
    intro: "Marte tem aproximadamente a mesma área de terra firme que todos os continentes da Terra somados. Cada imagem abaixo é uma representação artística; cada número é ciência planetária.",
    places: [
      {
        id: "plains",
        code: "E.01",
        name: "Vastas planícies vermelhas",
        region: "Arcadia Planitia",
        coords: "≈ 47°N · 190°L",
        body: "Planícies suaves do hemisfério norte, onde radares encontraram gelo de água logo abaixo da superfície — o motivo pelo qual uma primeira base escolheria pousar aqui.",
        fact: { k: "Gelo subterrâneo", v: "A poucos metros da superfície" },
      },
      {
        id: "olympus",
        code: "E.02",
        name: "Olympus Mons",
        region: "Tharsis",
        coords: "18,65°N · 226,2°L",
        body: "O vulcão mais alto conhecido no Sistema Solar. Sua base é tão larga que, em suas encostas, o cume ficaria além do horizonte.",
        fact: { k: "Altura", v: "≈ 22 km · 2,5× o Everest" },
      },
      {
        id: "craters",
        code: "E.03",
        name: "Paisagens de crateras",
        region: "Hellas Planitia",
        coords: "42,4°S · 70,5°L",
        body: "As terras altas do sul carregam bilhões de anos de impactos. Hellas, a mais profunda delas, poderia abrigar um pequeno mar.",
        fact: { k: "Bacia", v: "≈ 2.300 km de largura · 7 km de profundidade" },
      },
      {
        id: "rovers",
        code: "E.04",
        name: "Exploração robótica remota",
        region: "Valles Marineris",
        coords: "13,9°S · 300,8°L",
        body: "Onde as tripulações ainda não podem ir, os robôs vão primeiro — percorrendo um sistema de cânions longo o bastante para atravessar os Estados Unidos continentais.",
        fact: { k: "Sistema de cânions", v: "≈ 4.000 km de extensão" },
      },
    ],
    note: "Ensaio visual: representações artísticas de Marte. Dados planetários de fontes científicas públicas.",
  },

  legacy: {
    index: "07",
    kicker: "O legado // O caminho até aqui",
    headline: ["Feito para", "ir além."],
    lead: "Antes da ficção, o registro. Cada capítulo desta história se apoia em marcos que realmente aconteceram.",
    recordLabel: "Registro histórico — marcos verificados",
    milestones: [
      {
        year: "2002",
        date: "2002",
        title: "A SpaceX é fundada",
        body: "A empresa é fundada para revolucionar a tecnologia espacial, com o objetivo de longo prazo de permitir que pessoas vivam em outros planetas.",
      },
      {
        year: "2008",
        date: "28 de setembro de 2008",
        title: "O Falcon 1 chega à órbita",
        body: "Em seu quarto voo, o Falcon 1 se torna o primeiro foguete de combustível líquido desenvolvido de forma privada a alcançar a órbita da Terra.",
      },
      {
        year: "2012",
        date: "Maio de 2012",
        title: "A Dragon chega à estação espacial",
        body: "A Dragon se torna a primeira espaçonave comercial a levar carga à Estação Espacial Internacional e retornar com segurança à Terra.",
      },
      {
        year: "2015",
        date: "21 de dezembro de 2015",
        title: "Um propulsor volta para casa",
        body: "Depois de levar 11 satélites à órbita, o primeiro estágio de um Falcon 9 pousa na Landing Zone 1, em Cabo Canaveral — o primeiro pouso de um foguete de classe orbital.",
      },
      {
        year: "2020",
        date: "30 de maio de 2020",
        title: "A Crew Dragon leva astronautas à órbita",
        body: "A missão Demo-2 leva os astronautas da NASA Bob Behnken e Doug Hurley à ISS, devolvendo aos Estados Unidos a capacidade de voo espacial tripulado.",
      },
    ],
    sources: "Fontes: registros públicos de spacex.com e nasa.gov.",
    divider: {
      kicker: "Fim do registro",
      title: "Além desta linha, a história é imaginada.",
      body: "O que vem a seguir é a linha do tempo fictícia da Missão Horizon-01 — um futuro alternativo escrito para este conceito.",
    },
    fiction: [
      { mark: "Dia 000", title: "Horizon-01 deixa a Terra", body: "Tripulação de quatro. Injeção trans-Marte confirmada." },
      { mark: "Dia 187", title: "Pouso em Arcadia Planitia", body: "Pouso propulsivo nas planícies do norte." },
      { mark: "Sol 0001", title: "O primeiro passo", body: "A humanidade se torna uma espécie de dois planetas." },
      { mark: "Sol 0420", title: "Base Firstlight operacional", body: "Energia, água e propelente produzidos em Marte." },
    ],
  },

  finale: {
    index: "08",
    kicker: "A próxima civilização",
    headline: ["Isto é apenas", "o começo."],
    sub: "De um mundo para outro. E além.",
    body: "Toda jornada que importou começou com alguém decidindo que a distância valia a pena. A próxima já está sendo planejada.",
    cta: "Voltar ao começo",
    mission: "Missão // Horizon-∞",
  },

  footer: {
    navLabel: "Rodapé",
    signal: "Fim da transmissão. Sol 0001 — e contando.",
    credit: "Conceito criado e desenvolvido para a Aklio Studio",
    disclaimer: "Independent concept by Aklio Studio. Fictional Mars mission. Not affiliated with SpaceX.",
    disclaimerLong: "Conceito independente da Aklio Studio. Missão a Marte fictícia. Sem afiliação com a SpaceX. Os marcos históricos vêm de registros públicos. A missão Horizon-01, sua tripulação, a Base Firstlight e toda a telemetria são fictícias. SpaceX, Falcon, Dragon e Starship são marcas registradas da Space Exploration Technologies Corp.",
    top: "Voltar ao topo",
  },

  media: {
    pending: "Aguardando imagem",
  },
};
