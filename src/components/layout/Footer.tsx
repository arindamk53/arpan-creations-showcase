import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
  { href: '/book', label: 'Book Now' },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#0C4F6A] text-white">
      {/* SVG Wave divider */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none" aria-hidden="true">
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          className="w-full h-12 md:h-16"
          style={{ transform: 'translateY(-99%)' }}
        >
          <path
            d="M0,60 C360,0 1080,0 1440,60 L1440,60 L0,60 Z"
            fill="#0C4F6A"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Logo + tagline */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4" aria-label="786 Health Centers">
              <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M9 3v12M3 9h12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="9" cy="9" r="7" stroke="white" strokeWidth="1.5" fill="none" />
                </svg>
              </div>
              <span className="font-display text-xl font-semibold text-white">786 Health Centers</span>
            </Link>
            <p className="font-body text-sm italic text-white/50 leading-relaxed max-w-[200px]">
              Comprehensive healthcare, made effortless.
            </p>
          </div>

          {/* Col 2: Navigate */}
          <div>
            <p className="font-body font-semibold text-xs tracking-widest uppercase text-[#C9A84C] mb-5">
              Navigate
            </p>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-white/70 hover:text-[#C9A84C] hover:underline transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Location */}
          <div>
            <p className="font-body font-semibold text-xs tracking-widest uppercase text-[#C9A84C] mb-5">
              Location
            </p>
            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-white/50 mt-0.5 flex-shrink-0" />
              <p className="font-body text-sm text-white/70 leading-relaxed">
                10401 Mason Rd C-302<br />
                Richmond, TX 77406
              </p>
            </div>
          </div>

          {/* Col 4: Contact */}
          <div>
            <p className="font-body font-semibold text-xs tracking-widest uppercase text-[#C9A84C] mb-5">
              Contact
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:786drasar@gmail.com"
                className="flex items-center gap-3 font-body text-sm text-white/70 hover:text-[#C9A84C] transition-colors duration-200 group"
              >
                <Mail size={16} className="flex-shrink-0" />
                786drasar@gmail.com
              </a>
              <a
                href="tel:+13462442106"
                className="flex items-center gap-3 font-body text-sm text-white/70 hover:text-[#C9A84C] transition-colors duration-200 group"
              >
                <Phone size={16} className="flex-shrink-0" />
                (346) 244-2106
              </a>
            </div>
          </div>
        </div>

        <p className="font-body text-xs text-white/35 text-center mt-8">
          © 2025 786 Health Centers. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
