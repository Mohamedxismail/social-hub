import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = request.nextUrl;
  const authPage = ["/login", "/register"];
  const routes = ["/", "/profile", "/bookmarks", "/notifications", "/editProfile", "/suggestions", "/createPost"];

  if (!token && !authPage.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (!token && routes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && authPage.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();

}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};