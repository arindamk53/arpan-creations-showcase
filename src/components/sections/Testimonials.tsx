'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import SectionLabel from '@/components/ui/SectionLabel';
import RevealOnScroll from '@/components/animations/RevealOnScroll';

const testimonials = [
  {
    id: 0,
    quote: 'This clinic is so welcoming and doctors are very professional and caring. Highly recommend.',
    name: 'Diana Haider',
  },
  {
    id: 1,
    quote: 'Thank you for your treatment. I feel much healthy and relieved.',
    name: 'Saleena Shabbir',
  },
  {
    id: 2,
    quote: 'Excellent service. Treated like you are a family member. Full explanation of the condition and the various management options. Will definitely recommend.',
    name: 'Ali Asar',
  },
];

function StarRating() {
  return (
    <div className="flex gap-1" aria-label="5 out of 5 stars">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="#C9A84C" aria-hidden="true">
          <path d="M8 1l1.854 3.756L14 5.472l-3 2.923.708 4.13L8 10.5l-3.708 1.924L5 8.395 2 5.472l4.146-.716L8 1z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % testimonials.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length), []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, paused]);

  return (
    <section id="testimonials" className="bg-[#EDE7D9] py-12 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-10 md:mb-16 gap-4">
          <RevealOnScroll direction="fade">
            <SectionLabel text="PATIENT VOICES" />
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl text-[#0C4F6A] font-medium">
              Real People, Real Results
            </h2>
          </RevealOnScroll>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Desktop: show 3, mobile: show 1 */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <GlassCard className="p-8 md:p-10 h-full border-l-4 border-[#C9A84C]" tilt={false}>
                  <StarRating />
                  <blockquote className="font-display text-xl italic text-[#1C2B33] leading-relaxed mt-4">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <p className="font-body font-semibold text-[#0C4F6A] text-sm mt-6">— {t.name}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Mobile: single card carousel */}
          <div className="md:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -60, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <GlassCard className="p-8 border-l-4 border-[#C9A84C]" tilt={false}>
                  <StarRating />
                  <blockquote className="font-display text-xl italic text-[#1C2B33] leading-relaxed mt-4">
                    &ldquo;{testimonials[current].quote}&rdquo;
                  </blockquote>
                  <p className="font-body font-semibold text-[#0C4F6A] text-sm mt-6">
                    — {testimonials[current].name}
                  </p>
                </GlassCard>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6 mt-8">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-[#0C4F6A]/10 transition-colors duration-200"
              >
                <ChevronLeft size={18} className="text-[#0C4F6A]" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                      i === current ? 'bg-[#C9A84C]' : 'bg-[#4A6572]/30'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-[#0C4F6A]/10 transition-colors duration-200"
              >
                <ChevronRight size={18} className="text-[#0C4F6A]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
