/**
 * Conteúdo editorial centralizado.
 *
 * ORIGO é uma marca FICTÍCIA criada para este conceito. Antes de usar com uma
 * empresa real, substitua nome, logo autorizado, textos e imagens.
 *
 * Indicadores (`facts`) ficam vazios de propósito: o briefing pede que nenhum
 * número seja inventado. Quando houver dados reais e auditados, preencha os
 * arrays — os componentes só renderizam o bloco quando há conteúdo.
 */
import origin from "@/public/images/origin.jpg";
import fieldCattle from "@/public/images/field-cattle.jpg";
import fieldIrrigation from "@/public/images/field-irrigation.jpg";
import peopleFarmer from "@/public/images/people-farmer.jpg";
import peopleWorker from "@/public/images/people-worker.jpg";
import techLine from "@/public/images/tech-line.jpg";
import techSensor from "@/public/images/tech-sensor.jpg";
import industryPort from "@/public/images/industry-port.jpg";
import industryFleet from "@/public/images/industry-fleet.jpg";
import sustainabilityRows from "@/public/images/sustainability-rows.jpg";
import heroEnd from "@/public/images/hero-end.jpg";

export type Fact = { value: string; label: string; source: string };

export const brand = {
  name: "ORIGO",
  tagline: "Da origem ao mundo.",
};

export const nav = [
  { label: "Nossa história", href: "#origem" },
  { label: "Negócios", href: "#industria" },
  { label: "Sustentabilidade", href: "#sustentabilidade" },
  { label: "Inovação", href: "#tecnologia" },
];

export const hero = {
  video: { desktop: "/videos/hero.mp4", mobile: "/videos/hero-mobile.mp4", poster: "/images/hero-poster.jpg" },
  end: heroEnd,
  lineA: "Da origem",
  lineB: "Ao mundo",
  closing: "Construindo o futuro da alimentação.",
  /** Capítulos do filme, em segundos — legendam o que o espectador está vendo. */
  reel: [
    { at: 0, label: "Origem" },
    { at: 2, label: "Campo" },
    { at: 4, label: "Pessoas" },
    { at: 6, label: "Tecnologia" },
    { at: 7.8, label: "Indústria" },
    { at: 9.6, label: "Logística" },
    { at: 10.6, label: "Mundo" },
  ],
};

export const originSection = {
  index: "01",
  title: "Origem",
  headline: "Tudo começa aqui.",
  body: "Antes da indústria, dos portos e das prateleiras, existe a terra. É no campo, ao amanhecer, que cada cadeia da ORIGO começa — com produtores parceiros, manejo responsável e respeito pelo tempo da natureza.",
  image: origin,
  imageAlt: "Pasto ao amanhecer, com névoa baixa sobre o campo e o sol nascendo no horizonte.",
  meta: ["16°40′ S · 49°15′ W", "Cerrado, Brasil", "05:42"],
};

export const fieldSection = {
  index: "02",
  title: "Campo",
  headline: ["Onde o trabalho", "começa antes do sol."],
  body: "Pecuária e agricultura caminham lado a lado. Genética, nutrição, bem-estar animal e manejo do solo são decisões diárias — tomadas por quem conhece cada hectare pelo nome.",
  quote: "Qualidade não se inspeciona no fim da linha. Ela nasce no pasto.",
  primary: { src: fieldCattle, alt: "Gado nelore caminhando em pasto verde ao amanhecer.", caption: "Fig. 01 — Pecuária a pasto" },
  secondary: { src: fieldIrrigation, alt: "Irrigação por microaspersão em estufa de hortaliças.", caption: "Fig. 02 — Irrigação de precisão" },
  facts: [] as Fact[],
};

