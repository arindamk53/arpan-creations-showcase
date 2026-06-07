'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import Image from 'next/image';
import KineticText from '@/components/animations/KineticText';
import RevealOnScroll from '@/components/animations/RevealOnScroll';
import Button from '@/components/ui/Button';
import TrustPill from '@/components/ui/TrustPill';
import { ChevronDown } from 'lucide-react';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const particles = [
  { size: 8,  top: '15%', left: '8%',  delay: '0s',   dur: '7s'  },
  { size: 14, top: '72%', left: '12%', delay: '1.2s', dur: '9s'  },
  { size: 6,  top: '30%', left: '80%', delay: '2.1s', dur: '6s'  },
  { size: 10, top: '60%', left: '85%', delay: '0.5s', dur: '8s'  },
  { size: 8,  top: '45%', left: '4%',  delay: '3.0s', dur: '7.5s'},
  { size: 6,  top: '20%', left: '55%', delay: '1.8s', dur: '6.5s'},
  { size: 12, top: '80%', left: '60%', delay: '0.9s', dur: '9.5s'},
  { size: 7,  top: '10%', left: '40%', delay: '2.5s', dur: '8s'  },
];

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const illustrationY = useTransform(scrollYProgress, [0, 0.5], ['0%', '-15%']);
  const chevronOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{
        background: 'linear-gradient(-45deg, #0C4F6A, #0E6688, #083848, #1A7A9A)',
        backgroundSize: '400% 400%',
        animation: 'gradient-shift 12s ease infinite',
      }}
    >
      {/* Floating particles */}
      {particles.map((p, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute rounded-full bg-white/15"
          style={{
            width: p.size,
            height: p.size,
            top: p.top,
            left: p.left,
            animation: `float-drift ${p.dur} ease-in-out infinite`,
            animationDelay: p.delay,
          }}
        />
      ))}

      {/* Main content */}
      <div className="flex-1 max-w-7xl mx-auto px-6 w-full flex items-center pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-12 lg:gap-20 items-center w-full">

          {/* LEFT — glass panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl p-8 md:p-10 flex flex-col gap-6"
            style={{
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 8px 48px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.15)',
            }}
          >
            {/* inner shimmer line at top */}
            <div
              aria-hidden="true"
              className="absolute top-0 left-8 right-8 h-px rounded-full"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)' }}
            />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-body font-semibold text-xs tracking-widest uppercase text-white/60">
                — RICHMOND, TX FAMILY MEDICINE —
              </span>
            </motion.div>

            <KineticText
              text="Comprehensive Healthcare, Made Effortless."
              delay={0.2}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight"
            />

            <RevealOnScroll delay={0.8} direction="up">
              <p className="font-body text-lg text-white/80 max-w-lg leading-relaxed">
                Welcome to 786 Health Centers — where your well-being is our top priority.
                Dr. Asar and her team are here to make caring for yourself easy, accessible, and personal.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={1.0} direction="up">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/book" variant="primary" size="md">
                  Book an Appointment
                </Button>
                <Button href="/contact" variant="secondary-white" size="md">
                  Contact Us
                </Button>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={1.2} direction="up">
              <div className="flex flex-wrap gap-2">
                {['Board-Certified', 'FAAFP Fellow', '15+ Years', 'Telemedicine Available'].map((pill) => (
                  <TrustPill key={pill} variant="white">{pill}</TrustPill>
                ))}
              </div>
            </RevealOnScroll>
          </motion.div>

          {/* RIGHT — illustration with glass glow ring */}
          <motion.div
            style={{ y: illustrationY }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg animate-float">
              {/* glass glow ring behind illustration */}
              <div
                aria-hidden="true"
                className="absolute inset-[-12px] rounded-[40px]"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.09)',
                }}
              />
              <Image
                src={`${basePath}/images/hero-illustration.png`}
                alt="786 Health Centers premium healthcare illustration"
                width={560}
                height={420}
                priority
                className="relative w-full h-auto drop-shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: chevronOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        aria-hidden="true"
      >
        <span className="font-body text-xs text-white/40 tracking-widest uppercase">Scroll</span>
        <ChevronDown className="text-white/50 animate-bounce-chevron" size={20} />
      </motion.div>

      {/* Marquee strip — glass top border */}
      <div
        className="py-4 overflow-hidden flex-shrink-0"
        style={{
          background: 'rgba(8,56,72,0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="flex whitespace-nowrap">
          <div className="animate-marquee flex gap-0 hover:[animation-play-state:paused]">
            {[1, 2].map((n) => (
              <span key={n} className="font-body text-sm italic text-white/60 px-0">
                Welcome to Your Health Journey&nbsp;&nbsp;•&nbsp;&nbsp;Here to Make You Smile :)&nbsp;&nbsp;•&nbsp;&nbsp;Richmond&apos;s Trusted Family Care&nbsp;&nbsp;•&nbsp;&nbsp;Telemedicine Available&nbsp;&nbsp;•&nbsp;&nbsp;Book Today&nbsp;&nbsp;•&nbsp;&nbsp;
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
