import { redirect } from "next/navigation";

import AdminResourceForm from "@/components/admin/AdminResourceForm";
import { getCurrentAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function TambahGaleriPage() {
  const currentAdmin = await getCurrentAdmin();

  if (!currentAdmin) {
    redirect("/login");
  }

  const supabase = createAdminClient();

  const { data: sampleData, error } = await supabase
    .from("galeri")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Gagal membaca struktur galeri:", error.message);
  }

  return (
    <AdminResourceForm
      resource="galeri"
      title="Tambah Galeri"
      mode="create"
      sampleData={sampleData || {}}
      returnHref="/admin/galeri"
    />
  );
}
