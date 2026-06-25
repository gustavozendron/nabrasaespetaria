import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Flame, Check, HelpCircle, Sparkles } from 'lucide-react';
import { CartItem, SkewerItem } from '../types';

interface IngredientOption {
  id: string;
  name: string;
  price: number;
  color: string;
  emoji: string;
  type: 'meat' | 'veg' | 'cheese' | 'sausage';
}

const INGREDIENTS_OPTIONS: IngredientOption[] = [
  { id: 'carne', name: 'Carne Bovina', price: 4.50, color: 'bg-amber-900', emoji: '🥩', type: 'meat' },
  { id: 'frango', name: 'Peito de Frango', price: 3.50, color: 'bg-yellow-100 border-amber-200', emoji: '🍗', type: 'meat' },
  { id: 'linguica', name: 'Linguiça de Porco', price: 3.00, color: 'bg-red-800', emoji: '🌭', type: 'sausage' },
  { id: 'queijo', name: 'Queijo Coalho', price: 4.00, color: 'bg-yellow-200 border-yellow-300', emoji: '🧀', type: 'cheese' },
  { id: 'brocolis', name: 'Brócolis Fresco', price: 2.50, color: 'bg-emerald-700', emoji: '🥦', type: 'veg' },
  { id: 'palmito', name: 'Palmito Pupunha', price: 3.50, color: 'bg-stone-100 border-stone-200', emoji: '🪵', type: 'veg' },
  { id: 'cebola', name: 'Cebola Roxa', price: 1.50, color: 'bg-purple-800', emoji: '🧅', type: 'veg' },
  { id: 'pimentao', name: 'Pimentão Vermelho', price: 1.50, color: 'bg-red-600', emoji: '🌶️', type: 'veg' },
];

interface SkewerBuilderProps {
  onAddCustomSkewer: (item: CartItem) => void;
}

