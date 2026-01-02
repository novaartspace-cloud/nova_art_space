import Navigation from "../../components/Navigation";
import ScrollAnimation from "../../components/ScrollAnimation";
import Link from "next/link";
import { IconCalendar, IconLocation, IconParty } from "../../components/Icons";
import { getExhibitionBySlug } from "../../lib/exhibitions";
import Image from "next/image";
import { notFound } from "next/navigation";
import ExhibitionGallery from "../../components/ExhibitionGallery";

// Force dynamic rendering to always fetch fresh data
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ExhibitionDetail({ params }: PageProps) {
  const { slug } = await params;
  const exhibition = await getExhibitionBySlug(slug);

  // Block access to archived exhibitions (position 1000)
  if (!exhibition || exhibition.position === 1000) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <Link
          href="/izlozhbi"
          className="inline-flex items-center gap-2 mb-8 text-[#495464] hover:text-[#495464] font-medium transition-colors duration-300 group"
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
          Назад към изложбите
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <span className="w-12 h-0.5 bg-[#495464]"></span>
          <span className="text-sm font-semibold text-[#495464] uppercase tracking-wider">
            Изложба
          </span>
        </div>

        {/* Current exhibition badge */}
        {exhibition.position === 0 && (
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 bg-[#495464] text-white px-5 py-2 rounded-full text-sm font-medium shadow-md">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              Настояща
            </span>
          </div>
        )}

        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#495464]">
            {exhibition.title}
          </h1>
          {exhibition.subtitle && (
            <ScrollAnimation>
              <p className="text-2xl md:text-3xl text-[#495464]/50 mt-2">
                {exhibition.subtitle}
              </p>
            </ScrollAnimation>
          )}
        </div>

        {/* Main Image */}
        {exhibition.mainImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <Image
              src={exhibition.mainImage}
              alt={exhibition.title}
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Text content */}
        {exhibition.text && (
          <div className="space-y-4 mb-8">
            {exhibition.text.split("\n").map(
              (paragraph, idx) =>
                paragraph.trim() && (
                  <ScrollAnimation key={idx} delay={idx * 100}>
                    <p className="text-lg text-[#495464]/80 leading-relaxed">
                      {paragraph.trim()}
                    </p>
                  </ScrollAnimation>
                )
            )}
          </div>
        )}

        {/* Additional info */}
        <div className="bg-[#E8E8E8]/50 rounded-lg p-6 mb-8 border-l-4 border-[#495464]">
          <div className="space-y-2">
            {exhibition.date && (
              <ScrollAnimation>
                <p className="text-lg text-[#495464]/90 leading-relaxed font-medium flex items-center gap-2">
                  <IconCalendar className="w-5 h-5 text-[#495464]" />
                  {exhibition.date.includes("Изложбата")
                    ? exhibition.date
                    : `Датата на изложбата е ${exhibition.date}`}
                </p>
              </ScrollAnimation>
            )}
            <ScrollAnimation delay={100}>
              <p className="text-base text-[#495464]/70 flex items-center gap-2">
                <IconLocation className="w-5 h-5 text-[#495464]" />
                Галерия nOva art space, ул. Съборна №3 (ниво -1)
              </p>
            </ScrollAnimation>
          </div>
        </div>

        {/* Author */}
        {exhibition.author && (
          <div className="mb-8">
            <ScrollAnimation>
              <p className="text-sm font-semibold text-[#495464] mb-2">
                {exhibition.author.includes(",") ? "Автори" : "Автор"}
              </p>
            </ScrollAnimation>
            <ScrollAnimation delay={100}>
              <p className="text-lg text-[#495464]/80 italic border-l-2 border-[#BBBFCA] pl-4">
                {exhibition.author}
              </p>
            </ScrollAnimation>
          </div>
        )}

        {/* Gallery Images */}
        {exhibition.images && exhibition.images.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-12 h-0.5 bg-[#495464]"></span>
              <span className="text-sm font-semibold text-[#495464] uppercase tracking-wider">
                Галерия
              </span>
            </div>
            <ExhibitionGallery
              images={exhibition.images}
              title={exhibition.title}
            />
          </div>
        )}
      </div>

      <footer className="bg-gradient-to-b from-[#495464] to-[#3a4149] text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/80 text-sm">
            © {new Date().getFullYear()} nOva art space. Всички права запазени.
          </p>
        </div>
      </footer>
    </div>
  );
}



