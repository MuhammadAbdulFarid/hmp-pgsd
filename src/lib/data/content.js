import { connection } from "next/server";

import { createClient } from "@/lib/supabase/server";

import sejarahDetailData from "@/data/sejarahDetail";
import selayangPandangData from "@/data/selayangPandang";

/*
 * =========================================================
 * PUBLIC CONTENT DATA LAYER
 * =========================================================
 *
 * SOURCE OF TRUTH:
 *
 * SUPABASE:
 * - Pengurus
 * - Struktur Pengurus
 * - Angkatan
 * - Sejarah
 * - Program Kerja
 * - Galeri
 * - Arsip
 * - Site Settings
 *
 * LOCAL:
 * - Selayang Pandang
 * - Sejarah Detail statis
 *
 * Jangan lagi mengambil resource Admin
 * dari src/data/*.js.
 */

/* =========================================================
   CLIENT
   ========================================================= */

async function getPublicClient() {
  /*
   * Pastikan data diambil saat request,
   * bukan hasil prerender lama.
   */
  await connection();

  return createClient();
}

/* =========================================================
   HELPERS
   ========================================================= */

function isActive(item) {
  return item?.aktif !== false;
}

function stringId(value) {
  if (value === null || value === undefined) {
    return null;
  }

  return String(value);
}

function getStartYear(periode) {
  if (!periode) {
    return 0;
  }

  const year = Number(String(periode).split("-")[0].trim());

  return Number.isNaN(year) ? 0 : year;
}

/* =========================================================
   NORMALIZE ANGKATAN
   ========================================================= */

function normalizeAngkatan(item) {
  const foto =
    item?.foto_url ?? item?.foto ?? item?.image_url ?? item?.image ?? null;

  return {
    ...item,

    id: stringId(item?.id),

    tahun:
      item?.tahun !== undefined && item?.tahun !== null
        ? Number(item.tahun)
        : null,

    nama: item?.nama ?? "",

    filosofi: item?.filosofi ?? item?.deskripsi ?? null,

    deskripsi: item?.deskripsi ?? item?.filosofi ?? null,

    foto,

    foto_url: foto,
  };
}

/* =========================================================
   NORMALIZE PENGURUS
   ========================================================= */

function normalizePengurus(item) {
  const foto =
    item?.foto_url ?? item?.foto ?? item?.image_url ?? item?.image ?? null;

  return {
    ...item,

    id: stringId(item?.id),

    nama: item?.nama ?? "",

    jabatan: item?.jabatan ?? "Ketua Umum",

    periode: item?.periode ?? "",

    angkatan_id: stringId(item?.angkatan_id),

    angkatan: item?.angkatan ?? item?.nama_angkatan ?? null,

    foto,

    foto_url: foto,

    quote: item?.quote ?? item?.kutipan ?? null,

    deskripsi: item?.deskripsi ?? null,

    urutan: Number(item?.urutan ?? 0),

    aktif: item?.aktif !== false,
  };
}

/* =========================================================
   NORMALIZE STRUKTUR
   ========================================================= */

function normalizeStrukturPengurus(item) {
  const foto = item?.foto_url ?? item?.foto ?? null;

  return {
    ...item,

    id: stringId(item?.id),

    pengurus_id: stringId(item?.pengurus_id),

    nama: item?.nama ?? "",

    jabatan: item?.jabatan ?? "",

    bidang: item?.bidang ?? null,

    foto,

    foto_url: foto,

    urutan: Number(item?.urutan ?? 0),

    aktif: item?.aktif !== false,
  };
}

/* =========================================================
   NORMALIZE SEJARAH
   ========================================================= */

function normalizeSejarah(item) {
  return {
    ...item,

    id: stringId(item?.id),

    tahun: item?.tahun ?? null,

    bulan: item?.bulan ?? item?.tanggal ?? null,

    tanggal: item?.tanggal ?? item?.bulan ?? null,

    judul: item?.judul ?? item?.peristiwa ?? "",

    peristiwa: item?.peristiwa ?? item?.judul ?? "",

    deskripsi: item?.deskripsi ?? "",

    urutan: Number(item?.urutan ?? 0),
  };
}

