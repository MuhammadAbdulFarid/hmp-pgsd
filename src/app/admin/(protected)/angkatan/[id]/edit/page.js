import { notFound, redirect } from "next/navigation";

import AdminResourceForm from "@/components/admin/AdminResourceForm";
import { getAdminResource } from "@/lib/admin/resources";
import { getCurrentAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

const RESOURCE = "angkatan";

export default async function EditPage({ params }) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const config = getAdminResource(RESOURCE);

  if (!config) {
    notFound();
  }

  const currentAdmin = await getCurrentAdmin();

  if (!currentAdmin) {
    redirect("/login");
  }

  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from(config.table)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error(
      "[Edit " + RESOURCE + "] gagal mengambil ID " + id + ":",
      error.message,
    );

    notFound();
  }

  if (!data) {
    notFound();
  }

  return (
    <AdminResourceForm
      resource={RESOURCE}
      title={"Edit " + config.label}
      mode="edit"
      initialData={data}
      sampleData={data}
      returnHref={"/admin/" + RESOURCE}
    />
  );
}
