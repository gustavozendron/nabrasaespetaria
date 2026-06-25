import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Plus, Minus, Trash2, MapPin, CreditCard, Send, AlertTriangle, CheckCircle } from 'lucide-react';
import { CartItem, NeighborhoodDelivery } from '../types';
import { NEIGHBORHOODS } from '../data';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, amount: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('Bairro Jardim');
  const [address, setAddress] = useState<string>('');
  const [addressNum, setAddressNum] = useState<string>('');
  const [complement, setComplement] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('Pix');
  const [changeFor, setChangeFor] = useState<string>('');
  const [isOrdering, setIsOrdering] = useState<boolean>(false);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.skewer.price * item.quantity), 0);
  
  // Find current neighborhood logistics
  const neighborhoodData = NEIGHBORHOODS.find(n => n.name === selectedNeighborhood) || NEIGHBORHOODS[0];
  const deliveryFee = subtotal > 0 ? neighborhoodData.fee : 0;
  const isMinOrderMet = true;
  const finalTotal = subtotal + deliveryFee;

  const handleSendOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0 || !isMinOrderMet) return;
    if (!address || !addressNum) {
      alert('Por favor, preencha o endereço de entrega e número.');
      return;
    }

    setIsOrdering(true);

    // Format the WhatsApp message with elegant spacing and emoji
    let message = `🔥 *NOVO PEDIDO - ESPETARIA NA BRASA* 🔥\n`;
    message += `📍 *Sabor Andreense*\n`;
    message += `-------------------------------------------\n\n`;

    cartItems.forEach((item, index) => {
      message += `*${item.quantity}x ${item.skewer.name}*\n`;
      message += `   _Valor:_ R$ ${item.skewer.price.toFixed(2)} cada\n`;
      
      if (item.isCustomSkewer && item.customIngredients) {
        message += `   _Ingredientes:_ ${item.customIngredients.join(', ')}\n`;
        if (item.grillingStyle) {
          message += `   _Ponto:_ ${item.grillingStyle}\n`;
        }
      }
      
      if (item.selectedSauces && item.selectedSauces.length > 0 && item.selectedSauces[0] !== 'Sem Molho') {
        message += `   _Molho:_ ${item.selectedSauces.join(', ')}\n`;
      }
      
      if (item.customNotes) {
        message += `   _Obs:_ ${item.customNotes}\n`;
      }
      message += `\n`;
    });

    message += `-------------------------------------------\n`;
    message += `💵 *RESUMO DO PEDIDO*\n`;
    message += `   *Subtotal:* R$ ${subtotal.toFixed(2)}\n`;
    message += `   *Taxa de Entrega (${selectedNeighborhood}):* R$ ${deliveryFee.toFixed(2)}\n`;
    message += `   *TOTAL:* R$ ${finalTotal.toFixed(2)}\n\n`;

    message += `-------------------------------------------\n`;
    message += `📍 *ENTREGA*\n`;
    message += `   *Bairro:* ${selectedNeighborhood}\n`;
    message += `   *Endereço:* ${address}, Nº ${addressNum}\n`;
    if (complement) {
      message += `   *Complemento:* ${complement}\n`;
    }
    message += `   *Tempo Estimado:* ${neighborhoodData.time}\n\n`;

    message += `💳 *PAGAMENTO*\n`;
    message += `   *Forma:* ${paymentMethod}\n`;
    if (paymentMethod === 'Dinheiro' && changeFor) {
      message += `   *Troco para:* R$ ${changeFor}\n`;
    }

    message += `\n🔥 _Obrigado por escolher o Na Brasa! Seu pedido está sendo enviado diretamente para a nossa grelha._`;

    // Encode message for URL
    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5511974032200?text=${encodedText}`; // Simulated Na Brasa number (can be updated)

    // Wait slightly to show animated transition, then redirect
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsOrdering(false);
      onClearCart();
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 cursor-pointer backdrop-blur-xs"
          />

          {/* Slider Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
            className="fixed top-0 right-0 h-full w-full max-w-lg bg-[#1A1A1A] text-white shadow-2xl z-50 flex flex-col font-sans border-l-4 border-[#FF4500]"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#0F0F0F] text-white">
              <div className="flex items-center gap-2.5">
                <div className="bg-[#FF4500] p-2 rounded-xl text-black">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-lg uppercase tracking-tight">Seu Carrinho</h3>
                  <p className="text-[10px] text-white/60 font-mono">
                    {cartItems.length} {cartItems.length === 1 ? 'espeto selecionado' : 'espetos selecionados'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center py-16 text-center">
                  <div className="bg-white/5 text-[#FF4500] w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-white">Seu carrinho está vazio</h4>
                  <p className="text-white/60 text-xs max-w-xs mt-1">
                    Navegue pelas nossas opções de espetos salgados e doces e monte seu pedido perfeito!
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 px-6 py-2.5 bg-[#FF4500] text-black font-black rounded-xl text-xs tracking-wider uppercase hover:bg-white transition-all cursor-pointer"
                  >
                    Ver Cardápio
                  </button>
                </div>
              ) : (
                <>
                  {/* Cart Items List */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-white/50 uppercase tracking-widest">
                      1. Itens do Pedido
                    </h4>
                    
                    <div className="space-y-3.5">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-4 p-3.5 rounded-2xl bg-[#0F0F0F] border border-white/10 hover:border-[#FF4500] transition-all relative group"
                        >
                          {/* Item Image / Visual Icon */}
                          <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-black border border-white/15 flex items-center justify-center">
                            {item.skewer.image ? (
                              <img
                                src={item.skewer.image}
                                alt={item.skewer.name}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <span className="text-2xl">🔥</span>
                            )}
                          </div>

                          {/* Item Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-1.5">
                              <h5 className="font-display font-bold text-sm text-white leading-snug truncate">
                                {item.skewer.name}
                              </h5>
                              <span className="font-mono font-bold text-xs text-[#FF4500]">
                                R$ {(item.skewer.price * item.quantity).toFixed(2)}
                              </span>
                            </div>

                            {/* Options details (sauces, custom ingredients, point) */}
                            {item.isCustomSkewer && item.customIngredients && (
                              <p className="text-[10px] text-[#FF4500] font-bold mt-0.5 leading-relaxed">
                                {item.customIngredients.join(' • ')} 
                                {item.grillingStyle && ` (${item.grillingStyle})`}
                              </p>
                            )}

                            {item.selectedSauces && item.selectedSauces.length > 0 && item.selectedSauces[0] !== 'Sem Molho' && (
                              <p className="text-[10px] text-white/60 mt-0.5">
                                <span className="font-semibold text-white/80">Molho:</span> {item.selectedSauces.join(', ')}
                              </p>
                            )}

                            {item.customNotes && (
                              <p className="text-[10px] text-[#D20A11] font-bold italic mt-0.5 leading-relaxed">
                                "Obs: {item.customNotes}"
                              </p>
                            )}

                            {/* Quantity Controls and Trash */}
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center gap-1.5 bg-black border border-white/10 rounded-lg p-0.5">
                                <button
                                  onClick={() => onUpdateQuantity(item.id, -1)}
                                  className="p-1 rounded-md text-white/60 hover:text-[#FF4500] hover:bg-white/5 transition-all cursor-pointer"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-xs font-mono font-bold w-6 text-center text-white">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(item.id, 1)}
                                  className="p-1 rounded-md text-white/60 hover:text-[#FF4500] hover:bg-white/5 transition-all cursor-pointer"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <button
                                onClick={() => onRemoveItem(item.id)}
                                className="p-1 text-white/40 hover:text-[#D20A11] transition-all cursor-pointer"
                                title="Excluir item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Neighborhood Selector */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-white/50 uppercase tracking-widest flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#FF4500]" />
                      2. Local de Entrega (Santo André)
                    </h4>

                    <div className="bg-[#0F0F0F] border border-white/10 rounded-2xl p-4 space-y-3">
                      <div>
                        <label className="text-[10px] font-bold text-white/50 uppercase block mb-1">
                          Escolha seu Bairro
                        </label>
                        <select
                          value={selectedNeighborhood}
                          onChange={(e) => setSelectedNeighborhood(e.target.value)}
                          className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-[#FF4500] cursor-pointer"
                        >
                          {NEIGHBORHOODS.map((n) => (
                            <option key={n.name} value={n.name}>
                              {n.name} (R$ {n.fee.toFixed(2)} - {n.time})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Address Form */}
                  <form onSubmit={handleSendOrder} className="space-y-4">
                    <h4 className="text-xs font-bold text-white/50 uppercase tracking-widest">
                      3. Dados de Entrega e Pagamento
                    </h4>

                    <div className="space-y-3 bg-[#0F0F0F] border border-white/10 rounded-2xl p-4">
                      <div className="grid grid-cols-12 gap-3">
                        <div className="col-span-8">
                          <label className="text-[10px] font-bold text-white/50 block mb-1">Rua / Avenida</label>
                          <input
                            type="text"
                            required
                            placeholder="Ex: Rua das Figueiras"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#FF4500]"
                          />
                        </div>
                        <div className="col-span-4">
                          <label className="text-[10px] font-bold text-white/50 block mb-1">Número</label>
                          <input
                            type="text"
                            required
                            placeholder="Ex: 450"
                            value={addressNum}
                            onChange={(e) => setAddressNum(e.target.value)}
                            className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#FF4500]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-white/50 block mb-1">Complemento / Ref (Opcional)</label>
                        <input
                          type="text"
                          placeholder="Ex: Apto 12 bloco B"
                          value={complement}
                          onChange={(e) => setComplement(e.target.value)}
                          className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#FF4500]"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-white/50 block mb-1">Forma de Pagamento</label>
                        <div className="grid grid-cols-3 gap-2 mt-1">
                          {['Pix', 'Cartão', 'Dinheiro'].map((method) => (
                            <button
                              key={method}
                              type="button"
                              onClick={() => setPaymentMethod(method)}
                              className={`py-2 text-[11px] font-bold rounded-xl border flex items-center justify-center gap-1 transition-all cursor-pointer ${
                                paymentMethod === method
                                  ? 'bg-[#FF4500] text-black border-[#FF4500] shadow-sm'
                                  : 'bg-black text-white/80 border-white/10 hover:bg-white/5'
                              }`}
                            >
                              <CreditCard className="w-3 h-3" />
                              {method}
                            </button>
                          ))}
                        </div>
                      </div>

                      {paymentMethod === 'Dinheiro' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="pt-2"
                        >
                          <label className="text-[10px] font-bold text-white/50 block mb-1">Troco para quanto?</label>
                          <input
                            type="text"
                            placeholder="Ex: R$ 100,00"
                            value={changeFor}
                            onChange={(e) => setChangeFor(e.target.value)}
                            className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#FF4500]"
                          />
                        </motion.div>
                      )}
                    </div>

                    {/* Order Cost Breakdown & Confirm Button */}
                    <div className="bg-black border-2 border-white/10 rounded-2xl p-4.5 space-y-3 shadow-md">
                      <div className="flex justify-between text-xs text-white/60">
                        <span>Subtotal:</span>
                        <span className="font-mono">R$ {subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs text-white/60">
                        <span>Taxa de Entrega ({selectedNeighborhood}):</span>
                        <span className="font-mono">R$ {deliveryFee.toFixed(2)}</span>
                      </div>
                      <div className="border-t border-white/10 my-2 pt-2 flex justify-between text-base font-bold">
                        <span className="font-display uppercase tracking-tight text-[#FF4500]">Valor Total:</span>
                        <span className="font-mono text-lg text-[#FF4500]">
                          R$ {finalTotal.toFixed(2)}
                        </span>
                      </div>

                      <button
                        type="submit"
                        disabled={cartItems.length === 0 || !isMinOrderMet || isOrdering}
                        className={`w-full py-3.5 rounded-xl font-display font-black text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
                          cartItems.length === 0 || !isMinOrderMet
                            ? 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'
                            : isOrdering
                            ? 'bg-orange-600 text-white cursor-wait'
                            : 'bg-[#FF4500] text-black hover:bg-white hover:text-black hover:scale-[1.02] active:scale-[0.98]'
                        }`}
                      >
                        {isOrdering ? (
                          <>
                            <CheckCircle className="w-4 h-4 animate-spin" />
                            <span>Enviando para o WhatsApp...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Enviar Pedido via WhatsApp</span>
                          </>
                        )}
                      </button>

                      <p className="text-[9px] text-white/40 text-center font-mono mt-1">
                        * Ao clicar, seu pedido será compilado e abrirá o WhatsApp para fechar direto com o atendente.
                      </p>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
