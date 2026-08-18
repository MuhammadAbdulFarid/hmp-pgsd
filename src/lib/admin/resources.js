const siteSettingsConfig = {
  table: "site_settings",
  label: "Pengaturan Website",
  description: "Kelola identitas dan informasi umum website HMP PGSD.",
  orderBy: "id",
  ascending: true,
  columns: [
    { key: "nama_organisasi", label: "Organisasi" },
    { key: "nama_pendek", label: "Nama Pendek" },
    { key: "tahun_berdiri", label: "Tahun Berdiri" },
  ],
};

export const ADMIN_RESOURCES = {
  pengurus: {
    table: "pengurus",
    label: "Pengurus",
    description: "Kelola data Ketua Umum dan periode kepengurusan HMP PGSD.",
    orderBy: "urutan",
    ascending: false,
    emptyText: "Belum ada data pengurus.",
    columns: [
      { key: "nama", label: "Nama" },
      { key: "jabatan", label: "Jabatan" },
      { key: "periode", label: "Periode" },
      { key: "aktif", label: "Status" },
    ],
  },

  angkatan: {
    table: "angkatan",
    label: "Angkatan",
    description: "Kelola arsip generasi dan nama angkatan HMP PGSD.",
    orderBy: "tahun",
    ascending: true,
    emptyText: "Belum ada data angkatan.",
    columns: [
      { key: "tahun", label: "Tahun" },
      { key: "nama", label: "Nama Angkatan" },
      { key: "filosofi", label: "Filosofi" },
    ],
  },

  sejarah: {
    table: "sejarah",
    label: "Sejarah",
    description: "Kelola milestone dan perjalanan kelembagaan HMP PGSD.",
    orderBy: "urutan",
    ascending: true,
    emptyText: "Belum ada data sejarah.",
    columns: [
      { key: "tahun", label: "Tahun" },
      { key: "bulan", label: "Bulan" },
      { key: "judul", label: "Peristiwa" },
      { key: "aktif", label: "Status" },
    ],
  },

  "program-kerja": {
    table: "program_kerja",
    label: "Program Kerja",
    description: "Kelola program dan kegiatan resmi HMP PGSD.",
    orderBy: "created_at",
    ascending: false,
    emptyText: "Belum ada program kerja.",
    columns: [
      { key: "nama", label: "Program" },
      { key: "kategori", label: "Kategori" },
      { key: "tahun", label: "Tahun" },
    ],
  },

  galeri: {
    table: "galeri",
    label: "Galeri",
    description: "Kelola dokumentasi visual kegiatan HMP PGSD.",
    orderBy: "urutan",
    ascending: true,
    emptyText: "Belum ada dokumentasi galeri.",
    columns: [
      { key: "urutan", label: "#" },
      { key: "judul", label: "Kegiatan" },
      { key: "kategori", label: "Kategori" },
      { key: "tahun", label: "Tahun" },
      { key: "aktif", label: "Status" },
    ],
  },

  arsip: {
    table: "arsip",
    label: "Arsip",
    description: "Kelola dokumen dan arsip digital organisasi.",
    orderBy: "urutan",
    ascending: true,
    emptyText: "Belum ada arsip.",
    columns: [
      { key: "judul", label: "Dokumen" },
      { key: "kategori", label: "Kategori" },
      { key: "tahun", label: "Tahun" },
      { key: "aktif", label: "Status" },
    ],
  },

  pengaturan: siteSettingsConfig,
  "site-settings": siteSettingsConfig,
};

export function getAdminResource(resource) {
  if (!resource) return null;

  return ADMIN_RESOURCES[String(resource)] || null;
}

/*
 * Field yang tidak boleh dikirim oleh form.
 */
const protectedFields = ["id", "created_at", "updated_at"];

export function sanitizeAdminPayload(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(payload).filter(
      ([key, value]) => !protectedFields.includes(key) && value !== undefined,
    ),
  );
}
