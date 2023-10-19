import { NextRequest, NextResponse } from 'next/server';

import { prefetchRoutes } from '@/lib/mdx.server';

export async function GET(req: NextRequest) {
  const BASE_URL = `${req.nextUrl.origin}/api/blog/`;
  const url = new URL(req.url || '', BASE_URL);

  const slug = url.pathname.split('/').pop() || '';

  if (!slug) return new NextResponse(null, { status: 404 });

  try {
    const preRoutes = prefetchRoutes({ type: 'blog' });
    const file = preRoutes.filter((route) => route.slug === slug)[0].source;
    // const file = await getFileBySlug(source, slug);

    if (!file)
      return new NextResponse(null, { status: 404, statusText: 'Not found ' });

    return NextResponse.json({ preRoutes });
  } catch (error) {
    return new NextResponse(null, {
      status: 501,
      statusText: 'Not Found Response',
    });
  }
}
