import { notFound, redirect } from "next/navigation";

import AdminResourceForm from "@/components/admin/AdminResourceForm";

import { getAdminResource } from "@/lib/admin/resources";

import { getCurrentAdmin } from "@/lib/auth/admin";

import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

const RESOURCE = "pengurus";

export default async function TambahPengurusPage() {
  const config = getAdminResource(RESOURCE);

  if (!config) {
    notFound();
  }

  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/login");
  }

  const supabase = createAdminClient();

  const { data: sampleData } = await supabase
    .from("pengurus")
    .select("*")
    .limit(1)
    .maybeSingle();

  const { data: angkatanData, error: angkatanError } = await supabase
    .from("angkatan")
    .select("id,tahun,nama")
    .order("tahun", {
      ascending: true,
    });

  if (angkatanError) {
    console.error("Gagal mengambil angkatan:", angkatanError.message);
  }

  const angkatanOptions = (angkatanData || []).map((item) => ({
    value: String(item.id),

    label: `${item.tahun} — ${item.nama}`,
  }));

  return (
    <AdminResourceForm
      resource="pengurus"
      title="Tambah Pengurus"
      mode="create"
      sampleData={sampleData || {}}
      returnHref="/admin/pengurus"
      fieldOptions={{
        angkatan_id: angkatanOptions,
      }}
    />
  );
}
