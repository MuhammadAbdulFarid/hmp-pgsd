"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, LogIn, Menu, X } from "lucide-react";

const navItems = [
  { label: "Selayang Pandang", href: "/selayang-pandang" },
  { label: "Sejarah", href: "/sejarah" },
  { label: "Pengurus", href: "/pengurus" },
  { label: "Program Kerja", href: "/program-kerja" },
  { label: "Angkatan", href: "/angkatan" },
  { label: "Galeri", href: "/galeri" },
];

const navContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.15,
    },
  },
};

const navItemAnimation = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Navbar() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Navbar public tidak tampil di halaman admin/login.
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/login")) {
    return null;
  }

  const isActive = (href) =>
    pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <>
      <motion.header
        initial={{
          y: -100,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.75,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`
          fixed left-0 right-0 top-0 z-[100]
          border-b
          transition-[background-color,border-color,box-shadow]
          duration-500
          ${
            scrolled
              ? `
                border-white/[0.08]
                bg-[#071f31]/92
                shadow-[0_18px_50px_rgba(0,0,0,0.18)]
                backdrop-blur-2xl
              `
              : `
                border-white/[0.10]
                bg-[#092E47]/96
                backdrop-blur-xl
              `
          }
        `}
      >
        {/* TOP LIGHT */}
        <div
          className="
            pointer-events-none
            absolute inset-x-0 top-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-[#36BFE7]/70
            to-transparent
          "
        />

        <motion.div
          animate={{
            height: scrolled ? 72 : 90,
          }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            mx-auto
            flex
            w-full
            max-w-[1600px]
            items-center
            px-6
            lg:px-8
            xl:px-10
          "
        >
          {/* ==================================================
              BRAND
          ================================================== */}

          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.65,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Link
              href="/"
              className="group flex shrink-0 items-center gap-3"
              aria-label="HMP PGSD - Beranda"
            >
              <motion.div
                whileHover={{
                  scale: 1.08,
                  rotate: -3,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 18,
                }}
                className="
                  relative
                  flex h-[46px] w-[46px]
                  items-center justify-center
                  overflow-hidden
                  rounded-[14px]
                  bg-white
                  p-1.5
                  shadow-[0_8px_30px_rgba(54,191,231,0.13)]
                "
              >
                <Image
                  src="/images/logo_hmp.jpeg"
                  alt="Logo HMP PGSD"
                  width={46}
                  height={46}
                  priority
                  className="h-full w-full object-contain"
                />

                <div
                  className="
                    pointer-events-none
                    absolute inset-0
                    bg-gradient-to-tr
                    from-transparent
                    via-white/0
                    to-[#36BFE7]/10
                  "
                />
              </motion.div>

              <div className="hidden sm:block">
                <p
                  className="
                    font-heading
                    text-[15px]
                    font-extrabold
                    leading-none
                    tracking-[-0.025em]
                    text-white
                  "
                >
                  HMP PGSD
                </p>

                <p
                  className="
                    mt-1
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-[#93dff4]
                  "
                >
                  FKIP UNISMUH
                </p>
              </div>
            </Link>
          </motion.div>

          {/* ==================================================
              DESKTOP NAVIGATION
          ================================================== */}

          <motion.nav
            variants={navContainer}
            initial="hidden"
            animate="show"
            className="
              ml-auto
              hidden
              items-center
              lg:flex
            "
          >
            <div className="flex items-center gap-0.5 xl:gap-1">
              {navItems.map((item) => {
                const active = isActive(item.href);

                return (
                  <motion.div
                    key={item.href}
                    variants={navItemAnimation}
                    className="relative"
                  >
                    <Link
                      href={item.href}
                      className="
                        group
                        relative
                        flex h-11
                        items-center
                        justify-center
                        overflow-hidden
                        whitespace-nowrap
                        rounded-full
                        px-3
                        xl:px-4
                      "
                    >
                      {/* ACTIVE PILL */}

                      {active && (
                        <motion.span
                          layoutId="navbar-active-pill"
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 32,
                          }}
                          className="
                            absolute inset-0
                            rounded-full
                            border
                            border-[#36BFE7]/30
                            bg-[#36BFE7]/14
                            shadow-[inset_0_0_22px_rgba(54,191,231,0.05)]
                          "
                        />
                      )}

                      {/* HOVER GLOW */}

                      <span
                        className="
                          absolute inset-0
                          rounded-full
                          bg-white/[0.07]
                          opacity-0
                          transition-opacity
                          duration-300
                          group-hover:opacity-100
                        "
                      />

                      {/* TEXT */}

                      <span
                        className={`
                          relative z-10
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-[0.09em]
                          transition-colors
                          duration-300
                          xl:text-[11px]
                          ${
                            active
                              ? "text-[#71d6f3]"
                              : "text-white/80 group-hover:text-white"
                          }
                        `}
                      >
                        {item.label}
                      </span>

                      {/* HOVER LINE */}

                      {!active && (
                        <span
                          className="
                            absolute bottom-[5px]
                            left-1/2
                            h-[2px]
                            w-0
                            -translate-x-1/2
                            rounded-full
                            bg-[#36BFE7]
                            transition-all
                            duration-300
                            group-hover:w-5
                          "
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* DIVIDER */}

            <motion.div
              variants={navItemAnimation}
              className="
                mx-3
                h-7
                w-px
                bg-gradient-to-b
                from-transparent
                via-white/25
                to-transparent
                xl:mx-4
              "
            />

            {/* ARSIP */}

            <motion.div variants={navItemAnimation}>
              <motion.div
                whileHover={{
                  y: -2,
                  scale: 1.025,
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >
                <Link
                  href="/arsip"
                  className="
                    group
                    relative
                    flex h-11
                    items-center
                    justify-center
                    gap-2
                    overflow-hidden
                    rounded-full
                    border
                    border-[#6dd8f5]/50
                    px-5
                    text-[10px]
                    font-extrabold
                    uppercase
                    tracking-[0.10em]
                    text-white
                    transition
                    duration-300
                    hover:border-[#6dd8f5]
                    hover:shadow-[0_0_25px_rgba(54,191,231,0.14)]
                    xl:text-[11px]
                  "
                >
                  <span
                    className="
                      absolute inset-0
                      translate-y-full
                      bg-[#36BFE7]/15
                      transition-transform
                      duration-300
                      group-hover:translate-y-0
                    "
                  />

                  <span className="relative z-10">Arsip</span>

                  <ArrowUpRight
                    size={14}
                    strokeWidth={2}
                    className="
                      relative z-10
                      transition-transform
                      duration-300
                      group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5
                    "
                  />
                </Link>
              </motion.div>
            </motion.div>

            {/* ADMIN */}

            <motion.div variants={navItemAnimation}>
              <motion.div
                whileHover={{
                  y: -2,
                  scale: 1.025,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="ml-2"
              >
                <Link
                  href="/admin"
                  className="
                    group
                    relative
                    flex h-11
                    items-center
                    justify-center
                    gap-2
                    overflow-hidden
                    rounded-full
                    bg-white
                    px-5
                    text-[10px]
                    font-extrabold
                    uppercase
                    tracking-[0.10em]
                    text-[#092E47]
                    shadow-[0_10px_35px_rgba(0,0,0,0.15)]
                    transition
                    duration-300
                    hover:shadow-[0_10px_35px_rgba(54,191,231,0.15)]
                    xl:text-[11px]
                  "
                >
                  <span
                    className="
                      absolute inset-0
                      translate-x-[-105%]
                      skew-x-[-18deg]
                      bg-gradient-to-r
                      from-transparent
                      via-[#36BFE7]/20
                      to-transparent
                      transition-transform
                      duration-700
                      group-hover:translate-x-[105%]
                    "
                  />

                  <LogIn size={14} strokeWidth={2} className="relative z-10" />

                  <span className="relative z-10">Admin</span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.nav>

          {/* ==================================================
              MOBILE BUTTON
          ================================================== */}

          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            className="
              ml-auto
              flex h-11 w-11
              items-center
              justify-center
              rounded-xl
              border
              border-white/15
              bg-white/[0.06]
              text-white
              backdrop-blur
              lg:hidden
            "
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div
                  key="close"
                  initial={{
                    opacity: 0,
                    rotate: -90,
                    scale: 0.5,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: 90,
                    scale: 0.5,
                  }}
                >
                  <X size={23} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{
                    opacity: 0,
                    rotate: 90,
                    scale: 0.5,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: -90,
                    scale: 0.5,
                  }}
                >
                  <Menu size={23} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>

        {/* MOVING LIGHT AT BOTTOM */}

        <motion.div
          initial={{ x: "-30%" }}
          animate={{ x: "130%" }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
          className="
            pointer-events-none
            absolute bottom-0
            h-px
            w-[22%]
            bg-gradient-to-r
            from-transparent
            via-[#36BFE7]/80
            to-transparent
          "
        />
      </motion.header>

      {/* SPACER KARENA NAVBAR FIXED */}

      <motion.div
        animate={{
          height: scrolled ? 72 : 90,
        }}
        transition={{
          duration: 0.4,
        }}
      />

      {/* ==================================================
          MOBILE MENU
      ================================================== */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
              scaleY: 0.92,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scaleY: 1,
            }}
            exit={{
              opacity: 0,
              y: -15,
              scaleY: 0.96,
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              transformOrigin: "top",
            }}
            className="
              fixed
              left-0 right-0
              top-[90px]
              z-[99]
              border-b
              border-white/10
              bg-[#071f31]/98
              shadow-2xl
              backdrop-blur-2xl
              lg:hidden
            "
          >
            <nav className="px-6 py-6">
              <motion.div
                variants={navContainer}
                initial="hidden"
                animate="show"
                className="space-y-1"
              >
                {navItems.map((item) => {
                  const active = isActive(item.href);

                  return (
                    <motion.div key={item.href} variants={navItemAnimation}>
                      <Link
                        href={item.href}
                        className={`
                          flex min-h-14
                          items-center
                          justify-between
                          rounded-xl
                          px-4
                          text-sm
                          font-semibold
                          transition
                          ${
                            active
                              ? "bg-[#36BFE7]/12 text-[#6bd4f1]"
                              : "text-white/75 hover:bg-white/[0.06] hover:text-white"
                          }
                        `}
                      >
                        {item.label}

                        <ArrowUpRight
                          size={15}
                          className={
                            active ? "text-[#36BFE7]" : "text-white/30"
                          }
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Link
                  href="/arsip"
                  className="
                    flex h-12
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-[#36BFE7]/35
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.08em]
                    text-white
                  "
                >
                  Arsip
                  <ArrowUpRight size={14} />
                </Link>

                <Link
                  href="/admin"
                  className="
                    flex h-12
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-white
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.08em]
                    text-[#092E47]
                  "
                >
                  <LogIn size={14} />
                  Admin
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
