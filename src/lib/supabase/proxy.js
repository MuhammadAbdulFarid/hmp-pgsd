import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  /*
   * =========================================================
   * SUPABASE ENV VALIDATION
   * =========================================================
   */

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabasePublishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  console.log("[SUPABASE ENV CHECK]", {
    urlExists: Boolean(supabaseUrl),
    publishableKeyExists: Boolean(supabasePublishableKey),
  });

  if (!supabaseUrl) {
    throw new Error("[Supabase Proxy] Missing NEXT_PUBLIC_SUPABASE_URL");
  }

  if (!supabasePublishableKey) {
    throw new Error(
      "[Supabase Proxy] Missing NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    );
  }

  /*
   * =========================================================
   * SUPABASE SERVER CLIENT
   * =========================================================
   */

  const supabase = createServerClient(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },

      setAll(cookiesToSet, headers) {
        /*
         * Update cookie pada request.
         */
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        /*
         * Buat response baru dengan request yang sudah
         * memiliki cookie terbaru.
         */
        supabaseResponse = NextResponse.next({
          request,
        });

        /*
         * Kirim cookie session terbaru ke browser.
         */
        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options);
        });

        /*
         * Teruskan header yang diberikan Supabase SSR.
         */
        Object.entries(headers || {}).forEach(([key, value]) => {
          supabaseResponse.headers.set(key, value);
        });
      },
    },
  });

  /*
   * =========================================================
   * SESSION VALIDATION
   * =========================================================
   */

  await supabase.auth.getClaims();

  return supabaseResponse;
}
