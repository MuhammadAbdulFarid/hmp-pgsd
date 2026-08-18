import { notFound } from "next/navigation";

import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";

import { getPengurusById, getStrukturPengurus } from "@/lib/data/content";

/*
 * Selama CMS aktif, halaman ini selalu mengambil
 * data terbaru dari Supabase.
 */
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PengurusDetail({ params }) {
  const { id } = await params;

  /*
   * Ambil Ketua Umum + struktur periode bersamaan.
   */
  const [pengurus, struktur] = await Promise.all([
    getPengurusById(id),
    getStrukturPengurus(id),
  ]);

  if (!pengurus) {
    notFound();
  }

  return (
    <main>
      {/* =====================================================
          HEADER KETUA UMUM
      ===================================================== */}

      <PageHeader
        eyebrow={
          pengurus.periode ? `Periode ${pengurus.periode}` : "Kepengurusan"
        }
        title={pengurus.nama}
        description={pengurus.jabatan || "Ketua Umum"}
      />

      {/* =====================================================
          PROFIL KETUA UMUM
      ===================================================== */}

      <Container className="section-space">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start">
          {/* INFORMATION */}

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary-blue">
              Profil Kepengurusan
            </p>

            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-[-0.04em] text-deep-navy md:text-4xl">
              Periode {pengurus.periode}
            </h2>

            <dl className="mt-8 max-w-2xl divide-y divide-deep-navy/10 border-y border-deep-navy/10">
              <Detail label="Jabatan" value={pengurus.jabatan} />

              <Detail label="Periode" value={pengurus.periode} />

              <Detail label="Angkatan" value={pengurus.angkatan} />

              <Detail label="Quote" value={pengurus.quote} />

              <Detail label="Deskripsi" value={pengurus.deskripsi} />
            </dl>
          </div>

          {/* FOTO KETUA UMUM */}

          <article className="overflow-hidden border border-deep-navy/10 bg-white">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#eaf7fc]">
              {pengurus.foto ? (
                <div
                  role="img"
                  aria-label={`Foto ${pengurus.nama}`}
                  className="
                    h-full w-full
                    bg-cover
                    bg-center
                    bg-no-repeat
                    transition
                    duration-700
                    hover:scale-[1.03]
                  "
                  style={{
                    backgroundImage: `url("${pengurus.foto}")`,
                  }}
                />
              ) : (
                <PhotoPlaceholder nama={pengurus.nama} />
              )}
            </div>

            <div className="border-t border-deep-navy/10 p-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-primary-blue">
                Ketua Umum
              </p>

              <h3 className="mt-2 font-heading text-xl font-semibold text-deep-navy">
                {pengurus.nama}
              </h3>

              <p className="mt-1 text-sm text-slate">
                Periode {pengurus.periode}
              </p>
            </div>
          </article>
        </div>
      </Container>

      {/* =====================================================
          STRUKTUR KEPENGURUSAN
      ===================================================== */}

      <section className="border-t border-deep-navy/10 bg-[#f7fafc]">
        <Container className="py-16 md:py-20">
          {/* HEADER */}

          <div className="flex flex-col gap-6 border-b border-deep-navy/10 pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary-blue">
                Struktur Organisasi
              </p>

              <h2 className="mt-3 max-w-4xl font-heading text-3xl font-semibold tracking-[-0.04em] text-deep-navy md:text-4xl lg:text-5xl">
                Pengurus Periode {pengurus.periode}
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate">
                Susunan struktural kepengurusan HMP PGSD pada masa kepemimpinan{" "}
                {pengurus.nama}.
              </p>
            </div>

            <div className="shrink-0">
              <p className="font-heading text-4xl font-semibold tracking-[-0.04em] text-deep-navy">
                {String(struktur.length + 1).padStart(2, "0")}
              </p>

              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-primary-blue">
                Personel
              </p>
            </div>
          </div>

          {/* =================================================
              KETUA UMUM / PIMPINAN
          ================================================= */}

          <div className="mt-10">
            <div className="mb-5 flex items-center gap-4">
              <p className="shrink-0 text-[9px] font-bold uppercase tracking-[0.18em] text-primary-blue">
                Pimpinan
              </p>

              <div className="h-px flex-1 bg-deep-navy/10" />
            </div>

            <div className="max-w-md">
              <StructureCard
                nama={pengurus.nama}
                jabatan={pengurus.jabatan || "Ketua Umum"}
                bidang="Ketua Umum"
                foto={pengurus.foto}
                featured
              />
            </div>
          </div>

          {/* =================================================
              ANGGOTA STRUKTUR
          ================================================= */}

          {struktur.length > 0 ? (
            <div className="mt-14">
              <div className="mb-5 flex items-center gap-4">
                <p className="shrink-0 text-[9px] font-bold uppercase tracking-[0.18em] text-primary-blue">
                  Struktur Kepengurusan
                </p>

                <div className="h-px flex-1 bg-deep-navy/10" />
              </div>

              <div className="grid overflow-hidden border border-deep-navy/10 bg-deep-navy/10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {struktur.map((item) => (
                  <StructureCard
                    key={item.id}
                    nama={item.nama}
                    jabatan={item.jabatan}
                    bidang={item.bidang}
                    foto={item.foto_url || item.foto}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* ===============================================
               EMPTY STATE
            =============================================== */

            <div className="mt-14 border border-dashed border-deep-navy/15 bg-white px-6 py-16 text-center">
              <p className="font-heading text-2xl font-semibold tracking-[-0.03em] text-deep-navy">
                Struktur kepengurusan belum tersedia.
              </p>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate">
                Susunan lengkap pengurus periode {pengurus.periode} akan
                ditampilkan setelah data dilengkapi oleh administrator HMP PGSD.
              </p>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}

/* =========================================================
   DETAIL
   ========================================================= */

function Detail({ label, value }) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  return (
    <div className="grid gap-2 py-5 sm:grid-cols-[140px_1fr]">
      <dt className="text-xs font-bold uppercase tracking-widest text-primary-blue">
        {label}
      </dt>

      <dd className="text-sm leading-7 text-slate">{String(value)}</dd>
    </div>
  );
}

/* =========================================================
   STRUCTURE CARD
   ========================================================= */

function StructureCard({ nama, jabatan, bidang, foto, featured = false }) {
  return (
    <article
      className={`
        group bg-white
        ${
          featured
            ? "border border-primary-blue/15"
            : "border-r border-b border-deep-navy/[0.06]"
        }
      `}
    >
      {/* FOTO */}

      <div
        className={`
          relative overflow-hidden bg-[#eaf7fc]
          ${featured ? "aspect-[5/4]" : "aspect-[4/3]"}
        `}
      >
        {foto ? (
          <div
            role="img"
            aria-label={`Foto ${nama}`}
            className="
              h-full w-full
              bg-cover
              bg-center
              bg-no-repeat
              transition
              duration-700
              group-hover:scale-[1.04]
            "
            style={{
              backgroundImage: `url("${foto}")`,
            }}
          />
        ) : (
          <PhotoPlaceholder nama={nama} />
        )}

        {/* BIDANG */}

        {bidang ? (
          <div className="absolute left-4 top-4 max-w-[calc(100%-2rem)] bg-deep-navy px-3 py-2">
            <p className="truncate text-[8px] font-bold uppercase tracking-[0.14em] text-white">
              {bidang}
            </p>
          </div>
        ) : null}
      </div>

      {/* INFORMATION */}

      <div className="border-t border-deep-navy/[0.06] p-5">
        <h3 className="font-heading text-xl font-semibold tracking-[-0.025em] text-deep-navy">
          {nama || "Nama belum tersedia"}
        </h3>

        <p className="mt-2 text-sm text-slate">
          {jabatan || "Jabatan belum tersedia"}
        </p>
      </div>
    </article>
  );
}

/* =========================================================
   PHOTO PLACEHOLDER
   ========================================================= */

function PhotoPlaceholder({ nama }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-5 text-center">
      <span className="font-heading text-7xl font-semibold leading-none text-deep-navy/[0.06]">
        {getInitial(nama)}
      </span>

      <p className="mt-4 text-[8px] font-bold uppercase tracking-[0.2em] text-primary-blue/50">
        Foto belum tersedia
      </p>
    </div>
  );
}

/* =========================================================
   INITIAL
   ========================================================= */

function getInitial(name) {
  if (!name) {
    return "?";
  }

  return String(name).trim().charAt(0).toUpperCase();
}
