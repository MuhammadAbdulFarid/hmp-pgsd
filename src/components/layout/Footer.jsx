import Link from "next/link";
import { ArrowUpRight, AtSign, Play, Music2 } from "lucide-react";
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
  {
    label: "Arsip",
    href: "/arsip",
  },
];

const socialMedia = [
  {
    label: "Instagram",
    icon: AtSign,
    href: "https://www.instagram.com/hmp_pgsdfkipunismuh?igsh=NWpzbjZxZmhicncy",
  },
  {
    label: "TikTok",
    icon: Music2,
    href: null,
  },
  {
    label: "YouTube",
    icon: Play,
    href: null,
  },
];
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-deep-navy text-white">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-24
          top-16
          select-none
          font-heading
          text-[clamp(8rem,22vw,22rem)]
          font-bold
          leading-none
          tracking-[-0.08em]
          text-white/[0.025]
        "
      >
        HMP
      </div>

      <Container className="relative">
        {/* Main Footer */}
        <div
          className="
            grid
            gap-14
            border-b
            border-white/10
            py-16
            md:py-20
            lg:grid-cols-[1.5fr_0.8fr_0.8fr]
            lg:gap-16
          "
        >
          {/* Identity */}
          <div>
            <Link
              href="/"
              aria-label="HMP PGSD - Beranda"
              className="inline-flex items-center gap-3"
            >
              <div
                aria-hidden="true"
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-md
                  bg-sky-accent
                  font-heading
                  text-xs
                  font-bold
                  tracking-[-0.03em]
                  text-deep-navy
                "
              >
                HMP
              </div>

              <div>
                <p className="font-heading text-base font-bold text-white">
                  HMP PGSD
                </p>

                <p
                  className="
                    mt-1
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-white/50
                  "
                >
                  FKIP UNISMUH
                </p>
              </div>
            </Link>

            <h2
              className="
                mt-9
                max-w-xl
                font-heading
                text-[clamp(2rem,4vw,3.5rem)]
                font-semibold
                leading-[1.02]
                tracking-[-0.045em]
                !text-white
              "
            >
              Merawat sejarah.
              <br />
              Melanjutkan perjuangan.
            </h2>

            <p
              className="
                mt-6
                max-w-lg
                text-sm
                leading-7
                text-white/60
                md:text-base
              "
            >
              Digital Selayang Pandang Himpunan Mahasiswa Program Studi
              Pendidikan Guru Sekolah Dasar FKIP Universitas Muhammadiyah
              Makassar.
            </p>

            <Link
              href="/arsip"
              className="
                group
                mt-8
                inline-flex
                items-center
                gap-3
                border-b
                border-sky-accent/50
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
              Baca Arsip Selayang Pandang
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

          {/* Navigation */}
          <div>
            <p
              className="
                font-heading
                text-xs
                font-bold
                uppercase
                tracking-[0.14em]
                text-white/40
              "
            >
              Navigasi
            </p>

            <nav
              aria-label="Navigasi footer"
              className="mt-7 flex flex-col items-start gap-3"
            >
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="
                    group
                    inline-flex
                    items-center
                    gap-2
                    py-1
                    font-heading
                    text-sm
                    font-medium
                    text-white/70
                    transition-colors
                    hover:text-sky-accent
                  "
                >
                  {item.label}

                  <ArrowUpRight
                    aria-hidden="true"
                    size={13}
                    className="
                      opacity-0
                      transition-all
                      duration-300
                      group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5
                      group-hover:opacity-100
                    "
                  />
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <p
              className="
                font-heading
                text-xs
                font-bold
                uppercase
                tracking-[0.14em]
                text-white/40
              "
            >
              Media Sosial
            </p>

            <div className="mt-7 flex flex-col gap-3">
              {socialMedia.map((item) => {
                const Icon = item.icon;

                if (!item.href) {
                  return (
                    <div
                      key={item.label}
                      className="
                        flex
                        items-center
                        justify-between
                        gap-4
                        py-1
                        text-white/45
                      "
                    >
                      <div className="flex items-center gap-3">
                        <Icon aria-hidden="true" size={17} strokeWidth={1.7} />

                        <span className="text-sm">{item.label}</span>
                      </div>

                      <span
                        className="
                          text-[9px]
                          font-semibold
                          uppercase
                          tracking-[0.1em]
                          text-white/25
                        "
                      >
                        Segera
                      </span>
                    </div>
                  );
                }

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex
                      items-center
                      gap-3
                      py-1
                      text-sm
                      text-white/70
                      transition-colors
                      hover:text-sky-accent
                    "
                  >
                    <Icon aria-hidden="true" size={17} strokeWidth={1.7} />

                    {item.label}
                  </a>
                );
              })}
            </div>

            <div className="mt-10">
              <p
                className="
                  font-heading
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.14em]
                  text-white/40
                "
              >
                Kampus
              </p>

              <p className="mt-4 text-sm leading-6 text-white/55">
                Universitas Muhammadiyah Makassar
              </p>

              <p className="mt-1 text-xs text-white/30">
                Detail alamat akan dilengkapi.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div
          className="
            flex
            flex-col
            gap-4
            py-6
            text-xs
            text-white/40
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p>© {currentYear} HMP PGSD FKIP Universitas Muhammadiyah Makassar</p>

          <p className="font-heading tracking-[0.04em]">2007 — Present</p>
        </div>
      </Container>
    </footer>
  );
}
