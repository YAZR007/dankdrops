'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * LoadingScreen component that displays a high-impact logo animation.
 * Features an accelerated draw-to-fill sequence before revealing the page.
 * Version: Shortened by 1.5s for a snappier boutique experience.
 */
export function LoadingScreen() {
  const [status, setStatus] = useState<'visible' | 'fading' | 'hidden'>('visible');
  const [animationKey, setAnimationKey] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const lastPathname = useRef(pathname);
  const isInitialMount = useRef(true);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const isNewPath = lastPathname.current !== pathname;
    const isProductPage = pathname.startsWith('/products/');
    
    // Only show the loading screen on initial mount or when navigating to main sections
    const shouldAnimate = isInitialMount.current || (isNewPath && !isProductPage);

    if (shouldAnimate) {
      setStatus('visible');
      
      if (!isInitialMount.current) {
        setAnimationKey((prev) => prev + 1);
      }

      // Accelerated sequence: 2.5s fade, 3.5s hide.
      const fadeTimer = setTimeout(() => {
        setStatus('fading');
      }, 2500);

      const hideTimer = setTimeout(() => {
        setStatus('hidden');
      }, 3500);

      lastPathname.current = pathname;
      isInitialMount.current = false;

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    } else {
      setStatus('hidden');
    }
  }, [pathname, isMounted]);

  if (!isMounted || status === 'hidden') return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-background transition-opacity duration-700 pointer-events-none ${
        status === 'fading' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative w-full flex justify-center px-6" key={animationKey}>
        <svg viewBox="0 0 1000 300" className="w-full max-w-[95vw] md:max-w-3xl h-auto overflow-visible">
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-headline font-black uppercase tracking-[-0.05em] text-[80px] md:text-[90px] stroke-primary stroke-[2px] md:stroke-[3px] fill-transparent"
          >
            <tspan className="animate-logo-draw-hollow">DANK</tspan>
            <tspan className="animate-logo-draw">DROPS</tspan>
          </text>
        </svg>
      </div>
    </div>
  );
}
