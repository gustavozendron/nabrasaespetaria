export interface SkewerItem {
  id: string;
  name: string;
  description: string;
  category: 'salgado' | 'bebida';
  price: number;
  image?: string;
  tags?: string[];
  spicy?: boolean;
  vegetarian?: boolean;
  vegan?: boolean;
}

export interface CartItem {
  id: string; // Unique ID for cart instance
  skewer: SkewerItem;
  quantity: number;
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
