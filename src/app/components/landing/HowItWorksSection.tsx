'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Enter Your ZIP',
    description:
      'Type your 5-digit Texas ZIP code. We detect your delivery utility (TDU) automatically — no guessing.',
  },
  {
    number: '02',
    title: 'See Real Prices',
    description:
      'Plans shown with full TDU delivery charges included. Compare at your actual monthly kWh, not a fake average.',
  },
  {
    number: '03',
    title: 'Pick Your Plan',
    description:
      'Sort by cheapest, lowest risk, or shortest term. Click directly through to sign up with the provider.',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-obsidian-light py-28 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-jetbrains text-cyber-purple text-sm tracking-widest uppercase">
            Three steps
          </span>
          <h2 className="font-space font-black text-4xl md:text-5xl text-white mt-3">
            How It Works
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-10 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-px bg-gradient-to-r from-electric-blue via-cyber-purple to-electric-blue opacity-30" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.15 }}
            >
              {/* Number circle */}
              <div className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center mb-6"
                style={{
                  background: 'linear-gradient(135deg, #FA5D29, #FF8C42)',
                  boxShadow: '0 0 24px rgba(250, 93, 41, 0.35)',
                }}
              >
                <span className="font-space font-black text-2xl text-white">{step.number}</span>
              </div>

              <h3 className="font-space font-bold text-xl text-white mb-3">
                {step.title}
              </h3>
              <p className="font-jetbrains text-sm text-white/45 leading-relaxed max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
