import type { Metadata } from 'next';
import { MapPin, Phone, Mail } from 'lucide-react';
import SectionLabel from '@/components/ui/SectionLabel';
import RevealOnScroll from '@/components/animations/RevealOnScroll';
import ContactForm from '@/components/ui/ContactForm';
import PageHero from '@/components/layout/PageHero';

export const metadata: Metadata = {
  title: 'Contact Us — 786 Health Centers',
  description:
    'Get in touch with 786 Health Centers in Richmond, TX. Call (346) 244-2106, email us, or fill out our contact form.',
};

const contactInfo = [
  {
    icon: MapPin,
    label: 'Our Location',
    value: '10401 Mason Rd C-302, Richmond, TX 77406',
    link: 'https://maps.google.com/?q=10401+Mason+Rd+C-302+Richmond+TX+77406',
    linkText: 'Get Directions →',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '(346) 244-2106',
    link: 'tel:+13462442106',
    linkText: 'Call Us →',
  },
  {
    icon: Mail,
    label: 'Email',
    value: '786drasar@gmail.com',
    link: 'mailto:786drasar@gmail.com',
    linkText: 'Send Email →',
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Reach out — we'd love to hear from you."
      />

      {/* Contact section */}
      <section className="bg-[#F5F0E8] py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* LEFT — Contact info */}
            <div>
              <RevealOnScroll direction="fade">
                <SectionLabel text="REACH US" />
              </RevealOnScroll>
              <RevealOnScroll delay={0.1}>
                <h2 className="font-display text-4xl md:text-5xl text-[#0C4F6A] font-medium mt-4 leading-tight">
                  Let&apos;s Connect
                </h2>
              </RevealOnScroll>

              <div className="flex flex-col gap-8 mt-10">
                {contactInfo.map(({ icon: Icon, label, value, link, linkText }, i) => (
                  <RevealOnScroll key={label} delay={0.1 + i * 0.1}>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#0C4F6A]/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon size={18} className="text-[#0C4F6A]" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="font-body font-semibold text-[#1C2B33] text-sm">{label}</p>
                        <p className="font-body text-[#4A6572] text-sm mt-0.5">{value}</p>
                        <a
                          href={link}
                          className="font-body text-sm font-semibold text-[#C9A84C] hover:underline mt-1 inline-block"
                          target={link.startsWith('http') ? '_blank' : undefined}
                          rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {linkText}
                        </a>
                      </div>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>

              <RevealOnScroll delay={0.4}>
                <p className="font-body text-sm text-[#4A6572] italic mt-10 max-w-sm">
                  Dr. Asar sees patients by appointment. Book online for the fastest response.
                </p>
              </RevealOnScroll>
            </div>

            {/* RIGHT — Form */}
            <RevealOnScroll delay={0.15} direction="right">
              <ContactForm />
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}
