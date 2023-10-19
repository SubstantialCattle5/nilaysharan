import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const BASE_URL = `${req.nextUrl.origin}/api/blog/`;
  const url = new URL(req.url || '', BASE_URL);

  const slug = url.pathname.split('/').pop() || '';

  if (!slug) return new NextResponse(null, { status: 404 });
  return NextResponse.json({
    slug,
  });
  // try {
  //   const file = await getFileBySlug('blog', slug);

  //   if (!file)
  //     return new NextResponse(null, { status: 404, statusText: 'Nilay' });

  //   return NextResponse.json(file);
  // } catch (error) {
  //   return new NextResponse(null, {
  //     status: 404,
  //     statusText: 'Not Found Response',
  //   });
  // }
}
