// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get('authenticatedUser')?.value || '{}';
  let token = '';

  try {
    const parsedUser = JSON.parse(cookie);
    token = parsedUser.jwtToken;
  } catch (e) {
    console.error('Invalid cookie format');
  }

  if (!token) {
    return NextResponse.redirect(new URL('/Login', request.url));
  }

  // Decode JWT payload
  const payloadBase64 = token.split('.')[1];
  if (!payloadBase64) {
    return NextResponse.redirect(new URL('/Login', request.url));
  }

  let payload: any;
  try {
    const jsonPayload = atob(payloadBase64);
    payload = JSON.parse(jsonPayload);
  } catch (error) {
    return NextResponse.redirect(new URL('/Login', request.url));
  }

  const roles: string[] = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || [];
  const pathname = request.nextUrl.pathname;

  // Role-based access control
  if (pathname.startsWith('/Movies') && !roles.includes('admin')) {
    return NextResponse.redirect(new URL('/Unauthorized', request.url));
  }

  // if (pathname.startsWith('/') && !roles.includes('user')) {
  //   return NextResponse.redirect(new URL('/Unauthorized', request.url));
  // }

  // Allow access and render the requested page
  return NextResponse.next();
}

export const config = {
  matcher: ['/Movies/:path*'], 
};