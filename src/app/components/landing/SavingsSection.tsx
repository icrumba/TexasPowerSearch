'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SavingsSection() {
  return (
    <section className="bg-obsidian py-28 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-jetbrains text-electric-blue text-sm tracking-widest uppercase">
            The hidden truth
          </span>
          <h2 className="font-space font-black text-4xl md:text-5xl text-white mt-3 leading-tight">
            What comparison sites{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyber-purple">
              don&apos;t tell you
            </span>
          </h2>
          <p className="font-jetbrains text-white/45 text-base mt-5 max-w-xl mx-auto leading-relaxed">
            Every Texas electricity plan has two cost components. Most comparison sites only show you one.
          </p>
        </motion.div>

        {/* Side-by-side comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* What other sites show */}
          <motion.div
            className="rounded-2xl border border-white/8 p-8 bg-obsidian-light"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-red-500/15 flex items-center justify-center text-red-400 text-sm">✗</div>
              <p className="font-space font-semibold text-white/50 text-sm uppercase tracking-wide">What other sites show</p>
            </div>

            <p className="font-jetbrains text-white/35 text-sm mb-5">At 1,000 kWh/month:</p>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-jetbrains text-white/50 text-sm">Energy rate (10¢/kWh)</span>
                <span className="font-space font-bold text-white text-lg">$100</span>
              </div>
              <div className="border-t border-white/8 pt-3 flex justify-between items-center">
                <span className="font-space font-bold text-white/60">Shown total</span>
                <span className="font-space font-bold text-2xl text-white">$100<span className="text-white/30 text-sm">/mo</span></span>
              </div>
            </div>
          </motion.div>

          {/* What you actually pay */}
          <motion.div
            className="rounded-2xl p-px"
            style={{ background: 'linear-gradient(135deg, #FA5D29, #FF8C42)' }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            <div className="rounded-2xl bg-obsidian-light p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-electric-blue/15 flex items-center justify-center text-electric-blue text-sm">★</div>
                <p className="font-space font-semibold text-white text-sm uppercase tracking-wide">What you actually pay</p>
              </div>

              <p className="font-jetbrains text-white/35 text-sm mb-5">At 1,000 kWh/month (Oncor):</p>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-jetbrains text-white/50 text-sm">Energy rate (10¢/kWh)</span>
                  <span className="font-space font-bold text-white text-lg">$100</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-jetbrains text-white/50 text-sm">Oncor delivery (5.1¢/kWh + $4.23)</span>
                  <span className="font-space font-bold text-electric-blue text-lg">+$55</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between items-center">
                  <span className="font-space font-bold text-white">Real total</span>
                  <span className="font-space font-black text-3xl text-electric-blue">$155<span className="text-white/30 text-sm font-normal">/mo</span></span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Call to action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="font-jetbrains text-white/40 text-sm mb-6">
            TDU rates vary by region. We calculate the right number for your ZIP code automatically.
          </p>
          <Link
            href="/search"
            className="inline-block font-space font-bold text-white bg-electric-blue px-8 py-3.5 rounded-xl hover:bg-electric-blue/80 hover:scale-105 transition-all duration-200"
          >
            See My Real Plan Costs →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
