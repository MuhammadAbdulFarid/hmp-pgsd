import AdminResourcePage from "@/components/admin/AdminResourcePage";

export const metadata = {
  title: "Kelola Arsip | Admin HMP PGSD",
};

export default function AdminArsipPage() {
  return (
    <AdminResourcePage
      title="Arsip"
      description="Kelola dokumen resmi dan arsip digital organisasi."
      table="arsip"
      addHref="/admin/arsip/tambah"
      orderBy="urutan"
      ascending={true}
      columns={[
        { key: "judul", label: "Dokumen" },
        { key: "kategori", label: "Kategori" },
        { key: "tahun", label: "Tahun" },
        { key: "aktif", label: "Status" },
      ]}
    />
  );
}
