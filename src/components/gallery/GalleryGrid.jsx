"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";

export default function GalleryGrid({ galeri = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Semua foto dipecah menjadi item individual.
  const photos = useMemo(() => {
    return galeri.flatMap((item) =>
      (item.images || []).map((src, imageIndex) => ({
        id: `${item.id}-${imageIndex}`,
        src,
        nama: item.nama,
        kategori: item.kategori || "Dokumentasi",
        tahun: item.tahun,
        urutan: item.urutan,
        imageIndex,
        totalImages: item.images?.length || 1,
      })),
    );
  }, [galeri]);

  const selectedPhoto = selectedIndex !== null ? photos[selectedIndex] : null;

  function openImage(index) {
    setSelectedIndex(index);
  }

  function closeImage() {
    setSelectedIndex(null);
  }

  function previousImage() {
    setSelectedIndex((current) => {
      if (current === null) return null;

      return current === 0 ? photos.length - 1 : current - 1;
    });
  }

  function nextImage() {
    setSelectedIndex((current) => {
      if (current === null) return null;

      return current === photos.length - 1 ? 0 : current + 1;
    });
  }

  // Keyboard + lock scroll.
  useEffect(() => {
    if (selectedIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyboard(event) {
      if (event.key === "Escape") {
        closeImage();
      }

      if (event.key === "ArrowLeft") {
        previousImage();
      }

      if (event.key === "ArrowRight") {
        nextImage();
      }
    }

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, [selectedIndex, photos.length]);

  if (photos.length === 0) {
    return (
      <div className="border-y border-deep-navy/10 py-20 text-center">
        <h2 className="font-heading text-2xl font-semibold text-deep-navy">
          Dokumentasi belum tersedia.
        </h2>

        <p className="mt-3 text-sm text-slate">
          Galeri akan dilengkapi melalui arsip organisasi.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* =====================================================
          GALLERY GRID
          ===================================================== */}

      <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, index) => (
          <article key={photo.id}>
            {/*
              PENTING:
              Hanya SATU BUTTON untuk seluruh gambar.
              Jadi klik gambar maupun ikon kanan atas
              menjalankan openImage().
            */}
            <button
              type="button"
              onClick={() => openImage(index)}
              aria-label={`Buka foto ${photo.nama}`}
              className="
                group
                block
                w-full
                cursor-zoom-in
                text-left
                outline-none
              "
            >
              <div
                className="
                  relative
                  aspect-[4/3]
                  overflow-hidden
                  bg-soft-blue

                  focus-within:ring-2
                  focus-within:ring-sky-accent
                "
              >
                {/* IMAGE */}
                <Image
                  src={photo.src}
                  alt={photo.nama}
                  fill
                  sizes="
                    (max-width: 640px) 100vw,
                    (max-width: 1024px) 50vw,
                    33vw
                  "
                  className="
                    pointer-events-none
                    object-cover

                    scale-[1.08]

                    transition-transform
                    duration-700
                    ease-[cubic-bezier(0.22,1,0.36,1)]

                    group-hover:scale-100
                  "
                />

                {/* OVERLAY */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-0

                    bg-deep-navy/5

                    transition-colors
                    duration-500

                    group-hover:bg-deep-navy/25
                  "
                />

                {/* NUMBER */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    left-4
                    top-4
                    z-20

                    flex
                    h-10
                    min-w-10
                    items-center
                    justify-center

                    bg-white/95
                    px-3

                    shadow-sm
                    backdrop-blur-md
                  "
                >
                  <span
                    className="
                      font-heading
                      text-[10px]
                      font-bold
                      tracking-[0.14em]
                      text-deep-navy
                    "
                  >
                    {String(photo.urutan || index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* OPEN ICON */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    right-4
                    top-4
                    z-20

                    flex
                    h-11
                    w-11
                    items-center
                    justify-center

                    rounded-full
                    border
                    border-white/70

                    bg-white/95
                    text-deep-navy

                    shadow-[0_8px_30px_rgba(9,46,71,0.18)]
                    backdrop-blur-md

                    transition-all
                    duration-300

                    group-hover:scale-110
                    group-hover:bg-deep-navy
                    group-hover:text-white
                  "
                >
                  <Maximize2 size={16} strokeWidth={1.7} />
                </div>

                {/* BOTTOM INFO */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    bottom-0
                    z-20

                    bg-gradient-to-t
                    from-deep-navy/90
                    via-deep-navy/40
                    to-transparent

                    px-5
                    pb-5
                    pt-20
                  "
                >
                  <h3
                    className="
                      font-heading
                      text-sm
                      font-semibold
                      leading-5
                      tracking-[-0.025em]
                      text-white
                    "
                  >
                    {photo.nama}
                  </h3>

                  <p
                    className="
                      mt-1
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.15em]
                      text-sky-accent
                    "
                  >
                    Klik untuk membuka
                  </p>
                </div>
              </div>
            </button>

            {/* META */}
            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.13em]
                    text-slate
                  "
                >
                  {photo.kategori}
                </p>

                {photo.tahun && (
                  <p className="mt-1 text-xs text-slate">{photo.tahun}</p>
                )}
              </div>

              {photo.totalImages > 1 && (
                <span
                  className="
                    font-heading
                    text-[10px]
                    font-bold
                    text-primary-blue
                  "
                >
                  {photo.imageIndex + 1}/{photo.totalImages}
                </span>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* =====================================================
          LIGHTBOX
          ===================================================== */}

      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Foto ${selectedPhoto.nama}`}
          className="
            fixed
            inset-0
            z-[99999]

            flex
            items-center
            justify-center

            bg-[#03131e]/95
            p-4

            backdrop-blur-xl

            sm:p-7
          "
          onClick={closeImage}
        >
          {/* AREA CONTENT
              stopPropagation supaya klik gambar
              tidak langsung menutup lightbox.
          */}
          <div
            className="
              relative
              w-full
              max-w-6xl
            "
            onClick={(event) => event.stopPropagation()}
          >
            {/* CLOSE */}
            <button
              type="button"
              onClick={closeImage}
              aria-label="Tutup gambar"
              className="
                absolute
                -top-14
                right-0
                z-50

                flex
                h-11
                w-11
                items-center
                justify-center

                rounded-full
                border
                border-white/20

                bg-white/10
                text-white

                backdrop-blur-xl

                transition-all
                duration-300

                hover:rotate-90
                hover:bg-white
                hover:text-deep-navy
              "
            >
              <X size={20} strokeWidth={1.7} />
            </button>

            {/* IMAGE */}
            <div
              className="
                relative
                h-[70vh]
                w-full
              "
            >
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.nama}
                fill
                priority
                sizes="95vw"
                className="object-contain"
              />
            </div>

            {/* INFORMATION */}
            <div
              className="
                mt-5

                flex
                flex-col
                gap-4

                border-t
                border-white/10

                pt-5

                sm:flex-row
                sm:items-end
                sm:justify-between
              "
            >
              <div>
                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-sky-accent
                  "
                >
                  Dokumentasi{" "}
                  {String(selectedPhoto.urutan || selectedIndex + 1).padStart(
                    2,
                    "0",
                  )}
                </p>

                <h2
                  className="
                    mt-2
                    max-w-4xl

                    font-heading
                    text-xl
                    font-semibold
                    tracking-[-0.03em]
                    text-white

                    sm:text-2xl
                  "
                >
                  {selectedPhoto.nama}
                </h2>
              </div>

              <p
                className="
                  shrink-0
                  font-heading
                  text-xs
                  text-white/45
                "
              >
                {selectedIndex + 1} / {photos.length}
              </p>
            </div>

            {/* MOBILE BUTTONS */}
            {photos.length > 1 && (
              <div
                className="
                  mt-5
                  grid
                  grid-cols-2
                  gap-3
                  md:hidden
                "
              >
                <button
                  type="button"
                  onClick={previousImage}
                  className="
                    flex
                    h-12
                    items-center
                    justify-center
                    gap-2

                    border
                    border-white/15
                    text-sm
                    text-white
                  "
                >
                  <ArrowLeft size={17} />
                  Sebelumnya
                </button>

                <button
                  type="button"
                  onClick={nextImage}
                  className="
                    flex
                    h-12
                    items-center
                    justify-center
                    gap-2

                    border
                    border-white/15
                    text-sm
                    text-white
                  "
                >
                  Berikutnya
                  <ArrowRight size={17} />
                </button>
              </div>
            )}
          </div>

          {/* DESKTOP PREVIOUS */}
          {photos.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                previousImage();
              }}
              aria-label="Foto sebelumnya"
              className="
                absolute
                left-5
                top-1/2
                z-50

                hidden
                h-12
                w-12
                -translate-y-1/2
                items-center
                justify-center

                rounded-full
                border
                border-white/15

                bg-white/10
                text-white

                transition-all
                duration-300

                hover:bg-white
                hover:text-deep-navy

                md:flex
              "
            >
              <ArrowLeft size={19} />
            </button>
          )}

          {/* DESKTOP NEXT */}
          {photos.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                nextImage();
              }}
              aria-label="Foto berikutnya"
              className="
                absolute
                right-5
                top-1/2
                z-50

                hidden
                h-12
                w-12
                -translate-y-1/2
                items-center
                justify-center

                rounded-full
                border
                border-white/15

                bg-white/10
                text-white

                transition-all
                duration-300

                hover:bg-white
                hover:text-deep-navy

                md:flex
              "
            >
              <ArrowRight size={19} />
            </button>
          )}
        </div>
      )}
    </>
  );
}
