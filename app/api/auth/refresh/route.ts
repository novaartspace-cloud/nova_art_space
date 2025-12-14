import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '../../../lib/auth';

// Route handler to refresh Supabase session
// Can be called from client-side to refresh expired sessions
export async function POST() {
  try {
    const supabase = await getSupabaseServerClient();
    
    // This will refresh the session if needed
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    return NextResponse.json({ 
      success: true,
      user: {
        id: user.id,
        email: user.email,
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

