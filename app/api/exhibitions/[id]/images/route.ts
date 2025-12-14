import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET - Fetch images for an exhibition
export async function GET(
  request: Request,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    const { data, error } = await supabase
      .from('exhibition_images')
      .select('image_url')
      .eq('exhibition_id', id)
      .order('image_order', { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const images = data.map((img) => img.image_url);
    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

