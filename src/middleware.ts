import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
   const token = request.cookies.get("token")?.value;

   const isAuthPage = request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/signup";



   
   try {
     if(isAuthPage && token){
      return NextResponse.rewrite(new URL("/dashboard", request.url));
     }
    else if (!token && !isAuthPage) {
       console.log("missing tooken");
       return NextResponse.rewrite(new URL("/login", request.url));
     }
    } catch (error) {
        console.log("Token val:- ", token);
        console.error("Token verification failed:", error);
        return NextResponse.rewrite(new URL("/login", request.url));

    }

    return NextResponse.next();
   
}

export const config = {
  matcher: ["/profile/:path*", "/dashboard/:path*", "/login", "/signup"],
};