/* =========================================================
   NORMALIZE PROGRAM KERJA
   ========================================================= */

function normalizeProgramKerja(item) {
  return {
    ...item,

    id: stringId(item?.id),

    nama: item?.nama ?? item?.judul ?? "",

    judul: item?.judul ?? item?.nama ?? "",

    kategori: item?.kategori ?? null,

    tahun:
      item?.tahun !== undefined && item?.tahun !== null
        ? Number(item.tahun)
        : null,

    deskripsi: item?.deskripsi ?? null,

    urutan: Number(item?.urutan ?? 0),

    aktif: item?.aktif !== false,
  };
}

/* =========================================================
   NORMALIZE GALERI
   ========================================================= */

function normalizeGaleri(item) {
  const image =
    item?.gambar_url ??
    item?.image_url ??
    item?.image ??
    item?.gambar ??
    item?.foto ??
    null;

  return {
    ...item,

    id: stringId(item?.id),

    nama: item?.nama ?? item?.judul ?? "Dokumentasi",

    judul: item?.judul ?? item?.nama ?? "Dokumentasi",

    deskripsi: item?.deskripsi ?? null,

    kategori: item?.kategori ?? "Dokumentasi",

    tanggal: item?.tanggal ?? null,

    tahun: item?.tahun ?? null,

    urutan: Number(item?.urutan ?? 0),

    gambar_url: image,

    image,

    image_url: image,

    images: image ? [image] : [],
  };
}

/* =========================================================
   NORMALIZE ARSIP
   ========================================================= */

function normalizeArsip(item) {
  const fileUrl = item?.file_url ?? item?.url ?? item?.dokumen_url ?? null;

  return {
    ...item,

    id: stringId(item?.id),

    judul: item?.judul ?? "Dokumen",

    kategori: item?.kategori ?? null,

    tahun: item?.tahun ?? null,

    deskripsi: item?.deskripsi ?? null,

    file_url: fileUrl,

    url: fileUrl,

    urutan: Number(item?.urutan ?? 0),

    aktif: item?.aktif !== false,
  };
}

/* =========================================================
   SELAYANG PANDANG
   ========================================================= */

export async function getSelayangPandang() {
  return selayangPandangData;
}

/* =========================================================
   SEJARAH DETAIL
   ========================================================= */

export async function getSejarahDetail() {
  return sejarahDetailData;
}

/* =========================================================
   ANGKATAN — SUPABASE
   ========================================================= */

export async function getAngkatan() {
  const supabase = await getPublicClient();

  const { data, error } = await supabase.from("angkatan").select("*");

  if (error) {
    console.error("Gagal mengambil angkatan:", error.message);

    return [];
  }

  return (data || [])
    .map(normalizeAngkatan)
    .sort((a, b) => Number(a.tahun || 0) - Number(b.tahun || 0));
}

/* =========================================================
   PENGURUS — SUPABASE
   ========================================================= */

export async function getPengurus() {
  const supabase = await getPublicClient();

  const [pengurusResult, angkatanResult] = await Promise.all([
    supabase.from("pengurus").select("*").eq("aktif", true),

    supabase.from("angkatan").select("id,tahun,nama"),
  ]);

  if (pengurusResult.error) {
    console.error("Gagal mengambil pengurus:", pengurusResult.error.message);

    return [];
  }

  const angkatanMap = new Map(
    (angkatanResult.data || []).map((item) => [String(item.id), item]),
  );

  return (pengurusResult.data || [])
    .filter(isActive)
    .map((item) => {
      const angkatan = angkatanMap.get(String(item.angkatan_id));

      return normalizePengurus({
        ...item,

        angkatan: angkatan?.nama ?? null,

        angkatan_tahun: angkatan?.tahun ?? null,
      });
    })
    .sort((a, b) => {
      const yearA = getStartYear(a.periode);

      const yearB = getStartYear(b.periode);

      if (yearA !== yearB) {
        return yearB - yearA;
      }

      return Number(b.urutan || 0) - Number(a.urutan || 0);
    });
}

/* =========================================================
   DETAIL PENGURUS
   ========================================================= */

