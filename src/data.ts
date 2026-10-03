import { SkewerItem, SauceItem, NeighborhoodDelivery } from './types';

import heroImg from './assets/images/hero_skewers_1782425643750.jpg';
import sweetImg from './assets/images/sweet_skewers_1782425657862.jpg';
import veganImg from './assets/images/vegan_skewers_1782425668906.jpg';
import linguicaImg from './assets/images/linguica.jpeg';
import peixeEmpanadoImg from './assets/images/peixeempanado.jpeg';
import queijoCoalhoImg from './assets/images/queijocoalho.jpeg';
import medalhaoImg from './assets/images/espeto_medalhao_1790988778173.jpg';
import coracaoImg from './assets/images/espeto_coracao_1790988787476.jpg';
import frangoImg from './assets/images/espeto_frango_1790988796350.jpg';
import kaftaImg from './assets/images/espeto_kafta_1790988806337.jpg';

// Image paths from our generated assets
export const IMAGES = {
  hero: heroImg,
  sweet: sweetImg,
  vegan: veganImg,
};

export const SKEWERS: SkewerItem[] = [
  // SALGADOS
  {
    id: 'carne_bovina',
    name: 'Carne 100% Bovina',
    description: 'Cubos nobres de alcatra bovina temperados com sal grosso tradicional e grelhados lentamente na brasa quente.',
    category: 'salgado',
    price: 15.00,
    image: IMAGES.hero,
    tags: ['Mais Vendido', 'Clássico'],
    vegetarian: false,
    vegan: false
  },
  {
    id: 'medalhao',
    name: 'Medalhão',
    description: 'Cubos macios de peito de frango selecionados envoltos em fatias douradas e crocantes de bacon defumado na brasa.',
    category: 'salgado',
    price: 14.00,
    image: medalhaoImg,
    tags: ['Queridinho', 'Com Bacon'],
    vegetarian: false,
    vegan: false
  },
  {
    id: 'coracao_galinha',
    name: 'Coração de Galinha',
    description: 'Coraçõezinhos de frango temperados na marinada especial com alho e ervas finas, assados no ponto perfeito, suculentos e dourados.',
    category: 'salgado',
    price: 13.00,
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
    price: 11.00,
    image: frangoImg,
    tags: ['Leve', 'Grelhado'],
    vegetarian: false,
    vegan: false
  },
  {
    id: 'kafta',
    name: 'Kafta',
    description: 'Carne moída bovina de primeira temperada artesanalmente com hortelã fresca, cebola roxa e mix árabe de especiarias na brasa.',
    category: 'salgado',
    price: 13.00,
    image: kaftaImg,
    tags: ['Artesanal', 'Especiarias'],
    vegetarian: false,
    vegan: false
  },
  {
    id: 'queijo_coalho',
    name: 'Queijo Coalho',
    description: 'O autêntico queijo coalho dourado por fora, com aquela casquinha crocante irresistível, e derretido por dentro.',
    category: 'salgado',
    price: 12.00,
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
    price: 10.00,
    image: linguicaImg,
    tags: ['Tradicional'],
    vegetarian: false,
    vegan: false
  },
  {
    id: 'peixe_empanado',
    name: 'Peixe Empanado',
    description: 'Cubos de peixe branco selecionados, empanados em farinha panko ultra-crocante, fritos e finalizados na churrasqueira.',
    category: 'salgado',
    price: 15.00,
    image: peixeEmpanadoImg,
    tags: ['Novidade', 'Crocante'],
    vegetarian: false,
    vegan: false
  },

  // DOCES
  {
    id: 'frutas_chocolate',
    name: 'Frutas com Chocolate',
    description: 'Combinação irresistível de morango fresco, uva sem semente, manga e banana fatiada, cobertos com calda de chocolate premium.',
    category: 'doce',
    price: 14.00,
    image: IMAGES.sweet,
    tags: ['Mais Pedida', 'Fruta Fresca'],
    vegetarian: true,
    vegan: false
  }
];

export const SAUCES: SauceItem[] = [
  {
    id: 'molho_casa',
    name: 'Molho da Casa',
    description: 'Nossa receita secreta de maionese artesanal defumada com alho assado na brasa e ervas aromáticas.',
    accentColor: 'from-orange-500 to-amber-600'
  },
  {
    id: 'barbecue',
    name: 'Barbecue Defumado',
    description: 'Molho barbecue encorpado, cozido lentamente com notas de fumaça líquida e melaço de cana.',
    accentColor: 'from-red-800 to-red-950'
  },
  {
    id: 'molho_ranch',
    name: 'Molho Ranch',
    description: 'Molho cremoso à base de buttermilk, creme azedo, alho e um mix refrescante de cebolete e salsinha.',
    accentColor: 'from-sky-100 to-sky-300'
  },
  {
    id: 'vinagrete',
    name: 'Vinagrete de Boteco',
    description: 'Tomate fresco, cebola roxa e pimentões cortados bem fininhos, curtidos no azeite extra virgem e vinagre de vinho.',
    accentColor: 'from-green-500 to-emerald-600'
  },
  {
    id: 'maionese',
    name: 'Maionese Verde',
    description: 'Maionese batida na hora com ovos pasteurizados, azeite, salsinha, cebolinha e um toque de limão cravo.',
    accentColor: 'from-green-400 to-lime-500'
  },
  {
    id: 'ketchup',
    name: 'Ketchup Premium',
    description: 'Ketchup rústico artesanal condimentado com especiarias, canela e cravo, perfeito para destacar o grelhado.',
    accentColor: 'from-red-500 to-red-700'
  },
  {
    id: 'mostarda',
    name: 'Mostarda e Mel',
    description: 'Mostarda amarela escura misturada com mel silvestre orgânico e sementes de mostarda moídas.',
    accentColor: 'from-yellow-400 to-amber-500'
  }
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
