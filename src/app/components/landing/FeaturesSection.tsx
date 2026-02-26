'use client';

import { motion } from 'framer-motion';
import { useRef, MouseEvent } from 'react';

const features = [
  {
    id: 'tdu',
    icon: '⚡',
    title: 'TDU-Aware Pricing',
    description:
      'We include your delivery utility charges — Oncor, CenterPoint, AEP, TNMP. Other sites show energy-only rates. We show what you actually pay.',
    accent: 'electric-blue' as const,
    span: 'md:col-span-2',
    accentColor: '#FA5D29',
  },
  {
    id: 'risk',
    icon: '🛡',
    title: 'Lowest Risk Sort',
    description:
      'Sort plans by safety, not just price. Avoid variable rates and early termination fees automatically.',
    accent: 'cyber-purple' as const,
    span: '',
    accentColor: '#FF8C42',
  },
  {
    id: 'usage',
    icon: '📊',
    title: 'Your Actual Usage',
    description:
      'Compare at 500, 1000, 2000 kWh — or enter your exact bill usage. Plan costs shift dramatically with usage.',
    accent: 'texas-gold' as const,
    span: '',
    accentColor: '#FF8C42',
  },
  {
    id: 'ai',
    icon: '🤖',
    title: 'AI Power Advisor',
    description:
      'Real-time Q&A about Texas electricity powered by OpenAI with web search. Ask about rates, providers, switching, or billing.',
    accent: 'electric-blue' as const,
    span: 'md:col-span-2',
    accentColor: '#FA5D29',
  },
  {
    id: 'texas',
    icon: '★',
    title: 'Texas Exclusive',
    description:
      'Built only for the Texas deregulated market. No noise from other states — just the plans available to you.',
    accent: 'texas-gold' as const,
    span: '',
    accentColor: '#FF8C42',
  },
  {
    id: 'filters',
    icon: '🔍',
    title: 'High-Intent Filters',
    description:
      'No deposit · Prepaid · Same-day service · Green energy. Filter instantly to plans that match your situation.',
    accent: 'cyber-purple' as const,
    span: '',
    accentColor: '#FF8C42',
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = ((e.clientY - cy) / (rect.height / 2)) * -6;
    const ry = ((e.clientX - cx) / (rect.width / 2)) * 6;
    card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    }
  };

  return (
    <motion.div
      className={`${feature.span}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="h-full bg-obsidian-light border border-white/8 rounded-2xl p-7 transition-transform duration-200 cursor-default group"
        style={{
          boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 4px 24px rgba(0,0,0,0.4)`,
        }}
      >
        {/* Icon */}
        <div
          className="text-3xl mb-4 w-12 h-12 flex items-center justify-center rounded-xl"
          style={{ backgroundColor: `${feature.accentColor}18` }}
        >
          {feature.icon}
        </div>

        {/* Title */}
        <h3
          className="font-space font-bold text-xl text-white mb-3 group-hover:transition-colors duration-200"
          style={{ color: 'white' }}
        >
          {feature.title}
        </h3>

        {/* Description */}
        <p className="font-jetbrains text-sm text-white/50 leading-relaxed">
          {feature.description}
        </p>

        {/* Accent line */}
        <div
          className="mt-5 h-px w-12 rounded-full transition-all duration-300 group-hover:w-24"
          style={{ backgroundColor: feature.accentColor }}
        />
      </div>
    </motion.div>
  );
}

export default function FeaturesSection() {
  return (
    <section className="bg-obsidian py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-jetbrains text-electric-blue text-sm tracking-widest uppercase">
            Why Texas Power Search
          </span>
          <h2 className="font-space font-black text-4xl md:text-5xl text-white mt-3 leading-tight">
            Pricing other sites{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyber-purple">
              get wrong
            </span>
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
