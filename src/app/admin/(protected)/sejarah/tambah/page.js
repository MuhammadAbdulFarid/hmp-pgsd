import { notFound, redirect } from "next/navigation";

import AdminResourceForm from "@/components/admin/AdminResourceForm";
import { getAdminResource } from "@/lib/admin/resources";
import { getCurrentAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

const RESOURCE = "sejarah";

export default async function TambahPage() {
  const config = getAdminResource(RESOURCE);

  if (!config) {
    notFound();
  }

  const currentAdmin = await getCurrentAdmin();

  if (!currentAdmin) {
    redirect("/login");
  }

  const supabase = createAdminClient();

  const { data: sampleData, error } = await supabase
    .from(config.table)
    .select("*")
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error(
      "[Tambah " + RESOURCE + "] gagal membaca struktur:",
      error.message,
    );
  }

  return (
    <AdminResourceForm
      resource={RESOURCE}
      title={"Tambah " + config.label}
      mode="create"
      sampleData={sampleData || {}}
      returnHref={"/admin/" + RESOURCE}
    />
  );
}
