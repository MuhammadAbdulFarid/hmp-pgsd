import sejarahData from "@/data/sejarah";
import sejarahDetailData from "@/data/sejarahDetail";
import selayangPandangData from "@/data/selayangPandang";

import angkatanData from "@/data/angkatan";
import pengurusData from "@/data/pengurus";
import programKerjaData from "@/data/programKerja";
import galeriData from "@/data/galeri";

/*
 * =========================================================
 * CONTENT DATA ACCESS LAYER
 * =========================================================
 *
 * Sekarang:
 * src/data/*.js -> content.js -> pages/components
 *
 * Nanti:
 * Supabase -> content.js -> pages/components
 *
 * UI tidak perlu tahu sumber datanya.
 */

/* =========================================================
   SELAYANG PANDANG
   ========================================================= */

export async function getSelayangPandang() {
  return selayangPandangData;
}

/* =========================================================
   SEJARAH
   ========================================================= */

export async function getSejarah() {
  return [...sejarahData].sort((a, b) => Number(a.tahun) - Number(b.tahun));
}

export async function getSejarahDetail() {
  return sejarahDetailData;
}

/* =========================================================
   ANGKATAN
   ========================================================= */

export async function getAngkatan() {
  return [...angkatanData].sort((a, b) => Number(a.tahun) - Number(b.tahun));
}

/* =========================================================
   PENGURUS
   ========================================================= */

export async function getPengurus() {
  return [...pengurusData].sort((a, b) => {
    const yearA = getStartYear(a.periode);
    const yearB = getStartYear(b.periode);

    return yearB - yearA;
  });
}

export async function getPengurusById(id) {
  const data = await getPengurus();

  return data.find((item) => String(item.id) === String(id)) || null;
}

/* =========================================================
   PROGRAM KERJA
   ========================================================= */

export async function getProgramKerja() {
  return [...programKerjaData].sort(
    (a, b) => Number(b.tahun || 0) - Number(a.tahun || 0),
  );
}

/* =========================================================
   GALERI
   ========================================================= */

export async function getGaleri() {
  return [...galeriData].sort(
    (a, b) => Number(b.urutan || 0) - Number(a.urutan || 0),
  );
}

/* =========================================================
   HOMEPAGE
   ========================================================= */

export async function getHomeContent() {
  const [sejarah, angkatan, pengurus, programKerja, galeri] = await Promise.all(
    [
      getSejarah(),
      getAngkatan(),
      getPengurus(),
      getProgramKerja(),
      getGaleri(),
    ],
  );

  return {
    sejarah,
    angkatan,
    pengurus,
    programKerja,
    galeri,
  };
}

/* =========================================================
   HELPERS
   ========================================================= */

function getStartYear(periode) {
  if (!periode) return 0;

  const match = String(periode).match(/\d{4}/);

  return match ? Number(match[0]) : 0;
}
