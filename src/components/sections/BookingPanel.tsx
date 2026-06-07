import Image from 'next/image';
import { Calendar } from 'lucide-react';
import SectionLabel from '@/components/ui/SectionLabel';
import Button from '@/components/ui/Button';
import GlassCard from '@/components/ui/GlassCard';
import RevealOnScroll from '@/components/animations/RevealOnScroll';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

interface AppointmentRowProps {
  title: string;
  duration: string;
  price: string;
  description: string;
  bookingUrl: string;
}

function AppointmentRow({ title, duration, price, description, bookingUrl }: AppointmentRowProps) {
  return (
    <div className="flex flex-col gap-2 py-6">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-body font-semibold text-[#1C2B33] text-base">{title}</h3>
        <Button href={bookingUrl} variant="primary" size="sm" className="flex-shrink-0">
          Book
        </Button>
      </div>
      <p className="font-body text-sm text-[#4A6572]">{duration} · {price}</p>
      <p className="font-body text-sm text-[#4A6572] leading-relaxed">{description}</p>
    </div>
  );
}

export default function BookingPanel() {
  return (
    <section id="booking" className="bg-[#F5F0E8] py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* LEFT */}
          <div className="flex flex-col gap-6">
            <RevealOnScroll direction="fade">
              <SectionLabel text="SCHEDULE" />
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h2 className="font-display text-4xl md:text-5xl text-[#0C4F6A] font-medium leading-tight">
                Schedule a Time With Us
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <p className="font-body text-[#4A6572] leading-relaxed max-w-md">
                We&apos;re here to make your health a top priority. Book with Dr. Asar — in-person or virtually.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.3}>
              <div className="relative w-full max-w-sm mx-auto lg:mx-0">
                <Image
                  src={`${basePath}/images/booking-illustration.png`}
                  alt="Book an appointment with 786 Health Centers"
                  width={400}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </RevealOnScroll>
          </div>

          {/* RIGHT — Booking Card */}
          <RevealOnScroll delay={0.15} direction="right">
            <GlassCard
              className="p-8 md:p-10 max-w-lg mx-auto shadow-[0_24px_80px_rgba(12,79,106,0.22)]"
              tilt={false}
            >
              <div className="flex items-center gap-3 mb-6">
                <Calendar size={22} className="text-[#0C4F6A]" strokeWidth={1.5} />
                <h3 className="font-body font-semibold text-[#0C4F6A] text-lg">Select Appointment</h3>
              </div>

              <AppointmentRow
                title="In Person Visit"
                duration="30 minutes"
                price="$200.00"
                description="Book a consultation with Dr. Asar in-person at 786 Health Centers in Richmond, TX."
                bookingUrl="https://www.acuityscheduling.com"
              />

              <hr className="border-black/8" />

              <AppointmentRow
                title="Telemedicine Appointment"
                duration="30 minutes"
                price="$150.00"
                description="Speak to Dr. Asar for a virtual consultation from the comfort of your home."
                bookingUrl="https://www.acuityscheduling.com"
              />

              <p className="font-body text-xs text-[#8EA8B4] text-center mt-6">
                Powered by Acuity Scheduling
              </p>
            </GlassCard>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
