import Image from 'next/image';
import { Award, Scale, Medal, GraduationCap } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import SectionLabel from '@/components/ui/SectionLabel';
import RevealOnScroll from '@/components/animations/RevealOnScroll';
import type { LucideIcon } from 'lucide-react';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const credentials: { icon: LucideIcon; iconColor: string; title: string; subtitle: string }[] = [
  { icon: Award,         iconColor: 'text-[#C9A84C]', title: 'Fellow, AAFP',     subtitle: 'American Academy of Family Physicians' },
  { icon: Scale,         iconColor: 'text-[#0C4F6A]', title: 'Expert Panelist',  subtitle: 'Texas Medical Board' },
  { icon: Medal,         iconColor: 'text-[#C9A84C]', title: 'Copper Medalist',  subtitle: 'Karachi Medical & Dental College' },
  { icon: GraduationCap, iconColor: 'text-[#0C4F6A]', title: 'Teaching Faculty', subtitle: 'UT Health Science Center, San Antonio' },
];

const languages = ['English', 'Medical Spanish', 'Urdu', 'Hindi', 'Sindhi', 'Kutchi'];

const bioParas = [
  'Dr. Batool Muhammad Sharif Asar, M.D., F.A.A.F.P., is a board-certified Family Medicine physician with over 15 years of diverse clinical, teaching, and community experience. A copper medalist and top graduate of Karachi Medical & Dental College, she completed her Family Medicine residency at UT Health Science Center in San Antonio, where she also served as a teaching resident.',
  'Dr. Asar is a Fellow of the American Academy of Family Physicians and an expert panelist for the Texas Medical Board. Her professional interests include primary care, preventive medicine, occupational health, and telemedicine. She has taught medical students and residents and has been active in multiple health education initiatives.',
  'Multilingual and culturally attuned, Dr. Asar speaks English, Medical Spanish, Urdu, Hindi, Sindhi, Kutchi, some Gujarati, and some Persian. She is known for her compassionate approach, patient-centered care, and dedication to holistic well-being.',
];

export default function DoctorBio() {
  return (
    <>
      {/* Bio Section */}
      <section className="bg-[#F5F0E8] py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[40fr_60fr] gap-8 lg:gap-16 items-start">
            {/* LEFT — Portrait + Info Cards */}
            <RevealOnScroll direction="left">
              <div className="flex flex-col gap-4">

                {/* Portrait + Overlapping Experience Badge */}
                <div className="relative rounded-3xl overflow-hidden shadow-[0_24px_80px_rgba(12,79,106,0.22)] border-2 border-[#C9A84C]/30">
                  <Image
                    src={`${basePath}/images/dr-asar-portrait.png`}
                    alt="Dr. Batool Asar, M.D., F.A.A.F.P. — Board-Certified Family Medicine Physician"
                    width={480}
                    height={640}
                    className="w-full h-auto object-cover"
                  />
                  {/* Overlapping Badge */}
                  <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
                    <div className="backdrop-blur-md bg-[#0C4F6A]/90 border border-white/20 rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(12,79,106,0.3)]">
                      <p className="font-display text-3xl sm:text-4xl font-bold text-white leading-none">
                        15<span className="text-[#C9A84C]">+</span>
                      </p>
                      <p className="font-body text-[10px] sm:text-xs text-white/80 mt-1 font-semibold uppercase tracking-wider">Years Experience</p>
                    </div>
                  </div>
                </div>

                {/* Languages list — neat, compact, and high contrast */}
                <div className="mt-2">
                  <p className="font-body font-semibold text-xs tracking-wider uppercase text-[#C9A84C] mb-2">
                    — Languages Spoken —
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {languages.map((lang) => (
                      <span
                        key={lang}
                        className="font-body text-xs sm:text-sm font-semibold text-[#0C4F6A] bg-white border border-[#0C4F6A]/15 rounded-full px-3 py-1 shadow-sm"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </RevealOnScroll>

            {/* RIGHT — Bio text */}
            <div className="flex flex-col gap-6">
              <RevealOnScroll direction="fade">
                <div>
                  <p className="font-display text-2xl italic text-[#0C4F6A] leading-relaxed">
                    &ldquo;Board-certified, bilingual, and deeply committed to whole-person care.&rdquo;
                  </p>
                  <div className="w-10 h-0.5 bg-[#C9A84C] mt-4" />
                </div>
              </RevealOnScroll>

              {bioParas.map((para, i) => (
                <RevealOnScroll key={i} delay={0.15 * (i + 1)}>
                  <p className="font-body text-[#4A6572] leading-relaxed text-base">{para}</p>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Strip */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {credentials.map((cred, i) => {
              const Icon = cred.icon;
              return (
                <RevealOnScroll key={cred.title} delay={i * 0.1}>
                  <GlassCard className="p-6 flex flex-col gap-4 h-full">
                    <Icon size={28} className={cred.iconColor} strokeWidth={1.5} />
                    <div>
                      <p className="font-body font-semibold text-[#1C2B33] text-base">{cred.title}</p>
                      <p className="font-body text-sm text-[#4A6572] mt-1">{cred.subtitle}</p>
                    </div>
                  </GlassCard>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
