'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function LoadingScreen() {
  const [status, setStatus] = useState<'visible' | 'fading' | 'hidden'>('visible');
  const [animationKey, setAnimationKey] = useState(1);
  const pathname = usePathname();
  const lastPathname = useRef(pathname);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const isNewPath = lastPathname.current !== pathname;
    const isProductPage = pathname.startsWith('/products/');
    const shouldAnimate = isInitialMount.current || (isNewPath && !isProductPage);

    if (shouldAnimate) {
      setStatus('visible');
      
      if (!isInitialMount.current) {
        setAnimationKey((prev) => prev + 1);
      }

      const fadeTimer = setTimeout(() => {
        setStatus('fading');
      }, 3000);

      const hideTimer = setTimeout(() => {
        setStatus('hidden');
      }, 3700);

      lastPathname.current = pathname;
      isInitialMount.current = false;

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
        <svg viewBox="0 0 1000 300" className="w-full max-w-[95vw] md:max-w-5xl h-auto overflow-visible">
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-headline font-black uppercase tracking-[-0.05em] text-[10rem] sm:text-[14rem] md:text-[15rem] lg:text-[18rem] stroke-primary stroke-[2px] md:stroke-[3px] fill-transparent animate-logo-draw"
          >
            DANKDROPS
          </text>
        </svg>
      </div>
    </div>
  );
}
