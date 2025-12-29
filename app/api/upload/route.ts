import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { getSupabaseServerClient } from '../../lib/auth';

// Configure Cloudinary from CLOUDINARY_URL
// Format: cloudinary://api_key:api_secret@cloud_name
if (process.env.CLOUDINARY_URL) {
  const urlMatch = process.env.CLOUDINARY_URL.match(/cloudinary:\/\/(\d+):(.+)@(.+)/);
  if (urlMatch) {
    cloudinary.config({
      cloud_name: urlMatch[3],
      api_key: urlMatch[1],
      api_secret: urlMatch[2],
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const supabase = await getSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if Cloudinary is configured
    if (!process.env.CLOUDINARY_URL) {
      console.error('Cloudinary URL not configured');
      return NextResponse.json(
        { error: 'Cloudinary not configured' },
        { status: 500 }
      );
    }

    // Verify Cloudinary config was set correctly
    const urlMatch = process.env.CLOUDINARY_URL.match(/cloudinary:\/\/(\d+):(.+)@(.+)/);
    if (!urlMatch) {
      console.error('Invalid CLOUDINARY_URL format');
      return NextResponse.json(
        { error: 'Invalid Cloudinary configuration' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert buffer to base64
    const base64 = buffer.toString('base64');
    const dataURI = `data:${file.type};base64,${base64}`;

    // Upload to Cloudinary with automatic optimization and resizing
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'nova-art-space', // Organize images in a folder
      resource_type: 'image', // Explicitly set to image
      transformation: [
        {
          quality: 'auto', // Automatic quality optimization
          fetch_format: 'auto', // Automatic format (WebP when supported)
        },
        {
          width: 1920, // Max width
          height: 1080, // Max height
          crop: 'limit', // Don't crop, just limit dimensions
        },
      ],
    });

    if (!result || !result.secure_url) {
      console.error('Cloudinary upload failed - no URL returned:', result);
      return NextResponse.json(
        { error: 'Upload failed - no URL returned' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      url: result.secure_url, // Use secure HTTPS URL
      public_id: result.public_id,
    });
  } catch (error: any) {
    console.error('Upload error details:', {
      message: error.message,
      error: error,
      stack: error.stack,
    });
    return NextResponse.json(
      { error: error.message || 'Upload failed', details: error.toString() },
      { status: 500 }
    );
  }
}







