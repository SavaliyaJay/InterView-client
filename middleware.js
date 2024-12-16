// import { NextResponse } from "next/server";

// export function middleware(request) {
//   const path = request.nextUrl.pathname;

//   const isPublicPath = path === "/auth/login" || path === "/auth/register";

//   const role = request.cookies.get("role")?.value || "";

//   if (isPublicPath && role === "0") {
//     return NextResponse.redirect(new URL("/admin", request.nextUrl));
//   }

//   if (isPublicPath && role === "1") {
//     return NextResponse.redirect(new URL("/user", request.nextUrl));
//   }

//   if (!isPublicPath && !role) {
//     return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
//   }

//   if (request.nextUrl.pathname.startsWith("/admin") && role === "1") {
//     return NextResponse.redirect(new URL("/user", request.nextUrl));
//   }

//   if (request.nextUrl.pathname.startsWith("/user") && role === "0") {
//     return NextResponse.redirect(new URL("/admin", request.nextUrl));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/admin/:path*", "/user/:path*", "/auth/:path*"]
// };

import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/auth/login" || path === "/auth/register";

  // Try to get role from query parameters or default to empty string
  const role = request.nextUrl.searchParams.get("role") || "";

  if (isPublicPath && role === "0") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (isPublicPath && role === "1") {
    return NextResponse.redirect(new URL("/user", request.url));
  }

  // Remove role-based checks that depend on cookies
  // You'll need to handle authentication on the client-side

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/auth/:path*"]
};
