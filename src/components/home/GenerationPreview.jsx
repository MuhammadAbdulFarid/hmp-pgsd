import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Container from "@/components/ui/Container";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

export default function GenerationPreview({ angkatan = [] }) {
  const generations = [...angkatan]
    .sort((a, b) => Number(b.tahun) - Number(a.tahun))
    .slice(0, 6);

  return (
    <section className="section-space overflow-hidden bg-soft-blue">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.28fr_1fr] lg:gap-20">
          <div>
            <span className="font-heading text-[clamp(4.5rem,8vw,7rem)] font-semibold leading-none tracking-[-0.07em] text-primary-blue">
              05
            </span>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-slate">
              Generasi
            </p>
          </div>

          <div>
            <SectionEyebrow>Dari Masa ke Masa</SectionEyebrow>

            <h2 className="mt-7 font-heading text-[clamp(2.7rem,5.5vw,5.4rem)] font-semibold leading-[0.95] tracking-[-0.055em] text-deep-navy">
              Setiap tahun
              <br />
              melahirkan cerita.
            </h2>

            <div className="mt-16 border-t border-deep-navy/10">
              {generations.map((item) => (
                <div
                  key={item.tahun}
                  className="group grid grid-cols-[90px_1fr] items-center border-b border-deep-navy/10 py-6 sm:grid-cols-[150px_1fr]"
                >
                  <span className="font-heading text-xl font-semibold text-primary-blue sm:text-3xl">
                    {item.tahun}
                  </span>

                  <span className="font-heading text-[clamp(1.6rem,4vw,3rem)] font-semibold uppercase tracking-[-0.04em] text-deep-navy transition-transform group-hover:translate-x-2">
                    {item.nama}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/angkatan"
              className="group mt-8 inline-flex items-center gap-3 font-heading text-sm font-semibold text-primary-blue"
            >
              Jelajahi semua angkatan
              <ArrowUpRight
                size={17}
                className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
