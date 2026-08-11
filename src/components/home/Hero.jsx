import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section
      className="
        relative
        isolate
        min-h-[100svh]
        overflow-hidden
        bg-deep-navy
        text-white
      "
    >
      {/* Background grid */}
      <div
        aria-hidden="true"
        className="hero-grid pointer-events-none absolute inset-0"
      />

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-[18rem]
          -top-[18rem]
          h-[42rem]
          w-[42rem]
          rounded-full
          bg-royal-blue/20
          blur-[120px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-[20rem]
          -left-[14rem]
          h-[38rem]
          w-[38rem]
          rounded-full
          bg-sky-accent/10
          blur-[120px]
        "
      />

      {/* Giant archival year */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[-2rem]
          right-[-1rem]
          hidden
          select-none
          font-heading
          text-[clamp(10rem,26vw,28rem)]
          font-bold
          leading-none
          tracking-[-0.09em]
          text-white/[0.025]
          lg:block
        "
      >
        07
      </div>

      {/* Vertical editorial line */}
      <div
        aria-hidden="true"
        className="
          absolute
          bottom-0
          right-[8vw]
          top-0
          hidden
          w-px
          bg-white/[0.06]
          xl:block
        "
      />

      <Container className="relative">
        <div
          className="
            flex
            min-h-[100svh]
            flex-col
            justify-between
            pb-8
            pt-[120px]
            sm:pb-10
            lg:pb-12
            lg:pt-[150px]
          "
        >
          {/* Main content */}
          <div className="grid gap-14 lg:grid-cols-[1fr_auto] lg:items-start">
            <div className="max-w-5xl">
              {/* Eyebrow */}
              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-x-4
                  gap-y-2
                  font-heading
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-sky-accent
                  sm:text-xs
                "
              >
                <span>HMP PGSD FKIP</span>

                <span
                  aria-hidden="true"
                  className="h-px w-10 bg-sky-accent/60"
                />

                <span className="text-white/50">
                  Universitas Muhammadiyah Makassar
                </span>
              </div>

              {/* Heading */}
              <h1
                className="
                  mt-8
                  max-w-[1100px]
                  font-heading
                  text-[clamp(3.4rem,8vw,7.4rem)]
                  font-semibold
                  leading-[0.88]
                  tracking-[-0.065em]
                  !text-white
                "
              >
                Satu Himpunan.
                <br />
                <span className="text-sky-accent">Banyak Generasi.</span>
                <br />
                Satu Perjalanan.
              </h1>

              {/* Intro + CTA */}
              <div
                className="
                  mt-10
                  grid
                  gap-8
                  border-t
                  border-white/10
                  pt-7
                  md:grid-cols-[minmax(0,34rem)_auto]
                  md:items-end
                  md:justify-between
                  lg:mt-14
                "
              >
                <p
                  className="
                    max-w-xl
                    text-sm
                    leading-7
                    text-white/60
                    sm:text-base
                    sm:leading-8
                  "
                >
                  Digital Selayang Pandang HMP PGSD FKIP Universitas
                  Muhammadiyah Makassar. Merawat jejak organisasi dari satu
                  generasi ke generasi berikutnya.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button
                    href="#selayang-pandang"
                    variant="light"
                    size="lg"
                    showArrow
                  >
                    Jelajahi Perjalanan
                  </Button>

                  <Link
                    href="/angkatan"
                    className="
                      group
                      inline-flex
                      min-h-14
                      items-center
                      gap-3
                      px-2
                      font-heading
                      text-sm
                      font-semibold
                      text-white/70
                      transition-colors
                      hover:text-sky-accent
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-sky-accent
                    "
                  >
                    Lihat Angkatan
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

            {/* Desktop year indicator */}
            <div
              className="
                hidden
                min-w-[130px]
                border-l
                border-white/10
                pl-7
                lg:block
              "
            >
              <p
                className="
                  font-heading
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-white/35
                "
              >
                Established
              </p>

              <p
                className="
                  mt-3
                  font-heading
                  text-4xl
                  font-semibold
                  tracking-[-0.05em]
                  text-white
                "
              >
                2007
              </p>

              <div className="my-6 h-16 w-px bg-sky-accent/50" />

              <p
                className="
                  font-heading
                  text-[10px]
                  font-bold
                  uppercase
                  leading-5
                  tracking-[0.15em]
                  text-white/35
                "
              >
                Digital
                <br />
                Archive
              </p>
            </div>
          </div>

          {/* Bottom information */}
          <div
            className="
              mt-16
              flex
              items-end
              justify-between
              border-t
              border-white/10
              pt-5
            "
          >
            <div className="flex items-center gap-5">
              <span
                className="
                  font-heading
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-white/35
                "
              >
                Est. 2007
              </span>

              <span
                aria-hidden="true"
                className="hidden h-px w-10 bg-white/20 sm:block"
              />

              <span
                className="
                  hidden
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-white/30
                  sm:block
                "
              >
                Makassar, Indonesia
              </span>
            </div>

            <a
              href="#selayang-pandang"
              aria-label="Scroll ke Selayang Pandang"
              className="
                group
                flex
                items-center
                gap-3
                text-white/40
                transition-colors
                hover:text-sky-accent
              "
            >
              <span
                className="
                  hidden
                  font-heading
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.15em]
                  sm:block
                "
              >
                Scroll
              </span>

              <span
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/15
                  transition-colors
                  group-hover:border-sky-accent/50
                "
              >
                <ArrowDown aria-hidden="true" size={16} strokeWidth={1.7} />
              </span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
