'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass-strong' : 'glass'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-texas-gold text-xl group-hover:text-glow-gold transition-all duration-300">★</span>
          <span className="font-space font-bold text-lg text-white tracking-tight">
            Texas Power<span className="text-electric-blue"> Search</span>
          </span>
        </Link>

        {/* CTAs */}
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="font-jetbrains text-sm text-white/60 hover:text-white px-4 py-2 transition-colors duration-200"
          >
            Login
          </Link>
          <Link
            href="/search"
            className="font-space font-semibold text-sm bg-electric-blue text-white px-5 py-2 rounded-lg hover:bg-electric-blue/80 transition-colors duration-200"
          >
            Compare Plans
          </Link>
        </div>
      </nav>
    </header>
  );
}
