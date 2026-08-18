"use client";

import Link from "next/link";

import { useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import ImageUploadField from "@/components/admin/ImageUploadField";

/* =========================================================
   CONFIG
   ========================================================= */

const HIDDEN_FIELDS = new Set(["id", "created_at", "updated_at"]);

const IMAGE_FIELDS = new Set([
  "foto",
  "foto_url",

  "gambar",
  "gambar_url",

  "image",
  "image_url",

  "logo",
  "logo_url",

  "favicon_url",
]);

const DEFAULT_FIELD_ORDER = {
  pengurus: [
    "nama",
    "jabatan",
    "periode",

    "foto_url",

    "angkatan_id",

    "quote",
    "deskripsi",

    "urutan",
    "aktif",
  ],

  angkatan: ["tahun", "nama", "filosofi", "deskripsi", "foto", "foto_url"],

  sejarah: ["tahun", "bulan", "judul", "deskripsi", "urutan", "aktif"],

  "program-kerja": [
    "nama",
    "kategori",
    "tahun",
    "deskripsi",
    "urutan",
    "aktif",
  ],

  galeri: [
    "judul",
    "deskripsi",

    "gambar_url",

    "kategori",
    "tanggal",
    "tahun",

    "urutan",
    "aktif",
  ],

  arsip: [
    "judul",
    "kategori",
    "tahun",

    "deskripsi",

    "file_url",

    "urutan",
    "aktif",
  ],

  pengaturan: [
    "nama_organisasi",
    "nama_pendek",

    "logo_url",

    "tahun_berdiri",
    "tanggal_berdiri",

    "instagram",
    "email",

    "slogan",
    "deskripsi",
  ],

  "site-settings": [
    "nama_organisasi",
    "nama_pendek",

    "logo_url",

    "tahun_berdiri",
    "tanggal_berdiri",

    "instagram",
    "email",

    "slogan",
    "deskripsi",
  ],
};

const TEXTAREA_HINTS = [
  "deskripsi",
  "filosofi",
  "quote",
  "kutipan",
  "slogan",
  "konten",
  "isi",
  "keterangan",
];

const NUMBER_HINTS = ["tahun", "urutan", "angkatan_id", "tahun_berdiri"];

/* =========================================================
   RESOURCE IMAGE FOLDER
   ========================================================= */

function getImageFolder(resource) {
  switch (resource) {
    case "pengurus":
      return "pengurus";

    case "angkatan":
      return "angkatan";

    case "galeri":
      return "galeri";

    case "program-kerja":
      return "program-kerja";

    case "pengaturan":
    case "site-settings":
      return "site-settings";

    default:
      return "uploads";
  }
}

function getImageLabel(resource, key) {
  if (resource === "pengurus") {
    return "Foto Ketua Umum";
  }

  if (resource === "angkatan") {
    return "Foto Angkatan";
  }

  if (resource === "galeri") {
    return "Foto Dokumentasi";
  }

  if (resource === "program-kerja") {
    return "Foto Program Kerja";
  }

  if (key.includes("logo")) {
    return "Logo";
  }

  return "Foto";
}

/* =========================================================
   COMPONENT
   ========================================================= */

export default function AdminResourceForm({
  resource,
  title,

  mode = "create",

  initialData = {},
  sampleData = {},

  returnHref = "/admin",

  fieldOptions = {},
}) {
  const router = useRouter();

  const fields = useMemo(
    () => buildFields(resource, initialData, sampleData, fieldOptions),
    [resource, initialData, sampleData, fieldOptions],
  );

  const [values, setValues] = useState(() =>
    buildInitialValues(fields, initialData),
  );

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [uploadingFields, setUploadingFields] = useState({});

  const hasUpload = Object.values(uploadingFields).some(Boolean);

  /* =======================================================
     VALUE
  ======================================================= */

  function updateValue(key, value) {
    setValues((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function updateUploading(key, uploading) {
    setUploadingFields((current) => ({
      ...current,
      [key]: uploading,
    }));
  }

  /* =======================================================
     SUBMIT
  ======================================================= */

  async function handleSubmit(event) {
    event.preventDefault();

    if (loading || hasUpload) {
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = serializePayload(fields, values, mode);

      const id = initialData?.id;

      const endpoint =
        mode === "edit" ? `/api/${resource}/${id}` : `/api/${resource}`;

      const response = await fetch(endpoint, {
        method: mode === "edit" ? "PATCH" : "POST",

        headers: {
          "Content-Type": "application/json",

          Accept: "application/json",
        },

        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.error || result?.message || "Gagal menyimpan data.",
        );
      }

      setSuccess(result?.message || "Data berhasil disimpan.");

      /*
       * Beri waktu sebentar agar
       * success state terlihat.
       */
      setTimeout(() => {
        router.push(returnHref);

        router.refresh();
      }, 250);
    } catch (submitError) {
      console.error(submitError);

      setError(submitError?.message || "Gagal menyimpan data.");
    } finally {
      setLoading(false);
    }
  }

  /* =======================================================
     UI
  ======================================================= */

  return (
    <main className="px-5 py-8 md:px-8 md:py-10">
      <div className="mx-auto max-w-4xl">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary-blue">
          Content Management
        </p>

        <h1 className="mt-3 font-heading text-3xl font-semibold tracking-[-0.04em] text-deep-navy md:text-4xl">
          {title}
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate">
          {mode === "edit"
            ? "Perbarui data kemudian simpan perubahan."
            : "Lengkapi data kemudian simpan ke database."}
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl border border-deep-navy/10 bg-white p-5 md:p-7"
        >
          {fields.length === 0 ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              Struktur field tabel belum dapat dibaca.
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {fields.map((field) => (
                <Field
                  key={field.key}
                  resource={resource}
                  field={field}
                  value={values[field.key]}
                  onChange={(value) => updateValue(field.key, value)}
                  onUploadingChange={(uploading) =>
                    updateUploading(field.key, uploading)
                  }
                />
              ))}
            </div>
          )}

          {/* UPLOAD STATUS */}

          {hasUpload ? (
            <div className="mt-6 rounded-xl border border-primary-blue/20 bg-soft-blue p-4 text-sm text-primary-blue">
              Tunggu sampai upload foto selesai sebelum menyimpan data.
            </div>
          ) : null}

          {/* ERROR */}

          {error ? (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <p className="font-semibold">Gagal menyimpan data</p>

              <p className="mt-1 break-words text-xs">{error}</p>
            </div>
          ) : null}

          {/* SUCCESS */}

          {success ? (
            <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
              {success}
            </div>
          ) : null}

          {/* BUTTONS */}

          <div className="mt-7 flex flex-wrap justify-end gap-3 border-t border-deep-navy/10 pt-6">
            <Link
              href={returnHref}
              className="inline-flex h-11 items-center justify-center rounded-lg border border-deep-navy/10 px-5 text-xs font-semibold text-deep-navy transition hover:bg-soft-blue"
            >
              Batal
            </Link>

            <button
              type="submit"
              disabled={loading || hasUpload || fields.length === 0}
              className="
                inline-flex h-11
                items-center justify-center
                rounded-lg
                bg-deep-navy
                px-6
                text-xs font-semibold
                text-white transition
                hover:bg-primary-blue
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {hasUpload
                ? "Menunggu Upload..."
                : loading
                  ? "Menyimpan..."
                  : mode === "edit"
                    ? "Simpan Perubahan"
                    : "Tambah Data"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

/* =========================================================
   FIELD
   ========================================================= */

function Field({ resource, field, value, onChange, onUploadingChange }) {
  /* IMAGE */

  if (field.type === "image") {
    return (
      <div className="md:col-span-2">
        <ImageUploadField
          label={getImageLabel(resource, field.key)}
          folder={getImageFolder(resource)}
          value={value || ""}
          onChange={onChange}
          onUploadingChange={onUploadingChange}
        />
      </div>
    );
  }

  /* BOOLEAN */

  if (field.type === "boolean") {
    return (
      <label className="flex min-h-12 items-center gap-3 rounded-xl border border-deep-navy/10 px-4 py-3">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(event) => onChange(event.target.checked)}
          className="h-4 w-4"
        />

        <span className="text-sm font-medium text-deep-navy">
          {field.label}
        </span>
      </label>
    );
  }

  /* SELECT */

  if (field.type === "select") {
    return (
      <label className="block">
        <span className="mb-2 block text-xs font-semibold text-deep-navy">
          {field.label}
        </span>

        <select
          value={value ?? ""}
          onChange={(event) => onChange(event.target.value)}
          className="h-11 w-full rounded-xl border border-deep-navy/10 bg-white px-4 text-sm text-deep-navy outline-none transition focus:border-primary-blue"
        >
          <option value="">— Pilih {field.label} —</option>

          {(field.options || []).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    );
  }

  /* TEXTAREA / JSON */

  if (field.type === "textarea" || field.type === "json") {
    return (
      <label className="block md:col-span-2">
        <span className="mb-2 block text-xs font-semibold text-deep-navy">
          {field.label}
        </span>

        <textarea
          value={value ?? ""}
          onChange={(event) => onChange(event.target.value)}
          rows={field.type === "json" ? 7 : 5}
          placeholder={field.type === "json" ? "JSON valid" : undefined}
          className="w-full rounded-xl border border-deep-navy/10 bg-white px-4 py-3 text-sm text-deep-navy outline-none transition focus:border-primary-blue"
        />
      </label>
    );
  }

  /* NORMAL INPUT */

  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold text-deep-navy">
        {field.label}
      </span>

      <input
        type={field.type}
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-xl border border-deep-navy/10 bg-white px-4 text-sm text-deep-navy outline-none transition focus:border-primary-blue"
      />
    </label>
  );
}

/* =========================================================
   BUILD FIELDS
   ========================================================= */

function buildFields(resource, initialData, sampleData, fieldOptions = {}) {
  const preferred = DEFAULT_FIELD_ORDER[resource] || [];

  const realKeys = [
    ...Object.keys(sampleData || {}),

    ...Object.keys(initialData || {}),
  ].filter((key) => !HIDDEN_FIELDS.has(key));

  const keys = Array.from(new Set([...preferred, ...realKeys]));

  const hasRealSchema = realKeys.length > 0;

  /*
   * Kalau sudah ada row di tabel,
   * hanya tampilkan field yang
   * benar-benar terdapat di DB.
   */
  const finalKeys = hasRealSchema
    ? keys.filter((key) => realKeys.includes(key))
    : preferred;

  return finalKeys.map((key) => {
    const reference =
      initialData?.[key] !== undefined ? initialData[key] : sampleData?.[key];

    const options = fieldOptions?.[key];

    let type;

    if (Array.isArray(options)) {
      type = "select";
    } else if (IMAGE_FIELDS.has(key)) {
      type = "image";
    } else {
      type = inferType(key, reference);
    }

    return {
      key,

      label: key === "angkatan_id" ? "Angkatan" : humanize(key),

      type,

      options: options || null,
    };
  });
}

/* =========================================================
   INITIAL VALUES
   ========================================================= */

function buildInitialValues(fields, initialData) {
  const result = {};

  for (const field of fields) {
    const raw = initialData?.[field.key];

    if (field.type === "boolean") {
      if (raw !== undefined && raw !== null) {
        result[field.key] = Boolean(raw);
      } else if (field.key === "aktif") {
        result[field.key] = true;
      } else {
        result[field.key] = false;
      }

      continue;
    }

    if (field.type === "json") {
      if (raw === undefined || raw === null || raw === "") {
        result[field.key] = "";
      } else if (typeof raw === "string") {
        result[field.key] = raw;
      } else {
        result[field.key] = JSON.stringify(raw, null, 2);
      }

      continue;
    }

    result[field.key] = raw ?? "";
  }

  return result;
}

/* =========================================================
   SERIALIZE
   ========================================================= */

function serializePayload(fields, values, mode) {
  const payload = {};

  for (const field of fields) {
    const raw = values[field.key];

    /* BOOLEAN */

    if (field.type === "boolean") {
      payload[field.key] = Boolean(raw);

      continue;
    }

    /* EMPTY */

    if (raw === "" || raw === null || raw === undefined) {
      /*
       * Edit:
       * kosongkan value lama.
       */
      if (mode === "edit") {
        payload[field.key] = null;
      }

      continue;
    }

    /* NUMBER */

    if (field.type === "number") {
      const number = Number(raw);

      if (Number.isNaN(number)) {
        throw new Error(`${field.label} harus berupa angka.`);
      }

      payload[field.key] = number;

      continue;
    }

    /* SELECT FOREIGN KEY */

    if (field.type === "select" && field.key.endsWith("_id")) {
      const id = Number(raw);

      if (Number.isNaN(id)) {
        throw new Error(`${field.label} tidak valid.`);
      }

      payload[field.key] = id;

      continue;
    }

    /* JSON */

    if (field.type === "json") {
      try {
        payload[field.key] = JSON.parse(raw);
      } catch {
        throw new Error(`${field.label} harus berupa JSON valid.`);
      }

      continue;
    }

    /* STRING / IMAGE */

    payload[field.key] = raw;
  }

  if (Object.keys(payload).length === 0) {
    throw new Error("Tidak ada data yang diisi.");
  }

  return payload;
}

/* =========================================================
   INFER TYPE
   ========================================================= */

function inferType(key, reference) {
  if (typeof reference === "boolean") {
    return "boolean";
  }

  if (typeof reference === "number") {
    return "number";
  }

  if (
    Array.isArray(reference) ||
    (reference && typeof reference === "object")
  ) {
    return "json";
  }

  if (key === "aktif" || key === "featured" || key.startsWith("is_")) {
    return "boolean";
  }

  if (NUMBER_HINTS.includes(key) || key.endsWith("_id")) {
    return "number";
  }

  if (key.includes("tanggal") || key.endsWith("_date")) {
    return "date";
  }

  if (key === "email" || key.endsWith("_email")) {
    return "email";
  }

  if (TEXTAREA_HINTS.some((hint) => key.includes(hint))) {
    return "textarea";
  }

  return "text";
}

/* =========================================================
   HUMAN LABEL
   ========================================================= */

function humanize(key) {
  return String(key)
    .replaceAll("_", " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}