export async function getPengurusById(id) {
  if (!id) {
    return null;
  }

  const supabase = await getPublicClient();

  const { data, error } = await supabase
    .from("pengurus")
    .select("*")
    .eq("id", id)
    .eq("aktif", true)
    .maybeSingle();

  if (error || !data) {
    if (error) {
      console.error("Gagal mengambil detail pengurus:", error.message);
    }

    return null;
  }

  let angkatan = null;

  if (data.angkatan_id) {
    const { data: angkatanData } = await supabase
      .from("angkatan")
      .select("id,tahun,nama")
      .eq("id", data.angkatan_id)
      .maybeSingle();

    angkatan = angkatanData;
  }

  return normalizePengurus({
    ...data,

    angkatan: angkatan?.nama ?? null,

    angkatan_tahun: angkatan?.tahun ?? null,
  });
}

/* =========================================================
   STRUKTUR PENGURUS
   ========================================================= */

export async function getStrukturPengurus(pengurusId) {
  if (!pengurusId) {
    return [];
  }

  const supabase = await getPublicClient();

  const { data, error } = await supabase
    .from("struktur_pengurus")
    .select("*")
    .eq("pengurus_id", pengurusId)
    .eq("aktif", true);

  if (error) {
    console.error("Gagal mengambil struktur:", error.message);

    return [];
  }

  return (data || [])
    .filter(isActive)
    .map(normalizeStrukturPengurus)
    .sort((a, b) => Number(a.urutan || 0) - Number(b.urutan || 0));
}

/* =========================================================
   SEJARAH — SUPABASE
   ========================================================= */

export async function getSejarah() {
  const supabase = await getPublicClient();

  const { data, error } = await supabase
    .from("sejarah")
    .select("*")
    .eq("aktif", true);

  if (error) {
    console.error("Gagal mengambil sejarah:", error.message);

    return [];
  }

  return (data || [])
    .filter(isActive)
    .map(normalizeSejarah)
    .sort((a, b) => {
      const yearDiff = Number(a.tahun || 0) - Number(b.tahun || 0);

      if (yearDiff) {
        return yearDiff;
      }

      return Number(a.urutan || 0) - Number(b.urutan || 0);
    });
}

/* =========================================================
   PROGRAM KERJA — SUPABASE
   ========================================================= */

export async function getProgramKerja() {
  const supabase = await getPublicClient();

  const { data, error } = await supabase
    .from("program_kerja")
    .select("*")
    .eq("aktif", true);

  if (error) {
    console.error("Gagal mengambil program kerja:", error.message);

    return [];
  }

  return (data || [])
    .filter(isActive)
    .map(normalizeProgramKerja)
    .sort((a, b) => {
      const yearDiff = Number(b.tahun || 0) - Number(a.tahun || 0);

      if (yearDiff) {
        return yearDiff;
      }

      return Number(a.urutan || 0) - Number(b.urutan || 0);
    });
}

/* =========================================================
   GALERI — SUPABASE
   ========================================================= */

export async function getGaleri() {
  const supabase = await getPublicClient();

  const { data, error } = await supabase
    .from("galeri")
    .select("*")
    .eq("aktif", true);

  if (error) {
    console.error("Gagal mengambil galeri:", error.message);

    return [];
  }

  return (data || [])
    .filter(isActive)
    .map(normalizeGaleri)
    .sort((a, b) => Number(a.urutan || 0) - Number(b.urutan || 0));
}

/* =========================================================
   ARSIP — SUPABASE
   ========================================================= */

export async function getArsip() {
  const supabase = await getPublicClient();

  const { data, error } = await supabase
    .from("arsip")
    .select("*")
    .eq("aktif", true);

  if (error) {
    console.error("Gagal mengambil arsip:", error.message);

    return [];
  }

  return (data || [])
    .filter(isActive)
    .map(normalizeArsip)
    .sort((a, b) => Number(a.urutan || 0) - Number(b.urutan || 0));
}

/* =========================================================
   SITE SETTINGS
   ========================================================= */

export async function getSiteSettings() {
  const supabase = await getPublicClient();

  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  if (error) {
    console.error("Gagal mengambil site settings:", error.message);

    return null;
  }

  return data || null;
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
