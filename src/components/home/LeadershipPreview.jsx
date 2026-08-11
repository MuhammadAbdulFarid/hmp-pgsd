import Link from "next/link";
import { ArrowRight, ArrowUpRight, UserRound } from "lucide-react";

import Container from "@/components/ui/Container";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

export default function LeadershipPreview({ pengurus = [] }) {
  const leaders = [...pengurus].filter(Boolean).slice(0, 5);

  return (
    <section
      id="kepemimpinan"
      className="
        relative
        overflow-hidden
        bg-deep-navy
        section-space
        text-white
      "
    >
      {/* Background typography */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-12
          -right-10
          hidden
          select-none
          font-heading
          text-[clamp(12rem,25vw,28rem)]
          font-bold
          leading-none
          tracking-[-0.09em]
          text-white/[0.025]
          lg:block
        "
      >
        03
      </div>

      {/* Subtle top glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-40
          -top-40
          h-[30rem]
          w-[30rem]
          rounded-full
          bg-royal-blue/15
          blur-[120px]
        "
      />

      <Container className="relative">
        {/* Section header */}
        <div
          className="
            grid
            gap-12
            lg:grid-cols-[0.28fr_1fr]
            lg:gap-20
          "
        >
          {/* Editorial number */}
          <div>
            <span
              aria-hidden="true"
              className="
                font-heading
                text-[clamp(4.5rem,8vw,7rem)]
                font-semibold
                leading-none
                tracking-[-0.07em]
                text-sky-accent
              "
            >
              03
            </span>

            <div className="mt-5 h-px w-16 bg-sky-accent/30" />

            <p
              className="
                mt-4
                max-w-[12rem]
                font-heading
                text-[10px]
                font-bold
                uppercase
                leading-5
                tracking-[0.15em]
                text-white/45
              "
            >
              Jejak Kepemimpinan
            </p>
          </div>

          {/* Main heading */}
          <div>
            <SectionEyebrow className="text-sky-accent">
              Estafet Kepemimpinan
            </SectionEyebrow>

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
                  !text-white
                "
              >
                Amanah berganti.
                <br />
                <span className="text-sky-accent">Perjuangan berlanjut.</span>
              </h2>

              <div>
                <p
                  className="
                    max-w-lg
                    text-sm
                    leading-7
                    text-white/55
                    sm:text-base
                    sm:leading-8
                  "
                >
                  Setiap periode membawa kepemimpinan, pengalaman, dan cerita
                  yang menjadi bagian dari perjalanan HMP PGSD.
                </p>

                <Link
                  href="/pengurus"
                  className="
                    group
                    mt-7
                    inline-flex
                    items-center
                    gap-3
                    border-b
                    border-sky-accent/40
                    pb-2
                    font-heading
                    text-sm
                    font-semibold
                    text-sky-accent
                    transition-colors
                    hover:border-white
                    hover:text-white
                  "
                >
                  Lihat semua kepemimpinan
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

        {/* =====================================================
            LEADERS CONTENT
            ===================================================== */}
        <div
          className="
            mt-16
            lg:ml-[calc(28%+5rem)]
            lg:mt-24
          "
        >
          {leaders.length > 0 ? (
            <LeadershipList leaders={leaders} />
          ) : (
            <LeadershipEmptyState />
          )}
        </div>

        {/* Bottom metadata */}
        <div
          className="
            mt-14
            flex
            flex-col
            gap-4
            border-t
            border-white/10
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
              text-white/40
            "
          >
            Arsip kepemimpinan akan berkembang mengikuti data organisasi yang
            tersedia.
          </p>

          <p
            className="
              shrink-0
              font-heading
              text-[10px]
              font-bold
              uppercase
              tracking-[0.14em]
              text-sky-accent
            "
          >
            {leaders.length > 0
              ? `${String(leaders.length).padStart(2, "0")} Ditampilkan`
              : "Data akan dilengkapi"}
          </p>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   LEADERS LIST
   ========================================================= */

function LeadershipList({ leaders }) {
  return (
    <div
      className="
        flex
        gap-5
        overflow-x-auto
        pb-5
        [scrollbar-width:none]
        [&::-webkit-scrollbar]:hidden
      "
    >
      {leaders.map((leader, index) => (
        <LeadershipItem
          key={leader.id || `${leader.nama}-${index}`}
          leader={leader}
          index={index}
        />
      ))}
    </div>
  );
}

/* =========================================================
   LEADER ITEM
   ========================================================= */

function LeadershipItem({ leader, index }) {
  const initials = getInitials(leader.nama);

  const detailHref = leader.id ? `/pengurus/${leader.id}` : "/pengurus";

  return (
    <Link
      href={detailHref}
      className="
        group
        relative
        min-h-[360px]
        min-w-[260px]
        max-w-[300px]
        flex-1
        overflow-hidden
        border
        border-white/10
        bg-white/[0.035]
        p-6
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-sky-accent/30
        hover:bg-white/[0.055]
        sm:min-w-[290px]
      "
    >
      {/* Sequence */}
      <span
        className="
          font-heading
          text-[10px]
          font-bold
          tracking-[0.15em]
          text-white/30
        "
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Portrait fallback */}
      <div
        className="
          mt-9
          flex
          h-28
          w-28
          items-center
          justify-center
          rounded-full
          border
          border-white/10
          bg-white/[0.04]
          font-heading
          text-3xl
          font-semibold
          tracking-[-0.05em]
          text-sky-accent
          transition-all
          duration-300
          group-hover:border-sky-accent/30
          group-hover:bg-sky-accent/10
        "
        aria-label={`Inisial ${leader.nama || "pengurus"}`}
      >
        {initials || (
          <UserRound aria-hidden="true" size={28} strokeWidth={1.5} />
        )}
      </div>

      {/* Person information */}
      <div className="mt-10">
        {leader.periode && (
          <p
            className="
              font-heading
              text-[10px]
              font-bold
              uppercase
              tracking-[0.13em]
              text-sky-accent
            "
          >
            {leader.periode}
          </p>
        )}

        <h3
          className="
            mt-3
            font-heading
            text-2xl
            font-semibold
            leading-tight
            tracking-[-0.04em]
            !text-white
          "
        >
          {leader.nama || "Data akan dilengkapi"}
        </h3>

        <p
          className="
            mt-2
            text-sm
            text-white/45
          "
        >
          {leader.jabatan || "Jabatan akan dilengkapi"}
        </p>
      </div>

      {/* Bottom arrow */}
      <div
        className="
          absolute
          bottom-6
          right-6
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          border
          border-white/10
          text-white/45
          transition-all
          duration-300
          group-hover:border-sky-accent/40
          group-hover:bg-sky-accent
          group-hover:text-deep-navy
        "
      >
        <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.8} />
      </div>
    </Link>
  );
}

/* =========================================================
   EMPTY STATE
   ========================================================= */

function LeadershipEmptyState() {
  return (
    <div
      className="
        relative
        overflow-hidden
        border-y
        border-white/10
        py-10
        sm:py-12
      "
    >
      <div
        className="
          grid
          gap-10
          md:grid-cols-[auto_1fr_auto]
          md:items-center
        "
      >
        {/* Icon */}
        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-white/[0.04]
            text-sky-accent
          "
        >
          <UserRound aria-hidden="true" size={23} strokeWidth={1.5} />
        </div>

        {/* Message */}
        <div>
          <p
            className="
              font-heading
              text-xl
              font-semibold
              tracking-[-0.03em]
              !text-white
              sm:text-2xl
            "
          >
            Arsip kepemimpinan sedang dilengkapi.
          </p>

          <p
            className="
              mt-3
              max-w-xl
              text-sm
              leading-7
              text-white/45
            "
          >
            Data pengurus dan periode kepemimpinan akan ditampilkan setelah
            informasi organisasi tersedia dan terverifikasi.
          </p>
        </div>

        <Link
          href="/pengurus"
          className="
            group
            inline-flex
            items-center
            gap-3
            font-heading
            text-sm
            font-semibold
            text-sky-accent
            transition-colors
            hover:text-white
          "
        >
          Jejak Kepemimpinan
          <ArrowRight
            aria-hidden="true"
            size={17}
            strokeWidth={1.8}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />
        </Link>
      </div>
    </div>
  );
}

/* =========================================================
   HELPERS
   ========================================================= */

function getInitials(name) {
  if (!name) return "";

  return String(name)
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}
