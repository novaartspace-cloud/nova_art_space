import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '../../../lib/supabase';
import { getSupabaseServerClient } from '../../../lib/auth';
import { generateSlug } from '../../../lib/exhibitions';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PUT - Update exhibition
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const supabaseAuth = await getSupabaseServerClient();
    const {
      data: { user },
    } = await supabaseAuth.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { title, subtitle, text, main_image, author, date, position, slug, images } = body;

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (subtitle !== undefined) updateData.subtitle = subtitle;
    if (text !== undefined) updateData.text = text;
    if (main_image !== undefined) updateData.main_image = main_image;
    if (author !== undefined) updateData.author = author;
    if (date !== undefined) updateData.date = date;
    if (position !== undefined) updateData.position = position;
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Admin client not configured. Please set SUPABASE_SERVICE_ROLE_KEY in .env.local' },
        { status: 500 }
      );
    }

    if (slug !== undefined && slug.trim() !== '') {
      updateData.slug = slug;
    } else if (title) {
      let generatedSlug = generateSlug(title);
      // Ensure slug is not empty
      if (!generatedSlug || generatedSlug.trim() === '') {
        generatedSlug = generateSlug(title); // Will generate auto slug
      }
      updateData.slug = generatedSlug;
    }

    const { data: exhibition, error: exhibitionError } = await supabaseAdmin
      .from('exhibitions')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (exhibitionError) {
      return NextResponse.json(
        { error: exhibitionError.message },
        { status: 500 }
      );
    }

    // Update images if provided
    if (images !== undefined) {
      // Delete existing images
      await supabaseAdmin
        .from('exhibition_images')
        .delete()
        .eq('exhibition_id', id);

      // Insert new images
      if (Array.isArray(images) && images.length > 0) {
        const imageRecords = images
          .filter((url: string) => url && url.trim() !== '')
          .map((url: string, index: number) => ({
            exhibition_id: id,
            image_url: url,
            image_order: index + 1,
          }));

        if (imageRecords.length > 0) {
          await supabaseAdmin
            .from('exhibition_images')
            .insert(imageRecords);
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

// DELETE - Delete exhibition
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const supabaseAuth = await getSupabaseServerClient();
    const {
      data: { user },
    } = await supabaseAuth.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Admin client not configured. Please set SUPABASE_SERVICE_ROLE_KEY in .env.local' },
        { status: 500 }
      );
    }

    // Delete exhibition (images will be deleted automatically due to CASCADE)
    const { error } = await supabaseAdmin
      .from('exhibitions')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

