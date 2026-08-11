import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";

import { getAngkatan } from "@/lib/data/content";

export const metadata = {
  title: "Angkatan",
};

export default async function AngkatanPage() {
  const angkatan = await getAngkatan();

  return (
    <main>
      <PageHeader
        eyebrow="Generasi HMP PGSD"
        title="Setiap tahun melahirkan cerita."
        description="Generasi datang dan pergi. Nilai perjuangan tetap diwariskan."
      />

      <Container className="section-space">
        {angkatan.length === 0 ? (
          <EmptyState
            title="Data angkatan belum tersedia."
            description="Data generasi nantinya dapat dikelola melalui Dashboard Admin."
          />
        ) : (
          <div className="border-t border-deep-navy/10">
            {angkatan.map((item, index) => (
              <article
                key={item.id || item.tahun}
                className="
                  group
                  grid
                  gap-5
                  border-b
                  border-deep-navy/10
                  py-8
                  sm:grid-cols-[140px_1fr]
                  md:py-10
                  lg:grid-cols-[200px_1fr_auto]
                  lg:items-center
                "
              >
                <div>
                  <span
                    className="
                      font-heading
                      text-[clamp(2.3rem,5vw,4rem)]
                      font-semibold
                      leading-none
                      tracking-[-0.06em]
                      text-primary-blue
                    "
                  >
                    {item.tahun}
                  </span>
                </div>

                <div>
                  <span
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.14em]
                      text-slate
                    "
                  >
                    Generasi {String(index + 1).padStart(2, "0")}
                  </span>

                  <h2
                    className="
                      mt-2
                      font-heading
                      text-[clamp(2rem,4vw,3.5rem)]
                      font-semibold
                      uppercase
                      leading-none
                      tracking-[-0.045em]
                      text-deep-navy
                      transition-transform
                      duration-300
                      group-hover:translate-x-2
                    "
                  >
                    {item.nama}
                  </h2>

                  {item.filosofi && (
                    <p
                      className="
                        mt-4
                        max-w-2xl
                        text-sm
                        leading-7
                        text-slate
                      "
                    >
                      {item.filosofi}
                    </p>
                  )}
                </div>

                <span
                  className="
                    hidden
                    font-heading
                    text-xs
                    font-semibold
                    text-slate/50
                    lg:block
                  "
                >
                  {item.filosofi
                    ? "Lihat filosofi"
                    : "Filosofi akan dilengkapi"}
                </span>
              </article>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
