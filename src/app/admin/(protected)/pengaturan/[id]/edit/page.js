import { notFound, redirect } from "next/navigation";

import AdminResourceForm from "@/components/admin/AdminResourceForm";
import { getCurrentAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function EditPengaturanPage({ params }) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const currentAdmin = await getCurrentAdmin();

  if (!currentAdmin) {
    redirect("/login");
  }

  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error(
      "[Edit pengaturan] gagal mengambil ID " + id + ":",
      error.message,
    );

    notFound();
  }

  if (!data) {
    notFound();
  }

  return (
    <AdminResourceForm
      resource="pengaturan"
      title="Edit Pengaturan Website"
      mode="edit"
      initialData={data}
      sampleData={data}
      returnHref="/admin/pengaturan"
    />
  );
}
