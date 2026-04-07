// Site configuration - uses environment variables with fallbacks
// This ensures the site works even without a custom domain

export const getSiteUrl = (): string => {
  // Use custom domain if set, otherwise use Vercel URL or localhost
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    const url = process.env.NEXT_PUBLIC_SITE_URL.trim();
    return url.replace(/\/$/, ''); // Remove trailing slash
  }

  // Fallback for local development
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }

  // Vercel sets VERCEL_URL (e.g. project.vercel.app) — valid HTTPS for og:image etc.
  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) {
    return `https://${vercelUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}`;
  }

  // Public site lives on .bg; .com may not serve /public assets (breaks Facebook og:image).
  return 'https://www.novaartspace.bg';
};

/** Absolute URL for og:image / Twitter cards (Facebook requires a full URL). */
export function absoluteOgImageUrl(imageUrl: string | undefined | null): string {
  const base = getSiteUrl();
  const fallback = `${base}/logo.jpg`;
  const raw = imageUrl?.trim();
  if (!raw) return fallback;
  if (raw.startsWith('http://') || raw.startsWith('https://')) return raw;
  return raw.startsWith('/') ? `${base}${raw}` : `${base}/${raw}`;
}

export const siteConfig = {
  url: getSiteUrl(),
  name: 'nOva art space',
  description: 'Съвременна арт галерия и премиум пространство за събития в София',
  email: 'novaartspace@gmail.com',
  phone: '+359888426610',
  address: {
    street: 'ул. Съборна № 3, ниво -1',
    city: 'София',
    country: 'BG'
  },
  social: {
    instagram: 'https://www.instagram.com/nova_art_space/?hl=en',
    facebook: 'https://www.facebook.com/artspacenOva'
  }
};