export default function SkewerBuilder({ onAddCustomSkewer }: SkewerBuilderProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<IngredientOption[]>([
    INGREDIENTS_OPTIONS[0], // Pre-populate with beef
    INGREDIENTS_OPTIONS[6], // cebola
    INGREDIENTS_OPTIONS[3], // queijo
    INGREDIENTS_OPTIONS[7], // pimentao
    INGREDIENTS_OPTIONS[0], // beef
  ]);
  const [grillingStyle, setGrillingStyle] = useState<string>('Ao Ponto');
  const [selectedSauce, setSelectedSauce] = useState<string>('Molho da Casa');
  const [successMessage, setSuccessMessage] = useState<boolean>(false);

  const maxIngredients = 6;
  const basePrice = 4.00; // Metal skewer + labor base fee
  const totalPrice = basePrice + selectedIngredients.reduce((sum, item) => sum + item.price, 0);

  const addIngredient = (ingredient: IngredientOption) => {
    if (selectedIngredients.length >= maxIngredients) return;
    setSelectedIngredients([...selectedIngredients, ingredient]);
  };

  const removeIngredient = (index: number) => {
    const updated = [...selectedIngredients];
    updated.splice(index, 1);
    setSelectedIngredients(updated);
  };

  const handleAdd = () => {
    if (selectedIngredients.length === 0) return;

    // Compile into a standard CartItem
    const customSkewerItem: SkewerItem = {
      id: `custom_${Date.now()}`,
      name: 'Espetinho do Chefe (Personalizado)',
      description: `Espetinho montado por você com: ${selectedIngredients.map(i => i.name).join(', ')}. Grelhado no ponto: ${grillingStyle}.`,
      category: 'salgado',
      price: totalPrice,
      tags: ['Personalizado', 'Do Seu Jeito'],
      vegetarian: selectedIngredients.every(i => i.type === 'veg' || i.type === 'cheese'),
      vegan: selectedIngredients.every(i => i.type === 'veg'),
    };

    const cartItem: CartItem = {
      id: `custom_${Date.now()}`,
      skewer: customSkewerItem,
      quantity: 1,
      selectedSauces: [selectedSauce],
      isCustomSkewer: true,
      customIngredients: selectedIngredients.map(i => i.name),
      grillingStyle: grillingStyle,
    };

    onAddCustomSkewer(cartItem);
    setSuccessMessage(true);
    setTimeout(() => {
      setSuccessMessage(false);
    }, 3000);
  };

  return (
    <div id="builder-section" className="bg-[#1A1A1A] rounded-[32px] sm:rounded-[40px] shadow-xl overflow-hidden border-2 border-white/10 p-6 md:p-8 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Visual Skewer Column */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center bg-[#0F0F0F] rounded-[24px] py-12 px-4 relative border border-white/5 min-h-[480px]">
          <div className="absolute top-4 left-4 bg-[#FF4500] text-black text-xs font-black px-3.5 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
            <Flame className="w-3.5 h-3.5 animate-pulse" />
            <span>Na Brasa Real-Time</span>
          </div>

          <div className="relative h-[380px] w-48 flex items-center justify-center">
            {/* The metal stick */}
            <div className="absolute top-0 bottom-0 w-2 bg-gradient-to-r from-gray-400 via-gray-200 to-gray-500 rounded-full shadow-md z-0" />
            {/* Handle on the bottom */}
            <div className="absolute bottom-[-16px] w-8 h-16 bg-amber-950 rounded-b-lg border-t-4 border-amber-900 shadow-lg z-10 flex flex-col items-center justify-end pb-2">
              <div className="w-6 h-1 bg-amber-800 rounded-full mb-1" />
              <div className="w-6 h-1 bg-amber-800 rounded-full" />
            </div>
            {/* Sharp tip at the top */}
            <div className="absolute top-[-10px] w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[10px] border-b-gray-300 z-10" />

            {/* Skewered Ingredients Container */}
            <div className="absolute bottom-12 top-4 w-full flex flex-col-reverse justify-center items-center gap-1 z-10 select-none">
              <AnimatePresence>
                {selectedIngredients.map((ing, idx) => (
                  <motion.div
                    key={`${ing.id}-${idx}`}
                    initial={{ scale: 0, y: -50, rotate: -15 }}
                    animate={{ scale: 1, y: 0, rotate: (idx % 2 === 0 ? 3 : -3) }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="relative group cursor-pointer"
                    onClick={() => removeIngredient(idx)}
                  >
                    {/* The food visual block */}
                    <div className={`w-32 h-10 ${ing.color} rounded-xl shadow-md border-2 border-black/30 flex items-center justify-center gap-1.5 transition-all group-hover:brightness-110 group-hover:scale-105`}>
                      <span className="text-xl">{ing.emoji}</span>
                      <span className="text-[10px] md:text-xs font-black tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                        {ing.name}
                      </span>
                    </div>

                    {/* Grill marks overlay */}
                    <div className="absolute inset-0 flex justify-around pointer-events-none opacity-40 mix-blend-multiply">
                      <div className="w-0.5 h-full bg-black rotate-12" />
                      <div className="w-0.5 h-full bg-black rotate-12" />
                    </div>

                    {/* Delete tooltip */}
                    <div className="absolute inset-0 bg-[#D20A11]/95 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                      <Trash2 className="w-5 h-5 text-white" />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {selectedIngredients.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-gray-500 p-4 font-sans text-sm flex flex-col items-center gap-2"
                >
                  <HelpCircle className="w-8 h-8 text-[#FF4500] animate-bounce" />
                  <span>Seu espeto está vazio.<br/>Adicione ingredientes ao lado!</span>
                </motion.div>
              )}
            </div>
          </div>

          <p className="mt-8 text-xs text-white/50 text-center font-mono">
            {selectedIngredients.length} / {maxIngredients} ingredientes (clique para remover)
          </p>
        </div>

        {/* Customization Controls */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          <div>
            <h3 className="text-3xl font-display font-black text-white uppercase tracking-tight flex items-center gap-2">
              <Sparkles className="w-7 h-7 text-[#FF4500]" />
              Monte Seu Espeto
            </h3>
            <p className="text-white/80 text-sm mt-1">
              Escolha os seus ingredientes preferidos e nós montamos e grelhamos na brasa na hora para você! Base de alumínio higienizada inclusa (R$ 4,00).
            </p>
          </div>

          {/* Ingredient Selector List */}
          <div>
            <h4 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-3">
              1. Selecione os Ingredientes (Máx {maxIngredients})
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {INGREDIENTS_OPTIONS.map((ing) => {
                const count = selectedIngredients.filter(i => i.id === ing.id).length;
                const isFull = selectedIngredients.length >= maxIngredients;
                return (
                  <button
                    key={ing.id}
                    onClick={() => addIngredient(ing)}
                    disabled={isFull}
                    className={`relative p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all text-center group cursor-pointer ${
                      isFull
                        ? 'bg-[#0F0F0F] border-white/5 opacity-40 cursor-not-allowed'
                        : 'bg-black hover:bg-white/5 hover:border-[#FF4500] border-white/10 active:scale-95'
                    }`}
                  >
                    <span className="text-2xl mb-1.5 transform group-hover:scale-125 transition-transform">
                      {ing.emoji}
                    </span>
                    <span className="font-sans font-bold text-xs text-white block line-clamp-1">
                      {ing.name}
                    </span>
                    <span className="text-[10px] text-[#FF4500] font-mono font-medium mt-0.5">
                      + R$ {ing.price.toFixed(2)}
                    </span>

                    {count > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 bg-[#D20A11] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grilling Style Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-3 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-[#FF4500]" />
                2. Ponto do Grelhado
              </h4>
              <div className="flex gap-2">
                {['Mal Passado', 'Ao Ponto', 'Bem Passado'].map((style) => (
                  <button
                    key={style}
                    onClick={() => setGrillingStyle(style)}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all border cursor-pointer ${
                      grillingStyle === style
                        ? 'bg-[#FF4500] text-black border-[#FF4500] shadow-md shadow-orange-950/40'
                        : 'bg-black text-white/80 border-white/10 hover:bg-white/5'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-3">
                3. Molho Especial Grátis
              </h4>
              <select
                value={selectedSauce}
                onChange={(e) => setSelectedSauce(e.target.value)}
                className="w-full py-2 px-3 text-xs font-bold text-white bg-black border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4500] focus:border-[#FF4500] cursor-pointer"
              >
                <option value="Molho da Casa">Molho da Casa (Recomendado)</option>
                <option value="Barbecue Defumado">Barbecue Defumado</option>
                <option value="Molho Ranch">Molho Ranch</option>
                <option value="Vinagrete de Boteco">Vinagrete de Boteco</option>
                <option value="Maionese Verde">Maionese Verde</option>
                <option value="Ketchup Premium">Ketchup Premium</option>
                <option value="Mostarda e Mel">Mostarda e Mel</option>
                <option value="Sem Molho">Sem Molho</option>
              </select>
            </div>
          </div>

          {/* Pricing & Add Button */}
          <div className="border-t border-white/10 pt-5 flex items-center justify-between gap-4 mt-2">
            <div>
              <span className="text-xs text-white/50 block font-mono">VALOR TOTAL DO ESPETO</span>
              <span className="text-3xl font-display font-black text-white">
                R$ {totalPrice.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleAdd}
              disabled={selectedIngredients.length === 0}
              className={`px-8 py-4 rounded-xl font-display font-black text-sm tracking-wide uppercase transition-all flex items-center gap-2 shadow-lg cursor-pointer ${
                selectedIngredients.length === 0
                  ? 'bg-white/5 text-white/30 border border-white/5 cursor-not-allowed'
                  : 'bg-[#FF4500] text-black hover:bg-white hover:text-black hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              <Plus className="w-4 h-4" />
              Adicionar ao Carrinho
            </button>
          </div>

          {/* Success Notification */}
          <AnimatePresence>
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-[#D20A11]/20 border border-[#D20A11]/40 text-white p-3 rounded-xl flex items-center gap-2 text-xs font-semibold"
              >
                <div className="bg-[#D20A11] text-white w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span>Espeto customizado adicionado ao carrinho com sucesso! Prepare as brasas! 🔥</span>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
