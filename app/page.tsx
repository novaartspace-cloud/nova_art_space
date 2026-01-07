import Navigation from "./components/Navigation";
import MainSlider from "./components/MainSlider";
import AutoPlayVideo from "./components/AutoPlayVideo";
import ScrollAnimation from "./components/ScrollAnimation";
import Link from "next/link";
import Image from "next/image";
import {
  IconPalette,
  IconTheater,
  IconLightBulb,
  IconBuilding,
  IconUsers,
  IconLocation,
  IconPhone,
  IconMail,
  IconGlobe,
  IconCalendar,
  IconParty,
  IconOffice,
  IconFacebook,
  IconInstagram,
} from "./components/Icons";
import { getExhibitions } from "./lib/exhibitions";
import { getNews } from "./lib/news";
import { getCarouselSlides } from "./lib/carousel";
import { getCarouselMobileSlides } from "./lib/carousel_mobile";
import { siteConfig } from "./lib/site-config";
import type { Metadata } from "next";

// Force dynamic rendering to always fetch fresh data (no caching)
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Начало - nOva art space | Съвременна арт галерия София",
  description:
    "nOva art space - съвременна арт галерия в София. Предлагаме картини, изкуство, изложби и премиум пространство за събития. Посетете най-добрата арт галерия в България.",
  keywords: [
    "nova art gallery",
    "нова арт галерия софия",
    "арт галерия",
    "галерия софия",
    "изкуство софия",
    "картини софия",
    "галерия българия",
    "изложби софия",
    "съвременно изкуство",
    "art gallery sofia",
  ],
  openGraph: {
    title: "nOva art space - Съвременна арт галерия в София",
    description:
      "Съвременна арт галерия и премиум пространство за събития в София. Картини, изкуство и галерия в България.",
    url: siteConfig.url,
    type: "website",
  },
};

