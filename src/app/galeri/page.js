import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import GalleryGrid from "@/components/gallery/GalleryGrid";

import { getGaleri } from "@/lib/data/content";

export const metadata = {
  title: "Galeri",
};

export default async function GaleriPage() {
  const galeri = await getGaleri();

  const totalPhotos = galeri.reduce(
    (total, item) => total + (item.images?.length || 0),
    0,
  );

  return (
    <main>
      <PageHeader
        eyebrow="Visual Archive"
        title="Dokumentasi perjalanan."
        description="Kumpulan dokumentasi kegiatan dan perjalanan HMP PGSD FKIP Universitas Muhammadiyah Makassar dari masa ke masa."
      />

      <section className="section-space bg-off-white">
        <Container>
          <div
            className="
              mb-12
              flex
              flex-col
              gap-5

              border-y
              border-deep-navy/10

              py-5

              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div className="flex gap-10">
              <ArchiveStat value={galeri.length} label="Kegiatan" />

              <ArchiveStat value={totalPhotos} label="Foto Arsip" />
            </div>

            <p
              className="
                max-w-sm
                text-xs
                leading-6
                text-slate

                sm:text-right
              "
            >
              Arahkan cursor pada foto untuk efek zoom-out. Klik foto untuk
              membukanya dalam ukuran besar.
            </p>
          </div>

          <GalleryGrid galeri={galeri} />
        </Container>
      </section>
    </main>
  );
}

function ArchiveStat({ value, label }) {
  return (
    <div>
      <p
        className="
          font-heading
          text-2xl
          font-semibold
          tracking-[-0.04em]
          text-deep-navy
        "
      >
        {String(value).padStart(2, "0")}
      </p>

      <p
        className="
          mt-1
          text-[9px]
          font-bold
          uppercase
          tracking-[0.14em]
          text-slate
        "
      >
        {label}
      </p>
    </div>
  );
}
