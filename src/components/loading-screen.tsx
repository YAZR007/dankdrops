
'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function LoadingScreen() {
  const [status, setStatus] = useState<'visible' | 'fading' | 'hidden'>('visible');
  const [animationKey, setAnimationKey] = useState(0);
  const pathname = usePathname();
  const lastPathname = useRef(pathname);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Trigger animation on initial mount OR when pathname actually changed
    // Only for header buttons or main landing
    const isNewPath = lastPathname.current !== pathname;
    const isProductPage = pathname.startsWith('/products/');

    if (isInitialMount.current || (isNewPath && !isProductPage)) {
      setStatus('visible');
      setAnimationKey((prev) => prev + 1);
      lastPathname.current = pathname;
      isInitialMount.current = false;

      // The drawing animation takes 3s (defined in globals.css)
      const fadeTimer = setTimeout(() => {
        setStatus('fading');
      }, 3000);

      // Hide completely after fade transition
      const hideTimer = setTimeout(() => {
        setStatus('hidden');
      }, 3700);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    } else if (isNewPath && isProductPage) {
      lastPathname.current = pathname;
      setStatus('hidden');
    }
  }, [pathname]);

  if (status === 'hidden') return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-background transition-opacity duration-700 pointer-events-none ${
        status === 'fading' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative w-full flex justify-center px-6" key={animationKey}>
        <svg viewBox="0 0 800 200" className="w-full max-w-4xl h-auto overflow-visible">
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-headline font-black uppercase tracking-[-0.05em] text-6xl md:text-9xl stroke-primary stroke-[1.5px] fill-transparent animate-logo-draw"
          >
            DANKDROPS
          </text>
        </svg>
      </div>
    </div>
  );
}
