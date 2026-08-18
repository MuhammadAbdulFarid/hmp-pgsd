import AdminResourcePage from "@/components/admin/AdminResourcePage";

export const metadata = {
  title: "Kelola Sejarah | Admin HMP PGSD",
};

export default function AdminSejarahPage() {
  return (
    <AdminResourcePage
      title="Sejarah"
      description="Kelola milestone dan perjalanan kelembagaan HMP PGSD."
      table="sejarah"
      addHref="/admin/sejarah/tambah"
      orderBy="urutan"
      ascending={true}
      columns={[
        { key: "tahun", label: "Tahun" },
        { key: "bulan", label: "Bulan" },
        { key: "judul", label: "Peristiwa" },
        { key: "aktif", label: "Status" },
      ]}
    />
  );
}
