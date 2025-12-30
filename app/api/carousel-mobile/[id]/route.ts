import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase';
import { getSupabaseServerClient } from '../../../lib/auth';

// PUT - Update carousel mobile slide
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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
    const { image_url, link_url, position } = body;

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Admin client not configured. Please set SUPABASE_SERVICE_ROLE_KEY in .env.local' },
        { status: 500 }
      );
    }

    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (image_url !== undefined) updateData.image_url = image_url;
    if (link_url !== undefined) updateData.link_url = link_url;
    if (position !== undefined) updateData.position = position;

    // Update carousel mobile slide using admin client (bypasses RLS)
    const { data: slide, error: slideError } = await supabaseAdmin
      .from('carousel_mobile_slides')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (slideError) {
      return NextResponse.json(
        { error: slideError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: slide });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete carousel mobile slide
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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

    // Delete carousel mobile slide using admin client (bypasses RLS)
    const { error: deleteError } = await supabaseAdmin
      .from('carousel_mobile_slides')
      .delete()
      .eq('id', id);

    if (deleteError) {
      return NextResponse.json(
        { error: deleteError.message },
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

