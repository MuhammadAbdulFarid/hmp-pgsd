import Image from "next/image";
import Link from "next/link";

const menu = [
  {
    label: "Dashboard",
    href: "/admin",
  },

  {
    label: "Pengurus",
    href: "/admin/pengurus",
  },

  {
    label: "Angkatan",
    href: "/admin/angkatan",
  },

  {
    label: "Sejarah",
    href: "/admin/sejarah",
  },

  {
    label: "Program Kerja",
    href: "/admin/program-kerja",
  },

  {
    label: "Galeri",
    href: "/admin/galeri",
  },

  {
    label: "Arsip",
    href: "/admin/arsip",
  },

  {
    label: "Pengaturan Website",
    href: "/admin/pengaturan",
  },
];

export default function AdminSidebar() {
  return (
    <aside
      className="
        hidden
        min-h-screen
        w-[260px]
        shrink-0
        border-r
        border-white/10
        bg-deep-navy
        text-white
        lg:flex
        lg:flex-col
      "
    >
      {/* LOGO */}

      <div
        className="
          flex
          min-h-[82px]
          items-center
          gap-3
          border-b
          border-white/10
          px-6
        "
      >
        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            overflow-hidden
            rounded-xl
            bg-white
            p-1
          "
        >
          <Image
            src="/images/logo_hmp.jpeg"
            alt="Logo HMP PGSD"
            width={44}
            height={44}
            className="h-full w-full object-contain"
          />
        </div>

        <div>
          <p
            className="
              font-heading
              text-sm
              font-bold
            "
          >
            HMP PGSD
          </p>

          <p
            className="
              mt-1
              text-[9px]
              font-bold
              uppercase
              tracking-[0.14em]
              text-white/45
            "
          >
            Control Center
          </p>
        </div>
      </div>

      {/* MENU */}

      <nav
        className="
          flex-1
          space-y-1
          px-4
          py-7
        "
      >
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="
              block
              rounded-lg
              px-4
              py-3
              text-sm
              font-medium
              text-white/65
              transition
              hover:bg-white/10
              hover:text-white
            "
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* PUBLIC SITE */}

      <div
        className="
          border-t
          border-white/10
          p-4
        "
      >
        <Link
          href="/"
          target="_blank"
          className="
            block
            rounded-lg
            border
            border-white/10
            px-4
            py-3
            text-center
            text-xs
            font-semibold
            text-white/65
            transition
            hover:bg-white/10
            hover:text-white
          "
        >
          Lihat Website ↗
        </Link>
      </div>
    </aside>
  );
}
