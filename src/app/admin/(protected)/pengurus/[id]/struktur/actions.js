"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getCurrentAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";

/* =========================================================
   AUTH
   ========================================================= */

async function requireAdmin() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/login");
  }

  return admin;
}

/* =========================================================
   HELPERS
   ========================================================= */

function getText(formData, key) {
  const value = formData.get(key);

  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim();
}

function revalidateStruktur(pengurusId) {
  revalidatePath("/admin/pengurus");

  revalidatePath(`/admin/pengurus/${pengurusId}/struktur`);

  revalidatePath("/pengurus");

  revalidatePath(`/pengurus/${pengurusId}`);

  revalidatePath("/");
}

/* =========================================================
   CREATE
   ========================================================= */

export async function createStruktur(formData) {
  await requireAdmin();

  const pengurusId = getText(formData, "pengurus_id");

  const nama = getText(formData, "nama");

  const jabatan = getText(formData, "jabatan");

  const bidang = getText(formData, "bidang");

  const fotoUrl = getText(formData, "foto_url");

  const urutanRaw = getText(formData, "urutan");

  const aktif = formData.get("aktif") === "on";

  if (!pengurusId) {
    redirect("/admin/pengurus");
  }

  if (!nama || !jabatan) {
    redirect(
      `/admin/pengurus/${pengurusId}/struktur/tambah?error=${encodeURIComponent(
        "Nama dan jabatan wajib diisi.",
      )}`,
    );
  }

  const urutan = Number(urutanRaw || 0);

  if (Number.isNaN(urutan)) {
    redirect(
      `/admin/pengurus/${pengurusId}/struktur/tambah?error=${encodeURIComponent(
        "Urutan harus berupa angka.",
      )}`,
    );
  }

  const supabase = createAdminClient();

  /*
   * Pastikan parent Ketua Umum ada.
   */
  const { data: parent, error: parentError } = await supabase
    .from("pengurus")
    .select("id")
    .eq("id", pengurusId)
    .maybeSingle();

  if (parentError || !parent) {
    redirect("/admin/pengurus");
  }

  const { error } = await supabase.from("struktur_pengurus").insert({
    pengurus_id: Number(pengurusId),

    nama,

    jabatan,

    bidang: bidang || null,

    foto_url: fotoUrl || null,

    urutan,

    aktif,
  });

  if (error) {
    console.error("CREATE struktur error:", error);

    redirect(
      `/admin/pengurus/${pengurusId}/struktur/tambah?error=${encodeURIComponent(
        error.message,
      )}`,
    );
  }

  revalidateStruktur(pengurusId);

  redirect(`/admin/pengurus/${pengurusId}/struktur`);
}

/* =========================================================
   UPDATE
   ========================================================= */

export async function updateStruktur(formData) {
  await requireAdmin();

  const pengurusId = getText(formData, "pengurus_id");

  const strukturId = getText(formData, "struktur_id");

  const nama = getText(formData, "nama");

  const jabatan = getText(formData, "jabatan");

  const bidang = getText(formData, "bidang");

  const fotoUrl = getText(formData, "foto_url");

  const urutanRaw = getText(formData, "urutan");

  const aktif = formData.get("aktif") === "on";

  if (!pengurusId || !strukturId) {
    redirect("/admin/pengurus");
  }

  if (!nama || !jabatan) {
    redirect(
      `/admin/pengurus/${pengurusId}/struktur/${strukturId}/edit?error=${encodeURIComponent(
        "Nama dan jabatan wajib diisi.",
      )}`,
    );
  }

  const urutan = Number(urutanRaw || 0);

  if (Number.isNaN(urutan)) {
    redirect(
      `/admin/pengurus/${pengurusId}/struktur/${strukturId}/edit?error=${encodeURIComponent(
        "Urutan harus berupa angka.",
      )}`,
    );
  }

  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("struktur_pengurus")
    .update({
      nama,

      jabatan,

      bidang: bidang || null,

      foto_url: fotoUrl || null,

      urutan,

      aktif,

      updated_at: new Date().toISOString(),
    })
    .eq("id", strukturId)
    .eq("pengurus_id", pengurusId)
    .select("id")
    .maybeSingle();

  if (error) {
    console.error("UPDATE struktur error:", error);

    redirect(
      `/admin/pengurus/${pengurusId}/struktur/${strukturId}/edit?error=${encodeURIComponent(
        error.message,
      )}`,
    );
  }

  if (!data) {
    redirect(`/admin/pengurus/${pengurusId}/struktur`);
  }

  revalidateStruktur(pengurusId);

  redirect(`/admin/pengurus/${pengurusId}/struktur`);
}

/* =========================================================
   DELETE
   ========================================================= */

export async function deleteStruktur(formData) {
  await requireAdmin();

  const pengurusId = getText(formData, "pengurus_id");

  const strukturId = getText(formData, "struktur_id");

  if (!pengurusId || !strukturId) {
    redirect("/admin/pengurus");
  }

  const supabase = createAdminClient();

  const { error } = await supabase
    .from("struktur_pengurus")
    .delete()
    .eq("id", strukturId)
    .eq("pengurus_id", pengurusId);

  if (error) {
    console.error("DELETE struktur error:", error);

    redirect(
      `/admin/pengurus/${pengurusId}/struktur?error=${encodeURIComponent(
        error.message,
      )}`,
    );
  }

  revalidateStruktur(pengurusId);

  redirect(`/admin/pengurus/${pengurusId}/struktur`);
}
