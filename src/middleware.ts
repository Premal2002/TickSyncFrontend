// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { responseError } from './HelperFunctions/SwalFunctions';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const cookie = request.cookies.get('authenticatedUser')?.value || '{}';
  let token = '';

  try {
    const parsedUser = JSON.parse(cookie);
    token = parsedUser.jwtToken;
  } catch (e) {
    console.error('Invalid cookie format');
  }

  //checking if user already logged in
  if (pathname.startsWith('/Login')) {
    if(token)
    return NextResponse.redirect(new URL('/', request.url));
    else
    return;
  }

  if (pathname.startsWith('/AdminLogin')) {
    if(token)
    return NextResponse.redirect(new URL('/AdminDashboard', request.url));
    else
    return;
  }

  if (!token) {
    return NextResponse.redirect(new URL('/Login?fromMiddleware=Login Required', request.url));
  }

  // Decode JWT payload
  const payloadBase64 = token.split('.')[1];
  if (!payloadBase64) {
    return NextResponse.redirect(new URL('/Login?fromMiddleware=Token Invalid! Login again', request.url));
  }

  let payload: any;
  try {
    const jsonPayload = atob(payloadBase64);
    payload = JSON.parse(jsonPayload);
  } catch (error) {
    return NextResponse.redirect(new URL('/Login?fromMiddleware=Token validation failed! Login again', request.url));
  }

  // Check for token expiry
  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  if (payload.exp && currentTimeInSeconds >= payload.exp) {
    return NextResponse.redirect(new URL('/Login?fromMiddleware=Token expired! Please login again', request.url));
  }

  const roles: string[] = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || [];

  // Role-based access control
  if (pathname.startsWith('/AdminDashboard') && !roles.includes('admin')) {
    return NextResponse.redirect(new URL('/Unauthorized', request.url));
  }

  // Allow access and render the requested page
  return NextResponse.next();
}
  
export const config = {
  matcher: ['/Login/:path*', '/AdminLogin/:path*', '/SeatBooking/:path*','/BookingHistory/:path*', '/AdminDashboard/:path*','/UserBooking/:path*'],
};