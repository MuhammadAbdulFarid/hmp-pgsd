import Link from "next/link";

import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";

import { getPengurus } from "@/lib/data/content";

export const metadata = {
  title: "Pengurus | HMP PGSD",
  description:
    "Jejak kepemimpinan dan kepengurusan HMP PGSD FKIP Universitas Muhammadiyah Makassar.",
};

export default async function PengurusPage() {
  const pengurus = await getPengurus();

  return (
    <main>
      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <PageHeader
        eyebrow="Jejak Kepemimpinan"
        title="Mereka yang pernah memegang amanah."
      />

      {/* =====================================================
          DAFTAR PENGURUS
          ===================================================== */}

      <Container className="section-space">
        {pengurus.length === 0 ? (
          <EmptyState
            title="Arsip kepengurusan belum tersedia."
            description="Data nantinya dapat ditambahkan oleh administrator HMP PGSD."
          />
        ) : (
          <>
            {/* INFO DATA */}

            <div
              className="
                mb-10
                flex
                flex-col
                gap-3
                border-b
                border-deep-navy/10
                pb-6
                sm:flex-row
                sm:items-end
                sm:justify-between
              "
            >
              <div>
                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-primary-blue
                  "
                >
                  Arsip Organisasi
                </p>

                <h2
                  className="
                    mt-2
                    font-heading
                    text-2xl
                    font-semibold
                    tracking-[-0.03em]
                    text-deep-navy
                    md:text-3xl
                  "
                >
                  Daftar Pengurus
                </h2>
              </div>

              <p className="text-sm text-slate">
                {pengurus.length} data tersedia
              </p>
            </div>

            {/* GRID */}

            <div
              className="
                grid
                gap-x-5
                gap-y-8
                sm:grid-cols-2
                lg:grid-cols-3
              "
            >
              {pengurus.map((item) => {
                const hasPhoto = Boolean(item.foto_url || item.foto);

                const photoUrl = item.foto_url || item.foto;

                return (
                  <Link
                    key={item.id}
                    href={`/pengurus/${item.id}`}
                    className="
                      group
                      overflow-hidden
                      border
                      border-deep-navy/10
                      bg-white
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-primary-blue/30
                      hover:shadow-[0_18px_50px_rgba(9,46,71,0.08)]
                    "
                  >
                    {/* =========================================
                        FOTO / EMPTY PHOTO STATE
                        ========================================= */}

                    <div
                      className="
                        relative
                        aspect-[4/5]
                        overflow-hidden
                        bg-soft-blue
                      "
                    >
                      {hasPhoto ? (
                        <img
                          src={photoUrl}
                          alt={`Foto ${item.nama}`}
                          className="
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-700
                            ease-out
                            group-hover:scale-[1.04]
                          "
                        />
                      ) : (
                        <div
                          className="
                            flex
                            h-full
                            w-full
                            flex-col
                            items-center
                            justify-center
                            px-8
                            text-center
                          "
                        >
                          {/* Decorative Initial */}

                          <span
                            aria-hidden="true"
                            className="
                              font-heading
                              text-[clamp(5rem,12vw,8rem)]
                              font-bold
                              leading-none
                              tracking-[-0.08em]
                              text-deep-navy/[0.06]
                            "
                          >
                            {item.nama?.charAt(0)?.toUpperCase() || "H"}
                          </span>

                          <p
                            className="
                              mt-4
                              text-[10px]
                              font-bold
                              uppercase
                              tracking-[0.16em]
                              text-deep-navy/35
                            "
                          >
                            Foto belum tersedia
                          </p>
                        </div>
                      )}

                      {/* PERIODE */}

                      <div
                        className="
                          absolute
                          left-4
                          top-4
                          bg-deep-navy
                          px-3
                          py-2
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-[0.14em]
                          text-white
                        "
                      >
                        {item.periode}
                      </div>

                      {/* HOVER OVERLAY */}

                      <div
                        aria-hidden="true"
                        className="
                          absolute
                          inset-0
                          bg-primary-blue/0
                          transition-colors
                          duration-300
                          group-hover:bg-primary-blue/10
                        "
                      />
                    </div>

                    {/* =========================================
                        DATA PENGURUS
                        ========================================= */}

                    <div className="p-6">
                      <p
                        className="
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-[0.16em]
                          text-primary-blue
                        "
                      >
                        {item.jabatan || "Pengurus"}
                      </p>

                      <h2
                        className="
                          mt-3
                          font-heading
                          text-2xl
                          font-semibold
                          leading-tight
                          tracking-[-0.035em]
                          text-deep-navy
                          transition-colors
                          group-hover:text-primary-blue
                        "
                      >
                        {item.nama}
                      </h2>

                      {item.angkatan && (
                        <p className="mt-3 text-sm text-slate">
                          Angkatan {item.angkatan}
                        </p>
                      )}

                      <div
                        className="
                          mt-6
                          flex
                          items-center
                          justify-between
                          border-t
                          border-deep-navy/10
                          pt-4
                        "
                      >
                        <span
                          className="
                            text-xs
                            font-semibold
                            text-deep-navy/55
                          "
                        >
                          Lihat profil
                        </span>

                        <span
                          aria-hidden="true"
                          className="
                            text-lg
                            text-primary-blue
                            transition-transform
                            duration-300
                            group-hover:translate-x-1
                          "
                        >
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </Container>
    </main>
  );
}
