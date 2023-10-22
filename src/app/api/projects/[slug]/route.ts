import { NextRequest, NextResponse } from 'next/server';

import { getFileBySlug, preFetch } from '@/lib/mdx.server';

export async function GET(req: NextRequest) {
  const BASE_URL = `${req.nextUrl.origin}/api/projects/`;
  const url = new URL(req.url || '', BASE_URL);

  const slug = url.pathname.split('/').pop() || '';

  if (!slug) return new NextResponse(null, { status: 404 });

  try {
    const preRoutes = preFetch({ type: 'projects' });
    const preRoute = preRoutes?.find((route) => route.slug === slug);
    const file = await getFileBySlug(
      preRoute?.source as string,
      preRoute?.slug as string
    );

    if (!file)
      return new NextResponse(null, { status: 404, statusText: 'Not found ' });

    return NextResponse.json(file);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
