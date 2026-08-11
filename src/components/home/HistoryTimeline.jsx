import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Container from "@/components/ui/Container";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

export default function HistoryTimeline({ sejarah = [] }) {
  const sortedHistory = [...sejarah].sort(
    (a, b) => Number(a.tahun) - Number(b.tahun),
  );

  return (
    <section
      id="jejak-sejarah"
      className="
        relative
        overflow-hidden
        bg-soft-blue
        section-space
      "
    >
      {/* Decorative archival year */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-8
          bottom-0
          hidden
          select-none
          font-heading
          text-[clamp(10rem,22vw,22rem)]
          font-bold
          leading-none
          tracking-[-0.09em]
          text-deep-navy/[0.025]
          lg:block
        "
      >
        07
      </div>

      <Container className="relative">
        {/* Header */}
        <div
          className="
            grid
            gap-10
            lg:grid-cols-[0.28fr_1fr]
            lg:gap-20
          "
        >
          {/* Editorial index */}
          <div>
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
              02
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
              Jejak Sejarah
            </p>
          </div>

          {/* Heading */}
          <div>
            <SectionEyebrow>Perjalanan Organisasi</SectionEyebrow>

            <div
              className="
                mt-7
                grid
                gap-8
                xl:grid-cols-[1fr_0.42fr]
                xl:items-end
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
                Jejak yang
                <br />
                membentuk kita.
              </h2>

              <div>
                <p
                  className="
                    max-w-lg
                    text-sm
                    leading-7
                    text-slate
                    sm:text-base
                    sm:leading-8
                  "
                >
                  Perjalanan HMP PGSD tumbuh melalui berbagai fase perubahan
                  organisasi. Setiap perubahan menjadi bagian dari identitas
                  yang diwariskan kepada generasi berikutnya.
                </p>

                <Link
                  href="/sejarah"
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
                  Lihat sejarah lengkap
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
          </div>
        </div>

        {/* Timeline */}
        <div
          className="
            mt-16
            lg:ml-[calc(28%+5rem)]
            lg:mt-24
          "
        >
          {sortedHistory.length > 0 ? (
            <>
              {/* =============================================
                  DESKTOP TIMELINE
                  ============================================= */}
              <div className="hidden lg:block">
                <div
                  className="
                    relative
                    grid
                    gap-0
                  "
                  style={{
                    gridTemplateColumns: `repeat(${sortedHistory.length}, minmax(0, 1fr))`,
                  }}
                >
                  {/* Horizontal timeline line */}
                  <div
                    aria-hidden="true"
                    className="
                      absolute
                      left-0
                      right-0
                      top-[5.4rem]
                      h-px
                      bg-deep-navy/15
                    "
                  />

                  {sortedHistory.map((item, index) => (
                    <article
                      key={`${item.tahun}-${item.judul}`}
                      className={`
                        group
                        relative
                        min-w-0
                        pb-3
                        ${
                          index !== 0
                            ? "border-l border-deep-navy/8 pl-7"
                            : "pr-7"
                        }
                      `}
                    >
                      {/* Year */}
                      <p
                        className="
                          font-heading
                          text-[clamp(2.6rem,4vw,4.5rem)]
                          font-semibold
                          leading-none
                          tracking-[-0.06em]
                          text-deep-navy
                          transition-colors
                          duration-300
                          group-hover:text-primary-blue
                        "
                      >
                        {item.tahun}
                      </p>

                      {/* Dot */}
                      <div
                        className="
                          relative
                          mt-6
                          flex
                          h-5
                          items-center
                        "
                      >
                        <span
                          aria-hidden="true"
                          className="
                            relative
                            z-10
                            block
                            h-3
                            w-3
                            rounded-full
                            border-[3px]
                            border-soft-blue
                            bg-primary-blue
                            ring-1
                            ring-primary-blue/30
                            transition-transform
                            duration-300
                            group-hover:scale-125
                          "
                        />
                      </div>

                      {/* Content */}
                      <div className="mt-7 max-w-xs">
                        <p
                          className="
                            font-heading
                            text-xs
                            font-bold
                            uppercase
                            tracking-[0.12em]
                            text-primary-blue
                          "
                        >
                          Milestone {String(index + 1).padStart(2, "0")}
                        </p>

                        <h3
                          className="
                            mt-4
                            font-heading
                            text-xl
                            font-semibold
                            leading-snug
                            tracking-[-0.03em]
                            text-deep-navy
                          "
                        >
                          {item.judul}
                        </h3>

                        <p
                          className="
                            mt-4
                            text-sm
                            leading-7
                            text-slate
                          "
                        >
                          {item.deskripsi || "Data akan dilengkapi."}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* =============================================
                  MOBILE / TABLET TIMELINE
                  ============================================= */}
              <div className="lg:hidden">
                <div className="relative">
                  {/* Vertical timeline line */}
                  <div
                    aria-hidden="true"
                    className="
                      absolute
                      bottom-0
                      left-[5px]
                      top-2
                      w-px
                      bg-deep-navy/15
                    "
                  />

                  <div className="space-y-12">
                    {sortedHistory.map((item, index) => (
                      <article
                        key={`${item.tahun}-${item.judul}`}
                        className="
                          relative
                          grid
                          grid-cols-[12px_1fr]
                          gap-6
                        "
                      >
                        {/* Dot */}
                        <div className="relative pt-2">
                          <span
                            aria-hidden="true"
                            className="
                              relative
                              z-10
                              block
                              h-3
                              w-3
                              rounded-full
                              border-[3px]
                              border-soft-blue
                              bg-primary-blue
                              ring-1
                              ring-primary-blue/30
                            "
                          />
                        </div>

                        {/* Content */}
                        <div>
                          <div
                            className="
                              flex
                              flex-wrap
                              items-baseline
                              gap-x-4
                              gap-y-2
                            "
                          >
                            <p
                              className="
                                font-heading
                                text-[clamp(2.5rem,12vw,4rem)]
                                font-semibold
                                leading-none
                                tracking-[-0.06em]
                                text-deep-navy
                              "
                            >
                              {item.tahun}
                            </p>

                            <span
                              className="
                                font-heading
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-[0.13em]
                                text-primary-blue
                              "
                            >
                              Milestone {String(index + 1).padStart(2, "0")}
                            </span>
                          </div>

                          <h3
                            className="
                              mt-5
                              font-heading
                              text-xl
                              font-semibold
                              leading-snug
                              tracking-[-0.03em]
                              text-deep-navy
                            "
                          >
                            {item.judul}
                          </h3>

                          <p
                            className="
                              mt-3
                              max-w-xl
                              text-sm
                              leading-7
                              text-slate
                            "
                          >
                            {item.deskripsi || "Data akan dilengkapi."}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Empty state */
            <div
              className="
                border-y
                border-deep-navy/10
                py-10
              "
            >
              <p
                className="
                  font-heading
                  text-xl
                  font-semibold
                  text-deep-navy
                "
              >
                Arsip sejarah belum tersedia.
              </p>

              <p className="mt-3 text-sm text-slate">Data akan dilengkapi.</p>
            </div>
          )}
        </div>

        {/* Bottom archival metadata */}
        <div
          className="
            mt-16
            flex
            flex-col
            gap-4
            border-t
            border-deep-navy/10
            pt-6
            sm:flex-row
            sm:items-center
            sm:justify-between
            lg:ml-[calc(28%+5rem)]
          "
        >
          <p
            className="
              max-w-xl
              text-xs
              leading-6
              text-slate
            "
          >
            Timeline akan berkembang mengikuti ketersediaan arsip dan
            dokumentasi perjalanan organisasi.
          </p>

          <p
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
            {String(sortedHistory.length).padStart(2, "0")} Milestone
          </p>
        </div>
      </Container>
    </section>
  );
}
