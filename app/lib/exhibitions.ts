import { supabase } from './supabase';

export interface Exhibition {
  title: string;
  subtitle: string;
  text: string;
  mainImage: string;
  author: string;
  date: string;
  images: string[];
  position: number;
  slug: string;
}

// Generate slug from title (useful for creating new exhibitions)
export function generateSlug(title: string): string {
  if (!title || title.trim() === '') {
    return generateAutoSlug();
  }

  let slug = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens

  // If slug is empty or only contains hyphens (e.g., from Cyrillic text),
  // generate automatic slug with number
  if (!slug || slug.trim() === '' || slug === '-') {
    return generateAutoSlug();
  }

  return slug;
}

// Generate automatic slug like "izlojba111", "izlojba112", etc.
function generateAutoSlug(): string {
  // Use timestamp to ensure uniqueness
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000);
  return `izlojba${timestamp}${randomNum}`;
}

export async function getExhibitions(): Promise<Exhibition[]> {
  try {
    // Fetch exhibitions from Supabase (always fresh, no cache)
    const { data: exhibitionsData, error: exhibitionsError } = await supabase
      .from('exhibitions')
      .select('*')
      .order('position', { ascending: false });

    if (exhibitionsError) {
      console.error('Error fetching exhibitions:', exhibitionsError);
      return [];
    }

    if (!exhibitionsData || exhibitionsData.length === 0) {
      return [];
    }

    // Fetch images for all exhibitions
    const exhibitionIds = exhibitionsData.map((ex) => ex.id);
    const { data: imagesData, error: imagesError } = await supabase
      .from('exhibition_images')
      .select('exhibition_id, image_url, image_order')
      .in('exhibition_id', exhibitionIds)
      .order('image_order', { ascending: true });

    if (imagesError) {
      console.error('Error fetching images:', imagesError);
    }

    // Group images by exhibition_id
    const imagesByExhibition = new Map<string, string[]>();
    if (imagesData) {
      imagesData.forEach((img) => {
        const exhibitionId = img.exhibition_id;
        if (!imagesByExhibition.has(exhibitionId)) {
          imagesByExhibition.set(exhibitionId, []);
        }
        imagesByExhibition.get(exhibitionId)!.push(img.image_url);
      });
    }

    // Map to Exhibition interface
    const exhibitions: Exhibition[] = exhibitionsData.map((ex) => {
      const images = imagesByExhibition.get(ex.id) || [];
      
      return {
        title: ex.title || '',
        subtitle: ex.subtitle || '',
        text: ex.text || '',
        mainImage: ex.main_image || '',
        author: ex.author || '',
        date: ex.date || '',
        images: images,
        position: ex.position || 0,
        slug: ex.slug || '',
      };
    });

    // Sort exhibitions:
    // - Position 0 = current (stays at top)
    // - Past exhibitions: sort by position descending (largest first)
    const sorted = exhibitions.sort((a, b) => {
      if (a.position === 0) return -1; // Current exhibition always first
      if (b.position === 0) return 1;
      return b.position - a.position; // Descending order for past exhibitions
    });

    return sorted;
  } catch (error) {
    console.error('Error fetching exhibitions from Supabase:', error);
    return [];
  }
}

// Get single exhibition by slug
export async function getExhibitionBySlug(slug: string): Promise<Exhibition | null> {
  try {
    // Fetch exhibition by slug
    const { data: exhibitionData, error: exhibitionError } = await supabase
      .from('exhibitions')
      .select('*')
      .eq('slug', slug)
      .single();

    if (exhibitionError || !exhibitionData) {
      console.error('Error fetching exhibition:', exhibitionError);
      return null;
    }

    // Fetch images for this exhibition
    const { data: imagesData, error: imagesError } = await supabase
      .from('exhibition_images')
      .select('image_url, image_order')
      .eq('exhibition_id', exhibitionData.id)
      .order('image_order', { ascending: true });

    if (imagesError) {
      console.error('Error fetching images:', imagesError);
    }

    const images = imagesData ? imagesData.map((img) => img.image_url) : [];

    return {
      title: exhibitionData.title || '',
      subtitle: exhibitionData.subtitle || '',
      text: exhibitionData.text || '',
      mainImage: exhibitionData.main_image || '',
      author: exhibitionData.author || '',
      date: exhibitionData.date || '',
      images: images,
      position: exhibitionData.position || 0,
      slug: exhibitionData.slug || '',
    };
  } catch (error) {
    console.error('Error fetching exhibition from Supabase:', error);
    return null;
  }
}







