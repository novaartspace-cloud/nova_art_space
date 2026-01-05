import Navigation from "../components/Navigation";
import ScrollAnimation from "../components/ScrollAnimation";
import Link from "next/link";
import { IconCalendar, IconLocation, IconParty } from "../components/Icons";
import { getExhibitions, Exhibition } from "../lib/exhibitions";
import Image from "next/image";

// Force dynamic rendering to always fetch fresh data
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Izlozhbi() {
  const exhibitions = await getExhibitions();

  // Separate current (position 0) and past exhibitions
  // Filter out archived exhibitions (position 1000)
  const currentExhibition = exhibitions.find((ex) => ex.position === 0);
  const pastExhibitions = exhibitions.filter(
    (ex) => ex.position !== 0 && ex.position !== 1000
  );

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <Link
          href="/"
          className="back-button-animate inline-flex items-center gap-1.5 bg-[#495464] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#495464]/90 transition-all duration-300 hover:shadow-md hover:scale-105 group mb-8"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          <svg
            className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1"
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
          Назад към началната страница
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <span className="w-12 h-0.5 bg-[#495464]"></span>
          <span className="text-sm font-semibold text-[#495464] uppercase tracking-wider" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Изложби
          </span>
        </div>

        {/* Настояща изложба */}
        {currentExhibition && (
          <ScrollAnimation>
            <div className="mb-20 pb-16 border-b-2 border-[#E8E8E8] relative max-w-4xl">
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#E8E8E8] rounded-full blur-3xl opacity-20 -ml-32 -mt-32"></div>
            <div className="relative z-10">
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 bg-[#495464] text-white px-5 py-2 rounded-full text-sm font-medium shadow-md" style={{ fontFamily: "var(--font-playfair), serif" }}>
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  Настояща
                </span>
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl font-bold text-[#495464] mb-3" style={{ fontFamily: "var(--font-playfair), serif" }}>
                {currentExhibition.title}
              </h2>

              {/* Subtitle */}
              {currentExhibition.subtitle && (
                <p className="text-lg text-[#495464]/70 mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
                  {currentExhibition.subtitle}
                </p>
              )}

              {/* Main Image */}
              {currentExhibition.mainImage && (
                <div className="mb-4 rounded-lg overflow-hidden w-full max-w-md">
                  <Image
                    src={currentExhibition.mainImage}
                    alt={currentExhibition.title}
                    width={500}
                    height={300}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              {/* Author and Date */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-[#495464]/70 max-w-md mb-4">
                {currentExhibition.author && (
                  <p className="text-base" style={{ fontFamily: "var(--font-playfair), serif" }}>Автор: {currentExhibition.author}</p>
                )}
                {currentExhibition.date && (
                  <div className="flex items-center gap-2">
                    <IconCalendar className="w-5 h-5 text-[#495464]" />
                    <p className="text-base" style={{ fontFamily: "var(--font-playfair), serif" }}>{currentExhibition.date}</p>
                  </div>
                )}
              </div>

              {/* Button below author, on the left */}
              <Link
                href={`/izlozhbi/${currentExhibition.slug}`}
                className="inline-flex items-center gap-1.5 bg-[#495464] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#495464]/90 transition-all duration-300 hover:shadow-md hover:scale-105 group"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                Виж повече за изложбата
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
          </ScrollAnimation>
        )}

        {/* Минали изложби */}
        {pastExhibitions.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-12 h-0.5 bg-[#495464]"></span>
              <span className="text-sm font-semibold text-[#495464] uppercase tracking-wider" style={{ fontFamily: "var(--font-playfair), serif" }}>
                История
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#495464] mb-12" style={{ fontFamily: "var(--font-playfair), serif" }}>
              Минали изложби
            </h2>

            <div className="space-y-16">
              {pastExhibitions.map((exhibition, idx) => (
                <ScrollAnimation key={idx} delay={idx * 100}>
                  <div
                    className={`${
                      idx < pastExhibitions.length - 1 ? "pb-12 border-b" : "pb-8"
                    } border-[#E8E8E8] max-w-4xl`}
                  >
                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold text-[#495464] mb-2" style={{ fontFamily: "var(--font-playfair), serif" }}>
                    {exhibition.title}
                  </h3>

                  {/* Subtitle */}
                  {exhibition.subtitle && (
                    <p className="text-base text-[#495464]/70 mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>
                      {exhibition.subtitle}
                    </p>
                  )}

                  {/* Main Image */}
                  {exhibition.mainImage && (
                    <div className="mb-4 rounded-lg overflow-hidden w-full max-w-md">
                      <Image
                        src={exhibition.mainImage}
                        alt={exhibition.title}
                        width={500}
                        height={300}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}

                  {/* Author and Date */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-[#495464]/70 max-w-md mb-4">
                    {exhibition.author && (
                      <p className="text-base" style={{ fontFamily: "var(--font-playfair), serif" }}>Автор: {exhibition.author}</p>
                    )}
                    {exhibition.date && (
                      <div className="flex items-center gap-2">
                        <IconCalendar className="w-5 h-5 text-[#495464]" />
                        <p className="text-base" style={{ fontFamily: "var(--font-playfair), serif" }}>{exhibition.date}</p>
                      </div>
                    )}
                  </div>

                  {/* Button below author, on the left */}
                  <Link
                    href={`/izlozhbi/${exhibition.slug}`}
                    className="inline-flex items-center gap-1.5 bg-[#495464] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#495464]/90 transition-all duration-300 hover:shadow-md hover:scale-105 group"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    Виж повече за изложбата
                    <svg
                      className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="bg-gradient-to-b from-[#495464] to-[#3a4149] text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/80 text-sm" style={{ fontFamily: "var(--font-playfair), serif" }}>
            © {new Date().getFullYear()} nOva art space. Всички права запазени.
          </p>
        </div>
      </footer>
    </div>
  );
}
