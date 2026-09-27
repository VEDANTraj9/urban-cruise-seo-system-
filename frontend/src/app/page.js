import Header from '@/components/public/Header';
import HeroSection from '@/components/public/HeroSection';
import VehiclesSection from '@/components/public/VehiclesSection';
import OccasionsSection from '@/components/public/OccasionsSection';
import AboutSection from '@/components/public/AboutSection';
import TestimonialsSection from '@/components/public/TestimonialsSection';
import GallerySection from '@/components/public/GallerySection';
import ContactSection from '@/components/public/ContactSection';
import Footer from '@/components/public/Footer';
import { PublicService } from '@/services/public.service';
import { DEFAULT_SEO, DEFAULT_HERO, DEFAULT_ABOUT, DEFAULT_CONTACT } from '@/utils/constants';
import '@/styles/home.css';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const seoData = await PublicService.getSeo();
  const seo = seoData?.seo || DEFAULT_SEO;

  return {
    title: seo.meta_title || DEFAULT_SEO.meta_title,
    description: seo.meta_description || DEFAULT_SEO.meta_description,
    keywords: seo.focus_keywords ? seo.focus_keywords.split(',').map(k => k.trim()) : undefined,
    alternates: {
      canonical: seo.canonical_url || undefined
    },
    robots: {
      index: Boolean(seo.robots_index ?? true),
      follow: Boolean(seo.robots_follow ?? true)
    },
    icons: {
      icon: '/logo.png',
      shortcut: '/logo.png',
      apple: '/logo.png'
    },
    openGraph: {
      title: seo.og_title || seo.meta_title,
      description: seo.og_description || seo.meta_description,
      images: seo.og_image ? [{ url: seo.og_image }] : [{ url: '/logo.png' }],
      type: 'website'
    },
    twitter: {
      card: seo.twitter_card_type || 'summary_large_image',
      title: seo.twitter_title || seo.meta_title,
      description: seo.twitter_description || seo.meta_description,
      images: seo.twitter_image ? [seo.twitter_image] : ['/logo.png']
    }
  };
}

export default async function HomePage() {
  const [seoData, homeData] = await Promise.all([
    PublicService.getSeo(),
    PublicService.getHomepageContent()
  ]);

  const jsonLdSchemas = seoData?.jsonLdSchemas || [];
  const hero = homeData?.hero || DEFAULT_HERO;
  const about = homeData?.about || DEFAULT_ABOUT;
  const contact = homeData?.contact || DEFAULT_CONTACT;
  const vehicles = homeData?.vehicles || [];
  const occasions = homeData?.occasions || [];
  const testimonials = homeData?.testimonials || [];
  const gallery = homeData?.gallery || [];

  return (
    <div>
      {/* Dynamic JSON-LD Structured Data */}
      {jsonLdSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Header with ONLY Logo & Admin Login */}
      <Header />

      <main>
        <HeroSection hero={hero} />
        <VehiclesSection vehicles={vehicles} />
        <OccasionsSection occasions={occasions} />
        <AboutSection about={about} />
        <TestimonialsSection testimonials={testimonials} />
        <GallerySection gallery={gallery} />
        <ContactSection contact={contact} />
      </main>

      <Footer contact={contact} />
    </div>
  );
}
