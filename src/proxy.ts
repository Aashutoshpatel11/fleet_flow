import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

const rbacMatrix: Record<string, string[]> = {
  '/dashboard/manager': ['Manager'],
  '/dashboard/dispatcher': ['Dispatcher', 'Manager'],
  '/dashboard/safety': ['Safety Officer', 'Manager'],
  '/dashboard/finance': ['Financial Analyst', 'Manager'],
};

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('fleet_token')?.value;

  const verifiedPayload = token ? await verifyToken(token) : null;

  if (!verifiedPayload) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const userRole = verifiedPayload.role as string;

  for (const [protectedPath, allowedRoles] of Object.entries(rbacMatrix)) {
    if (pathname.startsWith(protectedPath)) {
      if (!allowedRoles.includes(userRole)) {
        return NextResponse.redirect(new URL('/dashboard', req.url)); 
      }
      break; 
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'], 
};