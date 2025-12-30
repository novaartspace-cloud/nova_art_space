"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { CarouselSlide } from "../lib/carousel";
import { CarouselMobileSlide } from "../lib/carousel_mobile";

interface MainSliderProps {
  slides: CarouselSlide[];
  mobileSlides?: CarouselMobileSlide[];
}

export default function MainSlider({
  slides,
  mobileSlides = [],
}: MainSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const slideDirectionRef = useRef<"next" | "prev">("next");

  // Detect if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Determine which slides to use
  const activeSlides =
    isMobile && mobileSlides && mobileSlides.length > 0 ? mobileSlides : slides;

  // If no slides from database, don't render
  if (!activeSlides || activeSlides.length === 0) {
    return null;
  }

  // Function to start/reset the timer
  const startTimer = useCallback(() => {
    // Clear existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Start new timer
    timerRef.current = setInterval(() => {
      if (slideDirectionRef.current === "next") {
        setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
      } else {
        setCurrentSlide(
          (prev) => (prev - 1 + activeSlides.length) % activeSlides.length
        );
      }
    }, 3000);
  }, [activeSlides.length]);

  useEffect(() => {
    if (activeSlides.length === 0) return;

    // Reset to first slide when switching between mobile/desktop
    setCurrentSlide(0);

    // Start initial timer
    startTimer();

    // Cleanup on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [activeSlides.length, startTimer, isMobile]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
    setDragOffset(0);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const currentTouch = e.targetTouches[0].clientX;
    const diff = touchStart - currentTouch;
    setDragOffset(-diff);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) {
      setIsDragging(false);
      setDragOffset(0);
      return;
    }

    const touchEndPos = e.changedTouches[0].clientX;
    const distance = touchStart - touchEndPos;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      slideDirectionRef.current = "next";
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
      startTimer();
    } else if (isRightSwipe) {
      slideDirectionRef.current = "prev";
      setCurrentSlide(
        (prev) => (prev - 1 + activeSlides.length) % activeSlides.length
      );
      startTimer();
    }

    setIsDragging(false);
    setDragOffset(0);
    setTouchStart(null);
    setTouchEnd(null);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setTouchEnd(null);
    setTouchStart(e.clientX);
    setIsDragging(true);
    setDragOffset(0);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || touchStart === null) return;
    const diff = touchStart - e.clientX;
    setDragOffset(-diff);
  };

  const onMouseUp = (e: React.MouseEvent) => {
    if (!touchStart) {
      setIsDragging(false);
      setDragOffset(0);
      return;
    }

    const mouseEndPos = e.clientX;
    const distance = touchStart - mouseEndPos;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      slideDirectionRef.current = "next";
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
      startTimer();
    } else if (isRightSwipe) {
      slideDirectionRef.current = "prev";
      setCurrentSlide(
        (prev) => (prev - 1 + activeSlides.length) % activeSlides.length
      );
      startTimer();
    }

    setIsDragging(false);
    setDragOffset(0);
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div
      className="relative w-full h-[500px] md:h-[85vh] bg-white pt-0 overflow-hidden select-none"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={() => {
        setIsDragging(false);
        setDragOffset(0);
        setTouchStart(null);
        setTouchEnd(null);
      }}
    >
      <div ref={containerRef} className="relative w-full h-full">
        {activeSlides.map((slide, index) => {
          const slideOffset = index - currentSlide;
          const isActive = index === currentSlide;

          // Calculate transform with drag offset
          let transformX = slideOffset * 100;
          if (isDragging && isActive && containerRef.current) {
            // Convert pixel offset to percentage based on container width
            const containerWidth = containerRef.current.offsetWidth;
            transformX += (dragOffset / containerWidth) * 100;
          }

          return (
            <div
              key={slide.id}
              className="absolute inset-0"
              style={{
                transform: `translateX(${transformX}%)`,
                transition: isDragging
                  ? "none"
                  : "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                opacity: Math.abs(slideOffset) <= 1 ? 1 : 0,
                zIndex: isActive ? 10 : Math.abs(slideOffset),
                visibility: Math.abs(slideOffset) <= 1 ? "visible" : "hidden",
              }}
            >
              <Link
                href={slide.link_url}
                className="block w-full h-full cursor-pointer"
                onClick={(e) => {
                  if (isDragging) {
                    e.preventDefault();
                  }
                }}
              >
                <div className="relative w-full h-full min-h-[500px] md:min-h-0 flex items-center justify-center">
                  <Image
                    src={slide.image_url}
                    alt={`Carousel slide ${index + 1}`}
                    fill
                    className="object-cover md:object-contain"
                    priority={index === 0}
                    draggable={false}
                    sizes="100vw"
                  />
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full">
        {activeSlides.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              goToSlide(index);
              // Determine direction based on index
              if (index > currentSlide) {
                slideDirectionRef.current = "next";
              } else if (index < currentSlide) {
                slideDirectionRef.current = "prev";
              }
              startTimer();
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-[#495464] w-8 shadow-md"
                : "bg-[#BBBFCA] w-2 hover:bg-[#495464]/50 hover:w-4"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows - Visible on all devices */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!isDragging) {
            // Set direction to previous
            slideDirectionRef.current = "prev";
            // Change slide immediately
            setCurrentSlide(
              (prev) => (prev - 1 + activeSlides.length) % activeSlides.length
            );
            // Restart timer
            startTimer();
          }
        }}
        className="flex absolute left-2 md:left-8 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-[#495464] p-2 md:p-3 rounded-full transition-all duration-300 z-20 shadow-lg hover:shadow-xl hover:scale-110 group"
        aria-label="Previous slide"
      >
        <svg
          className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:-translate-x-1"
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
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!isDragging) {
            // Set direction to next
            slideDirectionRef.current = "next";
            // Change slide immediately
            setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
            // Restart timer
            startTimer();
          }
        }}
        className="flex absolute right-2 md:right-8 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-[#495464] p-2 md:p-3 rounded-full transition-all duration-300 z-20 shadow-lg hover:shadow-xl hover:scale-110 group"
        aria-label="Next slide"
      >
        <svg
          className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:translate-x-1"
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
