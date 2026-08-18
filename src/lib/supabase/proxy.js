import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
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
           * Buat response baru dengan request yang sudah diperbarui.
           */
          supabaseResponse = NextResponse.next({
            request,
          });

          /*
           * Kirim cookie baru ke browser.
           */
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });

          /*
           * Supabase SSR terbaru dapat memberikan
           * header keamanan/cache saat refresh session.
           */
          Object.entries(headers || {}).forEach(([key, value]) => {
            supabaseResponse.headers.set(key, value);
          });
        },
      },
    },
  );

  /*
   * Verifikasi JWT dan refresh session jika diperlukan.
   */
  await supabase.auth.getClaims();

  return supabaseResponse;
}
