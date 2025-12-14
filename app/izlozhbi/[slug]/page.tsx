import Navigation from "../../components/Navigation";
import Link from "next/link";
import { IconCalendar, IconLocation, IconParty } from "../../components/Icons";
import { getExhibitionBySlug } from "../../lib/exhibitions";
import Image from "next/image";
import { notFound } from "next/navigation";

// Force dynamic rendering to always fetch fresh data
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ExhibitionDetail({ params }: PageProps) {
  const { slug } = await params;
  const exhibition = await getExhibitionBySlug(slug);

  if (!exhibition) {
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

        <h1 className="text-4xl md:text-5xl font-bold text-[#495464] mb-6">
          {exhibition.subtitle
            ? `„${exhibition.title}" - ${exhibition.subtitle}`
            : `„${exhibition.title}"`}
        </h1>

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
                  <p
                    key={idx}
                    className="text-lg text-[#495464]/80 leading-relaxed"
                  >
                    {paragraph.trim()}
                  </p>
                )
            )}
          </div>
        )}

        {/* Additional info */}
        <div className="bg-[#E8E8E8]/50 rounded-lg p-6 mb-8 border-l-4 border-[#495464]">
          <div className="space-y-2">
            {exhibition.date && (
              <p className="text-lg text-[#495464]/90 leading-relaxed font-medium flex items-center gap-2">
                <IconCalendar className="w-5 h-5 text-[#495464]" />
                {exhibition.date.includes("Изложбата")
                  ? exhibition.date
                  : `Изложбата ${
                      exhibition.position === 0 ? "ще се проведе" : "се проведе"
                    } ${exhibition.date}`}
              </p>
            )}
            <p className="text-base text-[#495464]/70 flex items-center gap-2">
              <IconLocation className="w-5 h-5 text-[#495464]" />
              Галерия nOva art space, ул. Съборна №3 (ниво -1)
            </p>
            {exhibition.date && exhibition.position === 0 && (
              <p className="text-base text-[#495464]/70 flex items-center gap-2">
                <IconParty className="w-5 h-5 text-[#495464]" />
                Откриването е на {exhibition.date.split(" ")[0]} от 18:00ч.
              </p>
            )}
          </div>
        </div>

        {/* Author */}
        {exhibition.author && (
          <div className="mb-8">
            <p className="text-sm font-semibold text-[#495464] mb-2">
              {exhibition.author.includes(",") ? "Автори" : "Автор"}
            </p>
            <p className="text-lg text-[#495464]/80 italic border-l-2 border-[#BBBFCA] pl-4">
              {exhibition.author}
            </p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exhibition.images.map((image, idx) => (
                <div
                  key={idx}
                  className="rounded-lg overflow-hidden aspect-[4/3]"
                >
                  <Image
                    src={image}
                    alt={`${exhibition.title} - Снимка ${idx + 1}`}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
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

