import { NextRequest, NextResponse } from 'next/server';
import { bundleMDX } from 'mdx-bundler';
import { getWriteupBySlug } from '@/lib/github';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const slug = url.pathname.split('/').pop() || '';

  if (!slug) {
    return new NextResponse(null, { status: 404 });
  }

  try {
    console.log('Fetching writeup with slug:', slug);
    const writeup = await getWriteupBySlug(slug);
    
    if (!writeup) {
      console.log('Writeup not found for slug:', slug);
      return new NextResponse(null, { status: 404, statusText: 'Writeup not found' });
    }

    console.log('Found writeup:', writeup.frontmatter.title);

    // Ensure we have content to bundle
    if (!writeup.content || writeup.content.trim() === '') {
      console.error('Empty content for writeup:', slug);
      return NextResponse.json(
        { error: 'Writeup content is empty' }, 
        { status: 500 }
      );
    }

    // Bundle the markdown content with MDX
    const { code } = await bundleMDX({
      source: writeup.content,
    });

    if (!code) {
      console.error('Failed to generate MDX code for:', slug);
      return NextResponse.json(
        { error: 'Failed to process writeup content' }, 
        { status: 500 }
      );
    }

    const response = {
      code,
      frontmatter: writeup.frontmatter
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in writeups API for slug', slug, ':', error);
    return NextResponse.json(
      { error: `Failed to fetch writeup: ${error instanceof Error ? error.message : 'Unknown error'}` }, 
      { status: 500 }
    );
  }
}
