import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getCurrentAdmin } from "@/lib/auth/admin";

import { loginAdmin } from "./actions";

export const metadata = {
  title: "Login Admin | HMP PGSD",
  description: "Login administrator Digital Selayang Pandang HMP PGSD.",
};

const errorMessages = {
  required: "Email dan password wajib diisi.",

  invalid: "Email atau password tidak sesuai.",

  unauthorized: "Akun ini tidak memiliki akses administrator.",
};

export default async function AdminLoginPage({ searchParams }) {
  /*
   * Kalau sudah login sebagai admin,
   * arahkan langsung ke dashboard.
   */
  const currentAdmin = await getCurrentAdmin();

  if (currentAdmin) {
    redirect("/admin");
  }

  const params = await searchParams;

  const error = errorMessages[params?.error] || null;

  return (
    <main className="min-h-screen bg-off-white">
      <div
        className="
          mx-auto
          flex
          min-h-screen
          max-w-7xl
          items-center
          justify-center
          px-6
          py-24
        "
      >
        <div
          className="
            w-full
            max-w-md
            overflow-hidden
            border
            border-deep-navy/10
            bg-white
            shadow-[0_24px_80px_rgba(9,46,71,0.08)]
          "
        >
          {/* =========================
              HEADER
              ========================= */}

          <div
            className="
              border-b
              border-deep-navy/10
              px-8
              py-8
              md:px-10
            "
          >
            <div className="flex items-center gap-4">
              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-xl
                  bg-white
                  p-1
                  shadow-[0_8px_25px_rgba(9,46,71,0.10)]
                "
              >
                <Image
                  src="/images/logo_hmp.jpeg"
                  alt="Logo HMP PGSD"
                  width={56}
                  height={56}
                  priority
                  className="h-full w-full object-contain"
                />
              </div>

              <div>
                <p
                  className="
                    font-heading
                    text-base
                    font-bold
                    text-deep-navy
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
                    text-primary-blue
                  "
                >
                  Admin Panel
                </p>
              </div>
            </div>

            <h1
              className="
                mt-8
                font-heading
                text-3xl
                font-semibold
                tracking-[-0.04em]
                text-deep-navy
              "
            >
              Selamat datang.
            </h1>

            <p
              className="
                mt-3
                text-sm
                leading-6
                text-slate
              "
            >
              Masuk untuk mengelola Digital Selayang Pandang HMP PGSD.
            </p>
          </div>

          {/* =========================
              FORM LOGIN
              ========================= */}

          <div className="px-8 py-8 md:px-10">
            {error && (
              <div
                className="
                  mb-6
                  border
                  border-red-200
                  bg-red-50
                  px-4
                  py-3
                  text-sm
                  leading-6
                  text-red-700
                "
              >
                {error}
              </div>
            )}

            <form action={loginAdmin} className="space-y-5">
              {/* EMAIL */}

              <div>
                <label
                  htmlFor="email"
                  className="
                    mb-2
                    block
                    text-xs
                    font-semibold
                    text-deep-navy
                  "
                >
                  Email Admin
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="admin@email.com"
                  className="
                    h-12
                    w-full
                    border
                    border-deep-navy/15
                    bg-white
                    px-4
                    text-sm
                    text-deep-navy
                    outline-none
                    transition-colors
                    placeholder:text-slate/50
                    focus:border-primary-blue
                  "
                />
              </div>

              {/* PASSWORD */}

              <div>
                <label
                  htmlFor="password"
                  className="
                    mb-2
                    block
                    text-xs
                    font-semibold
                    text-deep-navy
                  "
                >
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="Masukkan password"
                  className="
                    h-12
                    w-full
                    border
                    border-deep-navy/15
                    bg-white
                    px-4
                    text-sm
                    text-deep-navy
                    outline-none
                    transition-colors
                    placeholder:text-slate/50
                    focus:border-primary-blue
                  "
                />
              </div>

              {/* LOGIN */}

              <button
                type="submit"
                className="
                  flex
                  h-12
                  w-full
                  items-center
                  justify-center
                  bg-deep-navy
                  px-5
                  font-heading
                  text-sm
                  font-semibold
                  text-white
                  transition-colors
                  hover:bg-primary-blue
                "
              >
                Masuk Dashboard
              </button>
            </form>

            <div
              className="
                mt-8
                border-t
                border-deep-navy/10
                pt-6
              "
            >
              <Link
                href="/"
                className="
                  text-xs
                  font-semibold
                  text-primary-blue
                  transition-colors
                  hover:text-deep-navy
                "
              >
                ← Kembali ke website
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
