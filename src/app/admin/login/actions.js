"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function loginAdmin(formData) {
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();

  const password = String(formData.get("password") || "");

  /*
   * =======================================================
   * VALIDASI INPUT
   * =======================================================
   */

  if (!email || !password) {
    redirect("/admin/login?error=required");
  }

  const supabase = await createClient();

  /*
   * =======================================================
   * LOGIN SUPABASE AUTH
   * =======================================================
   */

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    redirect("/admin/login?error=invalid");
  }

  /*
   * =======================================================
   * CEK APAKAH USER ADALAH ADMIN
   * =======================================================
   *
   * User Auth saja belum cukup.
   * UUID user harus ada di public.admins.
   */

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
    .eq("user_id", data.user.id)
    .eq("aktif", true)
    .maybeSingle();

  /*
   * Kalau akun Auth valid tetapi bukan admin,
   * langsung logout lagi.
   */
  if (adminError || !admin) {
    await supabase.auth.signOut({
      scope: "local",
    });

    redirect("/admin/login?error=unauthorized");
  }

  /*
   * Refresh layout setelah login.
   */
  revalidatePath("/", "layout");

  /*
   * Masuk dashboard.
   */
  redirect("/admin");
}
