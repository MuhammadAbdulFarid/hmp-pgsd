import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

/*
 * =========================================================
 * CURRENT ADMIN
 * =========================================================
 *
 * 1. Verifikasi user melalui Supabase Auth.
 * 2. Ambil UUID user dari JWT.
 * 3. Pastikan UUID tersebut ada di public.admins.
 * 4. Pastikan admin aktif.
 */

export async function getCurrentAdmin() {
  const supabase = await createClient();

  const { data: claimsData, error: claimsError } =
    await supabase.auth.getClaims();

  const claims = claimsData?.claims;

  if (claimsError || !claims?.sub) {
    return null;
  }

  const { data: admin, error: adminError } = await supabase
    .from("admins")
    .select(
      `
        id,
        user_id,
        nama,
        email,
        role,
        aktif
      `,
    )
    .eq("user_id", claims.sub)
    .eq("aktif", true)
    .maybeSingle();

  if (adminError) {
    console.error("Gagal mengambil profil admin:", adminError);

    return null;
  }

  if (!admin) {
    return null;
  }

  return {
    claims,
    admin,
  };
}

/*
 * =========================================================
 * REQUIRE ADMIN
 * =========================================================
 *
 * Digunakan untuk halaman yang hanya boleh
 * dibuka oleh administrator.
 */

export async function requireAdmin() {
  const currentAdmin = await getCurrentAdmin();

  if (!currentAdmin) {
    redirect("/admin/login");
  }

  return currentAdmin;
}
