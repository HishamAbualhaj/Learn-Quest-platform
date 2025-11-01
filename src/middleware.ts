// import { NextRequest, NextResponse } from "next/server";

// export function middleware(req: NextRequest) {
//   const url = req.nextUrl;

//   const isInSetFound = (url, routes) => routes.has(url);
//   const isPrefixPath = (url, routes) =>
//     [...routes].some((route) => url.startsWith(route));
//   // only for admin
//   const isAdminRoutes = new Set(["/dashboard"]);

//   const loggedInSharedRoutes = new Set(["/student/coursepage"]);

//   // allow these while not logined in
//   const allowedRoutesWhileNotLogin = new Set([
//     "/login",
//     "/signup",
//     "/forgotpassword",
//     "/verifycode",
//     "/confirmpass",
//   ]);

//   const allowedForBoth = new Set(["/student/allcourses", "/student/blog"]);

//   const isAllowedForBoth = isInSetFound(url, allowedForBoth);

//   const isAdmin = isPrefixPath(url, isAdminRoutes);

//   const isAllowedNotLogin = isInSetFound(url, allowedRoutesWhileNotLogin);

//   // both user and admin can access it ONLY WHILE LOGIN
//   const isLoggedInShared = isPrefixPath(url, loggedInSharedRoutes);

//   // allow landing page while system is running
//   if (url === "/" && !isMaintenance) {
//     return NextResponse.next();
//   }
//   // allow maintenance page
//   if (url === "/maintenance" && !isMaintenance) {
//     navigate("/");
//     return;
//   }

//   // Only while system is shut down
//   if (isMaintenance) {
//     if (url === "/maintenance") {
//       return NextResponse.next();
//     }

//     // go to admin dashboard
//     if (role === "admin" && isAdmin) {
//       return NextResponse.next();
//     }

//     navigate("/maintenance");
//     return;
//   }

//   // NOT LOGIN CASE
//   if (!loggedIn) {
//     if (isAllowedNotLogin || isAllowedForBoth) {
//       return NextResponse.next();
//     }
//     navigate("/login");
//     return;
//   }

//   // LOGIN CASE
//   if (isAllowedNotLogin) {
//     navigate("/");
//     return;
//   }

//   if (isLoggedInShared || isAllowedForBoth) {
//     return NextResponse.next();
//     return;
//   }

//   // ALLOW ADMIN PAGES
//   if ((isAdmin && role !== "admin") || (!isAdmin && role === "admin")) {
//     navigate("/");
//     return;
//   }
//   return NextResponse.next();
// }

// // ====== MATCHER ======
// export const config = {
//   matcher: [
//     "/((?!_next/static|_next/image|favicon.ico).*)", // ignore Next.js assets
//   ],
// };

 export function middleware() {
    
 }