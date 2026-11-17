import { SkewerItem, NeighborhoodDelivery } from './types';

import heroImg from './assets/images/hero_skewers_1782425643750.jpg';
import linguicaImg from './assets/images/linguica.jpeg';
import queijoCoalhoImg from './assets/images/queijocoalho.jpeg';
import coracaoImg from './assets/images/espeto_coracao_1790988787476.jpg';
import frangoImg from './assets/images/espeto_frango_1790988796350.jpg';
import picanhaImg from './assets/images/espeto_picanha_1794957241051.jpg';
import alcatraImg from './assets/images/espeto_alcatra_1794957241555.jpg';
import aguaImg from './assets/images/bebida_agua_1794957392176.jpg';
import aguaGasImg from './assets/images/bebida_agua_gas_1794957391991.jpg';
import cocaColaImg from './assets/images/bebida_coca_cola_1794957392206.jpg';

// Image paths from our generated assets
export const IMAGES = {
  hero: heroImg,
  picanha: picanhaImg,
  alcatra: alcatraImg,
};

export const SKEWERS: SkewerItem[] = [
  // SALGADOS
  {
    id: 'picanha',
    name: 'Picanha',
    description: 'Fatias nobres de picanha selecionada com capa de gordura dourada na brasa e temperada no ponto certo com sal grosso.',
    category: 'salgado',
    price: 18.00,
    image: picanhaImg,
    tags: ['Mais Vendido', 'Corte Nobre'],
    vegetarian: false,
    vegan: false
  },
  {
    id: 'coracao_galinha',
    name: 'Coração de Galinha',
    description: 'Coraçõezinhos de frango temperados na marinada especial com alho e ervas finas, assados no ponto perfeito, suculentos e dourados.',
    category: 'salgado',
    price: 12.00,
    image: coracaoImg,
    tags: ['Tradicional', 'Suculento'],
    vegetarian: false,
    vegan: false
  },
  {
    id: 'frango',
    name: 'Frango',
    description: 'Cubos macios de frango marinados com ervas finas, alho e toque cítrico, grelhados na brasa com casquinha irresistível.',
    category: 'salgado',
    price: 12.00,
    image: frangoImg,
    tags: ['Leve', 'Grelhado'],
    vegetarian: false,
    vegan: false
  },
  {
    id: 'alcatra',
    name: 'Alcatra',
    description: 'Cubos macios e suculentos de alcatra bovina selecionada, temperados com sal grosso tradicional e assados na brasa quente.',
    category: 'salgado',
    price: 13.00,
    image: alcatraImg,
    tags: ['Tradicional', 'Suculento'],
    vegetarian: false,
    vegan: false
  },
  {
    id: 'queijo_coalho',
    name: 'Queijo Coalho',
    description: 'O autêntico queijo coalho dourado por fora, com aquela casquinha crocante irresistível, e derretido por dentro.',
    category: 'salgado',
    price: 18.00,
    image: queijoCoalhoImg,
    tags: ['Cremoso', 'Sucesso'],
    vegetarian: true,
    vegan: false
  },
  {
    id: 'linguica',
    name: 'Linguiça',
    description: 'Linguiça toscana tradicional de churrasco, super suculenta, grelhada no fogo forte.',
    category: 'salgado',
    price: 12.00,
    image: linguicaImg,
    tags: ['Tradicional'],
    vegetarian: false,
    vegan: false
  }
];

export const DRINKS: SkewerItem[] = [
  {
    id: 'agua',
    name: 'Água',
    description: 'Água mineral sem gás bem gelada (500ml) para refrescar e acompanhar seu churrasco.',
    category: 'bebida',
    price: 4.00,
    image: aguaImg,
    tags: ['Gelada', '500ml'],
  },
  {
    id: 'agua_gas',
    name: 'Água com Gás',
    description: 'Água mineral com gás refrescante e bem gelada, ideal para limpar o paladar entre os espetos.',
    category: 'bebida',
    price: 5.00,
    image: aguaGasImg,
    tags: ['Refrescante', 'Com Gás'],
  },
  {
    id: 'coca_cola',
    name: 'Coca-Cola',
    description: 'Coca-Cola lata 350ml trincando de gelada, a combinação clássica para qualquer espetinho na brasa.',
    category: 'bebida',
    price: 6.00,
    image: cocaColaImg,
    tags: ['Gelada', 'Lata 350ml'],
  },
];

export const NEIGHBORHOODS: NeighborhoodDelivery[] = [
  { name: 'Bairro Jardim', time: '15 - 25 min', fee: 5.00, minOrder: 30.00 },
  { name: 'Campestre', time: '18 - 28 min', fee: 5.00, minOrder: 30.00 },
  { name: 'Centro (Santo André)', time: '15 - 30 min', fee: 6.00, minOrder: 30.00 },
  { name: 'Vila Bastos', time: '20 - 30 min', fee: 6.00, minOrder: 30.00 },
  { name: 'Vila Alpina', time: '20 - 30 min', fee: 6.00, minOrder: 30.00 },
  { name: 'Parque das Nações', time: '25 - 35 min', fee: 7.00, minOrder: 35.00 },
  { name: 'Utinga', time: '25 - 35 min', fee: 7.50, minOrder: 35.00 },
  { name: 'Camilópolis', time: '30 - 40 min', fee: 8.00, minOrder: 35.00 },
  { name: 'Vila Assunção', time: '25 - 35 min', fee: 7.00, minOrder: 35.00 },
  { name: 'Paraíso', time: '30 - 40 min', fee: 8.00, minOrder: 40.00 },
];
