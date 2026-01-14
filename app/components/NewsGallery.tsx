"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useNewsGallery } from "./NewsGalleryContext";
import { isYouTubeUrl, getYouTubeThumbnail, extractYouTubeId } from "../lib/youtube";

interface NewsGalleryProps {
  mainImage?: string;
  images: string[];
  title: string;
  showOnlyMain?: boolean;
  showOnlyGallery?: boolean;
}

export default function NewsGallery({
  mainImage,
  images,
  title,
  showOnlyMain = false,
  showOnlyGallery = false,
}: NewsGalleryProps) {
  const {
    allImages,
    setAllImages,
    lightboxOpen,
    setLightboxOpen,
    currentImageIndex,
    setCurrentImageIndex,
  } = useNewsGallery();

  // Update allImages when props change
  useEffect(() => {
    const combined = mainImage ? [mainImage, ...images] : images;
    setAllImages(combined);
  }, [mainImage, images, setAllImages]);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  if (allImages.length === 0 && !mainImage) return null;

  return (
    <>
      {/* Main Image/Video */}
      {mainImage && !showOnlyGallery && (
        <div
          onClick={() => openLightbox(0)}
          className="mb-8 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity duration-300 relative group"
        >
          {isYouTubeUrl(mainImage) ? (
            <>
              {getYouTubeThumbnail(mainImage) ? (
                <img
                  src={getYouTubeThumbnail(mainImage) || ""}
                  alt={title}
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    // Fallback if thumbnail fails to load
                    const target = e.target as HTMLImageElement;
                    target.src = `https://img.youtube.com/vi/${extractYouTubeId(mainImage) || ''}/hqdefault.jpg`;
                  }}
                />
              ) : (
                <div className="w-full aspect-video bg-gray-800 flex items-center justify-center">
                  <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-white ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </>
          ) : (
            <Image
              src={mainImage}
              alt={title}
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
            />
          )}
        </div>
      )}

      {/* Gallery Images */}
      {images.length > 0 && !showOnlyMain && (
        <div>
          <div className="flex items-center gap-3 mb-8">
            <span className="w-12 h-0.5 bg-[#495464]"></span>
            <span className="text-sm font-semibold text-[#495464] uppercase tracking-wider">
              Галерия
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, idx) => {
              if (!image || !image.trim()) return null;
              
              const isYouTube = isYouTubeUrl(image);
              const thumbnail = isYouTube ? getYouTubeThumbnail(image) : null;
              
              return (
                <div
                  key={idx}
                  onClick={() => openLightbox(mainImage ? idx + 1 : idx)}
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
                          target.src = `https://img.youtube.com/vi/${extractYouTubeId(image) || ''}/hqdefault.jpg`;
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
        </div>
      )}

    </>
  );
}

