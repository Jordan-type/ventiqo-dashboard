// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Middleware to protect routes
export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token && req.nextUrl.pathname.startsWith('/user/dashboard')) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/user/dashboard/:path*', '/user/profile/:path*'], // Adjust the paths as needed
};
