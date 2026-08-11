import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";

import { getSejarah, getSejarahDetail } from "@/lib/data/content";

export const metadata = {
  title: "Sejarah",
  description:
    "Sejarah berdirinya dan perkembangan HMP PGSD FKIP Universitas Muhammadiyah Makassar.",
};

export default async function SejarahPage() {
  const [timeline, detail] = await Promise.all([
    getSejarah(),
    getSejarahDetail(),
  ]);

  return (
    <main>
      <PageHeader
        eyebrow="History / 2007 — Present"
        title="Jejak yang membentuk HMP PGSD."
        description="Perjalanan dari HMJ S1 PGSD, HIMA PRODI PGSD FKIP, hingga HMP PGSD FKIP Universitas Muhammadiyah Makassar."
      />

      {/* Introduction */}
      <section className="section-space bg-off-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.3fr_1fr] lg:gap-20">
            <HistoryIndex number="01" label="Latar Belakang" />

            <div>
              <p className="eyebrow">Awal Sebuah Perjalanan</p>

              <h2 className="mt-7 max-w-4xl font-heading text-[clamp(2.8rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.055em] text-deep-navy">
                Lahir dari
                <br />
                kebutuhan bersama.
              </h2>

              <div className="mt-10 max-w-4xl space-y-6">
                {detail.pengantar.map((paragraph, index) => (
                  <p key={index} className="text-base leading-8 text-slate">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Formation */}
      <section className="section-space bg-soft-blue">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.3fr_1fr] lg:gap-20">
            <HistoryIndex number="02" label="Pembentukan" />

            <div>
              <p className="eyebrow">Tahun 2007</p>

              <h2 className="mt-7 section-title text-deep-navy">
                35 mahasiswa.
                <br />
                Satu gagasan bersama.
              </h2>

              <div className="mt-10 max-w-4xl space-y-6">
                {detail.pembentukan.map((paragraph, index) => (
                  <p key={index} className="text-base leading-8 text-slate">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-14 grid border-y border-deep-navy/10 sm:grid-cols-3">
                <Fact value="2007" label="Tahun Berdiri" />

                <Fact value="35" label="Mahasiswa Perintis" bordered />

                <Fact value="HMJ" label="Identitas Awal" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Pioneers */}
      <section className="section-space bg-off-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.3fr_1fr] lg:gap-20">
            <HistoryIndex number="03" label="Para Perintis" />

            <div>
              <p className="eyebrow">Angkatan 2006</p>

              <h2 className="mt-7 section-title text-deep-navy">
                Mereka yang
                <br />
                memulai langkah.
              </h2>

              <div className="mt-10 max-w-4xl space-y-6">
                {detail.perintis.map((paragraph, index) => (
                  <p key={index} className="text-base leading-8 text-slate">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="section-space bg-deep-navy text-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.3fr_1fr] lg:gap-20">
            <HistoryIndex number="04" label="Perubahan Identitas" dark />

            <div>
              <p className="eyebrow text-sky-accent">Organizational Timeline</p>

              <h2 className="mt-7 max-w-4xl font-heading text-[clamp(2.8rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.055em] text-white">
                Nama berubah.
                <br />
                Perjalanan berlanjut.
              </h2>

              <div className="mt-16 border-t border-white/10">
                {timeline.map((item, index) => (
                  <article
                    key={item.id}
                    className="grid gap-6 border-b border-white/10 py-9 md:grid-cols-[180px_1fr]"
                  >
                    <div>
                      <p className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-none tracking-[-0.06em] text-sky-accent">
                        {item.tahun}
                      </p>

                      <p className="mt-3 text-xs text-white/35">
                        {item.tanggal}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-sky-accent">
                        Milestone {String(index + 1).padStart(2, "0")}
                      </p>

                      <h3 className="mt-4 font-heading text-2xl font-semibold tracking-[-0.035em] text-white">
                        {item.judul}
                      </h3>

                      <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55">
                        {item.deskripsi}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Development */}
      <section className="section-space bg-soft-blue">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.3fr_1fr] lg:gap-20">
            <HistoryIndex number="05" label="Perkembangan" />

            <div>
              <p className="eyebrow">Dari Masa ke Masa</p>

              <h2 className="mt-7 section-title text-deep-navy">
                Ruang belajar.
                <br />
                Ruang pengabdian.
              </h2>

              <div className="mt-10 max-w-4xl space-y-6">
                {detail.perkembangan.map((paragraph, index) => (
                  <p key={index} className="text-base leading-8 text-slate">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

/* ========================================================= */

function HistoryIndex({ number, label, dark = false }) {
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
          dark ? "text-white/40" : "text-slate"
        }`}
      >
        {label}
      </p>
    </div>
  );
}

function Fact({ value, label, bordered = false }) {
  return (
    <div
      className={`py-7 sm:px-6 ${
        bordered ? "border-y border-deep-navy/10 sm:border-x sm:border-y-0" : ""
      }`}
    >
      <p className="font-heading text-4xl font-semibold tracking-[-0.055em] text-deep-navy">
        {value}
      </p>

      <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.14em] text-primary-blue">
        {label}
      </p>
    </div>
  );
}
