import AdminResourcePage from "@/components/admin/AdminResourcePage";

export const metadata = {
  title: "Kelola Pengurus | Admin HMP PGSD",
};

export default function AdminPengurusPage() {
  return (
    <AdminResourcePage
      title="Pengurus"
      description="Kelola ketua umum dan jejak kepemimpinan HMP PGSD."
      table="pengurus"
      addHref="/admin/pengurus/tambah"
      orderBy="periode"
      ascending={false}
      columns={[
        { key: "periode", label: "Periode" },
        { key: "nama", label: "Nama" },
        { key: "jabatan", label: "Jabatan" },
      ]}
    />
  );
}
