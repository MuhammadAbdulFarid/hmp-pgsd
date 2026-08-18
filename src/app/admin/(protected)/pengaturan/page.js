import { createAdminClient } from "@/lib/supabase/admin";

export const metadata = {
  title: "Pengaturan Website | Admin HMP PGSD",
};

export default async function PengaturanPage() {
  const supabase = createAdminClient();

  const { data } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  return (
    <main className="px-5 py-8 md:px-8 md:py-10">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary-blue">
        Website Configuration
      </p>

      <h1 className="mt-3 font-heading text-3xl font-semibold tracking-[-0.04em] text-deep-navy md:text-4xl">
        Pengaturan Website
      </h1>

      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate">
        Identitas utama yang digunakan oleh website publik.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Info label="Nama Organisasi" value={data?.nama_organisasi} />
        <Info label="Nama Pendek" value={data?.nama_pendek} />
        <Info label="Tahun Berdiri" value={data?.tahun_berdiri} />
        <Info label="Tanggal Berdiri" value={data?.tanggal_berdiri} />
        <Info label="Instagram" value={data?.instagram} />
        <Info label="Email" value={data?.email} />

        <div className="md:col-span-2">
          <Info label="Slogan" value={data?.slogan} />
        </div>

        <div className="md:col-span-2">
          <Info label="Deskripsi" value={data?.deskripsi} />
        </div>
      </div>

      <button
        type="button"
        className="mt-6 rounded-lg bg-deep-navy px-5 py-3 text-xs font-semibold text-white"
      >
        Edit Pengaturan
      </button>
    </main>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-xl border border-deep-navy/10 bg-white p-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate">
        {label}
      </p>

      <p className="mt-2 text-sm leading-6 text-deep-navy">
        {value || "Belum diisi"}
      </p>
    </div>
  );
}
