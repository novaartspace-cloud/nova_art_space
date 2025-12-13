"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
  {
    id: 1,
    title: "Изкуството разказва своята история",
    subtitle:
      "Настоящата изложба събира творби, които говорят чрез детайл, жест и чувство.",
    text: "Класически и съвременни автори, обединени в селекция, която се усеща, преди да се види. Произведения, които споделят свои истини, разкриват нови светове и намират място в собственото ни въображение.",
    cta: "Разгледай изложбата",
    href: "/izlozhbi",
  },
  {
    id: 2,
    title: "Пространството, в което всяко събитие се превръща в изкуство",
    subtitle:
      "Изкуството е нашият отличителен знак — атмосфера, която издига всяко събитие и му придава естествена елегантност.",
    text: "В nOva art space - пространството работи за идеята ви. Галерийната среда оформя стил, задава присъствие и превръща всеки момент в изживяване с характер. Изкуството е част от самата концепция — силен визуален и емоционален акцент, който създава онова незабравимо първо впечатление и остава в съзнанието на гостите.",
    cta: "Организирай събитие",
    href: "/subitiya",
  },
  {
    id: 3,
    title: "Пространство, в което изкуство и бизнес се срещат",
    subtitle:
      "nOva art space обединява галерия от висок клас и премиум среда за събития — място, което създава стойност във всяко свое измерение.",
    text: "Тук изкуството задава стандарта, а пространството го следва. Представяме ценни класически автори и водещи съвременни имена в среда, която говори за престиж, характер и визия. nOva art space е изборът на клиенти, които разбират силата на естетиката — в културата, в бизнеса и в начина, по който се изгражда впечатление.",
    cta: "Научи повече",
    href: "/za-nas",
  },
];

export default function MainSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full min-h-[500px] md:h-[600px] bg-[#E8E8E8] pt-24 md:pt-0">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-0 h-full flex items-center">
            <div className="max-w-3xl w-full">
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 text-[#495464] leading-tight">
                {slide.title}
              </h1>
              <h2 className="text-base sm:text-lg md:text-2xl mb-4 md:mb-6 text-[#495464]/90 font-medium leading-snug">
                {slide.subtitle}
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 md:mb-8 text-[#495464]/80 leading-relaxed">
                {slide.text}
              </p>
              <Link
                href={slide.href}
                className="inline-block bg-[#495464] text-white px-6 py-2.5 md:px-8 md:py-3 rounded-md text-sm md:text-base font-medium hover:bg-[#495464]/90 transition-colors"
              >
                {slide.cta}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide
                ? "bg-[#495464] w-8"
                : "bg-[#BBBFCA] w-2 hover:bg-[#495464]/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows - Hidden on mobile, shown on desktop */}
      <button
        onClick={() =>
          setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
        }
        className="hidden md:flex absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-[#495464] p-2 rounded-full transition-colors z-20"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6"
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
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="hidden md:flex absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-[#495464] p-2 rounded-full transition-colors z-20"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6"
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
    </div>
  );
}
