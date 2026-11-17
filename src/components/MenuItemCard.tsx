import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Leaf, Flame, Check, MessageSquare } from 'lucide-react';
import { SkewerItem, CartItem } from '../types';

interface MenuItemCardProps {
  key?: string | number;
  item: SkewerItem;
  onAddToCart: (cartItem: CartItem) => void;
}

export default function MenuItemCard({ item, onAddToCart }: MenuItemCardProps) {
  const [isCustomizing, setIsCustomizing] = useState<boolean>(false);
  const [customNotes, setCustomNotes] = useState<string>('');
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  const isDrink = item.category === 'bebida';

  const triggerAdd = (notes?: string) => {
    const cartItem: CartItem = {
      id: `${item.id}_${Date.now()}`,
      skewer: item,
      quantity: 1,
      customNotes: notes?.trim() || undefined,
    };

    onAddToCart(cartItem);
    setIsCustomizing(false);
    setCustomNotes('');

    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
    }, 2000);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    triggerAdd(customNotes);
  };

  return (
    <div className="bg-[#1A1A1A] rounded-[32px] sm:rounded-[40px] border-2 border-white/10 hover:border-[#FF4500] shadow-md hover:shadow-[0_0_25px_rgba(255,69,0,0.2)] transition-all overflow-hidden flex flex-col h-full relative group text-white">
      
      {/* Visual Header / Image Container */}
      <div className="h-48 w-full overflow-hidden relative bg-[#0F0F0F] shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />

        {/* Ambient Dark Overlay on bottom part of image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

        {/* Badges Overlay */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 z-10">
          {item.tags?.map((tag) => (
            <span
              key={tag}
              className="bg-black text-white text-[10px] font-black px-3 py-1 rounded-full tracking-wide uppercase flex items-center gap-1 shadow-md border border-white/15"
            >
              {tag.includes('Vendido') && <Flame className="w-3 h-3 text-[#FF4500] animate-pulse" />}
              {tag}
            </span>
          ))}
          {item.vegan && (
            <span className="bg-[#FF4500] text-black text-[10px] font-black px-3 py-1 rounded-full tracking-wide uppercase flex items-center gap-1 shadow-md">
              <Leaf className="w-3 h-3" />
              Vegano
            </span>
          )}
          {item.vegetarian && !item.vegan && (
            <span className="bg-green-600 text-white text-[10px] font-black px-3 py-1 rounded-full tracking-wide uppercase flex items-center gap-1 shadow-md">
              <Leaf className="w-3 h-3" />
              Vegetariano
            </span>
          )}
        </div>

        {/* Float Price Tag over Image */}
        <div className="absolute bottom-4 right-4 bg-[#FF4500] text-black px-3.5 py-1.5 rounded-2xl font-mono font-black text-sm shadow-md">
          R$ {item.price.toFixed(2)}
        </div>
      </div>

      {/* Card Body Info */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <h4 className="font-display font-black text-xl text-white leading-tight uppercase group-hover:text-[#FF4500] transition-colors flex items-center gap-2">
            <div className="w-3 h-3 bg-[#FF4500] rotate-45 shrink-0 group-hover:rotate-90 transition-transform duration-300"></div>
            {item.name}
          </h4>
          <p className="text-white/75 text-xs leading-relaxed line-clamp-3">
            {item.description}
          </p>
        </div>

        {/* Action button bar */}
        <div className="mt-5 pt-4 border-t border-white/10">
          <AnimatePresence mode="wait">
            {addedAnimation ? (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="w-full bg-[#D20A11] text-white py-3 px-4 rounded-2xl text-xs font-black uppercase tracking-wider text-center flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                Adicionado!
              </motion.div>
            ) : (
              <button
                onClick={() => (isDrink ? triggerAdd() : setIsCustomizing(true))}
                className="w-full bg-white text-black hover:bg-[#FF4500] hover:text-white hover:scale-[1.02] active:scale-[0.98] py-3 px-4 rounded-2xl text-xs font-display font-black uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm hover:shadow-md"
              >
                <Plus className="w-4 h-4 text-[#FF4500] group-hover:text-white transition-colors" />
                {isDrink ? 'Adicionar Bebida' : 'Adicionar Espeto'}
              </button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Preparation Notes Popover / Modal Overlay (Skewers only) */}
      <AnimatePresence>
        {isCustomizing && !isDrink && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#0F0F0F]/95 text-white p-5 flex flex-col justify-between z-20"
          >
            <div className="space-y-4 overflow-y-auto max-h-[80%] pr-1">
              <div className="flex items-center justify-between">
                <h5 className="font-display font-black text-sm uppercase tracking-wider text-[#FF4500] flex items-center gap-1.5">
                  <Flame className="w-4 h-4" />
                  Preferência de Preparo
                </h5>
                <button
                  onClick={() => setIsCustomizing(false)}
                  className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
                >
                  <XIcon className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] text-gray-300 font-bold uppercase tracking-widest flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5" />
                  Observação do Preparo (Opcional):
                </label>
                <textarea
                  placeholder="Ex: ao ponto, bem passado, pouco sal..."
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  maxLength={100}
                  className="w-full bg-[#1A1A1A] border border-white/15 text-xs rounded-xl p-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF4500] resize-none h-24"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex gap-2.5">
              <button
                onClick={() => setIsCustomizing(false)}
                className="flex-1 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-gray-400 hover:bg-white/5 hover:text-white transition-all cursor-pointer border border-white/10 text-center"
              >
                Voltar
              </button>
              <button
                onClick={handleAdd}
                className="flex-1 py-2.5 rounded-xl text-[10px] font-display font-black uppercase tracking-wider bg-[#FF4500] hover:bg-white text-black transition-all cursor-pointer text-center"
              >
                Confirmar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Small inline XIcon for local cleaner usage
function XIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
