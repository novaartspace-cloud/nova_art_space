import Navigation from "../components/Navigation";
import ScrollAnimation from "../components/ScrollAnimation";
import Link from "next/link";
import { getNews } from "../lib/news";
import Image from "next/image";

// Force dynamic rendering to always fetch fresh data
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Novini() {
  const news = await getNews();

  // Separate main news (position 0) and other news
  const mainNews = news.find((n) => n.position === 0);
  const otherNews = news.filter((n) => n.position !== 0);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 relative">
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

        <div className="flex items-center gap-3 mb-6">
          <span className="w-12 h-0.5 bg-[#495464]"></span>
          <span className="text-sm font-semibold text-[#495464] uppercase tracking-wider" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Новини
          </span>
        </div>
        <p className="text-xl text-[#495464]/80 mb-4 leading-relaxed" style={{ fontFamily: "var(--font-playfair), serif" }}>
          Следете последните изложби, събития и инициативи на nOva art space.
        </p>
        <p className="text-xl text-[#495464]/80 mb-12 leading-relaxed" style={{ fontFamily: "var(--font-playfair), serif" }}>
          Тук споделяме моменти, които оформят нашата културна и професионална
          динамика.
        </p>

        {news.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-[#495464]/70" style={{ fontFamily: "var(--font-playfair), serif" }}>
              Все още няма публикувани новини.
            </p>
          </div>
        ) : (
          <>
            {/* Главна новина */}
            {mainNews && (
              <ScrollAnimation>
                <div className="mb-20 pb-16 border-b-2 border-[#E8E8E8] relative max-w-4xl">
                <div className="absolute top-0 left-0 w-64 h-64 bg-[#E8E8E8] rounded-full blur-3xl opacity-20 -ml-32 -mt-32"></div>
                <div className="relative z-10">
                  <div className="mb-6">
                    <span className="inline-flex items-center gap-2 bg-[#495464] text-white px-5 py-2 rounded-full text-sm font-medium shadow-md" style={{ fontFamily: "var(--font-playfair), serif" }}>
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      Главна новина
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl md:text-4xl font-bold text-[#495464] mb-3" style={{ fontFamily: "var(--font-playfair), serif" }}>
                    {mainNews.title}
                  </h2>

                  {/* Subtitle */}
                  {mainNews.subtitle && (
                    <p className="text-lg text-[#495464]/70 mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
                      {mainNews.subtitle}
                    </p>
                  )}

                  {/* Main Image */}
                  {mainNews.mainImage && (
                    <div className="mb-4 rounded-lg overflow-hidden w-full max-w-md">
                      <Image
                        src={mainNews.mainImage}
                        alt={mainNews.title}
                        width={500}
                        height={300}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}

                  {/* Button */}
                  <Link
                    href={`/novini/${mainNews.slug}`}
                    className="inline-flex items-center gap-1.5 bg-[#495464] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#495464]/90 transition-all duration-300 hover:shadow-md hover:scale-105 group"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    Виж повече
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

            {/* Други новини */}
            {otherNews.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-12 h-0.5 bg-[#495464]"></span>
                  <span className="text-sm font-semibold text-[#495464] uppercase tracking-wider" style={{ fontFamily: "var(--font-playfair), serif" }}>
                    Други новини
                  </span>
                </div>

                <div className="space-y-16">
                  {otherNews.map((newsItem, idx) => (
                    <ScrollAnimation key={idx} delay={idx * 100}>
                      <div
                        className={`${
                          idx < otherNews.length - 1 ? "pb-12 border-b" : "pb-8"
                        } border-[#E8E8E8] max-w-4xl`}
                      >
                      <div className="flex flex-col md:flex-row gap-6 mb-4">
                        {newsItem.mainImage && (
                          <div className="md:w-1/3 shrink-0">
                            <div className="rounded-lg overflow-hidden">
                              <Image
                                src={newsItem.mainImage}
                                alt={newsItem.title}
                                width={400}
                                height={300}
                                className="w-full h-64 md:h-full object-cover"
                                style={{ width: "auto" }}
                              />
                            </div>
                          </div>
                        )}
                        <div className="flex-1">
                          <h2 className="text-2xl md:text-3xl font-bold text-[#495464] mb-2" style={{ fontFamily: "var(--font-playfair), serif" }}>
                            {newsItem.title}
                          </h2>
                          {newsItem.subtitle && (
                            <h3 className="text-lg md:text-xl text-[#495464]/70 mb-4 font-medium" style={{ fontFamily: "var(--font-playfair), serif" }}>
                              {newsItem.subtitle}
                            </h3>
                          )}
                        </div>
                      </div>
                      {/* Button */}
                      <Link
                        href={`/novini/${newsItem.slug}`}
                        className="inline-flex items-center gap-1.5 bg-[#495464] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#495464]/90 transition-all duration-300 hover:shadow-md hover:scale-105 group"
                        style={{ fontFamily: "var(--font-playfair), serif" }}
                      >
                        Виж повече
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
          </>
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
