import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Container from "@/components/ui/Container";

export default function GalleryPreview({ galeri = [] }) {
  const photos = galeri
    .flatMap((item) =>
      (item.images || []).map((image) => ({
        id: `${item.id}-${image}`,
        src: image,
        nama: item.nama,
        urutan: item.urutan,
      })),
    )
    .slice(0, 6);

  return (
    <section
      id="galeri"
      className="
        section-space
        overflow-hidden
        bg-off-white
      "
    >
      <Container>
        {/* Header */}
        <div
          className="
            flex
            flex-col
            gap-8
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <div>
            <p className="eyebrow">06 — Visual Archive</p>

            <h2
              className="
                mt-6
                max-w-4xl
                font-heading
                text-[clamp(2.8rem,6vw,5.7rem)]
                font-semibold
                leading-[0.94]
                tracking-[-0.055em]
                text-deep-navy
              "
            >
              Perjalanan yang
              <br />
              terdokumentasi.
            </h2>
          </div>

          <Link
            href="/galeri"
            className="
              group
              inline-flex
              items-center
              gap-3
              border-b
              border-primary-blue/30
              pb-2
              font-heading
              text-sm
              font-semibold
              text-primary-blue
            "
          >
            Jelajahi seluruh arsip
            <ArrowUpRight
              size={17}
              className="
                transition-transform
                duration-300
                group-hover:-translate-y-1
                group-hover:translate-x-1
              "
            />
          </Link>
        </div>

        {/* Images */}
        {photos.length > 0 && (
          <div
            className="
              mt-14
              grid
              grid-cols-2
              gap-2
              md:grid-cols-6
              md:grid-rows-2
            "
          >
            {photos.map((photo, index) => {
              const specialClass =
                index === 0
                  ? "col-span-2 md:col-span-3 md:row-span-2"
                  : index === 1
                    ? "md:col-span-2"
                    : index === 2
                      ? "md:col-span-1"
                      : "md:col-span-1";

              return (
                <Link
                  key={photo.id}
                  href="/galeri"
                  className={`
                    group
                    relative
                    overflow-hidden
                    bg-soft-blue
                    ${specialClass}
                    ${
                      index === 0
                        ? "aspect-[4/3] md:aspect-auto md:min-h-[520px]"
                        : "aspect-[4/3]"
                    }
                  `}
                >
                  <Image
                    src={photo.src}
                    alt={photo.nama}
                    fill
                    sizes="
                      (max-width: 768px) 50vw,
                      33vw
                    "
                    className="
                      object-cover
                      scale-[1.08]
                      transition-transform
                      duration-700
                      ease-[cubic-bezier(0.22,1,0.36,1)]
                      group-hover:scale-100
                    "
                  />

                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-deep-navy/75
                      via-transparent
                      to-transparent
                      opacity-60
                      transition-opacity
                      duration-300
                      group-hover:opacity-80
                    "
                  />

                  <div
                    className="
                      absolute
                      inset-x-0
                      bottom-0
                      p-4
                      sm:p-5
                    "
                  >
                    <p
                      className="
                        font-heading
                        text-[9px]
                        font-bold
                        tracking-[0.14em]
                        text-sky-accent
                      "
                    >
                      {String(photo.urutan).padStart(2, "0")}
                    </p>

                    <p
                      className={`
                        mt-2
                        font-heading
                        font-semibold
                        leading-tight
                        tracking-[-0.025em]
                        text-white
                        ${
                          index === 0
                            ? "text-xl sm:text-2xl"
                            : "text-xs sm:text-sm"
                        }
                      `}
                    >
                      {photo.nama}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}
