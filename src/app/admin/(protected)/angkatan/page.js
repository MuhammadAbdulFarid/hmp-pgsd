import AdminResourcePage from "@/components/admin/AdminResourcePage";

export const metadata = {
  title: "Kelola Angkatan | Admin HMP PGSD",
};

export default function AdminAngkatanPage() {
  return (
    <AdminResourcePage
      title="Angkatan"
      description="Kelola nama, tahun, deskripsi, dan dokumentasi setiap generasi HMP PGSD."
      table="angkatan"
      addHref="/admin/angkatan/tambah"
      orderBy="tahun"
      ascending={false}
      columns={[
        { key: "tahun", label: "Tahun" },
        { key: "nama", label: "Nama Angkatan" },
        { key: "deskripsi", label: "Deskripsi" },
      ]}
    />
  );
}
