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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Try to play video immediately when it loads (muted by default)
    const tryAutoPlay = () => {
      video.muted = true; // Start muted to allow autoplay
      video.play().catch((error) => {
        console.log("Initial autoplay failed, will try when in viewport:", error);
      });
    };

    // Try autoplay when video metadata is loaded
    if (video.readyState >= 2) {
      // Video already loaded
      tryAutoPlay();
    } else {
      video.addEventListener("loadedmetadata", tryAutoPlay, { once: true });
    }

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
      video.removeEventListener("loadedmetadata", tryAutoPlay);
    };
  }, []);

  // Unmute video when user has interacted
  useEffect(() => {
    const video = videoRef.current;
    if (video && hasUserInteracted) {
      video.muted = false;
      setIsMuted(false);
    }
  }, [hasUserInteracted]);

  // Update playing state when video state changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleVolumeChange = () => setIsMuted(video.muted);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("volumechange", handleVolumeChange);

    // Set initial state
    setIsPlaying(!video.paused);
    setIsMuted(video.muted);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("volumechange", handleVolumeChange);
    };
  }, []);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch((error) => {
        console.log("Video play failed:", error);
      });
    } else {
      video.pause();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <div className="relative group">
      <video
        ref={videoRef}
        src={src}
        loop
        playsInline
        autoPlay
        muted={!hasUserInteracted}
        preload="auto"
        className={className}
      />
      
      {/* Video Controls */}
      <div className="absolute bottom-4 right-4 flex gap-2 z-10 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
        {/* Play/Pause Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            togglePlayPause();
          }}
          className="bg-white/90 hover:bg-white text-[#495464] p-2.5 md:p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 active:scale-95"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? (
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Mute/Unmute Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleMute();
          }}
          className="bg-white/90 hover:bg-white text-[#495464] p-2.5 md:p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 active:scale-95"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? (
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
