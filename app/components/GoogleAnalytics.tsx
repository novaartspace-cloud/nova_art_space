"use client";

import Script from "next/script";
import { GA_MEASUREMENT_ID } from "../lib/gtag";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { pageview } from "../lib/gtag";

export default function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname && GA_MEASUREMENT_ID) {
      pageview(pathname);
    }
  }, [pathname]);

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
          `,
        }}
      />
    </>
  );
}
