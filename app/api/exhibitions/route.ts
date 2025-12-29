import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '../../lib/supabase';
import { getSupabaseServerClient } from '../../lib/auth';
import { generateSlug } from '../../lib/exhibitions';

// GET - Fetch all exhibitions
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('exhibitions')
      .select('*')
      .order('position', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new exhibition
export async function POST(request: NextRequest) {
  try {
    const supabaseAuth = await getSupabaseServerClient();
    const {
      data: { user },
    } = await supabaseAuth.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, subtitle, text, main_image, author, date, position, images } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Admin client not configured. Please set SUPABASE_SERVICE_ROLE_KEY in .env.local' },
        { status: 500 }
      );
    }

    // Generate slug if not provided
    let slug = body.slug || generateSlug(title);
    
    // Ensure slug is not empty
    if (!slug || slug.trim() === '') {
      slug = generateSlug(title); // Will generate auto slug if title doesn't work
    }
    
    // Check if slug already exists and make it unique if needed
    if (slug) {
      const { data: existing } = await supabaseAdmin
        .from('exhibitions')
        .select('id')
        .eq('slug', slug)
        .limit(1);
      
      if (existing && existing.length > 0) {
        // Slug exists, append number
        let counter = 1;
        let uniqueSlug = `${slug}-${counter}`;
        let checkResult = await supabaseAdmin
          .from('exhibitions')
          .select('id')
          .eq('slug', uniqueSlug)
          .limit(1);
        
        while (checkResult.data && checkResult.data.length > 0) {
          counter++;
          uniqueSlug = `${slug}-${counter}`;
          checkResult = await supabaseAdmin
            .from('exhibitions')
            .select('id')
            .eq('slug', uniqueSlug)
            .limit(1);
        }
        slug = uniqueSlug;
      }
    }

    // Insert exhibition using admin client (bypasses RLS)
    const { data: exhibition, error: exhibitionError } = await supabaseAdmin
      .from('exhibitions')
      .insert({
        title,
        subtitle: subtitle || null,
        text: text || null,
        main_image: main_image || null,
        author: author || null,
        date: date || null,
        position: position || 0,
        slug,
      })
      .select()
      .single();

    if (exhibitionError) {
      return NextResponse.json(
        { error: exhibitionError.message },
        { status: 500 }
      );
    }

    // Insert images if provided
    if (images && Array.isArray(images) && images.length > 0) {
      const imageRecords = images
        .filter((url: string) => url && url.trim() !== '')
        .map((url: string, index: number) => ({
          exhibition_id: exhibition.id,
          image_url: url,
          image_order: index + 1,
        }));

      if (imageRecords.length > 0) {
        const { error: imagesError } = await supabaseAdmin
          .from('exhibition_images')
          .insert(imageRecords);

        if (imagesError) {
          console.error('Error inserting images:', imagesError);
          // Don't fail the whole request if images fail
        }
      }
    }

    return NextResponse.json({ success: true, data: exhibition });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}







