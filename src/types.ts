export interface SkewerItem {
  id: string;
  name: string;
  description: string;
  category: 'salgado' | 'doce';
  price: number;
  image?: string;
  tags?: string[];
  spicy?: boolean;
  vegetarian?: boolean;
  vegan?: boolean;
}

export interface SauceItem {
  id: string;
  name: string;
  description: string;
  accentColor: string;
}

export interface CartItem {
  id: string; // Unique ID for cart instance
  skewer: SkewerItem;
  quantity: number;
  selectedSauces: string[]; // List of sauce names
  customNotes?: string;
  isCustomSkewer?: boolean;
  customIngredients?: string[]; // If custom-built
  grillingStyle?: string; // e.g. "Ao Ponto", "Bem Passado", "Mal Passado"
}

export interface NeighborhoodDelivery {
  name: string;
  time: string;
  fee: number;
  minOrder: number;
}
