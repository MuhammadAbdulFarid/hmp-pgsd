import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Container from "@/components/ui/Container";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

export default function AboutPreview({ angkatan = [], sejarah = [] }) {
  const sortedAngkatan = [...angkatan].sort(
    (a, b) => Number(a.tahun) - Number(b.tahun),
  );

  const sortedSejarah = [...sejarah].sort(
    (a, b) => Number(a.tahun) - Number(b.tahun),
  );

  const foundingYear =
    sortedSejarah.length > 0
      ? Math.min(...sortedSejarah.map((item) => Number(item.tahun)))
      : null;

  const generationCount = sortedAngkatan.length;
  const milestoneCount = sortedSejarah.length;

  const firstGenerationYear =
    sortedAngkatan.length > 0 ? sortedAngkatan[0].tahun : null;

  const lastGenerationYear =
    sortedAngkatan.length > 0
      ? sortedAngkatan[sortedAngkatan.length - 1].tahun
      : null;

  return (
    <section
      id="selayang-pandang"
      className="
        relative
        overflow-hidden
        bg-off-white
        section-space
      "
    >
      {/* Decorative section number */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-5
          top-8
          hidden
          select-none
          font-heading
          text-[clamp(10rem,20vw,20rem)]
          font-bold
          leading-none
          tracking-[-0.08em]
          text-deep-navy/[0.025]
          lg:block
        "
      >
        01
      </div>

      <Container className="relative">
        <div
          className="
            grid
            gap-12
            lg:grid-cols-[0.28fr_1fr]
            lg:gap-20
          "
        >
          {/* Left editorial index */}
          <div>
            <div className="lg:sticky lg:top-32">
              <span
                aria-hidden="true"
                className="
                  font-heading
                  text-[clamp(4.5rem,8vw,7rem)]
                  font-semibold
                  leading-none
                  tracking-[-0.07em]
                  text-primary-blue
                "
              >
                01
              </span>

              <div className="mt-5 h-px w-16 bg-primary-blue/30" />

              <p
                className="
                  mt-4
                  max-w-[11rem]
                  font-heading
                  text-[10px]
                  font-bold
                  uppercase
                  leading-5
                  tracking-[0.15em]
                  text-slate
                "
              >
                Digital Selayang Pandang
              </p>
            </div>
          </div>

          {/* Main content */}
          <div>
            <SectionEyebrow>Tentang HMP PGSD</SectionEyebrow>

            <div
              className="
                mt-7
                grid
                gap-8
                xl:grid-cols-[minmax(0,1fr)_minmax(16rem,0.42fr)]
                xl:gap-14
              "
            >
              <h2
                className="
                  max-w-4xl
                  font-heading
                  text-[clamp(2.7rem,5.5vw,5.4rem)]
                  font-semibold
                  leading-[0.95]
                  tracking-[-0.055em]
                  text-deep-navy
                "
              >
                Lebih dari
                <br />
                sekadar organisasi.
              </h2>

              <div className="xl:pt-3">
                <p
                  className="
                    max-w-lg
                    text-base
                    leading-8
                    text-slate
                  "
                >
                  HMP PGSD FKIP Universitas Muhammadiyah Makassar hadir dalam
                  sebuah perjalanan organisasi yang diwariskan dari satu
                  generasi ke generasi berikutnya.
                </p>

                <p
                  className="
                    mt-5
                    max-w-lg
                    text-sm
                    leading-7
                    text-slate/80
                  "
                >
                  Digital Selayang Pandang ini disusun sebagai ruang untuk
                  merawat sejarah, kepemimpinan, generasi, program, dan
                  dokumentasi perjalanan HMP PGSD.
                </p>

                <Link
                  href="/selayang-pandang"
                  className="
                    group
                    mt-7
                    inline-flex
                    items-center
                    gap-3
                    border-b
                    border-primary-blue/30
                    pb-2
                    font-heading
                    text-sm
                    font-semibold
                    text-primary-blue
                    transition-colors
                    hover:border-primary-blue
                  "
                >
                  Selengkapnya tentang HMP PGSD
                  <ArrowUpRight
                    aria-hidden="true"
                    size={17}
                    strokeWidth={1.8}
                    className="
                      transition-transform
                      duration-300
                      group-hover:-translate-y-1
                      group-hover:translate-x-1
                    "
                  />
                </Link>
              </div>
            </div>

            {/* Data highlights */}
            <div
              className="
                mt-16
                grid
                border-y
                border-deep-navy/10
                sm:grid-cols-3
                lg:mt-20
              "
            >
              <StatItem
                value={foundingYear ?? "—"}
                label="Tahun Berdiri"
                description="Awal perjalanan organisasi"
              />

              <StatItem
                value={
                  generationCount > 0
                    ? String(generationCount).padStart(2, "0")
                    : "—"
                }
                label="Generasi Tercatat"
                description={
                  firstGenerationYear && lastGenerationYear
                    ? `${firstGenerationYear} — ${lastGenerationYear}`
                    : "Data akan dilengkapi"
                }
                bordered
              />

              <StatItem
                value={
                  milestoneCount > 0
                    ? String(milestoneCount).padStart(2, "0")
                    : "—"
                }
                label="Milestone Utama"
                description="Tersimpan dalam arsip sejarah"
              />
            </div>

            {/* Archival note */}
            <div
              className="
                mt-8
                flex
                flex-col
                gap-4
                border-l-2
                border-sky-accent
                pl-5
                sm:flex-row
                sm:items-start
                sm:justify-between
              "
            >
              <p
                className="
                  max-w-2xl
                  text-sm
                  leading-7
                  text-slate
                "
              >
                Data pada website disusun dari arsip organisasi yang tersedia.
                Informasi yang belum terdokumentasi tidak akan digantikan dengan
                data rekaan.
              </p>

              <span
                className="
                  shrink-0
                  font-heading
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.14em]
                  text-primary-blue
                "
              >
                Archive First
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function StatItem({ value, label, description, bordered = false }) {
  return (
    <div
      className={`
        relative
        py-7
        sm:px-6
        sm:py-8

        ${
          bordered
            ? `
                border-y
                border-deep-navy/10
                sm:border-x
                sm:border-y-0
              `
            : ""
        }
      `}
    >
      <p
        className="
          font-heading
          text-[clamp(2.8rem,5vw,4.5rem)]
          font-semibold
          leading-none
          tracking-[-0.06em]
          text-deep-navy
        "
      >
        {value}
      </p>

      <p
        className="
          mt-4
          font-heading
          text-xs
          font-bold
          uppercase
          tracking-[0.11em]
          text-primary-blue
        "
      >
        {label}
      </p>

      <p className="mt-2 text-xs leading-5 text-slate">{description}</p>
    </div>
  );
}
