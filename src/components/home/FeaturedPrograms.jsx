import Link from "next/link";
import { ArrowUpRight, Layers3 } from "lucide-react";

import Container from "@/components/ui/Container";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

export default function FeaturedPrograms({ programKerja = [] }) {
  const featured = programKerja.filter((item) => item.featured).slice(0, 4);

  const programs = featured.length > 0 ? featured : programKerja.slice(0, 4);

  return (
    <section className="section-space bg-off-white">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.28fr_1fr] lg:gap-20">
          <div>
            <span className="font-heading text-[clamp(4.5rem,8vw,7rem)] font-semibold leading-none tracking-[-0.07em] text-primary-blue">
              04
            </span>

            <div className="mt-5 h-px w-16 bg-primary-blue/30" />

            <p className="mt-4 font-heading text-[10px] font-bold uppercase tracking-[0.15em] text-slate">
              Program Unggulan
            </p>
          </div>

          <div>
            <SectionEyebrow>Gagasan Menjadi Gerakan</SectionEyebrow>

            <div className="mt-7 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="max-w-4xl font-heading text-[clamp(2.7rem,5.5vw,5.4rem)] font-semibold leading-[0.95] tracking-[-0.055em] text-deep-navy">
                Dari gagasan
                <br />
                menjadi dampak.
              </h2>

              <Link
                href="/program-kerja"
                className="group inline-flex items-center gap-3 font-heading text-sm font-semibold text-primary-blue"
              >
                Semua program
                <ArrowUpRight
                  size={17}
                  className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Link>
            </div>

            {programs.length > 0 ? (
              <div className="mt-16 grid gap-px bg-deep-navy/10 md:grid-cols-2">
                {programs.map((program, index) => (
                  <article
                    key={program.id || `${program.nama}-${index}`}
                    className="group bg-off-white p-7 transition-colors hover:bg-soft-blue md:p-9"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-[10px] font-bold tracking-[0.14em] text-slate">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="text-xs text-primary-blue">
                        {program.tahun || "—"}
                      </span>
                    </div>

                    <p className="mt-8 text-xs font-semibold uppercase tracking-[0.12em] text-primary-blue">
                      {program.kategori || "Program"}
                    </p>

                    <h3 className="mt-3 font-heading text-2xl font-semibold tracking-[-0.035em] text-deep-navy">
                      {program.nama}
                    </h3>

                    <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate">
                      {program.deskripsi ||
                        "Informasi program akan dilengkapi."}
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-16 flex items-start gap-5 border-y border-deep-navy/10 py-10">
                <Layers3 className="mt-1 text-primary-blue" />

                <div>
                  <h3 className="font-heading text-xl font-semibold text-deep-navy">
                    Arsip program sedang dilengkapi.
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-slate">
                    Program kerja akan tampil setelah dikelola melalui sistem
                    administrasi HMP PGSD.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
