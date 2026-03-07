'use client';

import { useState, useEffect } from 'react';

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // We wait for the drawing animation (3.5s) plus a small fade-out window
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4200);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background animate-out fade-out duration-1000 fill-mode-forwards pointer-events-none">
      <div className="relative">
        <svg viewBox="0 0 500 100" className="w-[85vw] max-w-3xl h-auto overflow-visible">
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-headline font-black uppercase tracking-[-0.08em] text-7xl stroke-primary stroke-[1.5px] fill-transparent animate-logo-draw"
          >
            DANKDROPS
          </text>
        </svg>
      </div>
    </div>
  );
}