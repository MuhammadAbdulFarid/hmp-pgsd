"use client";

import { useEffect, useRef, useState } from "react";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const MAX_SIZE = 5 * 1024 * 1024;

export default function ImageUploadField({
  label = "Foto",
  folder = "uploads",
  value = "",
  onChange,
  onUploadingChange,
}) {
  const inputRef = useRef(null);

  const [previewUrl, setPreviewUrl] = useState(value || "");

  const [uploading, setUploading] = useState(false);

  const [error, setError] = useState("");

  const [previewError, setPreviewError] = useState(false);

  /* =========================================================
     SYNC VALUE DARI PARENT
     ========================================================= */

  useEffect(() => {
    /*
     * Jangan overwrite preview lokal
     * ketika user baru memilih file.
     */
    if (previewUrl && previewUrl.startsWith("blob:")) {
      return;
    }

    setPreviewUrl(value || "");
    setPreviewError(false);
  }, [value]);

  /* =========================================================
     CLEANUP BLOB URL
     ========================================================= */

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  /* =========================================================
     FILE CHANGE / UPLOAD
     ========================================================= */

  async function handleFileChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");
    setPreviewError(false);

    /* =======================================================
       VALIDASI TYPE
       ======================================================= */

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Format harus JPG, PNG, atau WEBP.");

      event.target.value = "";

      return;
    }

    /* =======================================================
       VALIDASI SIZE
       ======================================================= */

    if (file.size > MAX_SIZE) {
      setError(
        `Ukuran foto ${(file.size / 1024 / 1024).toFixed(
          2,
        )} MB. Maksimal 5 MB.`,
      );

      event.target.value = "";

      return;
    }

    /* =======================================================
       LOCAL PREVIEW
       ======================================================= */

    const previousValue = value || "";

    const localPreview = URL.createObjectURL(file);

    setPreviewUrl(localPreview);

    setUploading(true);

    onUploadingChange?.(true);

    try {
      /* =====================================================
         FORM DATA
         ===================================================== */

      const formData = new FormData();

      formData.append("file", file);

      formData.append("folder", folder);

      /* =====================================================
         FETCH
         ===================================================== */

      const response = await fetch("/api/upload-media", {
        method: "POST",

        body: formData,

        credentials: "same-origin",

        cache: "no-store",
      });

      /* =====================================================
         RESPONSE
         ===================================================== */

      const raw = await response.text();

      let result = null;

      if (raw) {
        try {
          result = JSON.parse(raw);
        } catch {
          console.error("Response upload bukan JSON:", raw);
        }
      }

      /* =====================================================
         HTTP ERROR
         ===================================================== */

      if (!response.ok) {
        console.error("UPLOAD FAILED:", {
          status: response.status,

          statusText: response.statusText,

          response: result,

          raw,
        });

        throw new Error(
          result?.message ||
            result?.error ||
            `Upload gagal — HTTP ${response.status}`,
        );
      }

      /* =====================================================
         VALIDASI URL
         ===================================================== */

      if (!result?.url) {
        console.error("UPLOAD RESPONSE:", result);

        throw new Error(
          "Upload berhasil tetapi URL foto tidak diterima dari server.",
        );
      }

      /* =====================================================
         SUCCESS
         ===================================================== */

      /*
       * Blob preview tidak diperlukan lagi.
       */
      if (localPreview.startsWith("blob:")) {
        URL.revokeObjectURL(localPreview);
      }

      setPreviewUrl(result.url);

      setPreviewError(false);

      setError("");

      /*
       * PENTING:
       * Kirim URL Storage ke parent
       * hanya SEKALI.
       */
      onChange?.(result.url);

      console.log("UPLOAD SUCCESS:", {
        url: result.url,
        path: result.path,
        bucket: result.bucket,
      });
    } catch (uploadError) {
      console.error("IMAGE UPLOAD ERROR:", uploadError);

      /*
       * Kembali ke gambar sebelumnya
       * jika upload gagal.
       */
      setPreviewUrl(previousValue);

      setPreviewError(false);

      setError(uploadError?.message || "Upload foto gagal.");
    } finally {
      setUploading(false);

      onUploadingChange?.(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  /* =========================================================
     REMOVE IMAGE
     ========================================================= */

  function removeImage() {
    if (uploading) {
      return;
    }

    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl("");
    setPreviewError(false);
    setError("");

    /*
     * Kosongkan foto_url/gambar_url
     * di parent form.
     */
    onChange?.("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  /* =========================================================
     UI
     ========================================================= */

  return (
    <div>
      {/* HEADER */}

      <div className="mb-2 flex items-center justify-between gap-4">
        <p className="text-xs font-semibold text-deep-navy">{label}</p>

        <p className="text-[10px] uppercase tracking-[0.12em] text-slate">
          JPG · PNG · WEBP
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-deep-navy/10 bg-soft-blue">
        {/* ===================================================
            PREVIEW
            =================================================== */}

        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden">
          {previewUrl && !previewError ? (
            <img
              src={previewUrl}
              alt={`Preview ${label}`}
              onError={() => setPreviewError(true)}
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="px-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl text-primary-blue shadow-sm">
                +
              </div>

              <p className="mt-4 text-sm font-semibold text-deep-navy">
                {previewError
                  ? "Foto tidak dapat ditampilkan"
                  : "Belum ada foto"}
              </p>

              <p className="mt-1 text-xs leading-5 text-slate">
                {previewError
                  ? "Pilih file baru untuk mengganti foto ini."
                  : "Pilih foto JPG, PNG, atau WEBP."}
              </p>
            </div>
          )}

          {/* UPLOAD OVERLAY */}

          {uploading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white/85 backdrop-blur-sm">
              <div className="text-center">
                <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-deep-navy/20 border-t-deep-navy" />

                <p className="mt-3 text-xs font-semibold text-deep-navy">
                  Mengupload foto...
                </p>

                <p className="mt-1 text-[10px] text-slate">
                  Jangan tutup halaman.
                </p>
              </div>
            </div>
          ) : null}
        </div>

        {/* ===================================================
            CONTROLS
            =================================================== */}

        <div className="border-t border-deep-navy/10 bg-white p-4">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
              className="
                inline-flex h-10
                items-center justify-center
                rounded-lg
                bg-deep-navy px-4
                text-xs font-semibold
                text-white
                transition
                hover:bg-primary-blue
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {uploading
                ? "Mengupload..."
                : previewUrl
                  ? "Ganti Foto"
                  : "Pilih Foto"}
            </button>

            {value || previewUrl ? (
              <button
                type="button"
                disabled={uploading}
                onClick={removeImage}
                className="
                  inline-flex h-10
                  items-center justify-center
                  rounded-lg
                  border border-red-200
                  px-4
                  text-xs font-semibold
                  text-red-600
                  transition
                  hover:bg-red-50
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                Hapus Foto
              </button>
            ) : null}
          </div>

          <p className="mt-3 text-[11px] leading-5 text-slate">
            Maksimal 5 MB. File otomatis diupload ke Supabase Storage bucket{" "}
            <strong>media</strong>.
          </p>

          {/* ERROR */}

          {error ? (
            <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2">
              <p className="text-xs font-semibold text-red-700">Upload gagal</p>

              <p className="mt-1 break-words text-[11px] leading-5 text-red-600">
                {error}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
