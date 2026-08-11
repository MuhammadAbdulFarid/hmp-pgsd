import { notFound } from "next/navigation";

import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";

import { getPengurusById } from "@/lib/data/content";

export default async function PengurusDetail({ params }) {
  const { id } = await params;

  const person = await getPengurusById(id);

  if (!person) notFound();

  return (
    <main>
      <PageHeader
        eyebrow={person.periode}
        title={person.nama}
        description={person.jabatan}
      />

      <Container className="section-space">
        <dl className="max-w-2xl divide-y divide-deep-navy/10">
          <Detail label="Jabatan" value={person.jabatan} />
          <Detail label="Periode" value={person.periode} />
          <Detail label="Angkatan" value={person.angkatan} />
          <Detail label="Quote" value={person.quote} />
        </dl>
      </Container>
    </main>
  );
}

function Detail({ label, value }) {
  if (!value) return null;

  return (
    <div className="grid gap-2 py-5 sm:grid-cols-[140px_1fr]">
      <dt className="text-xs font-bold uppercase tracking-widest text-primary-blue">
        {label}
      </dt>

      <dd className="text-sm leading-7 text-slate">{value}</dd>
    </div>
  );
}
