import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";

import { getSelayangPandang } from "@/lib/data/content";

export const metadata = {
  title: "Selayang Pandang",
  description:
    "Profil, identitas, visi misi, filosofi, peran, dan nilai HMP PGSD FKIP Universitas Muhammadiyah Makassar.",
};

export default async function SelayangPandangPage() {
  const data = await getSelayangPandang();

  return (
    <main>
      <PageHeader
        eyebrow="Digital Selayang Pandang"
        title="Mengenal lebih dekat HMP PGSD."
        description="Identitas, nilai, landasan, serta semangat yang membentuk perjalanan HMP PGSD FKIP Universitas Muhammadiyah Makassar."
      />

      {/* =====================================================
          INTRODUCTION
          ===================================================== */}

      <section className="section-space bg-off-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.3fr_1fr] lg:gap-20">
            <SectionIndex number="01" label="Tentang HMP" />

            <div>
              <p className="eyebrow">Sebuah Ruang untuk Bertumbuh</p>

              <h2 className="mt-7 max-w-4xl font-heading text-[clamp(2.8rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.055em] text-deep-navy">
                Lebih dari
                <br />
                struktur organisasi.
              </h2>

              <div className="mt-10 grid gap-6 lg:grid-cols-2">
                {data.pengantar.map((paragraph, index) => (
                  <p key={index} className="text-sm leading-8 text-slate">
                    {paragraph}
                  </p>
                ))}
              </div>

              <blockquote className="mt-14 border-l-2 border-sky-accent pl-6">
                <p className="max-w-4xl font-heading text-xl font-semibold leading-relaxed tracking-[-0.025em] text-deep-navy sm:text-2xl">
                  “{data.slogan.text}”
                </p>

                <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-primary-blue">
                  {data.slogan.title}
                </p>
              </blockquote>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          LOGO
          ===================================================== */}

      <section className="section-space bg-soft-blue">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.3fr_1fr] lg:gap-20">
            <SectionIndex number="02" label="Filosofi Logo" />

            <div>
              <p className="eyebrow">Identitas Visual</p>

              <h2 className="mt-7 section-title text-deep-navy">
                Setiap elemen
                <br />
                memiliki makna.
              </h2>

              <div className="mt-14 border-t border-deep-navy/10">
                {data.logo.map((item) => (
                  <div
                    key={item.nomor}
                    className="group grid gap-4 border-b border-deep-navy/10 py-6 sm:grid-cols-[70px_220px_1fr]"
                  >
                    <span className="font-heading text-xs font-bold text-primary-blue">
                      {String(item.nomor).padStart(2, "0")}
                    </span>

                    <h3 className="font-heading text-lg font-semibold text-deep-navy">
                      {item.elemen}
                    </h3>

                    <p className="max-w-2xl text-sm leading-7 text-slate">
                      {item.makna}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          VISION
          ===================================================== */}

      <section className="section-space bg-deep-navy text-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.3fr_1fr] lg:gap-20">
            <SectionIndex number="03" label="Visi & Misi" dark />

            <div>
              <p className="eyebrow text-sky-accent">Arah Organisasi</p>

              <p className="mt-8 max-w-5xl font-heading text-[clamp(2rem,4.4vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-white">
                {data.visi}
              </p>

              <div className="mt-16 border-t border-white/10">
                {data.misi.map((item, index) => (
                  <div
                    key={index}
                    className="grid gap-4 border-b border-white/10 py-6 sm:grid-cols-[70px_1fr]"
                  >
                    <span className="font-heading text-xs font-bold text-sky-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="max-w-3xl text-sm leading-7 text-white/60">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          PRINCIPLES
          ===================================================== */}

      <section className="section-space bg-off-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.3fr_1fr] lg:gap-20">
            <SectionIndex number="04" label="Landasan Organisasi" />

            <div>
              <p className="eyebrow">Nilai & Prinsip</p>

              <h2 className="mt-7 section-title text-deep-navy">
                Fondasi dalam
                <br />
                setiap langkah.
              </h2>

              <InfoBlock number="01" title="Asas">
                {data.asas}
              </InfoBlock>

              <InfoBlock number="02" title="Landasan Prinsipil">
                {data.landasan.prinsipil.join(" dan ")}
              </InfoBlock>

              <div className="border-b border-deep-navy/10 py-8">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary-blue">
                  03 / Landasan Operasional
                </p>

                <ol className="mt-6 space-y-4">
                  {data.landasan.operasional.map((item, index) => (
                    <li
                      key={index}
                      className="grid grid-cols-[36px_1fr] gap-3 text-sm leading-7 text-slate"
                    >
                      <span className="font-heading text-xs font-bold text-primary-blue">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {item}
                    </li>
                  ))}
                </ol>
              </div>

              <InfoBlock number="04" title="Sifat">
                {data.sifat}
              </InfoBlock>

              <InfoBlock number="05" title="Fungsi">
                {data.fungsi}
              </InfoBlock>

              <div className="border-b border-deep-navy/10 py-8">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary-blue">
                  06 / Tujuan
                </p>

                <div className="mt-6 space-y-5">
                  {data.tujuan.map((item, index) => (
                    <p
                      key={index}
                      className="max-w-3xl text-sm leading-7 text-slate"
                    >
                      {index + 1}. {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          ROLE
          ===================================================== */}

      <section className="section-space bg-soft-blue">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.3fr_1fr] lg:gap-20">
            <SectionIndex number="05" label="Peran HMP" />

            <div>
              <p className="eyebrow">Kampus & Masyarakat</p>

              <h2 className="mt-7 section-title text-deep-navy">
                Belajar di kampus.
                <br />
                Berdampak di masyarakat.
              </h2>

              <div className="mt-14 grid gap-12 lg:grid-cols-2">
                <RoleColumn
                  label="Internal / Kampus"
                  items={data.peranInternal}
                />

                <RoleColumn
                  label="Eksternal / Masyarakat"
                  items={data.peranEksternal}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          FUTURE
          ===================================================== */}

      <section className="bg-primary-blue py-24 text-white md:py-32">
        <Container>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-sky-accent">
            06 — Harapan & Masa Depan
          </p>

          <h2 className="mt-8 max-w-5xl font-heading text-[clamp(2.8rem,6vw,6rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-white">
            Melanjutkan estafet
            <br />
            dengan dampak yang lebih besar.
          </h2>

          <p className="mt-10 max-w-3xl text-base leading-8 text-white/65">
            {data.harapan}
          </p>
        </Container>
      </section>
    </main>
  );
}

/* =========================================================
   HELPERS
   ========================================================= */

function SectionIndex({ number, label, dark = false }) {
  return (
    <div>
      <span
        className={`font-heading text-[clamp(4rem,7vw,7rem)] font-semibold leading-none tracking-[-0.07em] ${
          dark ? "text-sky-accent" : "text-primary-blue"
        }`}
      >
        {number}
      </span>

      <div
        className={`mt-5 h-px w-16 ${
          dark ? "bg-white/20" : "bg-primary-blue/30"
        }`}
      />

      <p
        className={`mt-4 text-[10px] font-bold uppercase tracking-[0.15em] ${
          dark ? "text-white/45" : "text-slate"
        }`}
      >
        {label}
      </p>
    </div>
  );
}

function InfoBlock({ number, title, children }) {
  return (
    <div className="border-b border-deep-navy/10 py-8">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary-blue">
        {number} / {title}
      </p>

      <p className="mt-5 max-w-3xl text-sm leading-8 text-slate">{children}</p>
    </div>
  );
}

function RoleColumn({ label, items }) {
  return (
    <div>
      <p className="font-heading text-xs font-bold uppercase tracking-[0.14em] text-primary-blue">
        {label}
      </p>

      <div className="mt-6 border-t border-deep-navy/10">
        {items.map((item, index) => (
          <article
            key={item.title}
            className="border-b border-deep-navy/10 py-6"
          >
            <p className="text-[10px] font-bold text-primary-blue">
              {String(index + 1).padStart(2, "0")}
            </p>

            <h3 className="mt-3 font-heading text-xl font-semibold tracking-[-0.03em] text-deep-navy">
              {item.title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
