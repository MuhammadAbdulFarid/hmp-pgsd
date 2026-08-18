import AdminResourcePage from "@/components/admin/AdminResourcePage";

export const metadata = {
  title: "Kelola Program Kerja | Admin HMP PGSD",
};

export default function AdminProgramKerjaPage() {
  return (
    <AdminResourcePage
      title="Program Kerja"
      description="Program kerja tidak diisi dengan data rekaan. Administrator HMP PGSD dapat menambahkan program kerja resmi dari dashboard ini."
      table="program_kerja"
      addHref="/admin/program-kerja/tambah"
      orderBy="created_at"
      ascending={false}
      emptyText="Belum ada program kerja yang dipublikasikan."
      columns={[
        { key: "nama", label: "Program" },
        { key: "kategori", label: "Kategori" },
        { key: "tahun", label: "Tahun" },
      ]}
    />
  );
}
