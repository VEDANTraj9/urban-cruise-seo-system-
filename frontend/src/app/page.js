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

export const revalidate = 30;

export async function generateMetadata() {
  try {
    const seoData = await PublicService.getSeo();
    const seo = seoData?.seo || DEFAULT_SEO;

    let keywords;
    if (typeof seo?.focus_keywords === 'string' && seo.focus_keywords.trim()) {
      keywords = seo.focus_keywords.split(',').map(k => k.trim()).filter(Boolean);
    }

    return {
      title: seo?.meta_title || DEFAULT_SEO.meta_title,
      description: seo?.meta_description || DEFAULT_SEO.meta_description,
      keywords,
      alternates: {
        canonical: seo?.canonical_url || undefined
      },
      robots: {
        index: Boolean(seo?.robots_index ?? true),
        follow: Boolean(seo?.robots_follow ?? true)
      },
      icons: {
        icon: '/logo.png',
        shortcut: '/logo.png',
        apple: '/logo.png'
      },
      openGraph: {
        title: seo?.og_title || seo?.meta_title || DEFAULT_SEO.meta_title,
        description: seo?.og_description || seo?.meta_description || DEFAULT_SEO.meta_description,
        images: seo?.og_image ? [{ url: seo.og_image }] : [{ url: '/logo.png' }],
        type: 'website'
      },
      twitter: {
        card: seo?.twitter_card_type || 'summary_large_image',
        title: seo?.twitter_title || seo?.meta_title || DEFAULT_SEO.meta_title,
        description: seo?.twitter_description || seo?.meta_description || DEFAULT_SEO.meta_description,
        images: seo?.twitter_image ? [seo.twitter_image] : ['/logo.png']
      }
    };
  } catch (err) {
    console.error('generateMetadata error:', err);
    return {
      title: DEFAULT_SEO.meta_title,
      description: DEFAULT_SEO.meta_description,
      icons: { icon: '/logo.png' }
    };
  }
}

export default async function HomePage() {
  let seoData = null;
  let homeData = null;

  try {
    [seoData, homeData] = await Promise.all([
      PublicService.getSeo(),
      PublicService.getHomepageContent()
    ]);
  } catch (err) {
    console.error('Failed to load homepage data during SSR:', err);
  }

  const jsonLdSchemas = Array.isArray(seoData?.jsonLdSchemas) ? seoData.jsonLdSchemas : [];
  const hero = homeData?.hero || DEFAULT_HERO;
  const about = homeData?.about || DEFAULT_ABOUT;
  const contact = homeData?.contact || DEFAULT_CONTACT;
  const vehicles = Array.isArray(homeData?.vehicles) ? homeData.vehicles : [];
  const occasions = Array.isArray(homeData?.occasions) ? homeData.occasions : [];
  const testimonials = Array.isArray(homeData?.testimonials) ? homeData.testimonials : [];
  const gallery = Array.isArray(homeData?.gallery) ? homeData.gallery : [];

  return (
    <div>
      {/* Dynamic JSON-LD Structured Data */}
      {jsonLdSchemas.map((schema, index) => {
        try {
          return (
            <script
              key={index}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
          );
        } catch {
          return null;
        }
      })}

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
