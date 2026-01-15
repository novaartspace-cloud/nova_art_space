"use client";

import { useEffect, useState, useRef } from "react";
import Script from "next/script";
import { GA_MEASUREMENT_ID } from "../lib/gtag";
import { hasAnalyticsConsent, hasConsentDecision } from "../lib/cookie-consent";

export default function GoogleAnalytics() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [consentGranted, setConsentGranted] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Check if user has made a consent decision
    const checkConsent = () => {
      if (hasConsentDecision()) {
        const hasConsent = hasAnalyticsConsent();
        setConsentGranted(hasConsent);
        setShouldLoad(hasConsent);
      } else {
        // If no decision yet, don't load but initialize consent mode
        setShouldLoad(false);
        setConsentGranted(false);
      }
    };

    // Initial check
    checkConsent();

    // Listen for consent updates
    const handleConsentUpdate = (event: CustomEvent) => {
      const analyticsConsent = event.detail?.analytics ?? false;
      setConsentGranted(analyticsConsent);
      setShouldLoad(analyticsConsent);
      
      // Update gtag consent if it's already loaded
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('consent', 'update', {
          'analytics_storage': analyticsConsent ? 'granted' : 'denied',
          'ad_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied'
        });
      } else if (analyticsConsent && !scriptLoadedRef.current) {
        // Load script if consent granted but script not loaded
        loadGoogleAnalytics();
      }
    };

    // Function to dynamically load Google Analytics
    const loadGoogleAnalytics = () => {
      if (scriptLoadedRef.current || !GA_MEASUREMENT_ID || typeof window === 'undefined') return;
      
      // Check if already loaded
      if ((window as any).gtag) {
        scriptLoadedRef.current = true;
        setScriptLoaded(true);
        return;
      }
      
      // Load gtag.js script
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script1);
      
      // Load configuration script
      const script2 = document.createElement('script');
      script2.id = 'google-analytics-dynamic';
      script2.innerHTML = `
        gtag('consent', 'update', {
          'analytics_storage': 'granted',
          'ad_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied'
        });
        
        gtag('config', '${GA_MEASUREMENT_ID}', {
          page_path: window.location.pathname,
        });
        
        // Track Next.js route changes
        if (typeof window !== 'undefined') {
          const originalPushState = history.pushState;
          const originalReplaceState = history.replaceState;
          
          history.pushState = function() {
            originalPushState.apply(history, arguments);
            if (window.gtag) {
              window.gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            }
          };
          
          history.replaceState = function() {
            originalReplaceState.apply(history, arguments);
            if (window.gtag) {
              window.gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            }
          };
          
          window.addEventListener('popstate', function() {
            if (window.gtag) {
              window.gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            }
          });
        }
      `;
      document.head.appendChild(script2);
      
      scriptLoadedRef.current = true;
      setScriptLoaded(true);
    };

    window.addEventListener('cookieConsentUpdated', handleConsentUpdate as EventListener);

    return () => {
      window.removeEventListener('cookieConsentUpdated', handleConsentUpdate as EventListener);
    };
  }, []);

  // Don't render if GA_MEASUREMENT_ID is not set
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      {/* Initialize dataLayer and consent mode BEFORE loading gtag.js */}
      <Script
        id="google-analytics-consent"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            // Set default consent mode based on user's choice
            const consentCookie = document.cookie.split(';').find(c => c.trim().startsWith('cookie_consent='));
            let analyticsConsent = 'denied';
            
            if (consentCookie) {
              try {
                const value = consentCookie.split('=')[1];
                const decoded = decodeURIComponent(value);
                const parsed = JSON.parse(decoded);
                analyticsConsent = parsed.analytics === true ? 'granted' : 'denied';
              } catch (e) {
                analyticsConsent = 'denied';
              }
            }
            
            gtag('consent', 'default', {
              'analytics_storage': analyticsConsent,
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'wait_for_update': 500,
            });
            
            gtag('js', new Date());
          `,
        }}
      />
      {/* Only load Google Analytics if user has consented on initial load */}
      {shouldLoad && !scriptLoaded && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            onLoad={() => {
              scriptLoadedRef.current = true;
              setScriptLoaded(true);
            }}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                // Update consent to granted if user has accepted
                if (${consentGranted}) {
                  gtag('consent', 'update', {
                    'analytics_storage': 'granted',
                    'ad_storage': 'denied',
                    'ad_user_data': 'denied',
                    'ad_personalization': 'denied'
                  });
                }
                
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
                
                // Track Next.js route changes
                if (typeof window !== 'undefined') {
                  const originalPushState = history.pushState;
                  const originalReplaceState = history.replaceState;
                  
                  history.pushState = function() {
                    originalPushState.apply(history, arguments);
                    if (window.gtag) {
                      window.gtag('config', '${GA_MEASUREMENT_ID}', {
                        page_path: window.location.pathname,
                      });
                    }
                  };
                  
                  history.replaceState = function() {
                    originalReplaceState.apply(history, arguments);
                    if (window.gtag) {
                      window.gtag('config', '${GA_MEASUREMENT_ID}', {
                        page_path: window.location.pathname,
                      });
                    }
                  };
                  
                  window.addEventListener('popstate', function() {
                    if (window.gtag) {
                      window.gtag('config', '${GA_MEASUREMENT_ID}', {
                        page_path: window.location.pathname,
                      });
                    }
                  });
                }
              `,
            }}
          />
        </>
      )}
    </>
  );
}
