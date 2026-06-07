import { Users, ShieldPlus, HeartPulse, Brain, Video, Leaf } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import SectionLabel from '@/components/ui/SectionLabel';
import RevealOnScroll from '@/components/animations/RevealOnScroll';
import type { LucideIcon } from 'lucide-react';

interface Service {
  icon: LucideIcon;
  name: string;
  description: string;
}

const services: Service[] = [
  {
    icon: Users,
    name: 'Family Medicine',
    description: 'Compassionate, continuous care for all ages — checkups to chronic conditions.',
  },
  {
    icon: ShieldPlus,
    name: 'Acute & Urgent Care',
    description: 'Same-day appointments for sudden illness, injuries, and unexpected health concerns.',
  },
  {
    icon: HeartPulse,
    name: 'Chronic Condition Management',
    description: 'Ongoing support for diabetes, hypertension, asthma, and long-term conditions.',
  },
  {
    icon: Brain,
    name: 'Mental Health',
    description: 'Holistic mental wellness support integrated with your overall health journey.',
  },
  {
    icon: Video,
    name: 'Telemedicine',
    description: 'See Dr. Asar virtually from anywhere — quality care, no commute required.',
  },
  {
    icon: Leaf,
    name: 'Lifestyle & Wellness',
    description: 'Preventive care, nutrition guidance, and wellness strategies for a healthier life.',
  },
];

export default function ServicesGrid() {
  return (
    <section id="services" className="bg-[#F5F0E8] py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-10 md:mb-16 gap-4">
          <RevealOnScroll direction="fade">
            <SectionLabel text="WHAT WE OFFER" />
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl text-[#0C4F6A] font-medium max-w-2xl">
              Comprehensive Care, All Under One Roof
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <p className="font-body text-base text-[#4A6572] max-w-xl leading-relaxed">
              From routine check-ups to virtual consultations — complete care for you and your family.
            </p>
          </RevealOnScroll>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <RevealOnScroll key={service.name} delay={i * 0.1} direction="up">
                <GlassCard className="p-8 h-full group cursor-default">
                  <div className="flex flex-col h-full">
                    <div className="w-20 h-20 rounded-full bg-[#0C4F6A] flex items-center justify-center flex-shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:ring-2 group-hover:ring-[#C9A84C] group-hover:ring-offset-2">
                      <Icon size={32} className="text-white" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-body font-semibold text-lg text-[#0C4F6A] mt-5">
                      {service.name}
                    </h3>
                    <p className="font-body text-sm text-[#4A6572] mt-2 leading-relaxed flex-1">
                      {service.description}
                    </p>
                    <p className="font-body text-sm font-semibold text-[#E07A5F] mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Learn more →
                    </p>
                  </div>
                </GlassCard>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
