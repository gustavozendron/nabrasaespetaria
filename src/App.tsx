import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingBag,
  MapPin,
  Flame,
  ChefHat,
  Utensils,
  ChevronRight,
  Star,
  Check,
  Instagram,
  Smartphone,
  CupSoda
} from 'lucide-react';

import { CartItem } from './types';
import { SKEWERS, DRINKS, IMAGES } from './data';
import Logo from './components/Logo';
import MenuItemCard from './components/MenuItemCard';
import CartDrawer from './components/CartDrawer';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [promoToast, setPromoToast] = useState<boolean>(true);

  // Load cart from localStorage on init
  useEffect(() => {
    const savedCart = localStorage.getItem('nabrasa_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error parsing cart data', e);
      }
    }
  }, []);

  // Save cart to localStorage on change
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('nabrasa_cart', JSON.stringify(newCart));
  };

  // Add to Cart
  const handleAddToCart = (item: CartItem) => {
    // Check if item with same configuration already exists in cart
    const existingIndex = cart.findIndex(
      (c) =>
        c.skewer.id === item.skewer.id &&
        c.customNotes === item.customNotes &&
        c.grillingStyle === item.grillingStyle
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      saveCart(updated);
    } else {
      saveCart([...cart, item]);
    }
  };

  // Update Item Quantity in Cart
  const handleUpdateQuantity = (id: string, amount: number) => {
    const updated = cart
      .map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + amount;
          return { ...item, quantity: newQty };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    saveCart(updated);
  };

  // Remove Item from Cart
  const handleRemoveItem = (id: string) => {
    const updated = cart.filter((item) => item.id !== id);
    saveCart(updated);
  };

  // Clear Cart
  const handleClearCart = () => {
    saveCart([]);
  };

  // Calculate total items in cart
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.skewer.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white font-sans antialiased selection:bg-[#FF4500] selection:text-black">
      
      {/* Top Promotional Banner */}
      <AnimatePresence>
        {promoToast && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-[#D20A11] text-white text-xs py-2 px-4 flex items-center justify-between font-mono tracking-wide relative overflow-hidden"
          >
            <div className="flex items-center gap-2 mx-auto text-center font-bold">
              <Flame className="w-4 h-4 text-yellow-300 animate-bounce shrink-0" />
              <span>FRETE GRÁTIS PARA SANTO ANDRÉ EM COMPRAS ACIMA DE R$ 50! USE O NOSSO CARDÁPIO ONLINE.</span>
            </div>
            <button
              onClick={() => setPromoToast(false)}
              className="absolute right-4 hover:opacity-80 p-1 cursor-pointer"
            >
              <XIcon className="w-3.5 h-3.5 text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Header */}
      <header className="sticky top-0 bg-[#0F0F0F]/90 backdrop-blur-md z-40 border-b-4 border-[#FF4500] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          
          {/* Logo / Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <Logo size={64} className="transform group-hover:rotate-3 transition-transform duration-300" />
            <div className="hidden sm:block">
              <span className="font-display font-black text-2xl tracking-tighter text-[#FF4500] block uppercase italic leading-none">
                Na Brasa
              </span>
              <span className="text-[10px] text-white/80 font-mono tracking-[0.2em] font-bold uppercase block mt-1">
                Sabor Andreense
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-display font-black uppercase tracking-widest text-white/85">
            <a href="#menu-section" className="hover:text-[#FF4500] transition-colors">Cardápio</a>
            <a href="#drinks-section" className="hover:text-[#FF4500] transition-colors">Bebidas</a>
            <a href="#about-section" className="hover:text-[#FF4500] transition-colors">Nossa História</a>
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-3.5">
            {/* Neighborhood Indicator */}
            <div className="hidden lg:flex items-center gap-1.5 bg-white/10 text-[#FF4500] border border-white/10 py-1.5 px-3.5 rounded-full text-[11px] font-bold">
              <MapPin className="w-3.5 h-3.5" />
              <span>Santo André - SP</span>
            </div>

            {/* Simulated Online Ordering Trigger (Cart Icon) */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-[#FF4500] text-black hover:bg-white hover:text-black hover:scale-105 active:scale-95 py-2.5 px-5 rounded-2xl flex items-center gap-2 transition-all cursor-pointer shadow-md font-display font-black uppercase text-xs tracking-wider"
            >
              <ShoppingBag className="w-4 h-4 text-black group-hover:text-black shrink-0 animate-bounce" />
              <span className="hidden sm:inline">Meu Pedido</span>
              
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#D20A11] text-white text-[10px] font-black w-5.5 h-5.5 rounded-full flex items-center justify-center border-2 border-black shadow-md">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-16 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Hero Left: Title and pitch (Bento Grid Main Panel) */}
            <div className="lg:col-span-7 bg-[#1A1A1A] rounded-[32px] sm:rounded-[40px] border-2 border-white/10 p-8 sm:p-12 flex flex-col justify-between space-y-8 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-[#D20A11]/15 border border-[#D20A11]/30 text-[#FF4500] py-1.5 px-4 rounded-full text-xs font-bold tracking-wider uppercase">
                  <Flame className="w-3.5 h-3.5 text-[#FF4500] animate-pulse" />
                  <span>O Autêntico Espeto de Santo André</span>
                </div>

                <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white uppercase leading-[0.95]">
                  O VERDADEIRO <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4500] to-[#D20A11]">
                    SABOR ANDREENSE
                  </span> <br />
                  NA BRASA
                </h1>

                <p className="text-white/70 text-sm sm:text-base leading-relaxed font-sans">
                  De Santo André para o seu paladar, oferecemos os espetinhos gourmet mais suculentos do ABC paulista. Carnes 100% selecionadas, queijos especiais e cortes artesanais grelhados lentamente no calor forte da brasa.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3.5 pt-4">
                <a
                  href="#menu-section"
                  className="px-8 py-4 bg-[#FF4500] text-black font-display font-black text-xs tracking-wider uppercase rounded-2xl flex items-center justify-center gap-2 transition-all hover:bg-white hover:scale-[1.02] shadow-md"
                >
                  <Utensils className="w-4 h-4 text-black" />
                  Ver Nosso Cardápio
                </a>
                <a
                  href="#drinks-section"
                  className="px-8 py-4 bg-black text-white hover:bg-[#FF4500] hover:text-black font-display font-black text-xs tracking-wider uppercase rounded-2xl flex items-center justify-center gap-2 border border-white/10 transition-all hover:scale-[1.02]"
                >
                  <CupSoda className="w-4 h-4 text-[#FF4500]" />
                  Bebidas Geladas
                </a>
              </div>

              {/* Value Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                <div>
                  <span className="block font-display font-black text-2xl text-[#FF4500]">100%</span>
                  <span className="text-[10px] text-white/50 uppercase font-mono font-bold">Artesanal</span>
                </div>
                <div>
                  <span className="block font-display font-black text-2xl text-[#FF4500]">Brasa</span>
                  <span className="text-[10px] text-white/50 uppercase font-mono font-bold">Carvão Real</span>
                </div>
                <div>
                  <span className="block font-display font-black text-2xl text-[#FF4500]">10 Bairros</span>
                  <span className="text-[10px] text-white/50 uppercase font-mono font-bold">Com Entrega</span>
                </div>
              </div>
            </div>

            {/* Hero Right: Appending Generated Image (Bento Image Panel) */}
            <div className="lg:col-span-5 bg-[#1A1A1A] rounded-[32px] sm:rounded-[40px] border-2 border-white/10 p-4 flex flex-col justify-between relative overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.5)] min-h-[400px]">
              <div className="relative w-full h-full rounded-2xl overflow-hidden flex-1 group">
                <img
                  src={IMAGES.hero}
                  alt="Espetinhos Grelhados Na Brasa"
                  className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual heat waves overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Floating reviews badge */}
                <div className="absolute top-4 right-4 bg-[#0F0F0F]/90 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex items-center gap-2">
                  <div className="bg-[#FF4500] text-black p-1.5 rounded-lg">
                    <Star className="w-4 h-4 fill-black text-black" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-white">4.9 / 5 no ABC</span>
                    <span className="text-[9px] text-white/50 block font-mono uppercase">Mais de 2mil pedidos</span>
                  </div>
                </div>

                {/* Local highlight label */}
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#FF4500] font-bold">SABOR ANDREENSE</span>
                  <p className="font-display font-black text-lg uppercase leading-tight">Grelhado no calor do carvão</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Badges / Local Vibe */}
      <section className="bg-black text-white py-6 border-y border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-around gap-y-4 gap-x-8 text-xs font-mono uppercase tracking-widest font-bold text-white/80">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#FF4500]" />
            <span>Assados na Brasa de Carvão Real</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#FF4500]" />
            <span>Carnes 100% Bovinas</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#FF4500]" />
            <span>Cortes Nobres e Artesanais</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#FF4500]" />
            <span>Bebidas Trincando de Geladas</span>
          </div>
        </div>
      </section>

      {/* Main Interactive Menu (Cardápio) */}
      <section id="menu-section" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs text-[#FF4500] font-mono font-bold tracking-widest uppercase">
            Sabor incomparável do ABC paulista
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tight text-white">
            Nosso Cardápio Nobre
          </h2>
          <div className="w-20 h-1.5 bg-[#FF4500] mx-auto rounded-full" />
          <p className="text-white/60 text-xs sm:text-sm max-w-xl mx-auto pt-2">
            Escolha os seus espetinhos favoritos na brasa, adicione observações de preparo se desejar e envie seu pedido direto pelo WhatsApp.
          </p>
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6.5">
          {SKEWERS.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </section>

      {/* Drinks Section (Bebidas Geladas) */}
      <section id="drinks-section" className="pb-16 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs text-[#FF4500] font-mono font-bold tracking-widest uppercase">
            Para Acompanhar o Churrasco
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tight text-white">
            Bebidas Geladas
          </h2>
          <div className="w-20 h-1.5 bg-[#FF4500] mx-auto rounded-full" />
          <p className="text-white/60 text-xs sm:text-sm max-w-xl mx-auto pt-2">
            Complete o seu pedido com nossas bebidas selecionadas entregues bem geladas junto com seus espetos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6.5">
          {DRINKS.map((drink) => (
            <MenuItemCard
              key={drink.id}
              item={drink}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </section>



      {/* About Us (A Nossa História - Sabor Andreense) */}
      <section id="about-section" className="py-16 md:py-24 bg-[#1A1A1A] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story Left Column: Images */}
            <div className="lg:col-span-6 relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-3xl overflow-hidden aspect-square border border-white/10 shadow-md">
                    <img
                      src={IMAGES.picanha}
                      alt="Espeto de Picanha na Brasa"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="rounded-3xl overflow-hidden aspect-square border border-white/10 shadow-md transform rotate-[-2deg]">
                    <img
                      src={IMAGES.alcatra}
                      alt="Espeto de Alcatra na Brasa"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="rounded-3xl overflow-hidden aspect-[3/4] border border-white/10 shadow-lg relative">
                    <img
                      src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                      alt="Assando na Brasa"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-[#FF4500]/10 mix-blend-multiply" />
                  </div>
                </div>
              </div>

              {/* absolute badge */}
              <div className="absolute -bottom-6 -right-6 bg-[#0F0F0F] text-white p-5 rounded-3xl shadow-xl max-w-xs border-2 border-white/10 hidden sm:block">
                <p className="font-display font-black text-xs uppercase tracking-wider text-[#FF4500] mb-1.5 flex items-center gap-1.5">
                  <ChefHat className="w-4 h-4" />
                  Segredo do Assador
                </p>
                <p className="text-[11px] text-white/70 leading-relaxed font-sans">
                  "Nosso carvão de eucalipto premium é selecionado a dedo para que as brasas fiquem no ponto perfeito de calor sem gerar fuligem desnecessária."
                </p>
              </div>
            </div>

            {/* Story Right Column: Text */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs text-[#FF4500] font-mono font-bold tracking-widest uppercase block">
                Nossa Essência
              </span>
              <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tight text-white leading-none">
                A HISTÓRIA POR TRÁS DO SABOR ANDREENSE
              </h2>
              <div className="w-16 h-1.5 bg-[#FF4500] rounded-full" />
              
              <div className="space-y-4 text-white/70 text-xs sm:text-sm leading-relaxed font-sans">
                <p>
                  A <strong>Espetaria Na Brasa</strong> nasceu da paixão genuína pelo churrasco de rua tradicional, mas com uma proposta gourmet inovadora inspirada na cultuada Cabana Burger. Queríamos criar algo que unisse a descontração de um bom espetinho com a máxima qualidade gastronômica.
                </p>
                <p>
                  O nosso lema, <strong>Sabor Andreense</strong>, é uma homenagem direta às nossas raízes no ABC Paulista. Cada ingrediente que compõe nossos espetos é proveniente de produtores selecionados da região de Santo André, garantindo frescor incomparável desde os cortes nobres até a clássica linguiça de porco artesanal.
                </p>
                <p>
                  Não utilizamos churrasqueiras a gás ou elétricas. Aqui, o espetinho toca a grelha sobre brasas quentes de carvão de verdade, defumando lentamente e preservando a suculência original que você só encontra na nossa espetaria.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 flex items-center justify-center font-display font-black text-[#FF4500] text-lg shadow-sm">
                  SA
                </div>
                <div>
                  <span className="block font-display font-bold text-xs uppercase text-white tracking-wider">
                    Santo André, SP
                  </span>
                  <span className="text-[10px] text-white/40 font-mono uppercase block">
                    Fundado para alimentar o ABC Paulista
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F0F0F] text-white pt-16 pb-8 border-t-4 border-[#FF4500] font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Col 1: About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Logo size={48} />
              <div>
                <span className="font-display font-black text-sm tracking-widest uppercase text-white block">
                  Na Brasa
                </span>
                <span className="text-[8px] text-[#FF4500] font-mono tracking-widest font-bold block">
                  Sabor Andreense
                </span>
              </div>
            </div>
            <p className="text-white/60 text-xs leading-relaxed">
              Deliciosos espetinhos gourmet assados na brasa de carvão real. Praticidade de rua com a excelência que você merece no ABC paulista.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/nabr.asaespetaria26/"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#FF4500] transition-all cursor-pointer"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="tel:5511974032200"
                className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#FF4500] transition-all cursor-pointer"
              >
                <Smartphone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Horários */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-xs tracking-wider uppercase text-[#FF4500]">
              Horários de Grelha
            </h4>
            <div className="space-y-2 text-xs text-white/60 font-mono">
              <div className="flex justify-between">
                <span>Terça a Quinta:</span>
                <span className="text-white">18:00 - 23:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sexta e Sábado:</span>
                <span className="text-white font-bold">18:00 - 00:00</span>
              </div>
              <div className="flex justify-between">
                <span>Domingo:</span>
                <span className="text-white">12:00 - 22:00</span>
              </div>
              <div className="flex justify-between text-[#D20A11] font-semibold">
                <span>Segunda-feira:</span>
                <span>FECHADO</span>
              </div>
            </div>
          </div>

          {/* Col 3: Newsletter */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-xs tracking-wider uppercase text-[#FF4500]">
              Contato Rápido
            </h4>
            <p className="text-white/60 text-xs">
              Tem alguma dúvida sobre reservas, eventos ou deseja fazer um pedido corporativo em Santo André? Entre em contato agora!
            </p>
            <a
              href="https://wa.me/5511974032200"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full py-2.5 bg-[#FF4500] hover:bg-white text-black hover:text-black rounded-xl text-xs font-display font-black uppercase tracking-wider items-center justify-center gap-2 transition-all shadow-md"
            >
              <Smartphone className="w-4 h-4" />
              Chamar no WhatsApp
            </a>
          </div>

        </div>

        {/* Copy bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[10px] text-white/40 font-mono">
          <span>&copy; {new Date().getFullYear()} Espetaria Na Brasa - Sabor Andreense. Todos os direitos reservados.</span>
          <span className="mt-2 sm:mt-0">Desenvolvido com carinho em Santo André - ABC Paulista</span>
        </div>
      </footer>

      {/* Simulated Sticky Cart Bar on Bottom Right */}
      {cartItemCount > 0 && (
        <motion.div
          initial={{ scale: 0, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 z-30"
        >
          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-[#D20A11] text-white font-display font-black text-xs uppercase tracking-widest py-4 px-6 rounded-2xl flex items-center gap-3.5 shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/10"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-white" />
              <span className="absolute -top-2 -right-2 bg-[#FF4500] text-black text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center border border-[#D20A11]">
                {cartItemCount}
              </span>
            </div>
            <div className="text-left font-sans">
              <span className="block text-[8px] text-red-200 font-mono tracking-wider font-bold">VER CARRINHO</span>
              <span className="block font-mono font-bold text-xs">R$ {cartTotal.toFixed(2)}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#FF4500]" />
          </button>
        </motion.div>
      )}

      {/* Cart Drawer Component */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

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
