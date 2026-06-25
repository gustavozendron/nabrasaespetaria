import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = '', size = 120 }: LogoProps) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-lg"
      >
        {/* Outer vintage wood/rusty circle border */}
        <circle cx="250" cy="250" r="230" stroke="#3e2312" strokeWidth="14" fill="#faf6ee" />
        <circle cx="250" cy="250" r="215" stroke="#3e2312" strokeWidth="3" strokeDasharray="8 8" />

        {/* Curved Path for "ESPETARIA" */}
        <path
          id="textPathTop"
          d="M 75 250 A 175 175 0 0 1 425 250"
          fill="none"
        />
        {/* Curved Path for "SABOR ANDREENSE" */}
        <path
          id="textPathBottom"
          d="M 425 250 A 175 175 0 0 1 75 250"
          fill="none"
        />

        {/* Curved Texts */}
        <text className="font-display font-extrabold fill-[#3e2312] uppercase tracking-[0.18em]" style={{ fontSize: '30px' }}>
          <textPath href="#textPathTop" startOffset="50%" textAnchor="middle">
            Espetaria
          </textPath>
        </text>

        <text className="font-display font-bold fill-[#3e2312] uppercase tracking-[0.1em]" style={{ fontSize: '20px' }}>
          <textPath href="#textPathBottom" startOffset="50%" textAnchor="middle">
            • Sabor Andreense •
          </textPath>
        </text>

        {/* Grill Backdrop / Hot Coals */}
        <circle cx="250" cy="255" r="115" fill="#1e1e1e" />
        {/* Glowing Orange Heat Radiance */}
        <circle cx="250" cy="255" r="100" fill="url(#fireGlow)" opacity="0.85" />

        {/* Hot Charcoal Embers */}
        <g opacity="0.9">
          <rect x="200" y="290" width="30" height="20" rx="4" fill="#3e1204" />
          <rect x="235" y="295" width="25" height="15" rx="3" fill="#ef4444" className="animate-pulse" />
          <rect x="270" y="285" width="35" height="25" rx="5" fill="#3e1204" />
          <rect x="180" y="300" width="20" height="15" rx="3" fill="#f97316" className="animate-pulse" />
          <rect x="300" y="300" width="22" height="12" rx="2" fill="#ef4444" />
        </g>

        {/* Grill Grate Lines */}
        <g stroke="#2d1a10" strokeWidth="4">
          <line x1="150" y1="210" x2="350" y2="210" />
          <line x1="140" y1="225" x2="360" y2="225" />
          <line x1="135" y1="240" x2="365" y2="240" />
          <line x1="135" y1="255" x2="365" y2="255" />
          <line x1="140" y1="270" x2="360" y2="270" />
          <line x1="150" y1="285" x2="350" y2="285" />
          <line x1="170" y1="300" x2="330" y2="300" />
        </g>

        {/* Rising Smoke and Flames */}
        <path d="M190,260 Q200,230 195,200 Q215,220 220,250" fill="url(#flameGrad1)" opacity="0.9" />
        <path d="M225,260 Q240,210 250,180 Q265,220 260,260" fill="url(#flameGrad2)" opacity="0.95" />
        <path d="M275,265 Q290,230 280,205 Q300,225 295,260" fill="url(#flameGrad1)" opacity="0.85" />
        <path d="M240,265 Q250,240 248,220 Q260,235 255,265" fill="#facc15" opacity="0.9" />

        {/* Skewer Metal Pin */}
        <line x1="90" y1="230" x2="410" y2="230" stroke="#cccccc" strokeWidth="6" strokeLinecap="round" />
        <path d="M80,230 L95,220 L95,240 Z" fill="#999999" /> {/* Skewer tip */}
        <rect x="405" y="222" width="20" height="16" rx="4" fill="#3e2312" /> {/* Skewer handle */}
        
        {/* Skewer Food Pieces */}
        <g>
          {/* Piece 1: Beef */}
          <rect x="135" y="205" width="40" height="50" rx="8" fill="url(#meatGrad)" stroke="#30150a" strokeWidth="2" />
          <line x1="145" y1="210" x2="165" y2="250" stroke="#f97316" strokeWidth="3" opacity="0.6" /> {/* Grill mark */}
          <line x1="155" y1="210" x2="175" y2="250" stroke="#f97316" strokeWidth="3" opacity="0.6" /> {/* Grill mark */}

          {/* Piece 2: Onion (Yellow/White) */}
          <path d="M185,210 C195,210 195,250 185,250 C180,250 180,210 185,210 Z" fill="#fbfbf0" stroke="#a3a380" strokeWidth="2" />

          {/* Piece 3: Green Bell Pepper */}
          <rect x="200" y="212" width="22" height="36" rx="6" fill="#15803d" stroke="#166534" strokeWidth="2" />

          {/* Piece 4: Beef */}
          <rect x="230" y="205" width="45" height="50" rx="8" fill="url(#meatGrad)" stroke="#30150a" strokeWidth="2" />
          <line x1="240" y1="210" x2="260" y2="250" stroke="#f97316" strokeWidth="3" opacity="0.6" />
          <line x1="250" y1="210" x2="270" y2="250" stroke="#f97316" strokeWidth="3" opacity="0.6" />

          {/* Piece 5: Red Bell Pepper */}
          <rect x="285" y="212" width="22" height="36" rx="6" fill="#dc2626" stroke="#991b1b" strokeWidth="2" />

          {/* Piece 6: Onion */}
          <path d="M315,210 C325,210 325,250 315,250 C310,250 310,210 315,210 Z" fill="#fbfbf0" stroke="#a3a380" strokeWidth="2" />

          {/* Piece 7: Beef */}
          <rect x="330" y="207" width="38" height="46" rx="8" fill="url(#meatGrad)" stroke="#30150a" strokeWidth="2" />
        </g>

        {/* Banner Behind "NA BRASA" */}
        <path
          d="M 60 375 L 120 345 L 380 345 L 440 375 L 250 395 Z"
          fill="#3e2312"
          stroke="#271409"
          strokeWidth="4"
        />

        {/* Text: NA BRASA */}
        <text
          x="250"
          y="382"
          textAnchor="middle"
          className="font-display font-black tracking-wider uppercase"
          style={{
            fontSize: '52px',
            fill: '#f97316',
            stroke: '#ffedd5',
            strokeWidth: '2px',
            filter: 'drop-shadow(3px 3px 0px #000000)',
          }}
        >
          NA BRASA
        </text>

        {/* Gradients */}
        <defs>
          <radialGradient id="fireGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="60%" stopColor="#ef4444" opacity="0.8" />
            <stop offset="100%" stopColor="#1e1e1e" opacity="0" />
          </radialGradient>
          <linearGradient id="flameGrad1" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#f97316" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#facc15" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="flameGrad2" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#ea580c" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#f97316" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="meatGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7a2d12" />
            <stop offset="50%" stopColor="#451a03" />
            <stop offset="100%" stopColor="#311102" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
