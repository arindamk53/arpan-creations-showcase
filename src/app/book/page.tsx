import type { Metadata } from 'next';
import { Shield, CalendarCheck, Phone } from 'lucide-react';
import BookingPanel from '@/components/sections/BookingPanel';
import PageHero from '@/components/layout/PageHero';

export const metadata: Metadata = {
  title: 'Book an Appointment — 786 Health Centers',
  description:
    'Schedule an in-person or telemedicine appointment with Dr. Batool Asar at 786 Health Centers in Richmond, TX.',
};

const trustItems = [
  { icon: Shield, title: 'Your data is private and secure.', subtitle: 'HIPAA-compliant care you can trust.' },
  { icon: CalendarCheck, title: 'Flexible rescheduling — no penalties.', subtitle: 'Life happens. We understand.' },
  { icon: Phone, title: 'Call us: (346) 244-2106', subtitle: "We're here to help." },
];

export default function BookPage() {
  return (
    <>
      <PageHero
        title="Schedule a Time With Us"
        subtitle="Choose your appointment type and pick a time that works for you."
      />

      {/* Booking Panel */}
      <BookingPanel />

      {/* Trust Strip */}
      <section className="bg-[#EDE7D9] py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {trustItems.map(({ icon: Icon, title, subtitle }, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center gap-3 px-8 py-8 rounded-2xl transition-transform duration-300 hover:-translate-y-1"
                style={{
                  background: 'rgba(255,255,255,0.65)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.8)',
                  boxShadow: '0 4px 24px rgba(12,79,106,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
                }}
              >
                <div className="w-12 h-12 rounded-full bg-[#0C4F6A]/10 flex items-center justify-center">
                  <Icon size={22} className="text-[#0C4F6A]" strokeWidth={1.5} />
                </div>
                <p className="font-body font-semibold text-[#1C2B33] text-sm">{title}</p>
                <p className="font-body text-xs text-[#4A6572]">{subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
