import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // We need to create a response and hand it to the supabase client to be able to modify the response headers.
  const res = NextResponse.next();
  // Create authenticated Supabase Client.
  const supabase = createMiddlewareClient({ req, res });
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Check auth condition
  if (session?.user) {
    // Authentication successful, forward request to protected route.
    return res;
  }

  // Auth condition not met, redirect to home page.
  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = "/auth";
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/", "/api/trpc/:path*"],
};
