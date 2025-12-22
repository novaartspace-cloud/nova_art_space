"use client";

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface NewsGalleryContextType {
  allImages: string[];
  setAllImages: (images: string[]) => void;
  lightboxOpen: boolean;
  setLightboxOpen: (open: boolean) => void;
  currentImageIndex: number;
  setCurrentImageIndex: Dispatch<SetStateAction<number>>;
}

const NewsGalleryContext = createContext<NewsGalleryContextType | undefined>(
  undefined
);

export function NewsGalleryProvider({ children }: { children: ReactNode }) {
  const [allImages, setAllImages] = useState<string[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <NewsGalleryContext.Provider
      value={{
        allImages,
        setAllImages,
        lightboxOpen,
        setLightboxOpen,
        currentImageIndex,
        setCurrentImageIndex,
      }}
    >
      {children}
    </NewsGalleryContext.Provider>
  );
}

export function useNewsGallery() {
  const context = useContext(NewsGalleryContext);
  if (!context) {
    throw new Error("useNewsGallery must be used within NewsGalleryProvider");
  }
  return context;
}

