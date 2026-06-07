import type { Metadata } from 'next';
import Image from 'next/image';
import GlassCard from '@/components/ui/GlassCard';
import TrustPill from '@/components/ui/TrustPill';
import RevealOnScroll from '@/components/animations/RevealOnScroll';
import PageHero from '@/components/layout/PageHero';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata: Metadata = {
  title: 'Health Insights & Wellness Tips — Blog',
  description:
    'Evidence-based health articles, wellness tips, and medical insights from Dr. Batool Asar and the 786 Health Centers team.',
};

const posts = [
  {
    slug: 'immune-system',
    tag: 'Wellness',
    date: 'January 17, 2026',
    title: '6 Science-Backed Ways to Strengthen Your Immune System Naturally',
    image: '/images/blog-immune.png',
    imageAlt: 'Botanical herbs and citrus for immune health',
  },
  {
    slug: 'fall-prevention',
    tag: 'Preventive Care',
    date: 'November 18, 2025',
    title: "More Than a Stumble: 5 Proactive Ways to Prevent Falls (And How Your Doctor Can Help)",
    image: '/images/blog-falls.png',
    imageAlt: 'Active senior adult demonstrating healthy mobility and fall prevention',
  },
  {
    slug: 'seasonal-allergies',
    tag: 'Allergies',
    date: 'November 10, 2025',
    title: "Can't Stop Sneezing? Your Ultimate Guide to Seasonal Allergy Relief in Texas & Nationwide",
    image: '/images/blog-allergies.png',
    imageAlt: 'Dandelion seeds floating through golden hour light representing seasonal allergies',
  },
];

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="Health Insights & Wellness Tips"
        subtitle="Backed by science, written for you."
      />

      {/* Blog Grid */}
      <section className="bg-[#F5F0E8] py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <RevealOnScroll key={post.slug} delay={i * 0.1}>
                <GlassCard className="overflow-hidden flex flex-col h-full" tilt={false} hover>
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={`${basePath}${post.image}`}
                      alt={post.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-3">
                      <TrustPill>{post.tag}</TrustPill>
                      <span className="font-body text-xs text-[#4A6572]">{post.date}</span>
                    </div>
                    <h2 className="font-display text-2xl text-[#0C4F6A] leading-snug mt-3 flex-1">
                      {post.title}
                    </h2>
                    <p className="font-body text-sm font-semibold text-[#E07A5F] mt-4 hover:underline cursor-pointer">
                      Read More →
                    </p>
                  </div>
                </GlassCard>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
