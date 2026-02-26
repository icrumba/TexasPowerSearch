'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import ShaderCanvas from './ShaderCanvas';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#030305' }}>
      {/* WebGL shader background */}
      <ShaderCanvas className="absolute inset-0 w-full h-full" />

      {/* Gradient overlay — darkens edges for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/30 via-transparent to-obsidian/90 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian/40 via-transparent to-obsidian/40 pointer-events-none" />

      {/* Hero content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-20">

        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-blue/10 border border-electric-blue/30 font-jetbrains text-electric-blue text-sm">
            ⚡ Texas Deregulated Energy Market
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="font-space font-black text-6xl md:text-7xl lg:text-8xl text-white leading-[0.95] tracking-tight mt-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Stop Overpaying
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue via-cyber-purple to-electric-blue">
            for Texas
          </span>
          <br />
          Electricity
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="font-jetbrains text-white/55 text-lg md:text-xl mt-8 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Compare electricity plans by ZIP code with real TDU-inclusive pricing,
          risk scoring, and AI-powered Q&A.{' '}
          <span className="text-white/80">Built exclusively for Texas.</span>
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link
            href="/search"
            className="font-space font-bold text-lg text-white bg-electric-blue px-10 py-4 rounded-xl animate-glow-pulse hover:scale-105 transition-transform duration-200"
          >
            Compare Plans Free →
          </Link>
          <Link
            href="/chat"
            className="font-space font-semibold text-lg text-white/80 border border-white/20 px-10 py-4 rounded-xl hover:bg-white/5 hover:text-white transition-all duration-200"
          >
            Ask AI Advisor
          </Link>
        </motion.div>

        {/* Social proof */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          {['Oncor', 'CenterPoint', 'AEP Texas', 'TNMP'].map((tdu) => (
            <span key={tdu} className="font-jetbrains text-white/25 text-sm">
              {tdu}
            </span>
          ))}
          <span className="font-jetbrains text-white/15 text-xs">— all 4 Texas TDU regions covered</span>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.5 }, y: { repeat: Infinity, duration: 2, ease: 'easeInOut' } }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.div>
    </section>
  );
}