export default async function Home() {
  // Fetch current exhibition (position 0)
  const exhibitions = await getExhibitions();
  const currentExhibition = exhibitions.find((ex) => ex.position === 0);

  // Fetch news
  const news = await getNews();
  const mainNews = news.find((n) => n.position === 0);

  // Fetch carousel slides
  const carouselSlides = await getCarouselSlides();
  const carouselMobileSlides = await getCarouselMobileSlides();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <MainSlider slides={carouselSlides} mobileSlides={carouselMobileSlides} />

      {/* За нас */}
      <section
        className="py-12 bg-white relative"
        itemScope
        itemType="https://schema.org/AboutPage"
      >
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#E8E8E8] rounded-full blur-3xl opacity-30 -ml-48 -mt-48"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left side - Text content */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-12 h-0.5 bg-[#495464]"></span>
                <span
                  className="text-sm font-semibold text-[#495464] uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                >
                  За нас
                </span>
              </div>
              <ScrollAnimation>
                <h1
                  className="text-3xl md:text-4xl font-bold text-[#495464] mb-4"
                  itemProp="headline"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  Галерия с история на две поколения и поглед към бъдещето
                </h1>
              </ScrollAnimation>
              <div className="space-y-4 mb-6">
                <ScrollAnimation delay={100}>
                  <p
                    className="text-lg text-[#495464]/80 leading-relaxed"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    nOva art space е съвременна галерия и премиум пространство
                    за изкуство и събития, където изложбите създават контекст, а
                    изкуството добавя стойност, характер и престиж към всяко
                    преживяване.
                  </p>
                </ScrollAnimation>
                <ScrollAnimation delay={200}>
                  <p
                    className="text-lg text-[#495464]/80 leading-relaxed"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    Нашият фокус е върху стойностни произведения — от големите
                    български майстори до силни съвременни автори — представени
                    в среда, създадена за фокус, усещане и престиж.
                  </p>
                </ScrollAnimation>
              </div>
              <div className="flex flex-wrap gap-4 mb-8">
                <ScrollAnimation delay={300}>
                  <div className="flex items-center gap-2 text-[#495464]/70">
                    <IconBuilding className="w-4 h-4 text-[#495464]" />
                    <span
                      className="feature-badge-text"
                      style={{
                        fontFamily: "var(--font-montserrat), sans-serif",
                      }}
                    >
                      Пет пространства
                    </span>
                  </div>
                </ScrollAnimation>
                <ScrollAnimation delay={400}>
                  <div className="flex items-center gap-2 text-[#495464]/70">
                    <IconUsers className="w-4 h-4 text-[#495464]" />
                    <span
                      className="feature-badge-text"
                      style={{
                        fontFamily: "var(--font-montserrat), sans-serif",
                      }}
                    >
                      Две поколения
                    </span>
                  </div>
                </ScrollAnimation>
                <ScrollAnimation delay={500}>
                  <div className="flex items-center gap-2 text-[#495464]/70">
                    <IconPalette className="w-4 h-4 text-[#495464]" />
                    <span
                      className="feature-badge-text"
                      style={{
                        fontFamily: "var(--font-montserrat), sans-serif",
                      }}
                    >
                      Една мисия
                    </span>
                  </div>
                </ScrollAnimation>
              </div>
              <Link
                href="/za-nas"
                className="inline-flex items-center gap-2 bg-[#495464] text-white px-8 py-3 rounded-md font-medium hover:bg-[#495464]/90 transition-all duration-300 hover:shadow-lg hover:scale-105 group"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Научи повече
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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

            {/* Right side - Video */}
            <div className="rounded-lg overflow-hidden md:p-8 md:max-w-md">
              <AutoPlayVideo
                src="/video.mp4"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Настояща изложба */}
      {currentExhibition && (
        <section className="py-12 bg-gradient-to-br from-[#E8E8E8] to-[#F5F5F5] relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl opacity-20 -ml-48 -mb-48"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-12 h-0.5 bg-[#495464]"></span>
                <span
                  className="text-sm font-semibold text-[#495464] uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                >
                  Настояща изложба
                </span>
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold text-[#495464] mb-2"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                {currentExhibition.title.replace(/^Настояща изложба:\s*/i, "")}
              </h2>
              {currentExhibition.subtitle && (
                <ScrollAnimation>
                  <p
                    className="text-base md:text-lg text-[#495464]/60 mb-4 font-normal"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    {currentExhibition.subtitle}
                  </p>
                </ScrollAnimation>
              )}

              {/* Main Image */}
              {currentExhibition.mainImage && (
                <div className="mb-8 rounded-lg overflow-hidden md:max-w-lg md:max-h-[400px]">
                  <Image
                    src={currentExhibition.mainImage}
                    alt={`${currentExhibition.title} - Изложба в nOva art space, арт галерия София`}
                    width={800}
                    height={500}
                    className="w-full h-auto object-cover md:max-h-[400px]"
                    title={`${currentExhibition.title} - Арт галерия София`}
                  />
                </div>
              )}

              <div className="bg-[#E8E8E8]/50 rounded-lg p-6 mb-8 border-l-4 border-[#495464]">
                {currentExhibition.date && (
                  <ScrollAnimation>
                    <p
                      className="text-lg text-[#495464]/90 leading-relaxed font-medium flex items-center gap-2"
                      style={{
                        fontFamily: "var(--font-montserrat), sans-serif",
                      }}
                    >
                      <IconCalendar className="w-5 h-5 text-[#495464]" />
                      {currentExhibition.date.includes("Изложбата")
                        ? currentExhibition.date
                        : `Изложбата ще се проведе ${currentExhibition.date}`}
                    </p>
                  </ScrollAnimation>
                )}
              </div>

              {/* Author */}
              {currentExhibition.author && (
                <ScrollAnimation>
                  <p
                    className="text-base text-[#495464]/70 mb-8 italic border-l-2 border-[#BBBFCA] pl-4"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    {currentExhibition.author.includes(",")
                      ? "Автори"
                      : "Автор"}
                    : {currentExhibition.author}
                  </p>
                </ScrollAnimation>
              )}

              <Link
                href={`/izlozhbi/${currentExhibition.slug}`}
                className="inline-flex items-center gap-2 bg-[#495464] text-white px-8 py-3 rounded-md font-medium hover:bg-[#495464]/90 transition-all duration-300 hover:shadow-lg hover:scale-105 group"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Разгледай изложбата
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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
        </section>
      )}

      {/* Организирай събитие */}
      <section className="py-12 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8E8E8] rounded-full blur-3xl opacity-30 -mr-48 -mt-48"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-12 h-0.5 bg-[#495464]"></span>
              <span
                className="text-sm font-semibold text-[#495464] uppercase tracking-wider"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Събития
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#495464] mb-4"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              nOva art space – сцена за Вашите идеи
            </h2>
            <div className="space-y-4 mb-6">
              <ScrollAnimation delay={100}>
                <p
                  className="text-lg text-[#495464]/80 leading-relaxed"
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                >
                  Премиум локация за корпоративни и частни събития, където
                  изкуството не е фон, а добавя стойност, характер и престиж.
                  Галерийната атмосфера превръща всяка идея в преживяване —
                  подходящо за коктейли, продуктови премиери, бизнес срещи, PR
                  формати и заснемане.
                </p>
              </ScrollAnimation>
            </div>
            <div className="mb-8 rounded-lg overflow-hidden md:max-w-lg md:max-h-[400px]">
              <Image
                src="/zala1.jpg"
                alt="nOva art space зала за събития - Премиум пространство за събития в арт галерия София"
                width={1200}
                height={675}
                className="w-full h-auto object-cover md:max-h-[400px]"
                title="nOva art space - Премиум пространство за събития, София"
              />
            </div>
            <Link
              href="/kontakti#zapitvane"
              className="inline-flex items-center gap-2 bg-[#495464] text-white px-8 py-3 rounded-md font-medium hover:bg-[#495464]/90 transition-all duration-300 hover:shadow-lg hover:scale-105 group"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Изпрати запитване
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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
      </section>

      {/* Новини и акценти */}
      <section className="py-12 bg-gradient-to-br from-[#E8E8E8] to-[#F5F5F5] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl opacity-20 -mr-48 -mt-48"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-12 h-0.5 bg-[#495464]"></span>
              <span
                className="text-sm font-semibold text-[#495464] uppercase tracking-wider"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Новини
              </span>
            </div>

            {/* Главна новина */}
            {mainNews && (
              <div className="mb-8 pb-6 border-b-2 border-[#E8E8E8]">
                <div className="mb-4">
                  <span
                    className="inline-flex items-center gap-2 bg-[#495464] text-white px-5 py-2 rounded-full text-sm font-medium shadow-md"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    Главна новина
                  </span>
                </div>
                <h3
                  className="text-2xl md:text-3xl font-bold text-[#495464] mb-3"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  {mainNews.title}
                </h3>
                {mainNews.subtitle && (
                  <ScrollAnimation>
                    <p
                      className="text-lg text-[#495464]/70 mb-6"
                      style={{
                        fontFamily: "var(--font-montserrat), sans-serif",
                      }}
                    >
                      {mainNews.subtitle}
                    </p>
                  </ScrollAnimation>
                )}
                {mainNews.mainImage && (
                  <div className="mb-6 rounded-lg overflow-hidden md:max-w-lg md:max-h-[400px]">
                    <Image
                      src={mainNews.mainImage}
                      alt={`${mainNews.title} - Новини от nOva art space, арт галерия София`}
                      width={800}
                      height={500}
                      className="w-full h-auto object-cover md:max-h-[400px]"
                      title={`${mainNews.title} - Арт галерия София`}
                    />
                  </div>
                )}
              </div>
            )}

            <Link
              href="/novini"
              className="inline-flex items-center gap-2 bg-[#495464] text-white px-8 py-3 rounded-md font-medium hover:bg-[#495464]/90 transition-all duration-300 hover:shadow-lg hover:scale-105 group"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Виж всички новини
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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
      </section>

      {/* Контакти */}
      <section className="py-12 bg-white relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#E8E8E8] rounded-full blur-3xl opacity-30 -mr-48 -mb-48"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-12 h-0.5 bg-[#495464]"></span>
              <span
                className="text-sm font-semibold text-[#495464] uppercase tracking-wider"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Контакти
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#495464] mb-6"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Свържете се с нас
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#E8E8E8]/50 rounded-lg p-6 border border-[#E8E8E8] hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <IconLocation className="w-6 h-6 text-[#495464]" />
                  <h3
                    className="font-semibold text-[#495464]"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    Адрес
                  </h3>
                </div>
                <a
                  href="https://maps.google.com/?q=ул.+Съборна+№+3,+София"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#495464]/80 hover:text-[#495464] transition-colors duration-300 block"
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                >
                  гр. София, ул. Съборна № 3, ниво -1
                </a>
              </div>
              <div className="bg-[#E8E8E8]/50 rounded-lg p-6 border border-[#E8E8E8] hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <IconPhone className="w-6 h-6 text-[#495464]" />
                  <h3
                    className="font-semibold text-[#495464]"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    Телефон
                  </h3>
                </div>
                <a
                  href="tel:0888426610"
                  className="text-[#495464]/80 hover:text-[#495464] transition-colors duration-300 block"
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                >
                  0888 426 610
                </a>
              </div>
              <div className="bg-[#E8E8E8]/50 rounded-lg p-6 border border-[#E8E8E8] hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <IconMail className="w-6 h-6 text-[#495464]" />
                  <h3
                    className="font-semibold text-[#495464]"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    E-mail
                  </h3>
                </div>
                <a
                  href="mailto:novaartspace@gmail.com"
                  className="text-[#495464]/80 hover:text-[#495464] transition-colors duration-300 block"
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                >
                  novaartspace@gmail.com
                </a>
              </div>
              <div className="bg-[#E8E8E8]/50 rounded-lg p-6 border border-[#E8E8E8] hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <IconGlobe className="w-6 h-6 text-[#495464]" />
                  <h3
                    className="font-semibold text-[#495464]"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    Социални мрежи
                  </h3>
                </div>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://www.instagram.com/nova_art_space/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#495464]/80 hover:text-[#495464] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    Instagram
                  </a>
                  <a
                    href="https://www.facebook.com/artspacenOva"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#495464]/80 hover:text-[#495464] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-[#495464] to-[#3a4149] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3
                className="font-bold text-lg mb-4 text-white"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                nOva art space
              </h3>
              <p
                className="text-white/80 text-sm leading-relaxed"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                Съвременна галерия и премиум пространство за събития в сърцето
                на София.
              </p>
            </div>
            <div>
              <h3
                className="font-bold text-lg mb-4 text-white"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                Бързи връзки
              </h3>
              <ul
                className="space-y-2 text-sm text-white/80"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                <li>
                  <Link
                    href="/izlozhbi"
                    className="hover:text-white transition-colors duration-300"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    Изложби
                  </Link>
                </li>
                <li>
                  <Link
                    href="/subitiya"
                    className="hover:text-white transition-colors duration-300"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    Събития
                  </Link>
                </li>
                <li>
                  <Link
                    href="/novini"
                    className="hover:text-white transition-colors duration-300"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    Новини
                  </Link>
                </li>
                <li>
                  <Link
                    href="/za-nas"
                    className="hover:text-white transition-colors duration-300"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    За нас
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3
                className="font-bold text-lg mb-4 text-white"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                Свържете се
              </h3>
              <ul
                className="space-y-2 text-sm text-white/80"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                <li>
                  <a
                    href="tel:0888426610"
                    className="hover:text-white transition-colors duration-300 flex items-center gap-2"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    <IconPhone className="w-4 h-4 text-white/80" /> 0888 426 610
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:novaartspace@gmail.com"
                    className="hover:text-white transition-colors duration-300 flex items-center gap-2"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    <IconMail className="w-4 h-4 text-white/80" />{" "}
                    novaartspace@gmail.com
                  </a>
                </li>
                <li className="flex gap-4 pt-2">
                  <a
                    href="https://www.instagram.com/nova_art_space/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors duration-300"
                    aria-label="Instagram"
                  >
                    <IconInstagram className="w-6 h-6 text-white/80" />
                  </a>
                  <a
                    href="https://www.facebook.com/artspacenOva"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors duration-300"
                    aria-label="Facebook"
                  >
                    <IconFacebook className="w-6 h-6 text-white/80" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center">
            <p
              className="text-white/80 text-sm"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              © {new Date().getFullYear()} nOva art space. Всички права
              запазени.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
