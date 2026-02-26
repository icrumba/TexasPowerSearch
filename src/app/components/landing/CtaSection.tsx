'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CtaSection() {
  return (
    <section className="bg-obsidian-light py-28 px-6 relative overflow-hidden">
      {/* Subtle radial glow behind the text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(250, 93, 41, 0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-space font-black text-5xl md:text-6xl text-white leading-tight mb-6">
            Ready to stop
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyber-purple">
              overpaying?
            </span>
          </h2>

          <p className="font-jetbrains text-white/45 text-lg mb-10 leading-relaxed">
            Enter your ZIP code and see what you&apos;re actually paying — compared to the
            best plans available right now.
          </p>

          <Link
            href="/search"
            className="inline-block font-space font-black text-xl text-white px-14 py-5 rounded-xl animate-glow-pulse hover:scale-105 transition-transform duration-200"
            style={{
              background: 'linear-gradient(135deg, #FA5D29, #FF8C42)',
            }}
          >
            Compare Plans Free →
          </Link>

          <p className="font-jetbrains text-white/20 text-sm mt-6">
            No sign-up required. No credit card.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
