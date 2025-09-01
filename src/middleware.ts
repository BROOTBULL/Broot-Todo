import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  
  const currentPath = req.nextUrl.pathname;
  const isPublicPath = currentPath === "/login" || currentPath === "/signUp";
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log(token,"ip",isPublicPath,currentPath);
  


  // No token and trying to access a private path → redirect to login
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Token exists and trying to access public path → redirect to home
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // Otherwise → allow the request
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/signUp",
    "/home",
    "/api/projects/:path*",
    "/api/sections/:path*",
    "/api/todos/:path*",
  ],
};
