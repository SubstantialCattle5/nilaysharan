import { NextRequest, NextResponse } from 'next/server';

import { getFileBySlug, prefetchRoutes } from '@/lib/mdx.server';

export async function GET(req: NextRequest) {
  const BASE_URL = `${req.nextUrl.origin}/api/blog/`;
  const url = new URL(req.url || '', BASE_URL);

  const slug = url.pathname.split('/').pop() || '';

  if (!slug) return new NextResponse(null, { status: 404 });

  try {
    const preRoutes = prefetchRoutes({ type: 'blog' });
    const file = await Promise.all(
      preRoutes.map(async (preRoute) => {
        const { code, frontmatter } = await getFileBySlug(
          preRoute.source,
          preRoute.slug
        );
        return { code: code, frontmatter: frontmatter };
      })
    );

    if (!file)
      return new NextResponse(null, { status: 404, statusText: 'Not found ' });

    return NextResponse.json(preRoutes);
  } catch (error) {
    return new NextResponse(null, {
      status: 501,
      statusText: 'Not Found Response',
    });
  }
}
