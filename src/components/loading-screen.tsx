'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function LoadingScreen() {
  const [status, setStatus] = useState<'visible' | 'fading' | 'hidden'>('visible');
  const [animationKey, setAnimationKey] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    // Show the loader and reset animation key on every pathname change
    setStatus('visible');
    setAnimationKey((prev) => prev + 1);
    
    // The logo-draw animation takes 4s. 
    // We start the fade out exactly at the 4s mark.
    const fadeTimer = setTimeout(() => {
      setStatus('fading');
    }, 4000);

    // Completely remove from DOM after the 1s fade transition
    const hideTimer = setTimeout(() => {
      setStatus('hidden');
    }, 5000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [pathname]);

  if (status === 'hidden') return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-background transition-opacity duration-1000 pointer-events-none ${
        status === 'fading' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative" key={animationKey}>
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