import Link from "next/link";

import { notFound, redirect } from "next/navigation";

import StrukturPengurusForm from "@/components/admin/StrukturPengurusForm";

import { getCurrentAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";

import { updateStruktur } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditStrukturPage({ params, searchParams }) {
  const { id, strukturId } = await params;

  const query = await searchParams;

  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/login");
  }

  const supabase = createAdminClient();

  const [pengurusResult, strukturResult] = await Promise.all([
    supabase
      .from("pengurus")
      .select("id,nama,jabatan,periode")
      .eq("id", id)
      .maybeSingle(),

    supabase
      .from("struktur_pengurus")
      .select("*")
      .eq("id", strukturId)
      .eq("pengurus_id", id)
      .maybeSingle(),
  ]);

  const pengurus = pengurusResult.data;

  const struktur = strukturResult.data;

  if (pengurusResult.error || strukturResult.error || !pengurus || !struktur) {
    notFound();
  }

  return (
    <main className="px-5 py-8 md:px-8 md:py-10">
      <div className="mx-auto max-w-4xl">
        <Link
          href={`/admin/pengurus/${id}/struktur`}
          className="text-xs font-semibold text-primary-blue hover:underline"
        >
          ← Kembali ke Struktur
        </Link>

        <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-blue">
          Content Management
        </p>

        <h1 className="mt-3 font-heading text-3xl font-semibold tracking-[-0.04em] text-deep-navy md:text-4xl">
          Edit Anggota Struktur
        </h1>

        <p className="mt-3 text-sm leading-7 text-slate">
          Perbarui anggota struktur periode {pengurus.periode}.
        </p>

        <StrukturPengurusForm
          action={updateStruktur}
          pengurus={pengurus}
          initialData={struktur}
          mode="edit"
          error={query?.error || ""}
        />
      </div>
    </main>
  );
}
