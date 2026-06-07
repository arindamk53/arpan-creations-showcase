import type { Metadata } from 'next';
import './globals.css';
import ClientLayout from './ClientLayout';

export const metadata: Metadata = {
  title: {
    default: '786 Health Centers — Richmond, TX Family Medicine',
    template: '%s | 786 Health Centers',
  },
  description:
    'Comprehensive, compassionate family healthcare in Richmond, TX. Dr. Batool Asar offers in-person and telemedicine appointments. Board-certified, FAAFP Fellow. Book online today.',
  keywords: ['family medicine', 'Richmond TX doctor', 'telemedicine', 'primary care', '786 health centers', 'Dr. Asar'],
  openGraph: {
    title: '786 Health Centers — Richmond, TX Family Medicine',
    description: 'Compassionate, comprehensive family healthcare in Richmond, TX.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
