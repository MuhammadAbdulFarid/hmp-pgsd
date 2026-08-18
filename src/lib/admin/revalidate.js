import { revalidatePath } from "next/cache";

/*
 * =========================================================
 * REVALIDATE ADMIN + PUBLIC
 * =========================================================
 *
 * Dipanggil setelah:
 * - CREATE
 * - UPDATE
 * - DELETE
 *
 * Supaya perubahan dari Admin langsung terbaca oleh
 * halaman admin dan public website.
 */

export function revalidateResourcePaths(resource, id = null) {
  if (!resource) return;

  const adminSlug =
    resource === "site-settings"
      ? "pengaturan"
      : resource;

  /* Dashboard */
  revalidatePath("/admin");

  /* Homepage public */
  revalidatePath("/");

  /* Halaman admin resource */
  revalidatePath(`/admin/${adminSlug}`);

  /*
   * Pengaturan website tidak punya
   * halaman public /pengaturan.
   */
  if (
    resource !== "pengaturan" &&
    resource !== "site-settings"
  ) {
    revalidatePath(`/${resource}`);
  }

  /*
   * Detail Pengurus
   */
  if (resource === "pengurus" && id) {
    revalidatePath(`/pengurus/${id}`);
  }

  /*
   * Struktur pengurus ikut berubah jika parent
   * pengurus mengalami perubahan.
   */
  if (resource === "struktur-pengurus" && id) {
    revalidatePath("/pengurus");
  }
}
