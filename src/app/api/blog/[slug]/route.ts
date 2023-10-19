import { readFileSync } from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';

export async function GET(req: NextRequest) {
  const BASE_URL = `${req.nextUrl.origin}/api/blog/`;
  const url = new URL(req.url || '', BASE_URL);

  const slug = url.pathname.split('/').pop() || '';

  if (!slug) return new NextResponse(null, { status: 404 });

  try {
    const file = readFileSync(
      join(process.cwd(), 'contents', 'blog', `${slug}.mdx`),
      'utf8'
    );

    if (!file)
      return new NextResponse(null, { status: 404, statusText: 'Not found ' });

    return NextResponse.json(file);
  } catch (error) {
    return new NextResponse(null, {
      status: 501,
      statusText: 'Not Found Response',
    });
  }
}
