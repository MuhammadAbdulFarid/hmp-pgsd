import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";

import { getProgramKerja } from "@/lib/data/content";

export const metadata = {
  title: "Program Kerja",
};

export default async function ProgramKerjaPage() {
  const programKerja = await getProgramKerja();

  return (
    <main>
      <PageHeader
        eyebrow="Program Kerja"
        title="Gagasan yang diwujudkan menjadi gerakan."
        description="Arsip program dan kegiatan HMP PGSD dari masa ke masa."
      />

      <Container className="section-space">
        {programKerja.length === 0 ? (
          <EmptyState
            title="Program kerja belum tersedia."
            description="Data program nantinya dapat ditambahkan dan dikelola melalui Dashboard Admin."
          />
        ) : (
          <div className="grid gap-px bg-deep-navy/10 md:grid-cols-2">
            {programKerja.map((program, index) => (
              <article
                key={program.id || `${program.nama}-${index}`}
                className="
                  bg-off-white
                  p-7
                  transition-colors
                  hover:bg-soft-blue
                  md:p-9
                "
              >
                <div className="flex items-center justify-between gap-4">
                  <span
                    className="
                      font-heading
                      text-[10px]
                      font-bold
                      tracking-[0.14em]
                      text-slate
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-xs text-primary-blue">
                    {program.tahun || "—"}
                  </span>
                </div>

                <p
                  className="
                    mt-8
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-primary-blue
                  "
                >
                  {program.kategori || "Program"}
                </p>

                <h2
                  className="
                    mt-3
                    font-heading
                    text-2xl
                    font-semibold
                    tracking-[-0.035em]
                    text-deep-navy
                  "
                >
                  {program.nama}
                </h2>

                <p
                  className="
                    mt-4
                    text-sm
                    leading-7
                    text-slate
                  "
                >
                  {program.deskripsi || "Deskripsi program akan dilengkapi."}
                </p>

                {program.featured && (
                  <span
                    className="
                      mt-7
                      inline-flex
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.12em]
                      text-primary-blue
                    "
                  >
                    Program Unggulan
                  </span>
                )}
              </article>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
