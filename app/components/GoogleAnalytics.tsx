"use client";

import Script from "next/script";
import { GA_MEASUREMENT_ID } from "../lib/gtag";

export default function GoogleAnalytics() {
  // Don't render if GA_MEASUREMENT_ID is not set
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
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
  );
}
