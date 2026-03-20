import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const code = request.cookies.get('entryCode')?.value;
  const { pathname } = request.nextUrl;

  // Protect all routes except /entry, API routes, and static assets
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname === '/entry') {
    return NextResponse.next();
  }

  const allowedCodes = ['100830', '아콩이콩', '삼성'];
  if (!code || !allowedCodes.includes(code)) {
    const url = new URL('/entry', request.url);
    url.searchParams.set('returnTo', request.nextUrl.pathname + request.nextUrl.search);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
