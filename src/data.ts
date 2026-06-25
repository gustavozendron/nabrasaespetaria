import { SkewerItem, SauceItem, NeighborhoodDelivery } from './types';

// Image paths from our generated assets
export const IMAGES = {
  hero: '/src/assets/images/hero_skewers_1782425643750.jpg',
  sweet: '/src/assets/images/sweet_skewers_1782425657862.jpg',
  vegan: '/src/assets/images/vegan_skewers_1782425668906.jpg',
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
    id: 'boi_frango',
    name: 'Boi n\' Frango',
    description: 'A combinação perfeita de alcatra bovina e cubos suculentos de peito de frango temperados com ervas finas da casa.',
    category: 'salgado',
    price: 14.00,
    image: '/src/assets/images/boinfrango.jpeg',
    tags: ['O Favorito do ABC', 'Misto'],
    vegetarian: false,
    vegan: false
  },
  {
    id: 'queijo_coalho',
    name: 'Queijo Coalho',
    description: 'O autêntico queijo coalho dourado por fora, com aquela casquinha crocante irresistível, e derretido por dentro.',
    category: 'salgado',
    price: 12.00,
    image: '/src/assets/images/queijocoalho.jpeg',
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
    image: '/src/assets/images/linguica.jpeg',
    tags: ['Tradicional'],
    vegetarian: false,
    vegan: false
  },
  {
    id: 'brocolis_palmito',
    name: 'Brócolis e Palmito',
    description: 'Buquês frescos de brócolis grelhados na brasa intercalados com palmito premium pupunha e azeite especial.',
    category: 'salgado',
    price: 13.00,
    image: IMAGES.vegan,
    tags: ['Saudável', 'Fresco'],
    vegetarian: true,
    vegan: true
  },
  {
    id: 'vegano',
    name: 'Espetinho Vegano',
    description: 'Combinação harmoniosa de cebola roxa, pimentão vermelho, abobrinha, brócolis e palmito pincelados com ervas finas.',
    category: 'salgado',
    price: 12.00,
    image: '/src/assets/images/vegano.jpeg',
    tags: ['100% Vegano', 'Natural'],
    vegetarian: true,
    vegan: true
  },
  {
    id: 'peixe_empanado',
    name: 'Peixe Empanado',
    description: 'Cubos de peixe branco selecionados, empanados em farinha panko ultra-crocante, fritos e finalizados na churrasqueira.',
    category: 'salgado',
    price: 15.00,
    image: '/src/assets/images/peixeempanado.jpeg',
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
  },
  {
    id: 'marshmallow_chocolate',
    name: 'Marshmallow com Chocolate',
    description: 'Marshmallows fofinhos tostados na brasa, ganhando uma casquinha dourada, cobertos com calda cremosa de chocolate belga.',
    category: 'doce',
    price: 11.00,
    image: IMAGES.sweet,
    tags: ['Para Adoçar', 'Derretido'],
    vegetarian: true,
    vegan: false
  },
  {
    id: 'romeu_julieta',
    name: 'Romeu e Julieta',
    description: 'Queijo coalho grelhado na churrasqueira até derreter, coberto com uma generosa camada de goiabada cascão artesanal derretida.',
    category: 'doce',
    price: 13.00,
    image: '/src/assets/images/romeuejulieta.jpeg',
    tags: ['Tradicional', 'Equilíbrio Perfeito'],
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
