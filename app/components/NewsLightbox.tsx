"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useNewsGallery } from "./NewsGalleryContext";
import { isYouTubeUrl, getYouTubeEmbedUrl } from "../lib/youtube";

export default function NewsLightbox({ title }: { title: string }) {
  const {
    allImages,
    lightboxOpen,
    setLightboxOpen,
    currentImageIndex,
    setCurrentImageIndex,
  } = useNewsGallery();

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "unset";
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + allImages.length) % allImages.length
    );
  };

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        setCurrentImageIndex(
          (prev) => (prev - 1 + allImages.length) % allImages.length
        );
      } else if (e.key === "ArrowRight") {
        setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, allImages.length, setCurrentImageIndex]);

  if (!lightboxOpen || allImages.length === 0) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
        onClick={closeLightbox}
      >
        {/* Close button */}
        <button
          onClick={closeLightbox}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 p-2 bg-black/50 rounded-full hover:bg-black/70"
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
        {allImages.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 p-2 bg-black/50 rounded-full hover:bg-black/70"
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
        {allImages.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 p-2 bg-black/50 rounded-full hover:bg-black/70"
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

        {/* Image/Video container */}
        <div
          className={`relative max-w-9xl max-h-[97vh] ${
            isYouTubeUrl(allImages[currentImageIndex]) ? "mx-0" : "mx-4"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {isYouTubeUrl(allImages[currentImageIndex]) ? (
            <div className="w-[90vw] max-w-[1400px] aspect-video mx-auto">
              <iframe
                src={
                  getYouTubeEmbedUrl(allImages[currentImageIndex], true) || ""
                }
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <Image
              src={allImages[currentImageIndex]}
              alt={`${title} - Снимка ${currentImageIndex + 1}`}
              width={1200}
              height={800}
              className="max-w-full max-h-[90vh] object-contain"
              style={{ height: "auto" }}
              priority
            />
          )}
          {/* Image/Video counter */}
          {allImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-sm">
              {currentImageIndex + 1} / {allImages.length}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
