"use client";

import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Link from "next/link";
import Image from "next/image";
import {
  IconOffice,
  IconBuilding,
  IconTheater,
  IconStairs,
  IconSpeaker,
  IconTV,
  IconLightBulb,
  IconDoor,
  IconPalette,
  IconShirt,
  IconNewspaper,
  IconBriefcase,
  IconChampagne,
  IconHandshake,
} from "../components/Icons";

export default function Subitiya() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState<string[]>([]);

  // Define all images for each category
  const concertImages = [
    "/concert1.jpg",
    "/concert2.jpg",
    "/concert3.jpg",
    "/concert4-ezgif.com-jpg-to-webp-converter.webp",
    "/concert5-ezgif.com-jpg-to-webp-converter.webp",
    "/concert6-ezgif.com-jpg-to-webp-converter.webp",
  ];

  const cocktailImages = [
    "/coctail1.jpg",
    "/coctail2.jpg",
    "/coctail5.jpg",
    "/coctail4.jpg",
    "/coctail3.jpg",
    "/coctail6.jpg",
  ];

  const seminarImages = [
    "/seminar1.jpg",
    "/seminar2.jpg",
    "/seminar3.jpg",
    "/seminar4.jpg",
    "/seminar5.jpg",
  ];

  const productImages = [
    "/product1.jpg",
    "/product2.jpg",
    "/product3.jpg",
    "/product4.jpg",
    "/product5.jpg",
    "/product6.jpg",
    "/product7.jpg",
  ];

  const openLightbox = (images: string[], index: number) => {
    setCurrentImages(images);
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "unset";
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + currentImages.length) % currentImages.length
    );
  };

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxOpen(false);
        document.body.style.overflow = "unset";
      } else if (e.key === "ArrowRight" && currentImages.length > 0) {
        setCurrentImageIndex((prev) => (prev + 1) % currentImages.length);
      } else if (e.key === "ArrowLeft" && currentImages.length > 0) {
        setCurrentImageIndex(
          (prev) => (prev - 1 + currentImages.length) % currentImages.length
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, currentImages.length]);

  return (
    <div className="min-h-screen bg-white" style={{ scrollBehavior: "smooth" }}>
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <Link
          href="/"
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
          Назад към началната страница
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <span className="w-12 h-0.5 bg-[#495464]"></span>
          <span className="text-sm font-semibold text-[#495464] uppercase tracking-wider">
            Събития
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#495464] mb-6">
          nOva art space – сцена за Вашите идеи
        </h1>
        <h2 className="text-2xl md:text-3xl text-[#495464]/90 mb-12 font-medium leading-relaxed">
          Пространство, създадено да издига всяка идея — с възможностите на
          галерия и въздействието на премиум локация.
        </h2>

        {/* Gallery Overview */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-12 h-0.5 bg-[#495464]"></span>
            <span className="text-sm font-semibold text-[#495464] uppercase tracking-wider">
              Галерия
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="#koncert"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('koncert');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-[#E8E8E8]/30 hover:scale-105"
            >
              <Image
                src="/concertmain.jpg"
                alt="Концерт"
                width={400}
                height={300}
                className="w-full h-auto object-contain"
              />
            </Link>
            <Link
              href="#kokteil"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('kokteil');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-[#E8E8E8]/30 hover:scale-105"
            >
              <Image
                src="/coctailmain.jpg"
                alt="Коктейл"
                width={400}
                height={300}
                className="w-full h-auto object-contain"
              />
            </Link>
            <Link
              href="#seminar"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('seminar');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-[#E8E8E8]/30 hover:scale-105"
            >
              <Image
                src="/seminarmain.jpg"
                alt="Семинар"
                width={400}
                height={300}
                className="w-full h-auto object-contain"
              />
            </Link>
            <Link
              href="#produkt"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('produkt');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-[#E8E8E8]/30 hover:scale-105"
            >
              <Image
                src="/productmain.jpg"
                alt="Продукт"
                width={400}
                height={300}
                className="w-full h-auto object-contain"
              />
            </Link>
          </div>
        </div>

        {/* Какво предлагаме */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-12 h-0.5 bg-[#495464]"></span>
            <span className="text-sm font-semibold text-[#495464] uppercase tracking-wider">
              Услуги
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#495464] mb-12">
            Какво предлагаме
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#E8E8E8]/30 rounded-lg p-6 border border-[#E8E8E8] hover:shadow-md transition-all duration-300 hover:bg-[#E8E8E8]/50">
              <IconOffice className="w-10 h-10 mb-4 text-[#495464]" />
              <h3 className="text-xl font-bold text-[#495464] mb-3">
                400 кв.м адаптивно пространство
              </h3>
              <p className="text-[#495464]/80 leading-relaxed">
                Гъвкава архитектура, която позволява изграждане на различни
                формати — от корпоративни срещи и коктейли до модни и PR
                събития. Пространството се персонализира спрямо концепцията на
                вашия бранд.
              </p>
            </div>

            <div className="bg-[#E8E8E8]/30 rounded-lg p-6 border border-[#E8E8E8] hover:shadow-md transition-all duration-300 hover:bg-[#E8E8E8]/50">
              <IconBuilding className="w-10 h-10 mb-4 text-[#495464]" />
              <h3 className="text-xl font-bold text-[#495464] mb-3">
                Високи тавани за премиум присъствие
              </h3>
              <p className="text-[#495464]/80 leading-relaxed">
                Впечатляващ вертикален обем, който създава усещане за свобода,
                стил и престиж — идеална среда за събития, които искат да
                оставят следа.
              </p>
            </div>

            <div className="bg-[#E8E8E8]/30 rounded-lg p-6 border border-[#E8E8E8] hover:shadow-md transition-all duration-300 hover:bg-[#E8E8E8]/50">
              <IconTheater className="w-10 h-10 mb-4 text-[#495464]" />
              <h3 className="text-xl font-bold text-[#495464] mb-3">
                Професионален подиум / сцена
              </h3>
              <p className="text-[#495464]/80 leading-relaxed">
                Изцяло оборудвана зона за презентации, модни ревюта, дискусии и
                специални акценти. Сцената е проектирана да поставя фокуса там,
                където трябва да бъде — върху вашето послание.
              </p>
            </div>

            <div className="bg-[#E8E8E8]/30 rounded-lg p-6 border border-[#E8E8E8] hover:shadow-md transition-all duration-300 hover:bg-[#E8E8E8]/50">
              <IconStairs className="w-10 h-10 mb-4 text-[#495464]" />
              <h3 className="text-xl font-bold text-[#495464] mb-3">
                Ескалаторен достъп
              </h3>
              <p className="text-[#495464]/80 leading-relaxed">
                Уникален елемент, който предлага запомнящо се влизане и
                максимално удобство. Детайл, който подсилва усещането за премиум
                пространство още от първата секунда.
              </p>
            </div>

            <div className="bg-[#E8E8E8]/30 rounded-lg p-6 border border-[#E8E8E8] hover:shadow-md transition-all duration-300 hover:bg-[#E8E8E8]/50">
              <IconSpeaker className="w-10 h-10 mb-4 text-[#495464]" />
              <h3 className="text-xl font-bold text-[#495464] mb-3">
                Професионално озвучаване
              </h3>
              <p className="text-[#495464]/80 leading-relaxed">
                Висококачествена аудио система с професионални микрофони,
                тонколони и аудио пулт, гарантиращи кристален и равномерен звук
                за всякакъв тип формати — реч, музика, лайв изпълнения.
              </p>
            </div>

            <div className="bg-[#E8E8E8]/30 rounded-lg p-6 border border-[#E8E8E8] hover:shadow-md transition-all duration-300 hover:bg-[#E8E8E8]/50">
              <IconTV className="w-10 h-10 mb-4 text-[#495464]" />
              <h3 className="text-xl font-bold text-[#495464] mb-3">
                Мултимедийна техника и брандинг решения
              </h3>
              <p className="text-[#495464]/80 leading-relaxed">
                Екрани 75" и 55", възможности за визуална идентичност и
                дигитални акценти. Подходящо за презентации, премиери,
                продуктови активации и корпоративни събития.
              </p>
            </div>

            <div className="bg-[#E8E8E8]/30 rounded-lg p-6 border border-[#E8E8E8] hover:shadow-md transition-all duration-300 hover:bg-[#E8E8E8]/50">
              <IconLightBulb className="w-10 h-10 mb-4 text-[#495464]" />
              <h3 className="text-xl font-bold text-[#495464] mb-3">
                Галерийно осветление
              </h3>
              <p className="text-[#495464]/80 leading-relaxed">
                Професионално светлинно оформление, което подчертава детайла и
                създава отлична атмосфера за фото, видео и premium имидж
                комуникация.
              </p>
            </div>

            <div className="bg-[#E8E8E8]/30 rounded-lg p-6 border border-[#E8E8E8] hover:shadow-md transition-all duration-300 hover:bg-[#E8E8E8]/50">
              <IconDoor className="w-10 h-10 mb-4 text-[#495464]" />
              <h3 className="text-xl font-bold text-[#495464] mb-3">
                Депо / Backstage зона
              </h3>
              <p className="text-[#495464]/80 leading-relaxed">
                Функционално оборудвана бекстейдж площ за подготовка на
                участници, екип и логистика — идеална за модни ревюта,
                артистични формати и корпоративни събития със сложна
                организация.
              </p>
            </div>
          </div>
        </div>

        {/* Подходящо за */}
        <div className="mb-16 bg-gradient-to-br from-[#E8E8E8] to-[#F5F5F5] p-8 md:p-12 rounded-lg border border-[#E8E8E8] shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-0.5 bg-[#495464]"></span>
            <span className="text-sm font-semibold text-[#495464] uppercase tracking-wider">
              Формати
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#495464] mb-8">
            Подходящо за:
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <IconPalette className="w-5 h-5 mt-1 text-[#495464]" />
              <span className="text-lg text-[#495464]/80">Изложби</span>
            </div>
            <div className="flex items-start gap-3">
              <IconBriefcase className="w-5 h-5 mt-1 text-[#495464]" />
              <span className="text-lg text-[#495464]/80">
                Корпоративни срещи и презентации
              </span>
            </div>
            <div className="flex items-start gap-3">
              <IconNewspaper className="w-5 h-5 mt-1 text-[#495464]" />
              <span className="text-lg text-[#495464]/80">
                PR и медийни събития
              </span>
            </div>
            <div className="flex items-start gap-3">
              <IconShirt className="w-5 h-5 mt-1 text-[#495464]" />
              <span className="text-lg text-[#495464]/80">
                Модни формати и продуктови премиери
              </span>
            </div>
            <div className="flex items-start gap-3">
              <IconChampagne className="w-5 h-5 mt-1 text-[#495464]" />
              <span className="text-lg text-[#495464]/80">
                Частни коктейли и специални поводи
              </span>
            </div>
            <div className="flex items-start gap-3">
              <IconHandshake className="w-5 h-5 mt-1 text-[#495464]" />
              <span className="text-lg text-[#495464]/80">
                Ексклузивни бизнес срещи и networking събития
              </span>
            </div>
          </div>
        </div>

        {/* Общо послание */}
        <div className="mb-12 bg-white/60 backdrop-blur-sm rounded-lg p-8 border-l-4 border-[#495464]">
          <p className="text-xl text-[#495464] leading-relaxed italic">
            В nOva art space пространството не е просто фон — то е активен
            елемент, който оформя впечатление, стил и стойност. Вашето събитие
            става изживяване, което гостите помнят.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center mb-16">
          <Link
            href="/kontakti#zapitvane"
            className="inline-flex items-center gap-2 bg-[#495464] text-white px-8 py-3 rounded-md font-medium hover:bg-[#495464]/90 transition-all duration-300 hover:shadow-lg hover:scale-105 group"
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

        {/* Concert Gallery Section */}
        <div id="koncert" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#495464] mb-8">
            Концертни събития
          </h2>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {concertImages.map((src, index) => (
              <div
                key={src}
                onClick={() => openLightbox(concertImages, index)}
                className="break-inside-avoid rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-[#E8E8E8]/30 mb-6 cursor-pointer"
              >
                <Image
                  src={src}
                  alt={`Концерт ${index + 1}`}
                  width={400}
                  height={300}
                  className="w-full h-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Cocktail Gallery Section */}
        <div id="kokteil" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#495464] mb-8">
            Коктейлни събития
          </h2>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {cocktailImages.map((src, index) => (
              <div
                key={src}
                onClick={() => openLightbox(cocktailImages, index)}
                className="break-inside-avoid rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-[#E8E8E8]/30 mb-6 cursor-pointer"
              >
                <Image
                  src={src}
                  alt={`Коктейл ${index + 1}`}
                  width={400}
                  height={300}
                  className="w-full h-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Seminar Gallery Section */}
        <div id="seminar" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#495464] mb-8">
            Семинарни събития
          </h2>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {seminarImages.map((src, index) => (
              <div
                key={src}
                onClick={() => openLightbox(seminarImages, index)}
                className="break-inside-avoid rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-[#E8E8E8]/30 mb-6 cursor-pointer"
              >
                <Image
                  src={src}
                  alt={`Семинар ${index + 1}`}
                  width={400}
                  height={300}
                  className="w-full h-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Gallery Section */}
        <div id="produkt" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#495464] mb-8">
            Продуктови събития
          </h2>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {productImages.map((src, index) => (
              <div
                key={src}
                onClick={() => openLightbox(productImages, index)}
                className="break-inside-avoid rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-[#E8E8E8]/30 mb-6 cursor-pointer"
              >
                <Image
                  src={src}
                  alt={`Продукт ${index + 1}`}
                  width={400}
                  height={300}
                  className="w-full h-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 p-2"
              aria-label="Затвори"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Previous button */}
            {currentImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 p-2 bg-black/50 rounded-full"
                aria-label="Предишна снимка"
              >
                <svg
                  className="w-8 h-8"
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
              </button>
            )}

            {/* Next button */}
            {currentImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 p-2 bg-black/50 rounded-full"
                aria-label="Следваща снимка"
              >
                <svg
                  className="w-8 h-8"
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
              </button>
            )}

            {/* Image container */}
            <div
              className="relative max-w-7xl max-h-[90vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={currentImages[currentImageIndex]}
                alt={`Снимка ${currentImageIndex + 1}`}
                width={1200}
                height={800}
                className="max-w-full max-h-[90vh] object-contain"
                priority
              />
              {/* Image counter */}
              {currentImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-sm">
                  {currentImageIndex + 1} / {currentImages.length}
                </div>
              )}
            </div>
          </div>
        </>
      )}

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
