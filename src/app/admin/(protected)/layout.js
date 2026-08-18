import { requireAdmin } from "@/lib/auth/admin";

import AdminSidebar from "@/components/admin/AdminSidebar";

import { logoutAdmin } from "./actions";

export default async function AdminLayout({ children }) {
  const { admin } = await requireAdmin();

  return (
    <div
      className="
        min-h-screen
        bg-[#f6f8fb]
        lg:flex
      "
    >
      {/* SIDEBAR */}

      <AdminSidebar />

      {/* CONTENT */}

      <div
        className="
          min-w-0
          flex-1
        "
      >
        {/* TOPBAR */}

        <header
          className="
            sticky
            top-0
            z-40
            flex
            min-h-[72px]
            items-center
            justify-between
            gap-5
            border-b
            border-deep-navy/10
            bg-white/95
            px-5
            backdrop-blur-xl
            md:px-8
          "
        >
          <div>
            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-primary-blue
              "
            >
              Administrator
            </p>

            <p
              className="
                mt-1
                font-heading
                text-sm
                font-semibold
                text-deep-navy
              "
            >
              {admin.nama}
            </p>
          </div>

          <div
            className="
              flex
              items-center
              gap-4
            "
          >
            <div
              className="
                hidden
                text-right
                sm:block
              "
            >
              <p
                className="
                  text-xs
                  text-slate
                "
              >
                {admin.email}
              </p>

              <p
                className="
                  mt-1
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-primary-blue
                "
              >
                {admin.role}
              </p>
            </div>

            <form action={logoutAdmin}>
              <button
                type="submit"
                className="
                  rounded-lg
                  border
                  border-deep-navy/10
                  bg-white
                  px-4
                  py-2.5
                  text-xs
                  font-semibold
                  text-deep-navy
                  transition
                  hover:bg-deep-navy
                  hover:text-white
                "
              >
                Keluar
              </button>
            </form>
          </div>
        </header>

        {children}
      </div>
    </div>
  );
}
