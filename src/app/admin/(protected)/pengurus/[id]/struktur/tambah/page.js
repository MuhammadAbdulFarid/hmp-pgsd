import Link from "next/link";

import { notFound, redirect } from "next/navigation";

import StrukturPengurusForm from "@/components/admin/StrukturPengurusForm";

import { getCurrentAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";

import { createStruktur } from "../actions";

export const dynamic = "force-dynamic";

export default async function TambahStrukturPage({ params, searchParams }) {
  const { id } = await params;

  const query = await searchParams;

  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/login");
  }

  const supabase = createAdminClient();

  const { data: pengurus, error } = await supabase
    .from("pengurus")
    .select("id,nama,jabatan,periode")
    .eq("id", id)
    .maybeSingle();

  if (error || !pengurus) {
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
          Tambah Anggota
        </h1>

        <p className="mt-3 text-sm leading-7 text-slate">
          Tambahkan anggota struktur periode {pengurus.periode}.
        </p>

        <StrukturPengurusForm
          action={createStruktur}
          pengurus={pengurus}
          mode="create"
          error={query?.error || ""}
        />
      </div>
    </main>
  );
}
