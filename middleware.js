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

  const token = request.cookies.get("token")?.value || "";
  const role = request.cookies.get("role")?.value || "";

  if (isPublicPath && role === "0") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (isPublicPath && role === "1") {
    return NextResponse.redirect(new URL("/user", request.url));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/admin") && role === "1") {
    return NextResponse.redirect(new URL("/user", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/user") && role === "0") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/auth/:path*"]
};
