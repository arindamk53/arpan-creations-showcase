import type { Metadata } from 'next';
import Link from 'next/link';
import TrustPill from '@/components/ui/TrustPill';
import DoctorBio from '@/components/sections/DoctorBio';
import SectionLabel from '@/components/ui/SectionLabel';
import RevealOnScroll from '@/components/animations/RevealOnScroll';
import ContactForm from '@/components/ui/ContactForm';
import PageHero from '@/components/layout/PageHero';

export const metadata: Metadata = {
  title: 'About Dr. Batool Asar — Board-Certified Family Medicine',
  description:
    'Meet Dr. Batool Asar, M.D., F.A.A.F.P. — board-certified, multilingual family medicine physician with 15+ years of experience serving Richmond, TX.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero title="Dr. Batool Asar, M.D.">
        <nav aria-label="Breadcrumb" className="mb-1 -mt-2">
          <ol className="flex items-center gap-2 font-body text-xs text-white/50">
            <li><Link href="/" className="hover:text-white/70 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-white/70">About</li>
          </ol>
        </nav>
        <div className="flex flex-wrap gap-2">
          {['M.D.', 'F.A.A.F.P.', 'Board-Certified', '15+ Years'].map((pill) => (
            <TrustPill key={pill} variant="white">{pill}</TrustPill>
          ))}
        </div>
      </PageHero>

      {/* Doctor Bio + Credentials */}
      <DoctorBio />

      {/* Contact Form */}
      <section className="bg-[#EDE7D9] py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <RevealOnScroll direction="fade">
                <SectionLabel text="GET IN TOUCH" />
              </RevealOnScroll>
              <RevealOnScroll delay={0.1}>
                <h2 className="font-display text-4xl md:text-5xl text-[#0C4F6A] font-medium mt-4 leading-tight">
                  Have Questions? We&apos;d Love to Hear From You.
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={0.2}>
                <p className="font-body text-[#4A6572] mt-4 leading-relaxed max-w-sm">
                  Fill out the form and we&apos;ll get back to you shortly.
                </p>
              </RevealOnScroll>
            </div>
            <RevealOnScroll delay={0.1} direction="right">
              <ContactForm />
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}
