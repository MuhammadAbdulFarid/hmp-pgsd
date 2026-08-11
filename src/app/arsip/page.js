import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";

export default function ArsipPage() {
  return (
    <main>
      <PageHeader eyebrow="Arsip" title="Selayang Pandang HMP PGSD." />

      <Container className="section-space">
        <div className="border border-deep-navy/10 p-8">
          <p className="text-sm text-slate">
            Dokumen akan tersedia setelah administrator mengunggah arsip resmi.
          </p>
        </div>
      </Container>
    </main>
  );
}
