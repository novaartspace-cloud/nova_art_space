import { supabase } from './supabase';

export interface CarouselMobileSlide {
  id: string;
  image_url: string;
  link_url: string;
  position: number;
  created_at?: string;
  updated_at?: string;
}

export async function getCarouselMobileSlides(): Promise<CarouselMobileSlide[]> {
  try {
    const { data, error } = await supabase
      .from('carousel_mobile_slides')
      .select('*')
      .order('position', { ascending: true });

    if (error) {
      // Check if error is due to missing table (relation does not exist)
      if (error.code === 'PGRST116' || error.message?.includes('does not exist') || error.message?.includes('relation')) {
        console.warn('Carousel mobile slides table does not exist yet. Please run the SQL script to create it.');
        return [];
      }
      console.error('Error fetching carousel mobile slides:', error.message || error);
      return [];
    }

    return data || [];
  } catch (error: any) {
    // Handle any other errors gracefully
    if (error?.message?.includes('does not exist') || error?.message?.includes('relation')) {
      console.warn('Carousel mobile slides table does not exist yet. Please run the SQL script to create it.');
      return [];
    }
    console.error('Error fetching carousel mobile slides:', error?.message || error);
    return [];
  }
}

