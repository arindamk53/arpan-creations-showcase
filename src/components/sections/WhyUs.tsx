'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import SectionLabel from '@/components/ui/SectionLabel';
import CountUp from '@/components/animations/CountUp';
import RevealOnScroll from '@/components/animations/RevealOnScroll';

const accordionItems = [
  {
    title: 'Accessible Healthcare, Made Simple',
    body: 'We offer flexible in-person and telemedicine appointments to fit your schedule — no unnecessary wait times, no complicated processes.',
  },
  {
    title: 'Affordable & Transparent Care',
    body: 'Our pricing is clear upfront: In-Person $200 · Telemedicine $150. No hidden fees, no surprises — ever.',
  },
  {
    title: 'Comprehensive Services',
    body: "From acute care to mental health and lifestyle wellness — all under the care of Dr. Asar's experienced, compassionate team.",
  },
];

function AccordionItem({ title, body }: { title: string; body: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/15 py-6">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex justify-between items-center w-full cursor-pointer text-left gap-4 group"
      >
        <span className="font-body font-semibold text-white text-lg">{title}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex-shrink-0 text-white/70 group-hover:text-white transition-colors"
        >
          <Plus size={20} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="font-body text-sm text-white/70 leading-relaxed pt-4 pr-8">
              {body}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function WhyUs() {
  return (
    <section id="why-us" className="bg-[#0C4F6A] py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* LEFT */}
          <div>
            <RevealOnScroll direction="fade">
              <SectionLabel text="WHY CHOOSE US" variant="white" />
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h2 className="font-display text-4xl md:text-5xl text-white font-medium mt-4 leading-tight">
                Healthcare the Way It Should Be
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <p className="font-body text-white/70 max-w-sm mt-4 leading-relaxed">
                Experienced, bilingual, and deeply committed to your whole-person well-being — Dr. Asar brings over 15 years of dedication to every patient.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 mt-6 md:mt-10">
                {[
                  { target: 15, suffix: '+', label: 'Years of Experience' },
                  { target: 6,  suffix: '+', label: 'Languages Spoken'    },
                  { target: 2,  suffix: '',  label: 'Appointment Options' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex-1 rounded-2xl px-6 py-5"
                    style={{
                      background: 'rgba(255,255,255,0.07)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255,255,255,0.14)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12)',
                    }}
                  >
                    {/* Number in white, suffix in gold */}
                    <p className="font-display text-5xl font-bold leading-none text-white">
                      <CountUp target={stat.target} suffix="" />
                      <span className="text-[#C9A84C]">{stat.suffix}</span>
                    </p>
                    {/* Label in soft white */}
                    <p className="font-body text-sm mt-2" style={{ color: 'rgba(255,255,255,0.65)' }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>

          {/* RIGHT — Accordion in glass panel */}
          <RevealOnScroll delay={0.15} direction="right">
            <div
              className="rounded-3xl px-8 py-2"
              style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 4px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
            >
              {accordionItems.map((item) => (
                <AccordionItem key={item.title} title={item.title} body={item.body} />
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
