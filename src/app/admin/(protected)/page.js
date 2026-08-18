import Link from "next/link";

import { requireAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";

export const metadata = {
  title: "Dashboard Admin | HMP PGSD",
};

const modules = [
  {
    key: "pengurus",
    label: "Pengurus",
    href: "/admin/pengurus",
    table: "pengurus",
  },

  {
    key: "angkatan",
    label: "Angkatan",
    href: "/admin/angkatan",
    table: "angkatan",
  },

  {
    key: "sejarah",
    label: "Sejarah",
    href: "/admin/sejarah",
    table: "sejarah",
  },

  {
    key: "programKerja",
    label: "Program Kerja",
    href: "/admin/program-kerja",
    table: "program_kerja",
  },

  {
    key: "galeri",
    label: "Galeri",
    href: "/admin/galeri",
    table: "galeri",
  },

  {
    key: "arsip",
    label: "Arsip",
    href: "/admin/arsip",
    table: "arsip",
  },
];

async function getDashboardCounts() {
  const supabase = createAdminClient();

  const results = await Promise.all(
    modules.map(async (module) => {
      const { count, error } = await supabase.from(module.table).select("*", {
        count: "exact",
        head: true,
      });

      return {
        key: module.key,
        count: error ? 0 : count || 0,
      };
    }),
  );

  return Object.fromEntries(results.map((item) => [item.key, item.count]));
}

export default async function AdminPage() {
  const { admin } = await requireAdmin();

  const counts = await getDashboardCounts();

  return (
    <main
      className="
        px-5
        py-8
        md:px-8
        md:py-10
      "
    >
      {/* HEADER */}

      <div
        className="
          flex
          flex-col
          gap-5
          lg:flex-row
          lg:items-end
          lg:justify-between
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
            Control Center
          </p>

          <h1
            className="
              mt-3
              font-heading
              text-3xl
              font-semibold
              tracking-[-0.04em]
              text-deep-navy
              md:text-4xl
            "
          >
            Dashboard Admin
          </h1>

          <p
            className="
              mt-3
              max-w-2xl
              text-sm
              leading-7
              text-slate
            "
          >
            Selamat datang, {admin.nama}. Kelola seluruh konten Digital Selayang
            Pandang HMP PGSD dari satu dashboard.
          </p>
        </div>

        <Link
          href="/"
          target="_blank"
          className="
            inline-flex
            h-11
            items-center
            justify-center
            rounded-lg
            bg-deep-navy
            px-5
            text-xs
            font-semibold
            text-white
            transition
            hover:bg-primary-blue
          "
        >
          Lihat Website ↗
        </Link>
      </div>

      {/* STATS */}

      <section
        className="
          mt-10
          grid
          gap-4
          sm:grid-cols-2
          xl:grid-cols-3
        "
      >
        {modules.map((module) => (
          <Link
            key={module.key}
            href={module.href}
            className="
              group
              rounded-2xl
              border
              border-deep-navy/10
              bg-white
              p-6
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-primary-blue/30
              hover:shadow-[0_18px_50px_rgba(9,46,71,0.07)]
            "
          >
            <div
              className="
                flex
                items-start
                justify-between
                gap-4
              "
            >
              <div>
                <p
                  className="
                    text-xs
                    font-semibold
                    text-slate
                  "
                >
                  {module.label}
                </p>

                <p
                  className="
                    mt-3
                    font-heading
                    text-4xl
                    font-semibold
                    tracking-[-0.05em]
                    text-deep-navy
                  "
                >
                  {counts[module.key] ?? 0}
                </p>
              </div>

              <span
                className="
                  text-primary-blue
                  transition-transform
                  group-hover:translate-x-1
                "
              >
                →
              </span>
            </div>

            <div
              className="
                mt-6
                border-t
                border-deep-navy/10
                pt-4
              "
            >
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.14em]
                  text-primary-blue
                "
              >
                Kelola Data
              </p>
            </div>
          </Link>
        ))}
      </section>

      {/* INFO */}

      <section
        className="
          mt-8
          rounded-2xl
          border
          border-deep-navy/10
          bg-white
          p-6
          md:p-8
        "
      >
        <div
          className="
            flex
            flex-col
            gap-5
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <div
            className="
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-full
              bg-emerald-50
              px-4
              py-2
              text-xs
              font-semibold
              text-emerald-700
            "
          >
            <span
              className="
                h-2
                w-2
                rounded-full
                bg-emerald-500
              "
            />
            Connected
          </div>
        </div>
      </section>
    </main>
  );
}
