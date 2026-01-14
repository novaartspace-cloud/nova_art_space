"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  isYouTubeUrl,
  getYouTubeEmbedUrl,
  getYouTubeThumbnail,
  extractYouTubeId,
} from "../lib/youtube";

interface ExhibitionGalleryProps {
  images: string[];
  title: string;
}

export default function ExhibitionGallery({
  images,
  title,
}: ExhibitionGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "unset";
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        setCurrentImageIndex(
          (prev) => (prev - 1 + images.length) % images.length
        );
      } else if (e.key === "ArrowRight") {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, images.length]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, idx) => {
          if (!image || !image.trim()) return null;

          const isYouTube = isYouTubeUrl(image);
          const thumbnail = isYouTube ? getYouTubeThumbnail(image) : null;

          return (
            <div
              key={idx}
              onClick={() => openLightbox(idx)}
              className="rounded-lg overflow-hidden aspect-[4/3] cursor-pointer hover:opacity-90 transition-opacity duration-300 relative group"
            >
              {isYouTube && thumbnail ? (
                <>
                  <img
                    src={thumbnail}
                    alt={`${title} - Видео ${idx + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if thumbnail fails to load
                      const target = e.target as HTMLImageElement;
                      target.src = `https://img.youtube.com/vi/${
                        extractYouTubeId(image) || ""
                      }/hqdefault.jpg`;
                    }}
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </>
              ) : isYouTube ? (
                // Fallback if thumbnail is null but it's YouTube
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              ) : (
                <Image
                  src={image}
                  alt={`${title} - Снимка ${idx + 1}`}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                  style={{ width: "auto" }}
                />
              )}
            </div>
          );
        })}
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
            {images.length > 1 && (
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
            {images.length > 1 && (
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
                isYouTubeUrl(images[currentImageIndex]) ? "mx-0" : "mx-4"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {isYouTubeUrl(images[currentImageIndex]) ? (
                <div className="w-[90vw] max-w-[1400px] aspect-video mx-auto">
                  <iframe
                    src={
                      getYouTubeEmbedUrl(images[currentImageIndex], true) || ""
                    }
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <Image
                  src={images[currentImageIndex]}
                  alt={`${title} - Снимка ${currentImageIndex + 1}`}
                  width={1200}
                  height={800}
                  className="max-w-full max-h-[90vh] object-contain"
                  style={{ height: "auto" }}
                  priority
                />
              )}
              {/* Image/Video counter */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
