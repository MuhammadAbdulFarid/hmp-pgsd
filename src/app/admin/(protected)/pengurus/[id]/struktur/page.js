import Link from "next/link";

import { notFound, redirect } from "next/navigation";

import { getCurrentAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";

import { deleteStruktur } from "./actions";

export const dynamic = "force-dynamic";

export default async function StrukturPengurusPage({ params, searchParams }) {
  const { id } = await params;

  const query = await searchParams;

  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/login");
  }

  const supabase = createAdminClient();

  /* ================================
     PARENT
  ================================ */

  const { data: pengurus, error: pengurusError } = await supabase
    .from("pengurus")
    .select("id,nama,jabatan,periode")
    .eq("id", id)
    .maybeSingle();

  if (pengurusError || !pengurus) {
    notFound();
  }

  /* ================================
     CHILDREN
  ================================ */

  const { data, error } = await supabase
    .from("struktur_pengurus")
    .select("*")
    .eq("pengurus_id", id)
    .order("urutan", {
      ascending: true,
    });

  const rows = data || [];

  return (
    <main className="px-5 py-8 md:px-8 md:py-10">
      {/* BACK */}

      <Link
        href="/admin/pengurus"
        className="text-xs font-semibold text-primary-blue hover:underline"
      >
        ← Kembali ke Pengurus
      </Link>

      {/* HEADER */}

      <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary-blue">
            Struktur Kepengurusan
          </p>

          <h1 className="mt-3 font-heading text-3xl font-semibold tracking-[-0.04em] text-deep-navy md:text-4xl">
            Periode {pengurus.periode}
          </h1>

          <p className="mt-3 text-sm text-slate">
            Ketua Umum:{" "}
            <strong className="text-deep-navy">{pengurus.nama}</strong>
          </p>
        </div>

        <Link
          href={`/admin/pengurus/${id}/struktur/tambah`}
          className="
            inline-flex h-11
            items-center justify-center
            rounded-lg
            bg-deep-navy
            px-5
            text-xs font-semibold
            text-white
            transition
            hover:bg-primary-blue
          "
        >
          + Tambah Anggota
        </Link>
      </div>

      {/* TOTAL */}

      <div className="mt-8 flex items-center justify-between rounded-xl border border-deep-navy/10 bg-white px-5 py-4">
        <p className="text-sm text-slate">Total anggota struktur</p>

        <p className="font-heading text-xl font-semibold text-deep-navy">
          {rows.length}
        </p>
      </div>

      {/* ACTION ERROR */}

      {query?.error ? (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {query.error}
        </div>
      ) : null}

      {/* DATABASE ERROR */}

      {error ? (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          <p className="font-semibold">Gagal mengambil struktur.</p>

          <p className="mt-1 text-xs">{error.message}</p>
        </div>
      ) : null}

      {/* EMPTY */}

      {!error && rows.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-deep-navy/15 bg-white px-6 py-16 text-center">
          <h2 className="font-heading text-xl font-semibold text-deep-navy">
            Struktur belum diisi.
          </h2>

          <p className="mt-2 text-sm text-slate">
            Tambahkan Sekretaris, Bendahara, Ketua Bidang, Sekretaris Bidang dan
            anggota lainnya.
          </p>

          <Link
            href={`/admin/pengurus/${id}/struktur/tambah`}
            className="mt-6 inline-flex rounded-lg bg-deep-navy px-5 py-3 text-xs font-semibold text-white"
          >
            Tambah Anggota Pertama
          </Link>
        </div>
      ) : null}

      {/* TABLE */}

      {!error && rows.length > 0 ? (
        <div className="mt-6 overflow-hidden rounded-2xl border border-deep-navy/10 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse">
              <thead>
                <tr className="border-b border-deep-navy/10 bg-[#f8fafc]">
                  <Head>Urutan</Head>

                  <Head>Nama</Head>

                  <Head>Jabatan</Head>

                  <Head>Bidang</Head>

                  <Head>Status</Head>

                  <th className="px-5 py-4 text-right text-[10px] font-bold uppercase tracking-[0.12em] text-slate">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>
                {rows.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-deep-navy/[0.06] last:border-0"
                  >
                    <Cell>{item.urutan}</Cell>

                    <Cell>
                      <strong>{item.nama}</strong>
                    </Cell>

                    <Cell>{item.jabatan}</Cell>

                    <Cell>{item.bidang || "—"}</Cell>

                    <Cell>
                      <span
                        className={
                          item.aktif ? "text-emerald-700" : "text-slate-400"
                        }
                      >
                        {item.aktif ? "Aktif" : "Nonaktif"}
                      </span>
                    </Cell>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        {/* EDIT */}

                        <Link
                          href={`/admin/pengurus/${id}/struktur/${item.id}/edit`}
                          className="
                              rounded-lg
                              border border-deep-navy/10
                              px-3 py-2
                              text-xs font-semibold
                              text-deep-navy
                              transition
                              hover:bg-soft-blue
                            "
                        >
                          Edit
                        </Link>

                        {/* DELETE */}

                        <form action={deleteStruktur}>
                          <input type="hidden" name="pengurus_id" value={id} />

                          <input
                            type="hidden"
                            name="struktur_id"
                            value={item.id}
                          />

                          <button
                            type="submit"
                            className="
                                rounded-lg
                                border border-red-200
                                px-3 py-2
                                text-xs font-semibold
                                text-red-600
                                transition
                                hover:bg-red-50
                              "
                          >
                            Hapus
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </main>
  );
}

function Head({ children }) {
  return (
    <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-slate">
      {children}
    </th>
  );
}

function Cell({ children }) {
  return <td className="px-5 py-4 text-sm text-deep-navy">{children}</td>;
}
