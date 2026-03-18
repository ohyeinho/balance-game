import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const code = request.cookies.get('entryCode')?.value;
  const { pathname } = request.nextUrl;

  // Protect all routes except /entry, API routes, and static assets
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname === '/entry') {
    return NextResponse.next();
  }

  if (code !== '웨파2603') {
    return NextResponse.redirect(new URL('/entry', request.url));
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
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
