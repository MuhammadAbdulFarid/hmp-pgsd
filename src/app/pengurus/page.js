import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";

import { getPengurus } from "@/lib/data/content";

export const metadata = {
  title: "Pengurus",
};

export default async function PengurusPage() {
  const pengurus = await getPengurus();

  return (
    <main>
      <PageHeader
        eyebrow="Jejak Kepemimpinan"
        title="Mereka yang pernah memegang amanah."
      />

      <Container className="section-space">
        {pengurus.length === 0 ? (
          <EmptyState
            title="Arsip kepengurusan belum tersedia."
            description="Data nantinya dapat ditambahkan oleh administrator HMP PGSD."
          />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {pengurus.map((item) => (
              <a
                key={item.id}
                href={`/pengurus/${item.id}`}
                className="border border-deep-navy/10 p-7 transition-colors hover:bg-soft-blue"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-primary-blue">
                  {item.periode}
                </p>

                <h2 className="mt-5 font-heading text-2xl font-semibold text-deep-navy">
                  {item.nama}
                </h2>

                <p className="mt-2 text-sm text-slate">{item.jabatan}</p>
              </a>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
