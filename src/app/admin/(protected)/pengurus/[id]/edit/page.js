import { notFound, redirect } from "next/navigation";

import AdminResourceForm from "@/components/admin/AdminResourceForm";

import { getCurrentAdmin } from "@/lib/auth/admin";

import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function EditPengurusPage({ params }) {
  const { id } = await params;

  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/login");
  }

  const supabase = createAdminClient();

  const [pengurusResult, angkatanResult] = await Promise.all([
    supabase.from("pengurus").select("*").eq("id", id).maybeSingle(),

    supabase.from("angkatan").select("id,tahun,nama").order("tahun", {
      ascending: true,
    }),
  ]);

  const pengurus = pengurusResult.data;

  const angkatanData = angkatanResult.data || [];

  if (pengurusResult.error || !pengurus) {
    console.error("Gagal mengambil pengurus:", pengurusResult.error?.message);

    notFound();
  }

  /*
   * =======================================================
   * FIX LEGACY ANGKATAN
   * =======================================================
   *
   * Kalau nilai lama adalah tahun:
   *
   * 2024
   *
   * ubah menjadi ID sebenarnya:
   *
   * misalnya 18
   */

  let resolvedAngkatanId = pengurus.angkatan_id ?? pengurus.angkatan ?? "";

  if (resolvedAngkatanId) {
    const alreadyValid = angkatanData.some(
      (item) => String(item.id) === String(resolvedAngkatanId),
    );

    if (!alreadyValid) {
      const matchByYear = angkatanData.find(
        (item) => String(item.tahun) === String(resolvedAngkatanId),
      );

      resolvedAngkatanId = matchByYear?.id ?? "";
    }
  }

  const normalizedPengurus = {
    ...pengurus,

    angkatan_id: resolvedAngkatanId,
  };

  const angkatanOptions = angkatanData.map((item) => ({
    value: String(item.id),

    label: `${item.tahun} — ${item.nama}`,
  }));

  return (
    <AdminResourceForm
      resource="pengurus"
      title="Edit Pengurus"
      mode="edit"
      initialData={normalizedPengurus}
      sampleData={normalizedPengurus}
      returnHref="/admin/pengurus"
      fieldOptions={{
        angkatan_id: angkatanOptions,
      }}
    />
  );
}
