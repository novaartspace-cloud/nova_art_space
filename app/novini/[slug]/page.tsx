import Navigation from "../../components/Navigation";
import ScrollAnimation from "../../components/ScrollAnimation";
import Link from "next/link";
import { getNewsBySlug } from "../../lib/news";
import { notFound } from "next/navigation";
import NewsGallery from "../../components/NewsGallery";
import { NewsGalleryProvider } from "../../components/NewsGalleryContext";
import NewsLightbox from "../../components/NewsLightbox";
import type { Metadata } from "next";
import { absoluteOgImageUrl, siteConfig } from "../../lib/site-config";

// Force dynamic rendering to always fetch fresh data
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

function buildNewsDescription(
  subtitle: string,
  text: string,
  title: string
): string {
  if (subtitle?.trim()) return subtitle.trim().slice(0, 200);
  const first = text?.split("\n").find((p) => p.trim());
  if (first) return first.trim().slice(0, 200);
  return title;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const newsItem = await getNewsBySlug(slug);
  if (!newsItem || newsItem.position === 1000) {
    notFound();
  }
  const description = buildNewsDescription(
    newsItem.subtitle,
    newsItem.text,
    newsItem.title
  );
  const imageUrl = absoluteOgImageUrl(
    newsItem.mainImage || newsItem.images?.[0]
  );
  const pageUrl = `${siteConfig.url}/novini/${slug}`;
  return {
    title: newsItem.title,
    description,
    openGraph: {
      title: newsItem.title,
      description,
      url: pageUrl,
      siteName: siteConfig.name,
      locale: "bg_BG",
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: newsItem.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: newsItem.title,
      description,
      images: [imageUrl],
    },
    alternates: { canonical: pageUrl },
  };
}

export default async function NewsDetail({ params }: PageProps) {
  const { slug } = await params;
  const newsItem = await getNewsBySlug(slug);

  // Block access to archived news (position 1000)
  if (!newsItem || newsItem.position === 1000) {
    notFound();
  }

  return (
    <NewsGalleryProvider>
      <div className="min-h-screen bg-white">
        <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <Link
          href="/novini"
          className="inline-flex items-center gap-2 mb-8 text-[#495464] hover:text-[#495464] font-medium transition-colors duration-300 group"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Назад към новините
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <span className="w-12 h-0.5 bg-[#495464]"></span>
          <span className="text-sm font-semibold text-[#495464] uppercase tracking-wider" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Новина
          </span>
        </div>

        {/* Main news badge */}
        {newsItem.position === 0 && (
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 bg-[#495464] text-white px-5 py-2 rounded-full text-sm font-medium shadow-md" style={{ fontFamily: "var(--font-playfair), serif" }}>
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              Главна новина
            </span>
          </div>
        )}

        <h1 className="text-4xl md:text-5xl font-bold text-[#495464] mb-2" style={{ fontFamily: "var(--font-playfair), serif" }}>
          {newsItem.title}
        </h1>

        {newsItem.subtitle && (
          <ScrollAnimation>
            <h2 className="text-2xl md:text-3xl text-[#495464]/90 mb-8 font-medium" style={{ fontFamily: "var(--font-playfair), serif" }}>
              {newsItem.subtitle}
            </h2>
          </ScrollAnimation>
        )}

        {/* Main Image */}
        {newsItem.mainImage && (
          <NewsGallery
            mainImage={newsItem.mainImage}
            images={[]}
            title={newsItem.title}
            showOnlyMain={true}
          />
        )}

        {/* Text content */}
        {newsItem.text && (
          <div className="space-y-4 mb-8">
            {newsItem.text.split("\n").map(
              (paragraph, idx) =>
                paragraph.trim() && (
                  <ScrollAnimation key={idx} delay={idx * 100}>
                    <p className="text-lg text-[#495464]/80 leading-relaxed" style={{ fontFamily: "var(--font-playfair), serif" }}>
                      {paragraph.trim()}
                    </p>
                  </ScrollAnimation>
                )
            )}
          </div>
        )}

        {/* Additional Gallery Images */}
        {newsItem.images && newsItem.images.length > 0 && (
          <NewsGallery
            mainImage={newsItem.mainImage}
            images={newsItem.images}
            title={newsItem.title}
            showOnlyGallery={true}
          />
        )}

        {/* Lightbox - rendered once */}
        <NewsLightbox title={newsItem.title} />
      </div>

      <footer className="bg-gradient-to-b from-[#495464] to-[#3a4149] text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/80 text-sm" style={{ fontFamily: "var(--font-playfair), serif" }}>
            © {new Date().getFullYear()} nOva art space. Всички права запазени.
          </p>
        </div>
      </footer>
      </div>
    </NewsGalleryProvider>
  );
}
