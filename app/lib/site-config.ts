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
  
  // For production, return a default (will be overridden by Vercel automatically)
  // In production, Vercel sets VERCEL_URL automatically
  return 'https://novaartspace.com'; // Default fallback
};

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

