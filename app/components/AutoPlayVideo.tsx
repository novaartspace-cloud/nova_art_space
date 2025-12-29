"use client";

import { useEffect, useRef, useState } from "react";

interface AutoPlayVideoProps {
  src: string;
  className?: string;
}

export default function AutoPlayVideo({ src, className }: AutoPlayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const hasUserInteractedRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Track user interaction (scroll, click, etc.) - this enables sound
    const handleUserInteraction = () => {
      if (!hasUserInteractedRef.current) {
        hasUserInteractedRef.current = true;
        setHasUserInteracted(true);
      }
      
      // If video is in viewport, play it with sound
      const rect = video.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isInViewport && hasUserInteractedRef.current) {
        video.muted = false;
        if (video.paused) {
          video.play().catch((error) => {
            console.log("Video play with sound failed:", error);
          });
        }
      }
    };

    // Listen for scroll events - main interaction
    window.addEventListener("scroll", handleUserInteraction, { passive: true });
    
    // Listen for other interactions
    const onceEvents = ["click", "touchstart", "keydown"];
    const cleanupFunctions: (() => void)[] = [];
    
    onceEvents.forEach((event) => {
      const handler = () => handleUserInteraction();
      document.addEventListener(event, handler, { once: true, passive: true });
      cleanupFunctions.push(() => document.removeEventListener(event, handler));
    });

    // Set up intersection observer to play video when it enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Video entered viewport
            // If user has interacted (scrolled), play with sound
            // Otherwise play muted
            video.muted = !hasUserInteractedRef.current;
            
            video.play().catch((error) => {
              console.log("Video play failed:", error);
              // If play failed and user hasn't interacted, try muted
              if (!hasUserInteractedRef.current) {
                video.muted = true;
                video.play().catch(() => {
                  console.log("Muted play also failed");
                });
              }
            });
          } else {
            // Video left viewport - pause it
            video.pause();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleUserInteraction);
      cleanupFunctions.forEach((cleanup) => cleanup());
    };
  }, []);

  // Unmute video when user has interacted
  useEffect(() => {
    const video = videoRef.current;
    if (video && hasUserInteracted) {
      video.muted = false;
    }
  }, [hasUserInteracted]);

  return (
    <video
      ref={videoRef}
      src={src}
      loop
      playsInline
      muted={!hasUserInteracted}
      preload="auto"
      className={className}
    />
  );
}