export const peopleSection = {
  index: "03",
  title: "Pessoas",
  headline: ["Por trás de cada", "alimento, existem", "milhares de histórias."],
  body: "Produtores, técnicos, operadores, motoristas, pesquisadores. A escala de uma empresa global é feita, antes de tudo, de pessoas que acordam cedo.",
  portraits: [
    { src: peopleFarmer, alt: "Produtor rural sorrindo no campo, segurando um tablet ao pôr do sol.", caption: "Retrato 01 — Produtor parceiro, Goiás" },
    { src: peopleWorker, alt: "Operadora com equipamento de proteção conferindo a linha de produção.", caption: "Retrato 02 — Linha de processamento" },
  ],
};

export const technologySection = {
  index: "04",
  title: "Tecnologia",
  image: techLine,
  imageAlt: "Linha de processamento industrial automatizada, com operadores em equipamento de proteção.",
  detail: techSensor,
  detailAlt: "Painel de sensores instalado em estufa agrícola.",
  pillars: [
    { word: "Rastreabilidade", text: "Cada lote carrega sua história — da propriedade de origem à prateleira." },
    { word: "Eficiência", text: "Processos medidos continuamente para produzir mais, com menos." },
    { word: "Automação", text: "Linhas inteligentes que ampliam a segurança de quem opera." },
    { word: "Dados", text: "Sensores no campo e na indústria orientando decisões em tempo real." },
    { word: "Inovação", text: "Pesquisa aplicada para antecipar a próxima geração de alimentos." },
  ],
};

export const industrySection = {
  index: "05",
  title: "Indústria",
  headline: ["Do processamento", "ao porto, um", "único fluxo."],
  body: "Plantas industriais, centros de distribuição, frota e terminais operando como um só sistema — para que o alimento chegue íntegro, no tempo certo, a qualquer mercado.",
  frames: [
    { src: techLine, alt: "Linha de produção com esteiras e painéis de controle.", caption: "Processamento", ratio: "aspect-[16/10]" },
    { src: industryPort, alt: "Terminal portuário com contêineres, guindastes e caminhões.", caption: "Logística portuária", ratio: "aspect-[16/9]" },
    { src: industryFleet, alt: "Caminhões refrigerados circulando em centro de distribuição.", caption: "Distribuição", ratio: "aspect-[4/5]" },
  ],
};

export const sustainabilitySection = {
  index: "06",
  title: "Sustentabilidade",
  headline: ["Produzir hoje.", "Preservar o amanhã."],
  body: "Produtividade e conservação não são forças opostas. Manejo do solo, uso racional da água e cadeias rastreadas são o compromisso que sustenta a próxima safra — e a próxima geração.",
  image: sustainabilityRows,
  imageAlt: "Fileiras de hortaliças em cultivo, vistas em perspectiva até o horizonte.",
  facts: [] as Fact[],
};

/** Coordenadas reais (lon, lat). Somente regiões — sem números inventados. */
export const globalSection = {
  index: "07",
  title: "Escala global",
  headline: ["Do Brasil", "para a mesa", "do mundo."],
  body: "Uma origem. Muitos destinos.",
  origin: { name: "Brasil", lon: -49.25, lat: -16.68 },
  destinations: [
    { name: "América do Norte", lon: -95, lat: 39 },
    { name: "Europa", lon: 10, lat: 50 },
    { name: "Oriente Médio", lon: 46, lat: 25 },
    { name: "África", lon: 20, lat: 2 },
    { name: "Ásia", lon: 114, lat: 30 },
    { name: "Oceania", lon: 146, lat: -28 },
  ],
  facts: [] as Fact[],
};

export const finalSection = {
  headline: "Da origem ao mundo.",
  cta: { label: "Conheça nossa história", href: "#origem" },
};

export const footer = {
  columns: [
    { title: "Empresa", links: ["Nossa história", "Governança", "Carreiras"] },
    { title: "Negócios", links: ["Proteínas", "Alimentos preparados", "Logística"] },
    { title: "Contato", links: ["Imprensa", "Investidores", "Fale conosco"] },
  ],
  legal: "Projeto conceitual. Marca, textos e imagens fictícios — sem vínculo com empresas reais.",
};
