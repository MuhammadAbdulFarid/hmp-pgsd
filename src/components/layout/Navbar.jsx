"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";

import Container from "@/components/ui/Container";

const navigation = [
  {
    label: "Selayang Pandang",
    href: "/selayang-pandang",
  },
  {
    label: "Sejarah",
    href: "/sejarah",
  },
  {
    label: "Pengurus",
    href: "/pengurus",
  },
  {
    label: "Program Kerja",
    href: "/program-kerja",
  },
  {
    label: "Angkatan",
    href: "/angkatan",
  },
  {
    label: "Galeri",
    href: "/galeri",
  },
];

export default function Navbar() {
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isHomePage = pathname === "/";

  // Navbar gelap/transparan hanya saat berada
  // di bagian paling atas Hero homepage.
  const isOverHero = isHomePage && !isScrolled && !isMenuOpen;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 28);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Tutup mobile menu ketika route berubah.
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Lock scroll ketika mobile menu terbuka.
  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";

      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  function isActive(href) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <>
      <header
        className={`
          fixed
          inset-x-0
          top-0
          z-50
          border-b
          transition-all
          duration-500
          ease-out

          ${
            isOverHero
              ? `
                  border-white/10
                  bg-deep-navy/55
                  text-white
                  backdrop-blur-xl
                `
              : `
                  border-deep-navy/8
                  bg-off-white/90
                  text-deep-navy
                  shadow-[0_8px_40px_rgba(9,46,71,0.06)]
                  backdrop-blur-xl
                `
          }
        `}
      >
        <Container>
          <div
            className="
              flex
              h-[82px]
              items-center
              justify-between
              gap-6
              md:h-[88px]
            "
          >
            {/* =========================
                BRAND
                ========================= */}
            <Link
              href="/"
              aria-label="HMP PGSD FKIP - Beranda"
              className="
                group
                flex
                shrink-0
                items-center
                gap-3
              "
            >
              <div
                className={`
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-[13px]
                  font-heading
                  text-[11px]
                  font-extrabold
                  tracking-[-0.04em]
                  transition-all
                  duration-300
                  group-hover:-translate-y-0.5

                  ${
                    isOverHero
                      ? `
                          bg-white
                          text-deep-navy
                          shadow-[0_8px_25px_rgba(0,0,0,0.12)]
                        `
                      : `
                          bg-deep-navy
                          text-white
                          shadow-[0_8px_25px_rgba(9,46,71,0.12)]
                        `
                  }
                `}
              >
                HMP
              </div>

              <div className="leading-none">
                <p
                  className={`
                    font-heading
                    text-[15px]
                    font-bold
                    tracking-[-0.035em]
                    transition-colors

                    ${isOverHero ? "text-white" : "text-deep-navy"}
                  `}
                >
                  HMP PGSD
                </p>

                <p
                  className={`
                    mt-1
                    font-heading
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.14em]
                    transition-colors

                    ${isOverHero ? "text-white/45" : "text-slate"}
                  `}
                >
                  FKIP Unismuh
                </p>
              </div>
            </Link>

            {/* =========================
                DESKTOP NAVIGATION
                ========================= */}
            <nav
              aria-label="Navigasi utama"
              className="
                hidden
                items-center
                gap-1
                xl:flex
              "
            >
              {navigation.map((item) => {
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`
                      relative
                      rounded-full
                      px-4
                      py-2.5
                      font-heading
                      text-[12px]
                      font-semibold
                      tracking-[-0.01em]
                      transition-all
                      duration-300

                      ${
                        isOverHero
                          ? active
                            ? `
                                bg-white/10
                                text-sky-accent
                              `
                            : `
                                text-white/65
                                hover:bg-white/[0.06]
                                hover:text-white
                              `
                          : active
                            ? `
                                bg-primary-blue/8
                                text-primary-blue
                              `
                            : `
                                text-deep-navy/65
                                hover:bg-deep-navy/[0.04]
                                hover:text-deep-navy
                              `
                      }
                    `}
                  >
                    {item.label}

                    {active && (
                      <span
                        aria-hidden="true"
                        className={`
                          absolute
                          -bottom-[11px]
                          left-1/2
                          h-[2px]
                          w-5
                          -translate-x-1/2
                          rounded-full

                          ${isOverHero ? "bg-sky-accent" : "bg-primary-blue"}
                        `}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* =========================
                ARCHIVE + MOBILE
                ========================= */}
            <div className="flex items-center gap-2">
              <Link
                href="/arsip"
                className={`
                  group
                  hidden
                  h-11
                  items-center
                  gap-3
                  rounded-full
                  border
                  px-5
                  font-heading
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  transition-all
                  duration-300
                  sm:inline-flex

                  ${
                    isOverHero
                      ? `
                          border-white/20
                          bg-white/[0.05]
                          text-white
                          hover:border-white/35
                          hover:bg-white
                          hover:text-deep-navy
                        `
                      : `
                          border-deep-navy
                          bg-deep-navy
                          text-white
                          hover:bg-primary-blue
                          hover:border-primary-blue
                        `
                  }
                `}
              >
                Arsip
                <ArrowUpRight
                  aria-hidden="true"
                  size={15}
                  strokeWidth={1.8}
                  className="
                    transition-transform
                    duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />
              </Link>

              <button
                type="button"
                aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen((state) => !state)}
                className={`
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  transition-all
                  xl:hidden

                  ${
                    isOverHero
                      ? `
                          border-white/20
                          text-white
                          hover:bg-white
                          hover:text-deep-navy
                        `
                      : `
                          border-deep-navy/15
                          text-deep-navy
                          hover:bg-deep-navy
                          hover:text-white
                        `
                  }
                `}
              >
                {isMenuOpen ? (
                  <X size={20} strokeWidth={1.7} />
                ) : (
                  <Menu size={20} strokeWidth={1.7} />
                )}
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* =========================
          MOBILE MENU
          ========================= */}
      <div
        className={`
          fixed
          inset-0
          z-40
          bg-off-white
          transition-all
          duration-500
          ease-out
          xl:hidden

          ${
            isMenuOpen
              ? `
                  visible
                  translate-y-0
                  opacity-100
                `
              : `
                  invisible
                  -translate-y-3
                  opacity-0
                  pointer-events-none
                `
          }
        `}
      >
        <Container
          className="
            flex
            min-h-[100svh]
            flex-col
            pb-8
            pt-32
          "
        >
          <p
            className="
              font-heading
              text-[10px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-primary-blue
            "
          >
            Navigation / Index
          </p>

          <nav
            aria-label="Navigasi mobile"
            className="
              mt-8
              border-t
              border-deep-navy/10
            "
          >
            {navigation.map((item, index) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="
                      group
                      grid
                      grid-cols-[44px_1fr_auto]
                      items-center
                      gap-3
                      border-b
                      border-deep-navy/10
                      py-5
                    "
                >
                  <span
                    className="
                        font-heading
                        text-[10px]
                        font-bold
                        tracking-[0.14em]
                        text-primary-blue
                      "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span
                    className={`
                        font-heading
                        text-[clamp(1.5rem,7vw,2.5rem)]
                        font-semibold
                        leading-none
                        tracking-[-0.04em]
                        transition-transform
                        duration-300
                        group-hover:translate-x-1

                        ${active ? "text-primary-blue" : "text-deep-navy"}
                      `}
                  >
                    {item.label}
                  </span>

                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.6}
                    className="
                        text-deep-navy/30
                        transition-all
                        group-hover:text-primary-blue
                      "
                  />
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-10">
            <Link
              href="/arsip"
              className="
                flex
                min-h-14
                w-full
                items-center
                justify-between
                rounded-full
                bg-deep-navy
                px-6
                font-heading
                text-sm
                font-semibold
                text-white
              "
            >
              Buka Arsip Digital
              <ArrowUpRight size={18} strokeWidth={1.7} />
            </Link>

            <p
              className="
                mt-6
                text-xs
                leading-6
                text-slate
              "
            >
              HMP PGSD FKIP
              <br />
              Universitas Muhammadiyah Makassar
            </p>
          </div>
        </Container>
      </div>
    </>
  );
}
