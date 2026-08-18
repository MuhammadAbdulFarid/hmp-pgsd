"use client";

import Link from "next/link";

import { useState } from "react";

import ImageUploadField from "@/components/admin/ImageUploadField";

export default function StrukturPengurusForm({
  action,
  pengurus,
  initialData = {},
  mode = "create",
  error = "",
}) {
  const isEdit = mode === "edit";

  const [fotoUrl, setFotoUrl] = useState(initialData?.foto_url || "");

  const [uploading, setUploading] = useState(false);

  return (
    <form
      action={action}
      className="mt-8 rounded-2xl border border-deep-navy/10 bg-white p-5 md:p-7"
    >
      {/* PARENT */}

      <input type="hidden" name="pengurus_id" value={pengurus.id} />

      {/* URL STORAGE OTOMATIS */}

      <input type="hidden" name="foto_url" value={fotoUrl} />

      {/* CHILD ID */}

      {isEdit && initialData?.id ? (
        <input type="hidden" name="struktur_id" value={initialData.id} />
      ) : null}

      {/* INFO */}

      <div className="mb-7 rounded-xl border border-primary-blue/10 bg-soft-blue p-5">
        <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-primary-blue">
          Kepengurusan
        </p>

        <p className="mt-2 font-heading text-xl font-semibold text-deep-navy">
          Periode {pengurus.periode}
        </p>

        <p className="mt-1 text-sm text-slate">
          Ketua Umum:{" "}
          <strong className="text-deep-navy">{pengurus.nama}</strong>
        </p>
      </div>

      {/* ERROR */}

      {error ? (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <p className="font-semibold">Gagal menyimpan data</p>

          <p className="mt-1 text-xs">{error}</p>
        </div>
      ) : null}

      {/* FORM */}

      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="Nama"
          name="nama"
          required
          defaultValue={initialData?.nama}
        />

        <Field
          label="Jabatan"
          name="jabatan"
          required
          defaultValue={initialData?.jabatan}
        />

        <Field
          label="Bidang"
          name="bidang"
          defaultValue={initialData?.bidang}
        />

        <Field
          label="Urutan"
          name="urutan"
          type="number"
          min="0"
          defaultValue={initialData?.urutan ?? 0}
        />

        {/* =============================
            UPLOAD FOTO
        ============================= */}

        <div className="md:col-span-2">
          <ImageUploadField
            label="Foto Anggota"
            folder="struktur-pengurus"
            value={fotoUrl}
            onChange={setFotoUrl}
            onUploadingChange={setUploading}
          />
        </div>

        {/* STATUS */}

        <label className="md:col-span-2 flex min-h-12 items-center gap-3 rounded-xl border border-deep-navy/10 px-4 py-3">
          <input
            type="checkbox"
            name="aktif"
            defaultChecked={initialData?.aktif !== false}
            className="h-4 w-4"
          />

          <div>
            <p className="text-sm font-medium text-deep-navy">Aktif</p>

            <p className="mt-1 text-xs text-slate">
              Tampilkan anggota pada website publik.
            </p>
          </div>
        </label>
      </div>

      {uploading ? (
        <div className="mt-6 rounded-xl border border-primary-blue/20 bg-soft-blue p-4 text-sm text-primary-blue">
          Upload sedang berjalan. Tunggu sampai selesai.
        </div>
      ) : null}

      {/* ACTION */}

      <div className="mt-7 flex justify-end gap-3 border-t border-deep-navy/10 pt-6">
        <Link
          href={`/admin/pengurus/${pengurus.id}/struktur`}
          className="inline-flex h-11 items-center justify-center rounded-lg border border-deep-navy/10 px-5 text-xs font-semibold text-deep-navy hover:bg-soft-blue"
        >
          Batal
        </Link>

        <button
          type="submit"
          disabled={uploading}
          className="inline-flex h-11 items-center justify-center rounded-lg bg-deep-navy px-6 text-xs font-semibold text-white transition hover:bg-primary-blue disabled:opacity-50"
        >
          {uploading
            ? "Menunggu Upload..."
            : isEdit
              ? "Simpan Perubahan"
              : "Tambah Anggota"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  defaultValue = "",
  required = false,
  min,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold text-deep-navy">
        {label}

        {required ? <span className="ml-1 text-red-500">*</span> : null}
      </span>

      <input
        type={type}
        name={name}
        defaultValue={defaultValue ?? ""}
        required={required}
        min={min}
        className="h-11 w-full rounded-xl border border-deep-navy/10 bg-white px-4 text-sm text-deep-navy outline-none transition focus:border-primary-blue"
      />
    </label>
  );
}
