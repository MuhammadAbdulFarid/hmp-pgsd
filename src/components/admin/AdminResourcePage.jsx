import Link from "next/link";
import { redirect } from "next/navigation";

import AdminDeleteButton from "@/components/admin/AdminDeleteButton";
import { getCurrentAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";

export default async function AdminResourcePage({
  title,
  description,
  table,
  resource,
  addHref,
  columns = [],
  orderBy = "id",
  ascending = false,
  emptyText = "Belum ada data.",
}) {
  const currentAdmin = await getCurrentAdmin();

  if (!currentAdmin) {
    redirect("/login");
  }

  const supabase = createAdminClient();

  let { data, error } = await supabase.from(table).select("*").order(orderBy, {
    ascending,
  });

  /*
   * Kalau kolom orderBy ternyata tidak tersedia,
   * jangan bikin seluruh halaman crash.
   * Coba fetch ulang tanpa sorting.
   */
  if (error) {
    const retry = await supabase.from(table).select("*");

    data = retry.data;
    error = retry.error;
  }

  const rows = data || [];

  /*
   * Contoh:
   * program_kerja -> program-kerja
   */
  const resourceSlug = resource || table.replaceAll("_", "-");

  /*
   * Pengaturan website adalah singleton.
   * Jangan sediakan Delete.
   */
  const allowDelete =
    resourceSlug !== "pengaturan" && resourceSlug !== "site-settings";

  return (
    <main className="px-5 py-8 md:px-8 md:py-10">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary-blue">
            Content Management
          </p>

          <h1 className="mt-3 font-heading text-3xl font-semibold tracking-[-0.04em] text-deep-navy md:text-4xl">
            {title}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate">
            {description}
          </p>
        </div>

        {addHref ? (
          <Link
            href={addHref}
            className="
              inline-flex h-11 items-center justify-center
              rounded-lg bg-deep-navy px-5
              text-xs font-semibold text-white
              transition hover:bg-primary-blue
            "
          >
            + Tambah Data
          </Link>
        ) : null}
      </div>

      {/* =====================================================
          TOTAL DATA
      ===================================================== */}

      <div className="mt-8 flex items-center justify-between rounded-xl border border-deep-navy/10 bg-white px-5 py-4">
        <p className="text-sm text-slate">Total data</p>

        <p className="font-heading text-xl font-semibold text-deep-navy">
          {rows.length}
        </p>
      </div>

      {/* =====================================================
          ERROR
      ===================================================== */}

      {error ? (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          <p className="font-semibold">Gagal mengambil data.</p>

          <p className="mt-1 break-words text-xs">{error.message}</p>
        </div>
      ) : null}

      {/* =====================================================
          EMPTY STATE
      ===================================================== */}

      {!error && rows.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-deep-navy/15 bg-white px-6 py-16 text-center">
          <p className="font-heading text-lg font-semibold text-deep-navy">
            {emptyText}
          </p>

          <p className="mt-2 text-sm text-slate">
            Data dapat ditambahkan oleh administrator.
          </p>

          {addHref ? (
            <Link
              href={addHref}
              className="
                mt-6 inline-flex
                rounded-lg bg-deep-navy
                px-5 py-3
                text-xs font-semibold text-white
                transition hover:bg-primary-blue
              "
            >
              Tambah Data Pertama
            </Link>
          ) : null}
        </div>
      ) : null}

      {/* =====================================================
          TABLE
      ===================================================== */}

      {!error && rows.length > 0 ? (
        <div className="mt-6 overflow-hidden rounded-2xl border border-deep-navy/10 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse">
              <thead>
                <tr className="border-b border-deep-navy/10 bg-[#f8fafc]">
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className="
                        px-5 py-4 text-left
                        text-[10px] font-bold uppercase
                        tracking-[0.12em] text-slate
                      "
                    >
                      {column.label}
                    </th>
                  ))}

                  <th
                    className="
                      px-5 py-4 text-right
                      text-[10px] font-bold uppercase
                      tracking-[0.12em] text-slate
                    "
                  >
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>
                {rows.map((item) => (
                  <tr
                    key={item.id}
                    className="
                      border-b border-deep-navy/[0.06]
                      last:border-0
                    "
                  >
                    {/* DATA COLUMN */}

                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className="
                          max-w-[320px]
                          px-5 py-4
                          text-sm text-deep-navy
                        "
                      >
                        {formatValue(item[column.key])}
                      </td>
                    ))}

                    {/* =========================================
                        ACTION
                    ========================================= */}

                    <td className="px-5 py-4">
                      <div className="flex flex-wrap items-start justify-end gap-2">
                        {/* ===============================
                            KHUSUS PENGURUS
                        =============================== */}

                        {resourceSlug === "pengurus" ? (
                          <Link
                            href={`/admin/pengurus/${item.id}/struktur`}
                            className="
                              rounded-lg
                              border border-primary-blue/20
                              bg-soft-blue
                              px-3 py-2
                              text-xs font-semibold
                              text-primary-blue
                              transition
                              hover:bg-primary-blue
                              hover:text-white
                            "
                          >
                            Kelola Struktur
                          </Link>
                        ) : null}

                        {/* ===============================
                            EDIT
                        =============================== */}

                        <Link
                          href={`/admin/${resourceSlug}/${item.id}/edit`}
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

                        {/* ===============================
                            DELETE
                        =============================== */}

                        {allowDelete ? (
                          <AdminDeleteButton
                            resource={resourceSlug}
                            id={item.id}
                            label={title}
                          />
                        ) : null}
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

/* =========================================================
   FORMAT VALUE
   ========================================================= */

function formatValue(value) {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  if (typeof value === "boolean") {
    return value ? "Aktif" : "Tidak";
  }

  const text = String(value);

  return text.length > 90 ? `${text.slice(0, 90)}...` : text;
}
