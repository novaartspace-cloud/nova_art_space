import Navigation from "../../components/Navigation";
import Link from "next/link";
import { getNews } from "../../lib/news";
import Image from "next/image";

// Force dynamic rendering to always fetch fresh data
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function VsiNovini() {
  const news = await getNews();

  // Filter out main news (position 0) - show only other news
  const otherNews = news.filter((n) => n.position !== 0);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <Link
          href="/novini"
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
          Назад към новините
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <span className="w-12 h-0.5 bg-[#495464]"></span>
          <span className="text-sm font-semibold text-[#495464] uppercase tracking-wider">
            Новини
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#495464] mb-12">
          Всички новини
        </h1>

        {otherNews.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-[#495464]/70">
              Все още няма други новини.
            </p>
          </div>
        ) : (
          <div className="space-y-16">
            {otherNews.map((newsItem, idx) => (
              <Link
                key={idx}
                href={`/novini/${newsItem.slug}`}
                className={`block ${
                  idx < otherNews.length - 1 ? "pb-12 border-b" : "pb-8"
                } border-[#E8E8E8] hover:bg-[#E8E8E8]/30 transition-colors duration-300 rounded-lg p-6 -m-6 group cursor-pointer max-w-4xl`}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {newsItem.mainImage && (
                    <div className="md:w-1/3 shrink-0">
                      <div className="rounded-lg overflow-hidden group-hover:opacity-90 transition-opacity">
                        <Image
                          src={newsItem.mainImage}
                          alt={newsItem.title}
                          width={400}
                          height={300}
                          className="w-full h-64 md:h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#495464] mb-2 group-hover:text-[#3a4149] transition-colors">
                      {newsItem.title}
                    </h2>
                    {newsItem.subtitle && (
                      <h3 className="text-lg md:text-xl text-[#495464]/70 mb-4 font-medium">
                        {newsItem.subtitle}
                      </h3>
                    )}
                  </div>
                </div>
              </Link>
            ))}
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
